import { useState } from 'react';
import './SaveListComponent.css';
import indexedDBRepository from '../db/indexed-db.repository';
import { useLiveQuery } from 'dexie-react-hooks';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import ListComponent from './ListComponent';
import { useEffectWithoutMount } from '../hooks';

const SaveListComponent: React.FC = () => {
  const saveList = useLiveQuery(() => indexedDBRepository.getList());
  const [serverSaveList, setServerSaveList] = useState<string[]>([]);
  const serverSaveText = useSelector(
    (state: RootState) => state.serverSave.text
  );

  useEffectWithoutMount(
    () => {
      if (serverSaveText) {
        setServerSaveList([serverSaveText, ...serverSaveList]);
      }
    },
    [serverSaveText],
    serverSaveText === null
  );

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
