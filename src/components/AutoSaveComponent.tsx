import { useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import { useDebounce } from '../hooks/useDebounce';
import indexedDBRepository from '../db/indexed-db.repository';
import { setServerSaveText } from '../store/reducers/server-save.reducer';

const AutoSaveComponent: React.FC = () => {
  const debounced_text = useSelector((state: RootState) => state.autoSave.text);
  const isFirstRender = useRef(true);
  const textRef = useRef<string>('');
  const dispatch = useDispatch();

  useEffect(() => {
    isFirstRender.current = true;
    console.log('AutoSaveComponent 마운트');

    // 언마운트 시 실행
    return () => {
      console.log('AutoSaveComponent 언마운트');
    };
  }, []);

  useEffect(() => {
    textRef.current = debounced_text;
  }, [debounced_text]);

  // 콜백 함수를 안정적으로 유지 (의존성 배열 비움)
  const debouncedSave = useCallback(async () => {
    const serverText = await indexedDBRepository.getText();
    indexedDBRepository.removeOldData();
    dispatch(setServerSaveText(serverText));
  }, []); // 의존성 배열을 비워서 안정적 유지

  useDebounce(debouncedSave, 5000, !isFirstRender.current, [debounced_text]);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  return <></>;
};

export default AutoSaveComponent;
