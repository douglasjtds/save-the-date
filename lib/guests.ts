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
  minMatchCharLength: 2,
  getFn: (obj, path) => {
    const value = Fuse.config.getFn(obj, path);
    if (Array.isArray(value)) {
      return value.map((v) => stripAccents(String(v)));
    }
    return typeof value === 'string' ? stripAccents(value) : value;
  },
};

export function searchGuests(query: string, groups: GuestGroup[]): GuestGroup[] {
  if (!query || query.length < 2) return [];
  const fuse = new Fuse(groups, FUSE_OPTIONS);
  return fuse
    .search(stripAccents(query))
    .filter((r) => (r.score ?? 1) < 0.4)
    .map((r) => r.item)
    .slice(0, 5);
}
