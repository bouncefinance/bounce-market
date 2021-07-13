import { useQuery } from '@redux-requests/react';
import { useCallback } from 'react';
import { useAppDispatch } from 'store/useAppDispatch';
import { BlockchainNetworkId } from '../../common/conts';
import { changeNetworkToSupported } from '../store/actions/changeNetworkToSupported';
import { connect } from '../store/actions/connect';
import { ISetAccountData, setAccount } from '../store/actions/setAccount';
import { updateAccount } from '../store/actions/updateAccount';

export const useAccount = () => {
  const dispatch = useAppDispatch();

  const { loading, data, error } = useQuery<ISetAccountData | null>({
    type: setAccount.toString(),
  });

  const address = data?.address;
  const isConnected = !!address;

  const chainId = parseInt((data?.chainId ?? 0).toString());

  const isChainSupported =
    chainId === BlockchainNetworkId.smartchain ||
    chainId === BlockchainNetworkId.mainnet ||
    chainId === BlockchainNetworkId.rinkeby ||
    chainId === BlockchainNetworkId.heco ||
    chainId === BlockchainNetworkId.matic;

  const walletSupportNetworkChange = !!data?.web3?.givenProvider;

  const handleConnect = useCallback(() => {
    dispatch(connect());
  }, [dispatch]);

  const handleChangeNetworkToSupported = useCallback(() => {
    dispatch(changeNetworkToSupported());
  }, [dispatch]);

  const handleUpdate = useCallback(
    updatedData => {
      dispatch(updateAccount(updatedData));
    },
    [dispatch],
  );

  return {
    loading,
    isConnected,
    isChainSupported,
    walletSupportNetworkChange,
    address,
    error,
    handleConnect,
    handleChangeNetworkToSupported,
    handleUpdate,
    chainId,
  };
};
