import { useState, useCallback } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UseUserAuthentication {
  count: number;
  increment: () => void;
}

export const useUserAuthentication = (): UseUserAuthentication => {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => setCount((x) => x + 1), []);
  return { count, increment };
};
