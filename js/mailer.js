const nodemailer = require('nodemailer');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
require('dotenv').config();

/**
 * Envia a newsletter para todos os inscritos (buscando do Google Sheets)
 * @param {Object} resenha - Objeto da resenha
 */
async function enviarNewsletter(resenha) {
  console.log('\n🔍 Buscando lista de inscritos na Planilha do Google...');

  let subscribers = [];

  try {
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    
    subscribers = rows.map(row => row.get('Email')).filter(email => email);

    if (subscribers.length === 0) {
      console.log('⚠️ A planilha está vazia.');
      return;
    }
  } catch (error) {
    console.error('❌ Erro ao ler a planilha:', error.message);
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });

  const emailHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Georgia', serif; background-color: #fdf3f7; margin: 0; padding: 40px 0; color: #2a2a2a; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .header { background-color: #8c0327; padding: 40px; text-align: center; color: #ffffff; }
        .header h1 { margin: 0; font-size: 24px; font-style: italic; letter-spacing: 1px; }
        .content { padding: 40px; line-height: 1.6; }
        .eyebrow { text-transform: uppercase; font-size: 12px; letter-spacing: 2px; color: #d95995; margin-bottom: 10px; display: block; }
        .title { font-size: 28px; margin: 0 0 20px 0; color: #1a1a1a; line-height: 1.2; }
        .excerpt { font-size: 16px; color: #555; margin-bottom: 30px; }
        .footer { padding: 30px; text-align: center; font-size: 12px; color: #999; border-top: 1px solid #eee; }
        .btn { 
          display: inline-block; 
          padding: 14px 28px; 
          background-color: #8c0327; 
          color: #ffffff !important; 
          text-decoration: none; 
          border-radius: 4px; 
          font-weight: bold;
          font-family: 'Helvetica', Arial, sans-serif;
          letter-spacing: 0.5px;
        }
        .book-meta { font-size: 14px; color: #888; margin-bottom: 20px; font-style: italic; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Confraria Literária</h1>
        </div>
        <div class="content">
          <span class="eyebrow">Nova Resenha</span>
          <h2 class="title">${resenha.tituloResenha || resenha.titulo}</h2>
          <div class="book-meta">${resenha.titulo} — ${resenha.autora}</div>
          <p class="excerpt">${resenha.resumo}</p>
          <div style="text-align: center; margin-top: 40px;">
            <a href="https://confrarialiteraria.vercel.app/pages/${resenha.slug}.html" class="btn">Ler resenha completa</a>
          </div>
        </div>
        <div class="footer">
          <p>© 2026 Confraria Literária • Um espaço editorial para quem lê com intenção.</p>
          <p>Você recebeu este e-mail porque se inscreveu em nossa newsletter.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  console.log(`\n📧 Iniciando envio da newsletter para ${subscribers.length} inscritos...`);

  try {
    const info = await transporter.sendMail({
      from: `"Confraria Literária" <${process.env.GMAIL_USER}>`,
      to: subscribers.join(', '),
      subject: `Nova Resenha: ${resenha.titulo}`,
      html: emailHTML
    });
    console.log('✅ Newsletter enviada com sucesso!', info.messageId);
  } catch (error) {
    console.error('❌ Erro ao enviar e-mails:', error.message);
  }
}

module.exports = { enviarNewsletter };
