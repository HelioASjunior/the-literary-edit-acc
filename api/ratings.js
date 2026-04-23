module.exports = async (req, res) => {
  try {
    const {
      buildSheetsClient,
      getMissingVars,
      ensureSheet,
      getRows,
      appendRow
    } = require('./_sheets');

    const { reviewId } = req.query || {};
    const missingVars = getMissingVars();

    if (missingVars.length) {
      return res.status(500).json({
        success: false,
        message: `Configuração ausente: ${missingVars.join(', ')}`
      });
    }

    const sheets = buildSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const sheetTitle = 'Avaliacoes';

    await ensureSheet(sheets, spreadsheetId, sheetTitle);

    if (req.method === 'GET') {
      if (!reviewId) return res.status(400).json({ success: false, message: 'ReviewID necessário.' });
      const rows = await getRows(sheets, spreadsheetId, sheetTitle);
      const ratings = rows.filter((row) => String(row[0] || '') === reviewId);
      
      const count = ratings.length;
      const total = ratings.reduce((sum, row) => sum + parseFloat(row[1] || 0), 0);
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

      await appendRow(sheets, spreadsheetId, sheetTitle, [
        String(postReviewId),
        String(nota),
        new Date().toISOString()
      ]);

      return res.status(201).json({ success: true, message: 'Avaliação registrada!' });
    }

    return res.status(405).json({ success: false, message: 'Método não permitido.' });
  } catch (error) {
    console.error('Erro nas avaliações:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao processar avaliações.',
      details: String(error && error.message ? error.message : 'Erro desconhecido').slice(0, 240)
    });
  }
};
