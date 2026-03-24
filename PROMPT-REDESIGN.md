# Prompt para Redesign Visual — The Wedding Post

Cole este prompt no Claude CLI (VS Code):

---

## O Prompt

```
Preciso refazer o design visual do site "The Wedding Post" (save-the-date / RSVP do casamento). O layout e a lógica de funcionamento já estão implementados — o que quero é um redesign visual completo dos componentes existentes, sem alterar a lógica de negócio (busca, RSVP, integração com Google Sheets).

## Contexto e Referências

1. **Arquivo de inspiração principal:** `inspiration/aurav2.html` — abra e estude este arquivo com atenção. Ele é um protótipo HTML estático que captura exatamente o estilo visual que eu quero. Os pontos que mais gostei nele:
   - Layout em 3 colunas (25% foto | 50% conteúdo central | 25% foto) no desktop, com stack vertical no mobile
   - Masthead integrado ao conteúdo central (não separado como header fixo)
   - Fotos com tratamento editorial: `filter: sepia(20%) contrast(110%) grayscale(100%)`, borda de 2px, padding de 4px, leve rotação (rotate[-1deg] e rotate[2deg]), hover que remove a rotação
   - Card do RSVP com fundo `#ede6d6`, borda interna decorativa (absolute border dentro do card), e ornamento de flores nos cantos
   - Badge "Save The Date" em fundo preto com texto creme
   - Letra capitular (drop cap) no primeiro parágrafo do texto editorial
   - Ornamento floral `❧` como divisor entre o texto e o formulário
   - Tipografia toda serifada: Playfair Display para headings, IM Fell English para corpo
   - Background com textura de noise SVG + padrão sutil de folhas em opacidade 0.03

2. **Arquivo secundário de inspiração:** `inspiration/aurav1.html` — tem um layout diferente (2 colunas) mas alguns elementos interessantes como os cantos decorativos nas fotos e a shadow editorial `6px_6px_0px_0px`.

3. **Design guidelines obrigatórias:** Leia `docs/DESIGN-GUIDELINES.md` antes de fazer qualquer alteração. Todas as decisões visuais devem respeitar esse documento.

4. **CLAUDE.md:** Leia o CLAUDE.md na raiz do projeto para entender a arquitetura, convenções e tipos.

## O que quero no redesign

### Layout
- Adotar o layout 3 colunas do `aurav2.html`: foto esquerda (25%) | masthead + conteúdo + RSVP no centro (50%) | foto direita (25%)
- No mobile: stack vertical — masthead, foto 1, conteúdo + RSVP, foto 2
- A foto da direita deve ter um `mt-32` (ou equivalente) no desktop para criar assimetria editorial

### Fotos
- Substituir as fotos de exemplo do Unsplash pelas fotos reais dos noivos:
  - Foto esquerda: `/images/IMG_2711.JPG`
  - Foto direita: `/images/IMG_2722.JPG`
- Aplicar o tratamento visual do aurav2: sepia + contrast + grayscale via CSS, borda preta de 2px, padding de 4px como moldura, fundo creme atrás da foto
- Leve rotação (-1deg e +2deg) com hover que volta para 0deg
- Legendas em itálico abaixo de cada foto (ex: "Retrato dos Noivos, 2024" e "Igreja Matriz N. Sra. da Saúde")
- Proporção 3:4 (portrait)

### Background com Lírios
- Adicionar um padrão SVG sutil de lírios no background do body, similar ao que o aurav2 faz com as folhas
- Opacidade muito baixa (0.02-0.04) para não competir com o conteúdo
- Usar tons de terracota (#c4683a) e verde oliva (#6b8c3e / #5a7c5a) nos lírios do SVG
- Combinar com a textura de noise que já existe

### Paleta expandida
- Manter toda a paleta existente do DESIGN-GUIDELINES.md
- Adicionar verde oliva como cor complementar: `--color-olive: #6b8c3e` (para acentos nos lírios do background e detalhes decorativos sutis)
- O verde oliva deve ser usado com muita parcimônia — apenas nos lírios do background e eventualmente no estado de sucesso junto com o verde já existente

### Card do RSVP
- Reestilizar seguindo o aurav2: fundo `var(--color-paper-dark)`, borda `1px solid var(--color-border)`, shadow editorial `var(--shadow-card)`
- Adicionar borda interna decorativa (div absolute com border a 8px das bordas)
- Botão primário em terracota (já está assim, manter)
- Os checkboxes quando marcados devem ser terracota

### Masthead
- Integrar ao fluxo do conteúdo central (não como header separado em largura total)
- Manter a estrutura de linhas duplas (divider-editorial) acima e abaixo do título
- "Edição Especial" à esquerda, "Preço: Amor" à direita (linha de cima)
- "Lagoa Santa, SP" à esquerda, "Sábado, 21 Nov 2026" à direita (linha de baixo)

### Ornamentos
- Adicionar o ornamento `❧` (hedera) como divisor entre o texto editorial e o card de RSVP
- Manter os divisores editoriais existentes (linha dupla)

## Componentes a modificar

Os componentes estão em `/components/`. Modifique apenas o JSX e as classes CSS/Tailwind — **não altere a lógica de estado, props, ou integrações**.

Componentes que precisam de mudança visual:
- `Masthead.tsx` — reestruturar para caber na coluna central
- `Hero.tsx` — implementar o layout 3 colunas com as fotos
- `LilyDivider.tsx` — substituir por ornamento `❧` estilo aurav2
- `EditorialDivider.tsx` — ajustar se necessário
- `SearchSection.tsx` — reestilizar o card do RSVP
- `FamilyCard.tsx` — reestilizar checkboxes e card interno
- `Footer.tsx` — simplificar, estilo aurav2
- `StateSuccess.tsx` — manter com verde de sucesso, adicionar ícone rotacionado como no aurav2
- `StateAlreadyConfirmed.tsx` — mesmo tratamento
- `globals.css` — adicionar tokens de cor do verde oliva, padrão de lírios no body

Componentes que provavelmente NÃO precisam de mudança:
- `Countdown.tsx` — manter como está
- `StateDeadlinePassed.tsx` — manter
- `StateNetworkError.tsx` — manter

## Regras importantes

- Leia `docs/DESIGN-GUIDELINES.md` antes de começar — é a fonte de verdade para decisões visuais
- Leia AGENTS.md — ele instrui a verificar a doc do Next.js em node_modules antes de usar APIs
- **Nunca** use fontes sans-serif
- **Nunca** use border-radius > 4px
- **Nunca** use cores vibrantes, gradientes ou sombras grandes
- **Nunca** use emojis (exceto ornamentos Unicode tipográficos como ❧, ✦, ◆)
- Mantenha `aspect-[3/4]` nas fotos (portrait)
- O site deve parecer um jornal impresso vintage, não uma landing page moderna
- Teste responsividade: o layout de 3 colunas deve colapsar graciosamente no mobile
- Após fazer as alterações, rode `npm run build` para verificar se compila sem erros
```

---

## Dicas de uso

- Cole o prompt acima inteiro no Claude CLI
- Se o Claude pedir confirmação para editar muitos arquivos, confirme
- Após a execução, rode `npm run dev` e confira o resultado no browser
- Se precisar de ajustes finos, peça iterações específicas (ex: "aumente a opacidade dos lírios no background para 0.05")
