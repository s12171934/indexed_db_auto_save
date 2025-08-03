import { useState, useEffect, useRef } from 'react';
import './SaveListComponent.css';
import indexedDBRepository from '../db/indexed-db.repository';
import { useLiveQuery } from 'dexie-react-hooks';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import ListComponent from './ListComponent';

const SaveListComponent: React.FC = () => {
  const isFirstRender = useRef(true);
  const saveList = useLiveQuery(() => indexedDBRepository.getList());
  const [serverSaveList, setServerSaveList] = useState<string[]>([]);
  const serverSaveText = useSelector(
    (state: RootState) => state.serverSave.text
  );

  useEffect(() => {
    isFirstRender.current = true;
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setServerSaveList([serverSaveText, ...serverSaveList]);
  }, [serverSaveText]);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  return (
    <div className="save-list-container">
      <ListComponent title="IndexedDB에 저장된 목록" list={saveList || []} />
      <ListComponent
        title="IndexedDB에서 서버로 전송된 목록"
        list={serverSaveList}
      />
    </div>
  );
};

export default SaveListComponent;
