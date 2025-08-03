import TextboxComponent from './components/TextboxComponent';
import IndexedDBComponent from './components/IndexedDBComponent';
import AutoSaveComponent from './components/AutoSaveComponent';
import SaveListComponent from './components/SaveListComponent';
import './App.css';

const App: React.FC = () => {
  return (
    <>
      <TextboxComponent />
      <SaveListComponent />
      <IndexedDBComponent />
    </>
  );
};

export default App;
