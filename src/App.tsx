import { useState } from 'react';
import TextboxComponent from './components/TextboxComponent';
import IndexedDBComponent from './components/IndexedDBComponent';
import SaveListComponent from './components/SaveListComponent';
import { useLiveQuery } from 'dexie-react-hooks';
import indexedDBRepository from './db/indexed-db.repository';
import './App.css';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const initText = useLiveQuery(() =>
    indexedDBRepository.getText().then(text => {
      setLoading(false);
      return text;
    })
  );

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <TextboxComponent initText={initText} />
      )}
      <SaveListComponent />
      <IndexedDBComponent />
    </>
  );
};

export default App;
