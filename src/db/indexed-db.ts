import Dexie from 'dexie';
import { environment } from '../environments/environment';

class IndexedDB extends Dexie {
  text!: Dexie.Table<{ text: string }, number>;

  constructor() {
    super(environment.database.name);
    this.version(environment.database.version).stores({
      text: '++id, text',
    });

    if (environment.devTools.enableLogging) {
      console.log('IndexedDB initialized:', environment.database.name);
    }
  }
}

export const db = new IndexedDB();
