module.exports = async (req, res) => {
  try {
    const { GoogleSpreadsheet } = require('google-spreadsheet');
    const { JWT } = require('google-auth-library');

    const { reviewId } = req.query || {};
    const missingVars = [
      'GOOGLE_SERVICE_ACCOUNT_EMAIL',
      'GOOGLE_PRIVATE_KEY',
      'GOOGLE_SHEET_ID'
    ].filter((key) => !process.env[key]);

    if (missingVars.length) {
      return res.status(500).json({
        success: false,
        message: `Configuração ausente: ${missingVars.join(', ')}`
      });
    }

    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);

    await doc.loadInfo();
    let sheet = doc.sheetsByTitle['Avaliacoes'];
    if (!sheet) {
      sheet = doc.sheetsByIndex[2] || await doc.addSheet({ 
        title: 'Avaliacoes', 
        headerValues: ['ReviewID', 'Nota', 'Data'] 
      });
    }

    if (req.method === 'GET') {
      if (!reviewId) return res.status(400).json({ success: false, message: 'ReviewID necessário.' });
      
      const rows = await sheet.getRows();
      const ratings = rows.filter(row => row.get('ReviewID') === reviewId);
      
      const count = ratings.length;
      const total = ratings.reduce((sum, row) => sum + parseFloat(row.get('Nota') || 0), 0);
      const average = count > 0 ? (total / count) : 0;

      return res.status(200).json({ 
        success: true, 
        average: parseFloat(average.toFixed(1)), 
        count 
      });
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const { nota, reviewId: postReviewId } = body;
      if (!nota || !postReviewId) {
        return res.status(400).json({ success: false, message: 'Campos incompletos.' });
      }

      await sheet.addRow({
        ReviewID: postReviewId,
        Nota: nota,
        Data: new Date().toISOString()
      });

      return res.status(201).json({ success: true, message: 'Avaliação registrada!' });
    }

    return res.status(405).json({ success: false, message: 'Método não permitido.' });
  } catch (error) {
    console.error('Erro nas avaliações:', error);
    res.status(500).json({ success: false, message: 'Erro ao processar avaliações.' });
  }
};
