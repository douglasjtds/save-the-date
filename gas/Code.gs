/**
 * The Wedding Post — Google Apps Script
 *
 * Deploy como Web App:
 *   Apps Script → Deploy → New deployment → Web App
 *   Execute as: Me
 *   Who has access: Anyone
 *
 * Copie a URL gerada e coloque em NEXT_PUBLIC_APPS_SCRIPT_URL no .env.local
 */

const SPREADSHEET_ID = '1L10E9jDwXqjUxXGX1qzRjGaDhZ7ksGb5hlGfDNtbTJc';
const SHEET_NAME = 'rsvp';
const NOTIFICATION_EMAIL = 'douglasjtds@gmail.com';

/**
 * Handler para GET
 * Uso: ?action=check&groupId=familia-silva
 * Retorna: { confirmed: boolean, members?: [{ name, attending }] }
 */
function doGet(e) {
  const action = e.parameter.action;

  if (action === 'check') {
    const groupId = e.parameter.groupId;
    if (!groupId) {
      return jsonResponse({ error: 'groupId is required' });
    }
    const result = getGroupConfirmation(groupId);
    return jsonResponse(
      result.confirmed
        ? { confirmed: true, members: result.members }
        : { confirmed: false }
    );
  }

  return jsonResponse({ error: 'Unknown action' });
}

/**
 * Handler para POST
 * Body: RSVPPayload (JSON stringificado)
 * Retorna: { success: boolean, error?: string }
 *
 * Edições sobrescrevem: linhas anteriores do groupId são removidas antes
 * da nova gravação. O e-mail de notificação é enviado em toda submissão.
 */
function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);

    if (!payload.groupId || !payload.familyName || !payload.confirmed) {
      return jsonResponse({ success: false, error: 'Invalid payload' });
    }

    saveRSVP(payload);
    sendNotificationEmail(payload);

    return jsonResponse({ success: true });

  } catch (err) {
    return jsonResponse({ success: false, error: err.message });
  }
}

/**
 * Lê todas as linhas do groupId e devolve a lista de membros + flag confirmed.
 */
function getGroupConfirmation(groupId) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  const members = [];
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === groupId) {
      const raw = data[i][3];
      members.push({
        name: String(data[i][2]),
        attending: raw === true || raw === 'TRUE' || raw === 'true',
      });
    }
  }
  return { confirmed: members.length > 0, members: members };
}

/**
 * Grava o RSVP na planilha — uma linha por membro.
 * Colunas: groupId | familyName | memberName | attending | confirmedAt | confirmedBy
 *
 * Se o groupId já existir, as linhas anteriores são removidas (overwrite).
 */
function saveRSVP(payload) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();

  for (let i = data.length - 1; i >= 1; i--) {
    if (data[i][0] === payload.groupId) {
      sheet.deleteRow(i + 1);
    }
  }

  const timestamp = payload.timestamp || new Date().toISOString();

  payload.confirmed.forEach(function(member) {
    sheet.appendRow([
      payload.groupId,
      payload.familyName,
      member.name,
      member.attending,
      timestamp,
      payload.confirmedBy
    ]);
  });
}

/**
 * Envia e-mail de notificação a cada confirmação recebida
 */
function sendNotificationEmail(payload) {
  const attending = payload.confirmed.filter(function(m) { return m.attending; });
  const absent    = payload.confirmed.filter(function(m) { return !m.attending; });

  const presentList = attending.length
    ? attending.map(function(m) { return '  • ' + m.name; }).join('\n')
    : '  (nenhum)';

  const absentList = absent.length
    ? absent.map(function(m) { return '  • ' + m.name; }).join('\n')
    : '  (nenhum)';

  const timestamp = payload.timestamp
    ? new Date(payload.timestamp).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
    : new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

  const subject = '[The Wedding Post] Confirmação: ' + payload.familyName;

  const body = [
    'Nova confirmação recebida!\n',
    'Família:        ' + payload.familyName,
    'Confirmado por: ' + payload.confirmedBy,
    'Horário:        ' + timestamp,
    '',
    'Presentes (' + attending.length + '):',
    presentList,
    '',
    'Ausentes (' + absent.length + '):',
    absentList,
  ].join('\n');

  MailApp.sendEmail(NOTIFICATION_EMAIL, subject, body);
}

/**
 * Helper: retorna ContentService com JSON e CORS habilitado
 */
function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
