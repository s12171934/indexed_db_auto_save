import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { useCallback } from 'react';
import indexedDBRepository from '../db/indexed-db.repository';
import { setServerSaveText } from '../store/reducers/server-save.reducer';
import { useDebounce } from './useDebounce';
import { environment } from '../environments/environment';

export const useAutoSave = () => {
  const debounced_text = useSelector((state: RootState) => state.autoSave.text);
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
