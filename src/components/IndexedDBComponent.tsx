import './IndexedDBComponent.css';
import indexedDBRepository from '../db/indexed-db.repository';
import { useState } from 'react';

const IndexedDBComponent = () => {
  const [text, setText] = useState<string>('');

  const clickSave = async () => {
    await indexedDBRepository.setText(text);
  };

  const clickRemoveOldData = async () => {
    await indexedDBRepository.removeOldData();
  };

  return (
    <div className="indexeddb-container">
      <button className="indexeddb-button" onClick={clickSave}>
        Save to IndexedDB
      </button>
      <button className="indexeddb-button" onClick={clickRemoveOldData}>
        Remove old data
      </button>
      <input
        className="indexeddb-textbox"
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
      />
    </div>
  );
};

export default IndexedDBComponent;
