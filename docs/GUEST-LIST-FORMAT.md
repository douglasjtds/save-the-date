# Guest List Format — guests.md

> Especificação do formato do arquivo de convidados e como o sistema o interpreta.

---

## Localização

```
/data/guests.md
```

Este arquivo fica no repositório. Para adicionar ou editar convidados, basta editar o arquivo e fazer deploy novamente (ou editar direto no GitHub).

---

## Formato do Arquivo

```markdown
## Família Silva
- João Silva
- Maria Silva
- Pedro Silva

## Família Santos
- Ana Santos
- Carlos Santos

## Marcos Oliveira
- Marcos Oliveira

## Amigos da Faculdade
- Fernanda Lima
- Rafael Costa
- Juliana Mendes
```

### Regras do Formato

| Elemento | Sintaxe | Obrigatório | Notas |
|----------|---------|-------------|-------|
| Nome do grupo | `## Nome do Grupo` | Sim | H2 markdown — pode ser "Família X", nome próprio, ou grupo temático |
| Membro | `- Nome Completo` | Sim (mínimo 1) | Lista markdown com hífen |
| Linha em branco | Entre grupos | Recomendado | Para legibilidade — o parser ignora linhas vazias |
| Comentários | `<!-- comentário -->` | Não | Ignorados pelo parser |

### Casos de Uso

```markdown
## Família Tertuliano            ← Grupo familiar (múltiplos membros)
- Douglas Tertuliano
- Iara Mello
- José Tertuliano

## Rodrigo Almeida               ← Pessoa sozinha (1 membro)
- Rodrigo Almeida

## Mesa dos Noivos                ← Grupo temático
- Padrinho 1
- Padrinha 1
- Padrinho 2
- Padrinha 2

## Família Costa e Família Melo  ← Famílias juntas no mesmo grupo
- Paulo Costa
- Beatriz Costa
- Henrique Melo
- Suzana Melo
```

---

## Como o Sistema Parseia o Arquivo

### Parser (`lib/guests.ts`)

```typescript
export type GuestGroup = {
  id: string;        // slug gerado automaticamente
  familyName: string; // nome original do grupo
  members: string[]; // lista de nomes
};

/**
 * Parseia o arquivo guests.md e retorna array de GuestGroup
 */
export function parseGuestList(markdown: string): GuestGroup[] {
  const groups: GuestGroup[] = [];
  const lines = markdown.split('\n');
  
  let currentGroup: GuestGroup | null = null;
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    // Nova família/grupo: linha começando com "## "
    if (trimmed.startsWith('## ')) {
      if (currentGroup) {
        groups.push(currentGroup);
      }
      const familyName = trimmed.replace('## ', '').trim();
      currentGroup = {
        id: slugify(familyName),
        familyName,
        members: [],
      };
    }
    
    // Membro: linha começando com "- "
    else if (trimmed.startsWith('- ') && currentGroup) {
      const memberName = trimmed.replace('- ', '').trim();
      if (memberName) {
        currentGroup.members.push(memberName);
      }
    }
  }
  
  // Adiciona o último grupo
  if (currentGroup) {
    groups.push(currentGroup);
  }
  
  return groups;
}

/**
 * Gera um slug único a partir do nome do grupo
 * "Família Silva" → "familia-silva"
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove acentos
    .replace(/[^a-z0-9\s-]/g, '')    // remove caracteres especiais
    .replace(/\s+/g, '-')            // espaços → hífens
    .replace(/-+/g, '-')             // hífens duplos → simples
    .trim();
}
```

### Busca com Fuse.js

```typescript
import Fuse from 'fuse.js';

const FUSE_OPTIONS = {
  // Busca em nome do grupo E em nomes dos membros
  keys: [
    { name: 'familyName', weight: 0.6 },
    { name: 'members', weight: 0.4 },
  ],
  threshold: 0.35,     // 0 = perfeito, 1 = qualquer coisa — 0.35 é tolerante
  includeScore: true,
  minMatchCharLength: 2,
};

export function searchGuests(query: string, groups: GuestGroup[]): GuestGroup[] {
  if (!query || query.length < 2) return [];
  
  const fuse = new Fuse(groups, FUSE_OPTIONS);
  const results = fuse.search(query);
  
  return results
    .filter(r => (r.score ?? 1) < 0.4)  // filtra resultados muito distantes
    .map(r => r.item)
    .slice(0, 5);  // máximo 5 resultados
}
```

### Carregamento no Next.js

```typescript
// app/page.tsx ou lib/guests.ts
import fs from 'fs';
import path from 'path';
import { parseGuestList } from '@/lib/guests';

export function loadGuests() {
  const filePath = path.join(process.cwd(), 'data', 'guests.md');
  const content = fs.readFileSync(filePath, 'utf-8');
  return parseGuestList(content);
}

// No componente (Server Component):
// const guests = loadGuests();
// Passa como prop para o Client Component de busca
```

---

## localStorage — Controle de Confirmação

```typescript
// lib/storage.ts

const STORAGE_PREFIX = 'wedding_rsvp_';

export function markGroupConfirmed(groupId: string): void {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${groupId}`, 'confirmed');
  } catch {
    // localStorage pode estar bloqueado em alguns browsers — falha silenciosa
  }
}

export function isGroupConfirmedLocally(groupId: string): boolean {
  try {
    return localStorage.getItem(`${STORAGE_PREFIX}${groupId}`) === 'confirmed';
  } catch {
    return false;
  }
}
```

---

## Exemplo Completo: `data/guests.md`

```markdown
<!-- Casamento Iara Mello & Douglas Tertuliano — 21/11/2026 -->
<!-- Atualizado em: 22/03/2026 -->

## Família Tertuliano
- Douglas Tertuliano
- José Tertuliano
- Ana Tertuliano

## Família Mello
- Iara Mello
- Marcos Mello
- Carla Mello

## Rodrigo Almeida
- Rodrigo Almeida

## Família Pereira
- Carlos Pereira
- Sônia Pereira
- Lucas Pereira
- Amanda Pereira

<!-- Adicionar mais famílias seguindo o mesmo padrão -->
```

---

## Validações Recomendadas

Antes do go-live, verificar o arquivo `guests.md`:

- [ ] Nenhum grupo sem membros
- [ ] Nomes com acentos escritos corretamente
- [ ] Nenhuma linha em branco dentro de um grupo (entre membros)
- [ ] Todos os convidados mapeados para algum grupo
- [ ] IDs únicos (rodar `parseGuestList` e verificar se há slugs duplicados)
- [ ] Busca testada com variações comuns (sem acento, abreviado, só primeiro nome)
