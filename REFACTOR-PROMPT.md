# Refactor Prompt — Colar no Claude CLI (VS Code)

Cole o conteúdo abaixo como prompt no Claude Code:

---

```
Refatore TODOS os componentes .tsx em /components e /app para seguir padrões modernos de React + Tailwind + shadcn/ui. NÃO altere design visual, lógica, nem comportamento. Apenas melhore legibilidade e consistência.

Regras obrigatórias:

1. HTML ENTITIES → CARACTERES UTF-8
   Trocar TODAS as HTML entities por caracteres normais em todos os arquivos .tsx:
   - &#227; → ã
   - &#231; → ç
   - &#225; → á
   - &#233; → é
   - &#237; → í
   - &#244; → ô
   - &#250; → ú
   - &#201; → É
   - &#245; → õ
   - &#10022; → ✦  (ou usar &bull; se preferir manter editorial)
   - &amp; → &
   - &#8230; → …
   - &#183; → ·
   Isso vale para TODOS os componentes, sem exceção.

2. INLINE STYLES → CLASSES TAILWIND
   O globals.css já tem @theme inline mapeando as CSS vars para Tailwind. Usar as classes:
   - style={{ color: 'var(--color-ink)' }}         → className="text-ink"
   - style={{ color: 'var(--color-ink-muted)' }}    → className="text-ink-muted"
   - style={{ color: 'var(--color-paper)' }}        → className="text-paper"
   - style={{ backgroundColor: 'var(--color-ink)' }}          → className="bg-ink"
   - style={{ backgroundColor: 'var(--color-paper-dark)' }}   → className="bg-paper-dark"
   - style={{ backgroundColor: 'var(--color-terracota)' }}    → className="bg-terracota"
   - style={{ fontFamily: 'var(--font-playfair)...' }}  → className="font-playfair"
   - style={{ fontFamily: 'var(--font-im-fell)...' }}   → className="font-im-fell"
   - style={{ fontFamily: 'var(--font-cloister)...' }}  → className="font-cloister"
   - style={{ border: '...' }} com var(--color-border)  → className="border-border"
   - style={{ boxShadow: 'var(--shadow-card)' }}        → manter no style (Tailwind não mapeia custom shadows)

   ELIMINAR o atributo style={{}} sempre que possível. Se sobrar apenas boxShadow ou background-image que não tem classe Tailwind equivalente, pode manter no style.

3. TIPAGEM — EXTRAIR INTERFACES
   Para cada componente que recebe props inline (ex: { deadline }: { deadline: string | null }):
   - Criar uma interface nomeada: interface HeroProps { deadline: string | null }
   - Usar: export default function Hero({ deadline }: HeroProps)
   Não criar arquivo separado de types; manter a interface no mesmo arquivo, acima do componente.

4. MANTER INTACTO:
   - Toda a lógica de negócio (SearchSection, sheets.ts, storage.ts, guests.ts)
   - Estrutura de pastas (não mover arquivos)
   - Classes CSS do globals.css (.divider-editorial, .btn-primary, .input-editorial, etc.)
   - Design visual — o resultado renderizado deve ser IDÊNTICO

5. ORDEM DE EXECUÇÃO:
   - Processar um arquivo por vez
   - Após cada arquivo, rodar `npm run lint` e corrigir erros
   - Ao final, rodar `npm run build` para garantir zero erros

Arquivos para refatorar (nesta ordem):
1. components/Masthead.tsx
2. components/Hero.tsx
3. components/Countdown.tsx
4. components/LilyDivider.tsx
5. components/Footer.tsx
6. components/FamilyCard.tsx
7. components/SearchSection.tsx
8. components/StateSuccess.tsx
9. components/StateAlreadyConfirmed.tsx
10. components/StateDeadlinePassed.tsx
11. components/StateNetworkError.tsx
12. components/StateNotFound.tsx
13. app/layout.tsx
14. app/page.tsx
```
