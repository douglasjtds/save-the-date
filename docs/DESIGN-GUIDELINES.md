# Design Guidelines — The Wedding Post

> Diretrizes visuais para o site de RSVP do casamento de Iara Mello & Douglas Tertuliano.
> Estilo: Jornal impresso editorial. Elegante, atemporal, com personalidade.

---

## Conceito Visual

**"The Wedding Post"** — como se fosse uma edição especial de um jornal clássico do século XIX dedicada ao anúncio do casamento. Tipografia serifada pesada, layout em colunas, linhas decorativas, textura de papel e elementos florais em laranja terracota como cor de destaque.

**Referências:**
- New York Times (tipografia, masthead)
- Le Monde (layout editorial em colunas)
- Convites de casamento impressos vintage
- Pinterest: "newspaper wedding invitation"

---

## Paleta de Cores

```css
:root {
  /* Bases */
  --color-paper:      #f5f0e8;  /* Fundo principal — creme envelhecido */
  --color-paper-dark: #ede6d6;  /* Fundo alternativo — sépia mais quente */
  --color-ink:        #1a1a1a;  /* Texto principal — preto tipográfico */
  --color-ink-muted:  #8c7355;  /* Texto secundário — bege escuro */

  /* Marca */
  --color-terracota:  #c4683a;  /* Cor principal de destaque — bordas, CTAs, linhas */
  --color-lily:       #e8834a;  /* Laranja lírio — flores, acentos quentes */
  --color-lily-light: #f2a87a;  /* Lírio claro — hover, variações */

  /* Funcionais */
  --color-white:      #ffffff;
  --color-success:    #5a7c5a;  /* Verde seco para estado de sucesso */
  --color-border:     #d4c9b0;  /* Borda sutil em elementos */
}
```

**Uso das cores:**
- `--color-paper` → fundo do body e seções
- `--color-ink` → toda tipografia principal
- `--color-ink-muted` → datas, labels, texto secundário, rodapé
- `--color-terracota` → botões primários, bordas de card, linhas decorativas, masthead stripe
- `--color-lily` → flores SVG, ícones decorativos, hover states
- **NUNCA** usar cores vibrantes/saturadas — o site deve parecer impresso

---

## Tipografia

### Fontes Principais

```css
/* Google Fonts — adicionar no <head> */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=IM+Fell+English:ital@0;1&family=IM+Fell+DW+Pica:ital@0;1&display=swap');
```

| Papel | Fonte | Uso |
|-------|-------|-----|
| Display / Manchete | Playfair Display Black (900) | H1, masthead, nome do casal |
| Título de seção | Playfair Display Bold (700) | H2, H3, nomes de família |
| Corpo editorial | IM Fell English Regular | Parágrafos, instruções, textos longos |
| Itálico elegante | IM Fell English Italic | Subtítulos, datas, mensagens dos noivos |
| Labels / Caps | Playfair Display SC (small caps via font-variant) | "SAVE THE DATE", badges, labels |

### Escala Tipográfica

```css
/* Base: 16px */
--text-xs:   0.75rem;   /* 12px — notas de rodapé */
--text-sm:   0.875rem;  /* 14px — labels, datas */
--text-base: 1rem;      /* 16px — corpo de texto */
--text-lg:   1.125rem;  /* 18px — texto de destaque */
--text-xl:   1.25rem;   /* 20px — subtítulos */
--text-2xl:  1.5rem;    /* 24px — títulos de seção */
--text-3xl:  1.875rem;  /* 30px — H2 principal */
--text-4xl:  2.25rem;   /* 36px — H1 mobile */
--text-5xl:  3rem;      /* 48px — manchete desktop */
--text-6xl:  3.75rem;   /* 60px — nome do casal desktop */
```

### Regras Tipográficas

- **Letter-spacing:** títulos em caps devem ter `tracking-widest` (0.1-0.2em)
- **Line-height:** textos editoriais usam `leading-relaxed` (1.625) ou `leading-loose` (2)
- **Itálico estratégico:** datas, citações e mensagens pessoais sempre em itálico
- **NUNCA** usar fontes sans-serif no site — quebra completamente o conceito

---

## Espaçamento

```css
/* Base: 4px */
--space-1:  4px
--space-2:  8px
--space-3:  12px
--space-4:  16px
--space-5:  20px
--space-6:  24px
--space-8:  32px
--space-10: 40px
--space-12: 48px
--space-16: 64px
--space-20: 80px
--space-24: 96px
```

**Padding de seção:** mínimo `--space-12` (48px) vertical em mobile, `--space-20` (80px) em desktop.

---

## Border Radius

```css
--radius-none: 0px      /* Padrão para elementos editoriais (cards, inputs, botões) */
--radius-sm:   2px      /* Exceção para badges/etiquetas */
--radius-md:   4px      /* Máximo absoluto — usar raramente */
```

**Regra:** o estilo jornal impresso é sharp. Sem border-radius arredondado. Cards e botões têm cantos retos ou quase retos.

---

## Sombras

