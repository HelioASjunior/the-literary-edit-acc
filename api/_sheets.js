const { google } = require('googleapis');

function getPrivateKey() {
  return (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n');
}

function getMissingVars() {
  return [
    'GOOGLE_SERVICE_ACCOUNT_EMAIL',
    'GOOGLE_PRIVATE_KEY',
    'GOOGLE_SHEET_ID'
  ].filter((key) => !process.env[key]);
}

function buildSheetsClient() {
  const auth = new google.auth.JWT(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    null,
    getPrivateKey(),
    ['https://www.googleapis.com/auth/spreadsheets']
  );

  return google.sheets({ version: 'v4', auth });
}

function quoteTitle(title) {
  return `'${String(title).replace(/'/g, "''")}'`;
}

async function ensureSheet(sheets, spreadsheetId, title) {
  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  const hasSheet = (meta.data.sheets || []).some((s) => s.properties && s.properties.title === title);

  if (!hasSheet) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            addSheet: {
              properties: { title }
            }
          }
        ]
      }
    });
  }
}

async function getRows(sheets, spreadsheetId, title) {
  const range = `${quoteTitle(title)}!A2:Z`;
  const resp = await sheets.spreadsheets.values.get({ spreadsheetId, range });
  return resp.data.values || [];
}

async function appendRow(sheets, spreadsheetId, title, rowValues) {
  const range = `${quoteTitle(title)}!A:Z`;
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [rowValues]
    }
  });
}

module.exports = {
  buildSheetsClient,
  getMissingVars,
  ensureSheet,
  getRows,
  appendRow
};