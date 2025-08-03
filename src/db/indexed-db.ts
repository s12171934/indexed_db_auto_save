import Dexie from 'dexie';

class IndexedDB extends Dexie {
  text!: Dexie.Table<{ text: string }, number>;

  constructor() {
    super('IndexedDB');
    this.version(1).stores({
      text: '++id, text',
    });
  }
}

export const db = new IndexedDB();
