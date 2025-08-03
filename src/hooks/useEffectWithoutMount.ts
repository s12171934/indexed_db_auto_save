import { type DependencyList, useEffect, useRef } from 'react';

export const useEffectWithoutMount = (
  effect: () => void,
  dependencies: DependencyList,
  disabled: boolean = false
) => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (disabled) return;
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    effect();
  }, dependencies);
};
