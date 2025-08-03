import './IndexedDBComponent.css';
import { db } from '../db/indexed-db';
import { useLiveQuery } from 'dexie-react-hooks';
import { useState } from 'react';

const IndexedDBComponent = () => {
  const [text, setText] = useState<string>('');
  const indexedDBText = useLiveQuery(() =>
    db.text.toArray().then(res => res[res.length - 1])
  );

  const clickSave = async () => {
    db.text.add({ text });
  };

  return (
    <div className="indexeddb-container">
      <button className="indexeddb-button" onClick={clickSave}>
        Save to IndexedDB
      </button>
      <input
        className="indexeddb-textbox"
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <p className="indexeddb-text">{indexedDBText?.text}</p>
    </div>
  );
};

export default IndexedDBComponent;
