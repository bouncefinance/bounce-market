import { useQuery } from '@redux-requests/react';
import { useCallback } from 'react';
import { useAppDispatch } from 'store/useAppDispatch';
import { ISetAccountData, setAccount } from '../store/actions/setAccount';
import { connect } from '../store/actions/connect';

export const useAccount = () => {
  const dispatch = useAppDispatch();

  const { loading, data, error } = useQuery<ISetAccountData | null>({
    type: setAccount.toString(),
  });

  const address = data?.address;
  const isConnected = !!address;

  const handleConnect = useCallback(() => {
    dispatch(connect());
  }, [dispatch]);

  return { loading, isConnected, address, error, handleConnect };
};
