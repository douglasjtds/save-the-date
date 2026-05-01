import Fuse, { type IFuseOptions } from 'fuse.js';

export type GuestGroup = {
  id: string;
  familyName: string;
  members: string[];
};

function stripAccents(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function slugify(text: string): string {
  return stripAccents(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function parseGuestList(markdown: string): GuestGroup[] {
  const groups: GuestGroup[] = [];
  const lines = markdown.split('\n');
  let current: GuestGroup | null = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('## ')) {
      if (current) groups.push(current);
      const familyName = trimmed.replace('## ', '').trim();
      current = { id: slugify(familyName), familyName, members: [] };
    } else if (trimmed.startsWith('- ') && current) {
      const name = trimmed.replace('- ', '').trim();
      if (name) current.members.push(name);
    }
  }
  if (current) groups.push(current);

  return groups;
}

const FUSE_OPTIONS: IFuseOptions<GuestGroup> = {
  keys: [
    { name: 'familyName', weight: 0.6 },
    { name: 'members', weight: 0.4 },
  ],
  threshold: 0.35,
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 2,
  getFn: (obj, path) => {
    const value = Fuse.config.getFn(obj, path);
    if (Array.isArray(value)) {
      return value.map((v) => stripAccents(String(v)));
    }
    return typeof value === 'string' ? stripAccents(value) : value;
  },
};

export type SearchResult = {
  group: GuestGroup;
  matchedMember: string | null;
};

function tokenize(text: string): string[] {
  return stripAccents(text).toLowerCase().split(/\s+/).filter(Boolean);
}

function exactWordMatch(query: string, groups: GuestGroup[]): SearchResult[] {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return [];

  const results: SearchResult[] = [];
  for (const group of groups) {
    let matchedMember: string | null = null;
    for (const member of group.members) {
      const memberTokens = tokenize(member);
      if (queryTokens.every((qt) => memberTokens.includes(qt))) {
        matchedMember = member;
        break;
      }
    }
    const familyTokens = tokenize(group.familyName);
    const familyMatches = queryTokens.every((qt) => familyTokens.includes(qt));

    if (matchedMember || familyMatches) {
      results.push({ group, matchedMember });
    }
  }
  return results;
}

export function searchGuests(query: string, groups: GuestGroup[]): SearchResult[] {
  if (!query || query.length < 2) return [];

  const exact = exactWordMatch(query, groups);
  if (exact.length > 0) return exact.slice(0, 5);

  const fuse = new Fuse(groups, FUSE_OPTIONS);
  return fuse
    .search(stripAccents(query))
    .filter((r) => (r.score ?? 1) < 0.4)
    .slice(0, 5)
    .map((r) => {
      const memberMatch = r.matches?.find((m) => m.key === 'members');
      const matchedMember =
        memberMatch && typeof memberMatch.refIndex === 'number'
          ? r.item.members[memberMatch.refIndex] ?? null
          : null;
      return { group: r.item, matchedMember };
    });
}
