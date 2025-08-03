import { useEffect, useRef, useCallback, useState } from 'react';
import './TextboxComponent.css';
import { useDebounce, useAutoSave } from '../hooks';
import { environment } from '../environments/environment';
import indexedDBRepository from '../db/indexed-db.repository';

interface TextboxComponentProps {
  initText?: string;
}

const TextboxComponent: React.FC<TextboxComponentProps> = ({
  initText = '',
}) => {
  const [text, setText] = useState<string>(initText);
  const textRef = useRef<string>(initText);

  // 1. 컴포넌트 마운트 시 실행 (한 번만)
  useEffect(() => {
    console.log('TextboxComponent 마운트');
    // 컴포넌트 언마운트 시 정리 작업
    return () => {
      console.log('TextboxComponent 언마운트');
    };
  }, []); // 빈 의존성 배열 = 마운트/언마운트 시에만 실행

  useEffect(() => {
    textRef.current = text;
  }, [text]);

  // 콜백 함수를 안정적으로 유지 (의존성 배열 비움)
  const debouncedSave = useCallback(() => {
    indexedDBRepository.setText(textRef.current || '');
  }, []); // 의존성 배열을 비워서 안정적 유지

  useDebounce(debouncedSave, environment.features.debounceDelay, [text], true);

  useAutoSave();

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
