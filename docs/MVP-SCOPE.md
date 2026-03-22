# MVP Scope — The Wedding Post (RSVP Site)

**Data:** 22/03/2026
**Versão:** 1.0

---

## Visão do MVP

**Em uma frase:**
> Um site de RSVP para casamento com visual editorial de jornal impresso, onde convidados confirmam presença por família em segundos, e os dados vão direto para uma planilha Google.

**Hipótese principal:**
> Convidados conseguem confirmar presença de forma autônoma, sem suporte dos noivos, por um site temático simples.

**Como saberemos que funcionou:**
> 80%+ dos grupos confirmados via site, zero duplicatas na planilha, zero reclamações de "não consegui confirmar".

---

## O que ENTRA no MVP

### Must Have (P0) — Sem isso não lança

| Feature | Descrição | Critério de Done |
|---------|-----------|-----------------|
| Hero editorial | Layout jornal com nome do casal, data (21/11/2026), local (Igreja Matriz N.S. da Saúde, Lagoa Santa) e fotos | Renderiza corretamente em mobile e desktop |
| Campo de busca | Input com busca fuzzy (fuse.js) por nome próprio ou nome de família | Encontra convidados com até 2 erros de digitação |
| Lista de membros | Exibe grupo familiar com checkboxes individuais (todos marcados por padrão) | Correto rendering e interação em iOS/Android |
| Confirmação | POST para Google Apps Script com payload completo | Dado aparece na planilha em < 5 segundos |
| Anti-duplicata (planilha) | GET no Apps Script antes de salvar verifica se groupId já existe | Segundo envio não grava na planilha |
| Anti-duplicata (local) | localStorage salva grupos confirmados | Segundo acesso no mesmo dispositivo mostra tela "já confirmado" |
| Tela de sucesso | Feedback visual após confirmação | Exibe mensagem personalizada com nome da família |
| Tela "já confirmado" | Estado específico para grupo que já confirmou | Exibe mensagem amigável, não mostra formulário |
| Tela "não encontrado" | Estado para quando busca não retorna resultado | Exibe contato dos noivos |
| Parser de guests.md | Lê e interpreta o arquivo .md de convidados | Todos os grupos e membros carregados corretamente |
| PWA básico | manifest.json + meta tags para instalação | Prompts de instalação funcionam em iOS/Android |
| Mobile-first | Layout totalmente responsivo, toque fluido | Nenhum elemento cortado ou inacessível em 375px |

### Should Have (P1) — Importante, pode ir na semana seguinte

| Feature | Descrição | Por que não é P0 |
|---------|-----------|-----------------|
| Animações de transição | Fade/slide entre estados (hero → busca → sucesso) | Site funciona sem isso |
| Mensagem de erro de rede | Retry automático se Apps Script falhar | Pode ser tratado com mensagem estática |
| Scroll suave até o formulário | CTA no hero faz scroll animado até o campo de busca | Funcional sem isso |

### Could Have (P2) — Nice to have

| Feature | Descrição | Quando considerar |
|---------|-----------|-----------------|
| Notificação para os noivos | E-mail ou WhatsApp a cada confirmação via Apps Script | Pós go-live, se volume for alto |
| Contador de confirmados | "X pessoas já confirmaram" no hero | Se quiser engajamento social |
| Data limite com countdown | Timer regressivo para prazo de confirmação | Se quiserem definir prazo |

---

## O que NÃO ENTRA no MVP

| Feature | Por que não entra | Quando reconsiderar |
|---------|-----------------|-------------------|
| Painel admin para os noivos | Planilha já serve como painel | v2 white label |
| Autenticação / login | Desnecessário para uso único | v2 white label |
| Edição de confirmação | Complexidade sem ganho real para o caso de uso | v2 |
| Envio de e-mail de confirmação | Requer serviço externo (Resend, etc.) | v2 |
| White label / multi-tenant | Fora do escopo deste casamento | Produto futuro |
| Banco de dados próprio | Google Sheets resolve completamente | v2 white label |
| i18n / múltiplos idiomas | Casamento brasileiro | Nunca (para este site) |
| Lista de presentes | Produto diferente | Fora do roadmap |
| Analytics avançado | Desnecessário para uso único | v2 |

