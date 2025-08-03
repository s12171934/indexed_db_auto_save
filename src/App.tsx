import TextboxComponent from './components/TextboxComponent';
import IndexedDBComponent from './components/IndexedDBComponent';
import AutoSaveComponent from './components/AutoSaveComponent';
import './App.css';

const App: React.FC = () => {
  return (
    <>
      <TextboxComponent />
      <IndexedDBComponent />
      <AutoSaveComponent />
    </>
  );
};

export default App;
