import { useEffect, useRef, useCallback, useState } from 'react';
import './TextboxComponent.css';
import { useDebounce } from '../hooks/useDebounce';
import { useAutoSave } from '../hooks/useAutoSave';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import {
  setDebouncedText,
  loadInitialText,
} from '../store/reducers/auto-save.reducer';
import { environment } from '../environments/environment';

const TextboxComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const debounced_text = useSelector((state: RootState) => state.autoSave.text);
  const [text, setText] = useState<string>(debounced_text);
  const isFirstRender = useRef(true);
  const textRef = useRef<string>('');

  // 1. 컴포넌트 마운트 시 실행 (한 번만)
  useEffect(() => {
    isFirstRender.current = true;
    dispatch(loadInitialText());
    console.log('TextboxComponent 마운트');

    // 컴포넌트 언마운트 시 정리 작업
    return () => {
      console.log('TextboxComponent 언마운트');
    };
  }, []); // 빈 의존성 배열 = 마운트/언마운트 시에만 실행

  useEffect(() => {
    setText(debounced_text);
  }, [debounced_text]);

  useEffect(() => {
    textRef.current = text;
  }, [text]);

  // 콜백 함수를 안정적으로 유지 (의존성 배열 비움)
  const debouncedSave = useCallback(() => {
    dispatch(setDebouncedText(textRef.current));
  }, []); // 의존성 배열을 비워서 안정적 유지

  useDebounce(
    debouncedSave,
    environment.features.debounceDelay,
    !isFirstRender.current,
    [text]
  );

  useAutoSave();

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  return (
    <>
      <div className="textbox-container">
        <h1>TextboxComponent</h1>
        <input
          type="text"
          name="textbox"
          id="textbox"
          className="textbox-input"
          placeholder="Enter your text here"
          value={text}
          onChange={e => setText(e.target.value)}
        />
      </div>
    </>
  );
};

export default TextboxComponent;
