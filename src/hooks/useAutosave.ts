import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import indexedDBRepository from '../db/indexed-db.repository';
import { setServerSaveText } from '../store/reducers/server-save.reducer';
import { useDebounce } from './useDebounce';
import { environment } from '../environments/environment';
import { useLiveQuery } from 'dexie-react-hooks';

export const useAutoSave = () => {
  const debounced_text = useLiveQuery(() => indexedDBRepository.getText());
  const dispatch = useDispatch();

  const debouncedSave = useCallback(async () => {
    const serverText = await indexedDBRepository.getText();
    indexedDBRepository.removeOldData();
    dispatch(setServerSaveText(serverText));
  }, []);

  useDebounce(debouncedSave, environment.features.debounceDelayForServerSync, [
    debounced_text,
  ]);
};
