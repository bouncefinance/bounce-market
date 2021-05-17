/* eslint-disable react-hooks/exhaustive-deps */
import { DependencyList, useMemo } from 'react';
import { useLocale } from './useLocale';

function useLocaleMemo<T = any>(
  memoFn: () => T,
  deps: DependencyList | undefined,
) {
  const { locale } = useLocale();
  return useMemo(memoFn, [...(deps || []), locale]);
}

export { useLocaleMemo };