---

## Personas no MVP

### Persona Principal (foco total)
**Nome:** Convidado
**Quem é:** Qualquer pessoa convidada para o casamento, qualquer faixa etária, acessa pelo celular
**Job to be Done:** Confirmar minha presença (e da minha família) de forma rápida e sem confusão

### Personas fora do MVP
| Persona | Por que não agora |
|---------|-----------------|
| Noivo gerenciando lista | Planilha resolve; painel admin é v2 |
| Fotógrafo/fornecedor | Não é convidado no sentido de RSVP |

---

## Fluxos Críticos

### Fluxo 1: Confirmação bem-sucedida (happy path)
```
1. Convidado abre o link
2. Vê o hero editorial com informações do casamento
3. Digita seu nome ou o da família no campo de busca
4. Vê a lista de membros com checkboxes marcados
5. Desmarca quem não vai (opcional)
6. Clica em "Confirmar Presença"
7. Loading enquanto consulta a planilha
8. Dado gravado na planilha
9. Tela de sucesso exibida
10. localStorage marca o grupo como confirmado
```

### Fluxo 2: Grupo já confirmou (outro dispositivo ou segundo acesso)
```
1. Convidado abre o link
2. Digita o nome
3. Sistema faz GET no Apps Script → { confirmed: true }
4. Exibe diretamente a tela "Já recebemos sua confirmação 🎉"
5. (localStorage também é atualizado para futuras visitas)
```

### Fluxo 3: Nome não encontrado
```
1. Convidado digita o nome
2. Busca fuzzy não encontra nenhum grupo
3. Exibe: "Não encontramos seu nome na lista"
4. Exibe contato dos noivos (WhatsApp/e-mail)
```

---

## Stack do MVP

| Camada | Tecnologia | Justificativa |
|--------|------------|---------------|
| Framework | Next.js 14 (App Router) | SSG, performance, PWA |
| Styling | Tailwind + shadcn/ui | Velocidade |
| Busca | fuse.js | Fuzzy search client-side, leve |
| Dados | `data/guests.md` | Sem banco, editável facilmente |
| Integração | Google Apps Script | Gratuito, sem servidor próprio |
| Planilha | Google Sheets | Dados organizados para os noivos |
| Deploy | Vercel | Zero config, gratuito, CDN |
| Fontes | Playfair Display + IM Fell English (Google Fonts) | Visual editorial |

---

## Timeline Estimado

| Fase | Duração | Entregáveis |
|------|---------|-------------|
| Setup + estrutura base | 1 dia | Next.js, Tailwind, fontes, layout base |
| Hero + componentes visuais | 2 dias | Hero editorial, fotos, design system |
| Busca + lógica de grupos | 1 dia | Parser .md, fuse.js, checkboxes |
| Integração Apps Script | 1 dia | GET/POST, anti-duplicata, telas de estado |
| Testes + ajustes | 1 dia | Mobile testing, edge cases |
| **Total** | **~6 dias** | Site funcional pronto para go-live |

---

## Definition of Done (MVP)

O MVP está pronto quando:
- [ ] Todos os fluxos críticos testados em iOS Safari e Android Chrome
- [ ] Planilha recebendo dados corretamente
- [ ] Anti-duplicata funcionando (testado com mesmo grupo duas vezes)
- [ ] Busca fuzzy encontra nomes com erros de digitação comuns
- [ ] Site deployado na Vercel com domínio definido
- [ ] guests.md populado com a lista real de convidados
- [ ] Telas de erro funcionando (não encontrado, já confirmado, erro de rede)

---

## Hipóteses a Validar

| Hipótese | Como validar | Sucesso = |
|----------|-------------|-----------|
| Convidados encontram o próprio nome sem ajuda | Observar primeiros usos | < 5% precisam de suporte |
| Busca fuzzy cobre erros comuns de digitação | Testar com variações dos nomes reais | 95%+ dos nomes encontrados |
| Planilha organiza dados suficientemente bem | Noivos validam planilha final | Zero necessidade de limpeza manual |

---

## Regra de Ouro

> "Posso organizar as confirmações do casamento SEM essa feature?"
> Se sim → não entra no MVP.
