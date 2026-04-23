module.exports = async (req, res) => {
  try {
    const {
      buildSheetsClient,
      getMissingVars,
      ensureSheet,
      getRows,
      appendRow
    } = require('./_sheets');

    if (req.method !== 'POST') {
      return res.status(405).json({ success: false, message: 'Método não permitido.' });
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const email = String(body.email || '').trim();

    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'E-mail inválido.' });
    }

    const missingVars = getMissingVars();

    if (missingVars.length) {
      return res.status(500).json({
        success: false,
        message: `Configuração ausente: ${missingVars.join(', ')}`
      });
    }

    const sheets = buildSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const sheetTitle = 'Newsletter';

    await ensureSheet(sheets, spreadsheetId, sheetTitle);
    const rows = await getRows(sheets, spreadsheetId, sheetTitle);
    const jaExiste = rows.some((row) => String(row[0] || '').trim().toLowerCase() === email.toLowerCase());

    if (jaExiste) {
      return res.status(200).json({ success: true, message: 'Você já está inscrito!' });
    }

    await appendRow(sheets, spreadsheetId, sheetTitle, [
      email,
      new Date().toLocaleString('pt-BR')
    ]);

    res.status(201).json({ success: true, message: 'Inscrição realizada com sucesso!' });
  } catch (error) {
    console.error('Erro no Google Sheets (subscribe):', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao conectar com o banco de dados.',
      details: String(error && error.message ? error.message : 'Erro desconhecido').slice(0, 240)
    });
  }
};
