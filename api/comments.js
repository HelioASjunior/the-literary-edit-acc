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
    const sheetTitle = 'Comentarios';

    await ensureSheet(sheets, spreadsheetId, sheetTitle);

    if (req.method === 'GET') {
      if (!reviewId) return res.status(400).json({ success: false, message: 'ReviewID necessário.' });
      const rows = await getRows(sheets, spreadsheetId, sheetTitle);
      const comments = rows
        .filter((row) => String(row[0] || '') === reviewId)
        .map((row) => ({
          name: row[1] || '',
          text: row[2] || '',
          date: row[3] || ''
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

      await appendRow(sheets, spreadsheetId, sheetTitle, [
        String(postReviewId),
        String(name),
        String(text),
        new Date().toISOString()
      ]);

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
