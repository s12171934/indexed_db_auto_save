import { db } from './indexed-db';
import { environment } from '../environments/environment';

interface IndexedDBRepository {
  getText: () => Promise<string>;
  setText: (text: string) => Promise<void>;
  getList: () => Promise<string[]>;
  removeOldData: () => Promise<void>;
}

const indexedDBRepository: IndexedDBRepository = {
  getText: async () => {
    const text = await db.text.toArray().then(res => res[res.length - 1]);
    // 빈 문자열이어도 정상적으로 반환
    return text?.text ?? '';
  },
  setText: async (text: string) => {
    await db.text.add({ text });
  },
  getList: async () => {
    const list = await db.text.toArray();
    return list.map(item => item.text).reverse();
  },
  removeOldData: async (maxSaves: number = environment.database.maxSaves) => {
    const list = await db.text.toArray();
    const oldData = list.slice(0, list.length - maxSaves);
    await db.text.bulkDelete(oldData.map(item => (item as any).id));
  },
};

export default indexedDBRepository;
