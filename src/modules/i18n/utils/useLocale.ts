import { useAppSelector } from 'store/useAppSelector';

export function useLocale() {
  return useAppSelector(({ i18n: { locale } }) => {
    return { locale };
  });
}
