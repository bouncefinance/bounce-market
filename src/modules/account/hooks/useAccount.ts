import { useQuery } from '@redux-requests/react';
import {
  AccountActions,
  ISetAccountData,
} from 'modules/account/store/accountActions';
import { useCallback } from 'react';
import { useAppDispatch } from 'store/useAppDispatch';

export const useAccount = () => {
  const dispatch = useAppDispatch();

  const { loading, data, error } = useQuery<ISetAccountData | null>({
    type: AccountActions.setAccount.toString(),
  });

  const address = data?.address;
  const isConnected = !!address;

  const handleConnect = useCallback(() => {
    dispatch(AccountActions.connect());
  }, [dispatch]);

  return { loading, isConnected, address, error, handleConnect };
};
