import { useEffect, useRef } from 'react';
import type { DependencyList } from 'react';
import _ from 'lodash';

export const useDebounce = <T extends any[]>(
  callback: (...args: T) => void,
  delay: number,
  dependencies: DependencyList
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
    if (debounceRef.current) {
      debounceRef.current();
    }
  }, dependencies);
};
