# Landing Page Spec — The Wedding Post

> Especificação estrutural do site de RSVP. Sem copy/textos — apenas estrutura, objetivo e diretrizes de layout.

---

## Princípios do Design

1. **Jornal impresso editorial** — colunas, tipografia serifada, textura de papel
2. **Mobile-first** — o convidado típico acessa pelo celular
3. **Um objetivo** — confirmar presença. Tudo leva a esse CTA
4. **Elegância atemporal** — o site é parte da experiência do casamento

---

## Estrutura das Seções

### 1. MASTHEAD (Header do Jornal)

**Objetivo:** Estabelecer imediatamente o visual de jornal impresso e o nome do evento.

**Elementos:**
- Nome do "jornal": "THE WEDDING POST" em tipografia all-caps serifada, centralizado
- Linha decorativa dupla acima e abaixo (estilo jornal clássico)
- Data da edição: "21 de Novembro de 2026" — estilo data de jornal
- Elemento decorativo: pequeno ornamento central (florzinha, losango)
- Sem navbar — este não é um site de navegação

**Layout:**
- Full-width, centralizado
- Fundo: creme/sépia `#f5f0e8`
- Texto: preto `#1a1a1a`
- Linha decorativa em terracota `#c4683a`
- Padding generoso acima e abaixo

**Mobile:** Mesmo layout, fontes menores

---

### 2. HERO MANCHETE

**Objetivo:** Comunicar o evento principal com impacto — estilo manchete de capa de jornal.

**Elementos:**
- Headline principal (H1): Nome completo do casal — tipografia Playfair Display grande e bold
- Subtítulo editorial: local da cerimônia — Igreja Matriz Nossa Senhora da Saúde, Lagoa Santa
- Divisor ornamental com lírios laranjas (SVG ou ilustração) — full-width
- Layout de 3 colunas (estilo capa de jornal):
  - Coluna esquerda: foto dos noivos #1 (vertical, crop quadrado ou retrato)
  - Coluna central: texto principal + chamada para confirmação
  - Coluna direita: foto dos noivos #2 (vertical)
- Badge/etiqueta: "SAVE THE DATE" em caixas altas, estilo carimbo ou etiqueta
- CTA primário: botão "Confirmar Presença" — ancora para a seção de busca

**Layout:**
- Grid 3 colunas (col central maior: 50%, laterais 25% cada)
- Mobile: stack vertical — foto 1 → título → CTA → foto 2
- Fotos com borda sutil e sombra leve (estilo foto impressa)
- Fundo: creme `#f5f0e8`

---

### 3. DIVISOR EDITORIAL

**Objetivo:** Transição visual entre o hero informativo e a seção de ação.

**Elementos:**
- Faixa full-width em terracota `#c4683a` ou preto `#1a1a1a`
- Texto centralizado em tipografia serifada itálica (ex: "Confirme sua presença abaixo")
- Ícone ornamental (flor de lírio) ao centro

**Layout:**
- Altura: 48-64px
- Texto pequeno, elegante

---

### 4. SEÇÃO DE BUSCA (Formulário Principal)

**Objetivo:** Ação central do site — o convidado encontra seu nome aqui.

**Elementos:**
- Headline de instrução (H2): instrução clara sobre o que fazer
- Campo de input: texto, large, centralizado, com ícone de lupa
- Placeholder descritivo
- Resultado da busca aparece abaixo do campo (sem recarregar página)

**Layout:**
- Centralizado, largura máxima de 560px
- Fundo levemente diferenciado do hero (pode usar fundo branco `#ffffff` ou manter creme)
- Input com borda terracota no focus
- Espaçamento generoso
- Mobile: full-width com padding lateral

**Estados do input:**
- Default: campo vazio com placeholder
- Typing: resultados aparecem dinamicamente (ou ao pressionar Enter/botão)
- Loading: skeleton ou spinner elegante

---

### 5. LISTA DE FAMÍLIA (Estado após busca)

**Objetivo:** Mostrar os membros do grupo para confirmação individual.

