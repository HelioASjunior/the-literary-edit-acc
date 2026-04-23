const nodemailer = require('nodemailer');
const { google } = require('googleapis');
require('dotenv').config();

function getSheetsClient() {
  const auth = new google.auth.JWT(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    null,
    String(process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    ['https://www.googleapis.com/auth/spreadsheets']
  );

  return google.sheets({ version: 'v4', auth });
}

/**
 * Envia a newsletter para todos os inscritos (buscando do Google Sheets)
 * @param {Object} resenha - Objeto da resenha
 */
async function enviarNewsletter(resenha) {
  console.log('\nBuscando lista de inscritos na Planilha do Google...');

  let subscribers = [];

  try {
    const sheets = getSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const resp = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "'Newsletter'!A2:B"
    });

    const rows = resp.data.values || [];
    subscribers = rows
      .map((row) => String(row[0] || '').trim())
      .filter((email) => email && email.includes('@'));

    if (subscribers.length === 0) {
      console.log('A planilha de newsletter esta vazia.');
      return;
    }
  } catch (error) {
    console.error('Erro ao ler a planilha:', error.message);
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });

  const baseUrl = (process.env.SITE_URL || 'https://confrarialiteraria.vercel.app').replace(/\/$/, '');
  const reviewUrl = `${baseUrl}/pages/${resenha.slug}.html`;

  const emailHTML = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Confraria Literaria - Nova Resenha</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background: #f7eef2;
      color: #2a1a20;
      font-family: Georgia, 'Times New Roman', serif;
    }

    .outer {
      width: 100%;
      padding: 28px 12px;
      background: linear-gradient(180deg, #f7eef2 0%, #f3e7ec 100%);
    }

    .container {
      max-width: 640px;
      margin: 0 auto;
      background: #fffafb;
      border: 1px solid #f0d8e3;
      border-radius: 18px;
      overflow: hidden;
      box-shadow: 0 10px 26px rgba(90, 14, 47, 0.12);
    }

    .header {
      background: linear-gradient(135deg, #7d0f34 0%, #a31f4d 100%);
      color: #ffffff;
      padding: 34px 28px;
      text-align: center;
    }

    .brand {
      margin: 0;
      font-size: 30px;
      letter-spacing: 0.4px;
      font-style: italic;
    }

    .heart-row {
      margin-top: 10px;
      font-size: 14px;
      opacity: 0.95;
      letter-spacing: 2px;
    }

    .content {
      padding: 30px 28px 18px;
    }

    .eyebrow {
      display: inline-block;
      margin: 0 0 10px;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 2.4px;
      color: #9d1e4a;
      font-weight: 700;
    }

    .title {
      margin: 0 0 12px;
      font-size: 30px;
      line-height: 1.2;
      color: #31121d;
    }

    .book-meta {
      margin: 0 0 18px;
      font-size: 14px;
      color: #8b4a63;
      font-style: italic;
    }

    .excerpt-wrap {
      background: #ffffff;
      border: 1px solid #f2d8e3;
      border-left: 4px solid #b32258;
      border-radius: 10px;
      padding: 16px;
      margin-bottom: 24px;
    }

    .excerpt {
      margin: 0;
      font-size: 16px;
      line-height: 1.65;
      color: #4b2534;
    }

    .cta-wrap {
      text-align: center;
      padding: 6px 0 20px;
    }

    .btn {
      display: inline-block;
      background: linear-gradient(135deg, #8c0327 0%, #be2b60 100%);
      color: #ffffff !important;
      text-decoration: none;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 0.5px;
      padding: 14px 26px;
      border-radius: 999px;
    }

    .btn-note {
      margin: 12px 0 0;
      font-size: 12px;
      color: #8b4a63;
    }

    .footer {
      background: #fff2f7;
      border-top: 1px solid #f2d6e2;
      padding: 20px 24px 24px;
      text-align: center;
      color: #825065;
      font-size: 12px;
      line-height: 1.6;
    }

    .signature {
      margin: 0 0 6px;
      font-size: 13px;
      color: #7d2144;
      font-weight: 700;
    }
  </style>
</head>
<body>
  <div class="outer">
    <div class="container">
      <div class="header">
        <h1 class="brand">Confraria Literaria</h1>
        <div class="heart-row">❤ ❤ ❤ ❤ ❤</div>
      </div>

      <div class="content">
        <span class="eyebrow">Nova Resenha</span>
        <h2 class="title">${resenha.tituloResenha || resenha.titulo}</h2>
        <p class="book-meta">${resenha.titulo} - ${resenha.autora}</p>

        <div class="excerpt-wrap">
          <p class="excerpt">${resenha.resumo}</p>
        </div>

        <div class="cta-wrap">
          <a href="${reviewUrl}" class="btn">Ler Resenha Completa</a>
          <p class="btn-note">Leitura com calma, cafe e coracao aberto.</p>
        </div>
      </div>

      <div class="footer">
        <p class="signature">Com carinho, Confraria Literaria ❤</p>
        <p>© 2026 Confraria Literaria - Um espaco editorial para quem le com intencao.</p>
        <p>Voce recebeu este e-mail porque se inscreveu em nossa newsletter.</p>
      </div>
    </div>
  </div>
</body>
</html>`;

  console.log(`\nIniciando envio da newsletter para ${subscribers.length} inscritos...`);

  try {
    const info = await transporter.sendMail({
      from: `"Confraria Literaria" <${process.env.GMAIL_USER}>`,
      to: subscribers.join(', '),
      subject: `Nova Resenha: ${resenha.titulo}`,
      html: emailHTML
    });
    console.log('Newsletter enviada com sucesso!', info.messageId);
  } catch (error) {
    console.error('Erro ao enviar e-mails:', error.message);
  }
}

module.exports = { enviarNewsletter };
