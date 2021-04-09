import { useSelector } from 'react-redux';
import { Locale } from '../types/locale';
import { IStoreState } from '../../../store/reducers';

export function useLocale() {
  return useSelector<IStoreState, { locale: Locale }>(
    ({ user: { locale } }) => {
      return { locale };
    },
  );
}
