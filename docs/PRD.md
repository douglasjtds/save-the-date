# PRD — The Wedding Post (RSVP Site)

**Autor:** Douglas Tertuliano
**Data:** 22/03/2026
**Status:** Draft

---

## Overview

Site de confirmação de presença para o casamento de Iara Mello e Douglas Tertuliano (21/11/2026). Visual no estilo jornal impresso editorial ("The Wedding Post"). O convidado busca seu nome ou família, confirma presença dos membros individualmente, e o dado é gravado automaticamente em uma planilha Google via Apps Script. Sem banco de dados próprio.

---

## Problem

### O que está acontecendo?
Confirmação de presença em casamentos é gerenciada via WhatsApp ou formulários genéricos, gerando dados fragmentados, duplicatas e trabalho manual de compilação para os noivos.

### Quem é afetado?
- **Convidados:** processo confuso, sem confirmação visual clara
- **Noivos:** compilação manual de dados, sem visão consolidada em tempo real

### Qual o custo de não resolver?
Dados inconsistentes na lista final, convites sem confirmação, logística de cerimônia e recepção prejudicada.

### Como resolvem hoje?
WhatsApp, Google Forms genérico, planilha manual.

---

## Goals

- [ ] **Goal 1:** Todos os grupos de convidados conseguem confirmar sem suporte → Métrica: 0 pedidos de ajuda técnica
- [ ] **Goal 2:** Dados limpos na planilha, sem duplicatas → Métrica: 0 entradas duplicadas
- [ ] **Goal 3:** Experiência mobile fluida em menos de 1 minuto → Métrica: tempo médio de confirmação < 60s

---

## Non-Goals

- ❌ Painel de administração para os noivos
- ❌ Autenticação/login de convidados
- ❌ Envio de e-mail de confirmação
- ❌ White label / multi-tenant (futuro)
- ❌ Banco de dados próprio
- ❌ Edição de confirmação após envio
- ❌ Lista de presentes integrada

---

## Personas

### Persona 1: Convidado Comum

> Qualquer faixa etária. Acessa pelo celular via link recebido no WhatsApp ou e-mail. Não é técnico. Quer confirmar rápido e sem confusão. Pode estar confirmando junto com esposa/filhos.

- Como convidado, quero buscar meu nome para encontrar minha família na lista
- Como convidado, quero ver todos os membros da minha família listados para confirmar quem vai e quem não vai
- Como convidado, quero receber feedback visual claro de que minha confirmação foi registrada
- Como convidado, quero conseguir fazer tudo pelo celular sem precisar dar zoom

### Persona 2: Noivo (Douglas)

> Precisa de dados organizados na planilha para planejar cerimônia e recepção. Não quer gerenciar confirmações manualmente.

- Como noivo, quero que cada confirmação seja gravada automaticamente na planilha
- Como noivo, quero evitar duplicatas sem precisar limpar os dados depois
- Como noivo, quero saber quais membros de cada família confirmaram presença individualmente

---

## Solution

### Visão Geral

Single-page app em Next.js com três estados principais:
1. **Hero / Busca** — página inicial estilo jornal com campo de busca
2. **Seleção** — lista de membros da família com checkboxes
3. **Confirmação** — tela de sucesso (ou aviso de já confirmado)

A lista de convidados vive em um arquivo `.md` no repositório. A integração com Google Sheets é feita via Google Apps Script deployado como Web App.

### Features Principais

| Feature | Descrição | Prioridade |
|---------|-----------|------------|
| Hero editorial | Layout jornal com nome do casal, data, local e fotos | Must have |
| Busca de convidado | Input com busca fuzzy por nome próprio ou nome de família | Must have |
| Lista de membros | Checkboxes individuais por membro do grupo encontrado | Must have |
| Envio de confirmação | POST para Google Apps Script com resultado | Must have |
| Anti-duplicata | Consulta GET na planilha antes de salvar + localStorage | Must have |
| Tela de sucesso | Feedback visual após confirmação bem-sucedida | Must have |
| Tela "já confirmado" | Aviso amigável se o grupo já confirmou | Must have |
| PWA instalável | manifest.json + service worker básico | Should have |
| Animações editoriais | Transições suaves entre os três estados | Could have |

### User Flow Principal

```
1. Convidado acessa o link do site
2. Vê o hero editorial (nome do casal, data, local, fotos)
3. Rola até o campo de busca (ou hero já tem o campo)
4. Digita nome próprio ou nome de família
5. Sistema filtra a lista .md e exibe o grupo encontrado
6. Convidado vê membros com checkboxes (todos marcados por padrão)
7. Desmarca quem não vai comparecer
8. Clica em "Confirmar Presença"
9. Sistema consulta planilha via GET (anti-duplicata)
   → Se já confirmado: exibe tela "Já recebemos sua confirmação"
   → Se não confirmado: faz POST com os dados
10. Exibe tela de sucesso com mensagem personalizada
11. localStorage marca o grupo como confirmado
```

### Estados de Erro

```
- Nenhum resultado encontrado → mensagem amigável + instrução para contato
- Erro de rede (Apps Script indisponível) → mensagem de erro + botão tentar novamente
- Grupo já confirmado → tela específica (não é erro, é estado esperado)
```

