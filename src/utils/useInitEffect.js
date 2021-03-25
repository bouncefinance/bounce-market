import { useEffect } from 'react';
function useInitEffect(effect) {
  // eslint-disable-next-line
  return useEffect(effect, []);
}

export { useInitEffect };