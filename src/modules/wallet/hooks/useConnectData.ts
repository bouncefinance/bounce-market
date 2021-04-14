import { useAppSelector } from '../../../store/useAppSelector';
import { ConnectSlice } from '../connectionSlice';

export function useConnectData() {
  return useAppSelector<ConnectSlice>(state => state.wallet);
}
