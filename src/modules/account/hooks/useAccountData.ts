import { useAppSelector } from '../../../store/useAppSelector';
import { AccountSlice } from '../store/accountSlice';

export function useAccountData() {
  return useAppSelector<AccountSlice>(state => state.account);
}
