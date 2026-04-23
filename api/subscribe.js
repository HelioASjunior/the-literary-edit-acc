module.exports = async (req, res) => {
  try {
    const { GoogleSpreadsheet } = require('google-spreadsheet');
    const { JWT } = require('google-auth-library');

    if (req.method !== 'POST') {
      return res.status(405).json({ success: false, message: 'Método não permitido.' });
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const email = String(body.email || '').trim();

    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'E-mail inválido.' });
    }

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

    // Autenticação com a Conta de Serviço
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
    
    // Carrega o documento
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0]; // Primeira aba

    // Verifica se já existe (opcional, para evitar duplicados na planilha)
    const rows = await sheet.getRows();
    const jaExiste = rows.some(row => row.get('Email') === email);

    if (jaExiste) {
      return res.status(200).json({ success: true, message: 'Você já está inscrito!' });
    }

    // Adiciona o novo e-mail e a data
    await sheet.addRow({
      Email: email,
      Data: new Date().toLocaleString('pt-BR')
    });

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