---

## Technical Approach

### Stack

| Camada | Tecnologia | Justificativa |
|--------|------------|---------------|
| Frontend | Next.js 14 (App Router) | Performance, SSG, PWA |
| Styling | Tailwind + shadcn/ui | Velocidade, consistência |
| Dados | Arquivo `guests.md` no repo | Sem banco, simples de editar |
| Integração | Google Apps Script (Web App) | Gratuito, sem servidor |
| Planilha | Google Sheets | Dados finais acessíveis |
| Deploy | Vercel | Zero config, gratuito |

### Estrutura de Arquivos

```
/
├── app/
│   ├── page.tsx          # Página principal (hero + busca + confirmação)
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── Hero.tsx           # Seção editorial com fotos e info do casamento
│   ├── SearchInput.tsx    # Campo de busca com fuzzy search
│   ├── FamilyGroup.tsx    # Lista de membros com checkboxes
│   └── ConfirmationScreen.tsx  # Tela de sucesso / já confirmado
├── lib/
│   ├── guests.ts          # Parser do arquivo .md
│   ├── sheets.ts          # Client para Google Apps Script
│   └── storage.ts         # Helpers de localStorage
├── data/
│   └── guests.md          # Lista de convidados
├── public/
│   ├── photos/            # Fotos dos noivos
│   └── manifest.json
└── types/
    └── index.ts
```

### Modelo de Dados

**Guest (parsed do .md):**
```typescript
type GuestGroup = {
  id: string           // slug gerado do nome do grupo
  familyName: string   // "Família Silva" ou nome do grupo
  members: string[]    // ["João Silva", "Maria Silva", "Pedro Silva"]
}
```

**Payload enviado ao Apps Script:**
```typescript
type RSVPPayload = {
  groupId: string
  familyName: string
  confirmed: { name: string; attending: boolean }[]
  timestamp: string
  confirmedBy: string  // nome do membro que preencheu
}
```

**Estrutura da planilha Google Sheets:**

| groupId | familyName | memberName | attending | confirmedAt | confirmedBy |
|---------|------------|------------|-----------|-------------|-------------|
| familia-silva | Família Silva | João Silva | TRUE | 2026-04-01T10:00:00Z | João Silva |
| familia-silva | Família Silva | Maria Silva | TRUE | 2026-04-01T10:00:00Z | João Silva |
| familia-silva | Família Silva | Pedro Silva | FALSE | 2026-04-01T10:00:00Z | João Silva |

### Anti-Duplicata — Lógica

```
1. Antes de exibir checkboxes → GET /apps-script?action=check&groupId=familia-silva
2. Apps Script verifica se groupId já existe na planilha
3. Se sim → retorna { confirmed: true }
4. Frontend exibe tela "já confirmado" e salva no localStorage
5. Se não → exibe checkboxes normalmente
6. Ao confirmar → POST com payload completo
7. Apps Script grava e retorna { success: true }
8. Frontend salva no localStorage: confirmed_familia-silva = true
```

### Google Apps Script — Endpoints

```
GET  ?action=check&groupId={id}  → { confirmed: boolean }
POST body: RSVPPayload            → { success: boolean, error?: string }
```

---

## Design Guidelines (resumo)

- Visual: Jornal impresso editorial ("The Wedding Post")
- Paleta: Creme `#f5f0e8`, Preto `#1a1a1a`, Terracota `#c4683a`, Laranja lírio `#e8834a`, Bege `#8c7355`
- Tipografia: Playfair Display (títulos) + IM Fell English (corpo)
- Flores de lírio laranja como elementos decorativos (divisores, cantos)
- Textura sutil de papel no fundo

---

## Success Metrics

| Métrica | Target | Como medir |
|---------|--------|------------|
| % grupos confirmados via site | > 80% | Planilha / total da lista |
| Duplicatas na planilha | 0 | Auditoria da planilha |
| Erros reportados por convidados | 0 | WhatsApp dos noivos |
| Tempo médio de confirmação | < 60s | (estimativa, não rastreado) |

---

## Risks & Assumptions

### Assumptions
- Convidados recebem o link pelo WhatsApp/e-mail e acessam pelo celular
- Todos os convidados estão listados no arquivo `.md` antes do go-live
- Google Apps Script fica disponível durante o período de confirmações

### Risks

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Convidado não encontra o nome | Média | Alto | Mensagem clara + contato dos noivos |
| Apps Script fora do ar | Baixa | Alto | Retry automático + mensagem de erro amigável |
| Família confirma duas vezes (dispositivos diferentes) | Média | Médio | Verificação na planilha + localStorage |
| Nome digitado com erro ortográfico | Alta | Alto | Busca fuzzy (fuse.js) com tolerância a erros |

---

## Open Questions

- [ ] Qual o número de WhatsApp para exibir em caso de erro ("não encontrei seu nome")?
- [ ] Os noivos querem receber notificação a cada confirmação (e-mail/WhatsApp)?
- [ ] Data limite para confirmação de presença?
- [ ] Precisa suportar convidados internacionais (i18n)?
