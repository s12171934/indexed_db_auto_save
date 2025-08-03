import { useEffect, useState, useRef, useCallback } from 'react';
import './TextboxComponent.css';
import { useDebounce } from '../hooks/useDebounce';

const TextboxComponent: React.FC = () => {
  const [text, setText] = useState<string>('');
  const isFirstRender = useRef(true);
  const textRef = useRef<string>('');

  // 1. 컴포넌트 마운트 시 실행 (한 번만)
  useEffect(() => {
    isFirstRender.current = true;
    console.log('컴포넌트가 마운트되었습니다!');

    // 컴포넌트 언마운트 시 정리 작업
    return () => {
      console.log('컴포넌트가 언마운트됩니다!');
    };
  }, []); // 빈 의존성 배열 = 마운트/언마운트 시에만 실행

  useEffect(() => {
    textRef.current = text;
  }, [text]);

  // 콜백 함수를 안정적으로 유지 (의존성 배열 비움)
  const debouncedSave = useCallback(() => {
    console.log(textRef.current);
  }, []); // 의존성 배열을 비워서 안정적 유지

  useDebounce(
    debouncedSave,
    1000,
    !isFirstRender.current, // 첫 렌더링이 아닐 때만 활성화
    [text]
  );

  // 첫 렌더링 완료 후 플래그 업데이트
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
