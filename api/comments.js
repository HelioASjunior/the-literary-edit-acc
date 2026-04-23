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

    // Configuração da autenticação
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);

    await doc.loadInfo();
    // Busca a aba "Comentarios". Se não existir, usa a segunda aba (índice 1).
    let sheet = doc.sheetsByTitle['Comentarios'];
    if (!sheet) {
      // Se não existir a aba por nome, tentamos criar ou usar a segunda aba
      sheet = doc.sheetsByIndex[1] || await doc.addSheet({ title: 'Comentarios', headerValues: ['ReviewID', 'Nome', 'Texto', 'Data'] });
    }

    if (req.method === 'GET') {
      if (!reviewId) return res.status(400).json({ success: false, message: 'ReviewID necessário.' });
      
      const rows = await sheet.getRows();
      const comments = rows
        .filter(row => row.get('ReviewID') === reviewId)
        .map(row => ({
          name: row.get('Nome'),
          text: row.get('Texto'),
          date: row.get('Data')
        }))
        .reverse(); // Mais recentes primeiro

      return res.status(200).json({ success: true, comments });
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const { name, text, reviewId: postReviewId } = body;
      if (!name || !text || !postReviewId) {
        return res.status(400).json({ success: false, message: 'Campos incompletos.' });
      }

      await sheet.addRow({
        ReviewID: postReviewId,
        Nome: name,
        Texto: text,
        Data: new Date().toISOString()
      });

      return res.status(201).json({ success: true, message: 'Comentário publicado!' });
    }

    return res.status(405).json({ success: false, message: 'Método não permitido.' });
  } catch (error) {
    console.error('Erro nos comentários:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao processar comentários.',
      details: String(error && error.message ? error.message : 'Erro desconhecido').slice(0, 240)
    });
  }
};
