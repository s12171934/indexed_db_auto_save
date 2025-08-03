import { useEffect, useRef } from 'react';
import _ from 'lodash';

export const useDebounce = (
  callback: (...args: any[]) => void,
  delay: number,
  active: boolean,
  states: any[]
) => {
  const debounceRef = useRef<_.DebouncedFunc<(...args: any[]) => void> | null>(
    null
  );

  // debounce 함수 생성
  useEffect(() => {
    debounceRef.current = _.debounce(callback, delay);

    // 언마운트 시 cancel
    return () => {
      if (debounceRef.current) {
        debounceRef.current.cancel();
      }
    };
  }, [delay]);

  useEffect(() => {
    if (!active || !debounceRef.current) {
      return;
    }
    debounceRef.current();
  }, states);
};