```css
--shadow-photo: 2px 2px 8px rgba(26, 26, 26, 0.15);   /* Fotos — sombra de foto impressa */
--shadow-card:  1px 1px 4px rgba(26, 26, 26, 0.08);   /* Cards — elevação mínima */
--shadow-none:  none;
```

**Regra:** sombras discretas, como numa folha impressa em cima de outra. Nunca sombras coloridas ou muito difusas.

---

## Elementos Decorativos

### Linhas de Separação (Reglets)

```css
/* Linha dupla estilo jornal */
.divider-editorial {
  border-top: 3px solid var(--color-ink);
  border-bottom: 1px solid var(--color-ink);
  padding-bottom: 2px;
  /* Espaço de 2px entre as linhas via padding */
}

/* Linha simples terracota */
.divider-accent {
  border-top: 1px solid var(--color-terracota);
}
```

### Ornamentos Tipográficos

Usar caracteres Unicode para ornamentos inline:
- `❧` — hedera/ivy leaf (entre seções)
- `✦` — quatro pontas (listas, bullets)
- `◆` — diamante (separadores inline)
- `—` — em dash (datas, separadores de texto)

### Flores de Lírio

- Formato: SVG inline ou importado como componente React
- Cor: `var(--color-lily)` #e8834a
- Stroke: traço fino (1-1.5px), não preenchimento sólido
- Tamanho: pequeno como ornamento (24-32px), médio como divisor (48-64px)
- Posicionamento: sempre horizontal ao centro como divisor ou nos cantos do masthead

### Textura de Papel

```css
body {
  background-color: var(--color-paper);
  background-image: url("data:image/svg+xml,..."); /* noise SVG sutil */
  /* Ou via pseudo-elemento com opacity 0.03-0.05 */
}
```

---

## Componentes shadcn/ui — Guia de Uso

| Componente shadcn | Uso | Personalização necessária |
|------------------|-----|--------------------------|
| `Input` | Campo de busca de nome | Borda terracota no focus, fonte serifada, radius 0 |
| `Button` | CTA "Confirmar Presença" | Cor terracota, fonte serifada, radius 0, all-caps |
| `Checkbox` | Membros da família | Cor terracota quando checked, tamanho maior |
| `Card` | Container do grupo familiar | Borda 1px terracota, sem shadow exagerada, radius 0-2px |
| `Badge` | "SAVE THE DATE" | Fundo terracota ou outline, all-caps, serifada |
| `Separator` | Divisores entre membros | Cor `--color-border` |
| `Skeleton` | Loading states | Cor `--color-border`, animação sutil |

**Customização global no `globals.css`:**
```css
/* Override shadcn defaults para o tema editorial */
.btn, [data-slot="button"] {
  border-radius: var(--radius-none);
  font-family: 'Playfair Display', serif;
  letter-spacing: 0.05em;
}

input, [data-slot="input"] {
  border-radius: var(--radius-none);
  font-family: 'IM Fell English', serif;
  border-color: var(--color-border);
}

input:focus, [data-slot="input"]:focus {
  border-color: var(--color-terracota);
  box-shadow: 0 0 0 1px var(--color-terracota);
}
```

---

## Layout

### Grid do Hero (Desktop)

```
|  25%  |        50%        |  25%  |
| foto1 | masthead + título | foto2 |
|       |     + CTA         |       |
```

### Grid do Hero (Mobile)

```
| masthead + título |
|      foto 1       |
|   instrução CTA   |
|      foto 2       |
```

### Largura Máxima

```css
--max-width-content: 720px;   /* Texto e formulários */
--max-width-hero: 960px;      /* Layout 3 colunas do hero */
--max-width-site: 1200px;     /* Container geral */
```

---

## Animações

```css
/* Transição entre estados (hero → busca → sucesso) */
.state-enter {
  animation: fadeInUp 0.4s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Loading button */
.btn-loading {
  position: relative;
  color: transparent;
}
.btn-loading::after {
  content: '';
  /* spinner em branco centralizado */
}
```

**Regra:** animações discretas e rápidas (300-400ms). O site é elegante, não uma landing page de startup. Sem parallax, sem scroll animations elaboradas.

---

## Imagens dos Noivos

- **Formato:** WebP, máximo 200kb cada
- **Proporção:** Retrato (3:4) ou quadrado (1:1) — nunca paisagem
- **Estilo:** Preto e branco ou levemente dessaturado combina melhor com o tema jornal
- **Tratamento CSS:** `filter: sepia(15%) contrast(105%)` para integrar ao tema
- **Borda:** 2px solid `var(--color-ink)` + `box-shadow: var(--shadow-photo)`

---

## Do & Don't

### ✅ Do
- Usar tipografia serifada em TUDO
- Manter o fundo creme em toda a página
- Usar linhas decorativas duplas para separar seções
- Tratar fotos com leve sépia
- Usar ornamentos tipográficos Unicode

### ❌ Don't
- Usar Inter, Roboto ou qualquer fonte sans-serif
- Usar border-radius > 4px em qualquer elemento
- Usar cores vibrantes ou gradientes
- Usar shadows grandes ou coloridas
- Colocar flores em backgrounds (apenas como elementos pontuais)
- Usar emojis (quebra o estilo editorial)
