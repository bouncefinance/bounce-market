import { useAppSelector } from '../../../store/useAppSelector';
import { AccountSlice } from '../accountSlice';

export function useAccountData() {
  return useAppSelector<AccountSlice>(state => state.account);
}
