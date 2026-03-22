# Google Apps Script — Spec & Código

> Endpoint que conecta o site de RSVP ao Google Sheets.
> Deploy como Web App (Execute as: Me, Who has access: Anyone).

---

## Setup Inicial

### 1. Criar a Planilha

1. Acesse [sheets.google.com](https://sheets.google.com) e crie uma nova planilha
2. Renomeie a aba para `rsvp`
3. Adicione os headers na linha 1:

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| groupId | familyName | memberName | attending | confirmedAt | confirmedBy |

4. Anote o **Spreadsheet ID** (está na URL: `docs.google.com/spreadsheets/d/[ID]/edit`)

### 2. Criar o Apps Script

1. Na planilha, vá em **Extensões → Apps Script**
2. Apague o conteúdo padrão
3. Cole o código abaixo
4. Substitua `SPREADSHEET_ID` pelo ID da sua planilha

### 3. Deploy como Web App

1. Clique em **Deploy → New deployment**
2. Tipo: **Web App**
3. Execute as: **Me**
4. Who has access: **Anyone**
5. Clique em **Deploy**
6. Copie a **Web App URL** — será usada no Next.js como `NEXT_PUBLIC_APPS_SCRIPT_URL`

---

## Código do Apps Script

```javascript
const SPREADSHEET_ID = 'COLE_SEU_SPREADSHEET_ID_AQUI';
const SHEET_NAME = 'rsvp';

/**
 * Handler para requisições GET
 * Uso: ?action=check&groupId=familia-silva
 * Retorna: { confirmed: boolean }
 */
function doGet(e) {
  const action = e.parameter.action;
  
  if (action === 'check') {
    const groupId = e.parameter.groupId;
    
    if (!groupId) {
      return jsonResponse({ error: 'groupId is required' }, 400);
    }
    
    const confirmed = isGroupConfirmed(groupId);
    return jsonResponse({ confirmed });
  }
  
  return jsonResponse({ error: 'Unknown action' }, 400);
}

/**
 * Handler para requisições POST
 * Body: RSVPPayload (JSON)
 * Retorna: { success: boolean, error?: string }
 */
function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    
    // Validação básica
    if (!payload.groupId || !payload.familyName || !payload.confirmed) {
      return jsonResponse({ success: false, error: 'Invalid payload' }, 400);
    }
    
    // Anti-duplicata: verifica se já confirmou
    if (isGroupConfirmed(payload.groupId)) {
      return jsonResponse({ success: false, error: 'already_confirmed' });
    }
    
    // Grava na planilha
    saveRSVP(payload);
    
    return jsonResponse({ success: true });
    
  } catch (error) {
    return jsonResponse({ success: false, error: error.message }, 500);
  }
}

/**
 * Verifica se um groupId já foi confirmado na planilha
 */
function isGroupConfirmed(groupId) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  
  // Começa do índice 1 para pular o header
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === groupId) {
      return true;
    }
  }
  
  return false;
}

/**
 * Grava o RSVP na planilha
 * Uma linha por membro da família
 */
function saveRSVP(payload) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  const timestamp = new Date().toISOString();
  
  payload.confirmed.forEach(member => {
    sheet.appendRow([
      payload.groupId,           // A: groupId
      payload.familyName,        // B: familyName
      member.name,               // C: memberName
      member.attending,          // D: attending (TRUE/FALSE)
      timestamp,                 // E: confirmedAt
      payload.confirmedBy        // F: confirmedBy
    ]);
  });
}

/**
 * Helper: retorna resposta JSON com CORS habilitado
 */
function jsonResponse(data, statusCode) {
  const output = ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
  
  return output;
}
```

---

## Estrutura da Planilha Final

### Aba: `rsvp`

| groupId | familyName | memberName | attending | confirmedAt | confirmedBy |
|---------|------------|------------|-----------|-------------|-------------|
| familia-silva | Família Silva | João Silva | TRUE | 2026-06-01T14:32:00Z | João Silva |
| familia-silva | Família Silva | Maria Silva | TRUE | 2026-06-01T14:32:00Z | João Silva |
| familia-silva | Família Silva | Pedro Silva | FALSE | 2026-06-01T14:32:00Z | João Silva |
| familia-santos | Família Santos | Ana Santos | TRUE | 2026-06-01T15:10:00Z | Ana Santos |

### Aba sugerida: `resumo` (opcional, fórmulas)

| Família | Total | Confirmados | Ausentes |
|---------|-------|-------------|---------|
| =UNIQUE(rsvp!B2:B) | =COUNTIF(rsvp!B:B,A2) | =COUNTIFS(rsvp!B:B,A2,rsvp!D:D,TRUE) | =COUNTIFS(rsvp!B:B,A2,rsvp!D:D,FALSE) |

---

## Integração no Next.js

### Variável de Ambiente

```bash
# .env.local
NEXT_PUBLIC_APPS_SCRIPT_URL=https://script.google.com/macros/s/SEU_ID/exec
```

### Cliente (`lib/sheets.ts`)

```typescript
const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL!;

export type RSVPMember = {
  name: string;
  attending: boolean;
};

export type RSVPPayload = {
  groupId: string;
  familyName: string;
  confirmed: RSVPMember[];
  confirmedBy: string;
  timestamp: string;
};

/**
 * Verifica se um grupo já confirmou presença na planilha
 */
export async function checkIfConfirmed(groupId: string): Promise<boolean> {
  try {
    const url = `${APPS_SCRIPT_URL}?action=check&groupId=${encodeURIComponent(groupId)}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.confirmed === true;
  } catch {
    // Em caso de erro de rede, assume não confirmado (melhor UX)
    return false;
  }
}

/**
 * Envia a confirmação de presença para a planilha
 */
export async function submitRSVP(payload: RSVPPayload): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' }, // Apps Script exige text/plain para CORS
      body: JSON.stringify(payload),
    });
    
    const data = await res.json();
    return data;
  } catch (error) {
    return { success: false, error: 'network_error' };
  }
}
```

> **Atenção:** Apps Script não suporta `Content-Type: application/json` cross-origin.
> Use `Content-Type: text/plain` no fetch — o `JSON.parse(e.postData.contents)` no script funciona normalmente.

---

## Troubleshooting

### "The script does not have permission"
→ Redeleploy: certifique-se que "Execute as: Me" e "Who has access: Anyone"

### CORS error no browser
→ Confirmar que o fetch usa `Content-Type: text/plain` (não `application/json`)
→ Apps Script retorna CORS headers automaticamente para GET; POST via `no-cors` pode ser necessário

### Dados não aparecem na planilha
→ Verificar se o `SPREADSHEET_ID` está correto
→ Verificar se o nome da aba é exatamente `rsvp`
→ Testar o endpoint diretamente no browser (GET check)

### "already_confirmed" retornado erroneamente
→ Verificar se há linha duplicada na planilha com o mesmo groupId
→ Limpar manualmente e retestar
