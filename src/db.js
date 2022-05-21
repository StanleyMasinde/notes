import Dexie from 'dexie';

export const db = new Dexie('notes');
db.version(1).stores({
  notes: '++id, title, body, createdAt'
});
