import { useEffect, useState, useRef } from 'react';
import './TextboxComponent.css';

function TextboxComponent() {
  const [text, setText] = useState<string>('');
  const isFirstRender = useRef(true);

  // 1. 컴포넌트 마운트 시 실행 (한 번만)
  useEffect(() => {
    isFirstRender.current = true;
    console.log('컴포넌트가 마운트되었습니다!');

    // 컴포넌트 언마운트 시 정리 작업
    return () => {
      console.log('컴포넌트가 언마운트됩니다!');
    };
  }, []); // 빈 의존성 배열 = 마운트/언마운트 시에만 실행

  // 2. text 상태가 변경될 때마다 실행 (마운트 시 제외)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // 첫 번째 렌더링 시에는 실행하지 않음
    }
    console.log('텍스트가 변경되었습니다:', text);
  }, [text]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

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
          onChange={handleChange}
        />
      </div>
    </>
  );
}

export default TextboxComponent;
