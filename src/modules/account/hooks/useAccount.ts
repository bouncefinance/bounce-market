import { useQuery } from '@redux-requests/react';
import { useCallback } from 'react';
import { useAppDispatch } from 'store/useAppDispatch';
import { ISetAccountData, setAccount } from '../store/actions/setAccount';
import { connect } from '../store/actions/connect';
import { BlockchainNetworkId } from '../../common/conts';

export const useAccount = () => {
  const dispatch = useAppDispatch();

  const { loading, data, error } = useQuery<ISetAccountData | null>({
    type: setAccount.toString(),
  });

  const address = data?.address;
  const isConnected = !!address;
  const isChainSupported = data?.chainId === BlockchainNetworkId.smartchain;

  const handleConnect = useCallback(() => {
    dispatch(connect());
  }, [dispatch]);

  return {
    loading,
    isConnected,
    isChainSupported,
    address,
    error,
    handleConnect,
  };
};