**Elementos:**
- Card elegante com borda `#c4683a`
- Header do card: nome do grupo/família em tipografia serifada bold
- Lista de membros com checkbox estilizado para cada um
- Checkboxes marcados por padrão (todos vão)
- Legenda: instrução para desmarcar quem não vai
- Botão CTA: "Confirmar Presença" — full-width no mobile, fixed-width no desktop
- Loading state no botão durante o POST

**Layout:**
- Card centralizado, mesma largura máxima do input (560px)
- Cada membro: linha com checkbox + nome
- Separador sutil entre membros
- Botão com cor terracota `#c4683a`, texto branco
- Hover: escurece levemente
- Mobile: espaçamento de toque adequado (min 44px por linha)

---

### 6. TELAS DE ESTADO (Substituem a Lista de Família)

#### 6A. Sucesso

**Objetivo:** Confirmar visualmente que deu certo — momento de celebração.

**Elementos:**
- Ícone/ilustração celebratória (lírio laranja ou coração estilizado editorial)
- Headline de sucesso: mensagem personalizada com nome da família
- Texto complementar: informações práticas (data, local)
- Ornamento decorativo

**Layout:**
- Card centralizado, mesmo estilo
- Fundo levemente diferente (bege mais quente) ou bordas terracota mais fortes
- Sem botão de ação adicional

#### 6B. Já Confirmado

**Objetivo:** Informar gentilmente sem parecer erro.

**Elementos:**
- Ícone: checkmark estilizado editorial
- Headline: mensagem positiva de confirmação já recebida
- Texto: data e local do casamento como lembrete

**Layout:** Mesmo estilo do sucesso, paleta mais suave

#### 6C. Não Encontrado

**Objetivo:** Não deixar o convidado perdido.

**Elementos:**
- Headline: mensagem amigável ("Não encontramos seu nome")
- Instrução: pedir para tentar variação do nome
- Contato dos noivos (WhatsApp ou e-mail) como fallback

**Layout:** Card centralizado, sem elementos alarmantes — tom caloroso

---

### 7. RODAPÉ EDITORIAL

**Objetivo:** Fechar o jornal com elegância. Informações mínimas.

**Elementos:**
- Linha decorativa dupla (mesma do masthead)
- "THE WEDDING POST" em pequeno, centralizado
- Data do casamento
- Mensagem opcional dos noivos (1 linha, itálico)
- Sem links de navegação

**Layout:**
- Padding generoso
- Fundo: mesmo creme do hero
- Texto: bege escuro `#8c7355`
- Ornamento floral pequeno centralizado

---

## Elementos Decorativos Recorrentes

### Flores de Lírio
- Usar como: divisores de seção, cantos do masthead, elemento no CTA de sucesso
- Estilo: ilustração vetorial/SVG, traço fino, cor laranja lírio `#e8834a`
- NÃO usar como fundo — sempre elemento pontual

### Linhas e Ornamentos
- Linhas duplas horizontais para separar seções (estilo jornal)
- Ornamentos tipográficos: ❧ ✦ ◆ — em terracota
- Bordas de card: 1px sólida em terracota com corner radius mínimo (2-4px)

### Textura de Papel
- CSS `background-image` com noise/grain sutil no body
- Opacity baixa (5-10%) para não interferir na leitura
- Alternativa: usar cor de fundo ligeiramente não-uniforme

---

## Hierarquia de CTAs

1. **Primário:** "Confirmar Presença" (botão terracota sólido)
2. **Secundário:** "Confirmar Presença" no hero (ancora para busca)
3. **Fallback:** Contato dos noivos (apenas na tela "não encontrado")

---

## Checklist Pré-Launch

- [ ] Layout 3 colunas do hero testado em 375px, 390px, 414px (iPhones comuns)
- [ ] Checkboxes acessíveis (área de toque ≥ 44px)
- [ ] Fontes carregadas (Google Fonts com display=swap)
- [ ] Fotos otimizadas (< 200kb cada, WebP)
- [ ] Estados de loading visíveis (não fica em branco durante fetch)
- [ ] Telas de erro testadas (desconectar rede, forçar grupo não encontrado)
- [ ] PWA manifest configurado
- [ ] Meta tags OG para compartilhamento bonito no WhatsApp
