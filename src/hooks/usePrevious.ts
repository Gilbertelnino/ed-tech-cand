import { useRef, useEffect } from 'react';
/**
 * Get previous props value using useRef hook
 *
 * Returns ref current value
 */
const usePrevious = (value: any): any => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default usePrevious;
