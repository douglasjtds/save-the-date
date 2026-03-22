# The Wedding Post — RSVP Site

**Data:** 22/03/2026
**Autor:** Douglas Tertuliano
**Status:** Building

---

## 💡 Problema

**Em uma frase:**
> Confirmar presença em casamento é um processo fragmentado — mensagens no WhatsApp, ligações e formulários genéricos que não refletem a elegância do evento e não organizam automaticamente os dados.

**Contexto:**
Casamentos com centenas de convidados precisam de um controle preciso de presença. O processo tradicional via WhatsApp é caótico: o noivo precisa compilar manualmente as respostas, há duplicatas, confirmações de famílias inteiras chegam fragmentadas e o dado final nunca está organizado. Um site dedicado resolve isso com elegância e alimenta automaticamente uma planilha de controle.

---

## ✅ Solução

**Em uma frase:**
> Um site no estilo jornal impresso (save the date interativo) onde cada convidado busca seu nome, confirma presença dos membros da família individualmente, e o resultado é registrado automaticamente em uma planilha Google.

**Como funciona:**
O convidado acessa o site, digita seu nome ou o nome de sua família, vê a lista dos membros associados e marca quem vai comparecer. Ao confirmar, o sistema consulta a planilha via Google Apps Script para evitar duplicatas e, se ainda não confirmado, grava as respostas. O site bloqueia nova confirmação para aquele grupo via localStorage.

---

## 👤 Público-Alvo

**Persona principal:**
> Convidado do casamento de Iara Mello e Douglas Tertuliano — qualquer faixa etária, acessa pelo celular, não é técnico, quer confirmar em menos de 1 minuto.

**Uso único (por enquanto):**
> Site criado especificamente para este casamento. Arquitetura preparada para futura versão white label.

---

## 🎯 Proposta de Valor

**Por que este formato?**
> A experiência de confirmação é parte da experiência do casamento. Um site bonito, temático e simples eleva a percepção do evento antes mesmo do dia — e ainda organiza os dados automaticamente.

**Alternativas atuais:**
- WhatsApp (caótico, manual, sem controle)
- Google Forms genérico (sem personalidade, sem lógica de família)
- Planilha de RSVP manual (trabalhoso)

**Diferencial:**
- Visual editorial único ("The Wedding Post")
- Lógica de família — confirma grupo inteiro de uma vez
- Dado já organizado na planilha, sem trabalho manual

---

## 💰 Modelo de Negócio

**Versão atual:** Gratuito, uso pessoal único.

**Visão futura:** White label SaaS — noivos criam seu próprio site de RSVP sem código, com personalização de tema, lista de convidados e integração com planilha própria.

---

## 📊 Métricas de Sucesso

**North Star Metric:**
> % de convidados confirmados via site (vs. total da lista)

**Metas:**
- [ ] 100% dos grupos de convidados conseguem confirmar sem suporte
- [ ] Zero duplicatas na planilha final
- [ ] Taxa de confirmação via site > 80% (vs. WhatsApp)

---

## 🚀 MVP Scope

**O que entra:**
- Hero editorial com nome do casal, data e local
- Fotos dos noivos em layout jornal
- Campo de busca por nome ou família
- Lista de membros com checkboxes individuais
- Integração Google Sheets via Apps Script
- Anti-duplicata (consulta planilha + localStorage)
- PWA mobile-first

**O que NÃO entra:**
- Painel admin
- Autenticação
- White label / multi-tenant
- Banco de dados próprio
- Envio de e-mail de confirmação

---

## 🛠 Stack

| Camada | Tecnologia |
|--------|------------|
| Frontend | Next.js + shadcn/ui + Tailwind |
| Dados | Arquivo `.md` no repositório |
| Integração | Google Apps Script (endpoint) |
| Planilha | Google Sheets |
| Deploy | Vercel |

---

## ⏱ Timeline

| Marco | Prazo |
|-------|-------|
| Site funcional (MVP) | 1 semana |
| Integração Sheets completa | +3 dias |
| Testes com convidados reais | +2 dias |
| Go live | Antes de Junho/2026 |

---

## 🔗 Links

- Repo: A definir
- Planilha: A definir
- Produção: A definir

---

## 📝 Notas

- **Evento:** Casamento Iara Mello & Douglas Tertuliano
- **Data:** 21 de Novembro de 2026
- **Local:** Igreja Matriz Nossa Senhora da Saúde, Lagoa Santa
- **Visual:** Estilo jornal impresso ("The Wedding Post") — tipografia serifada, paleta creme/preto/terracota, lírios laranjas como elemento decorativo
- **Nome do site sugerido:** "The Wedding Post"
