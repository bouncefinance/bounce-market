import { useQuery } from '@redux-requests/react';
import { useWeb3React } from '@web3-react/core';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from 'store/useAppDispatch';
import { ISetAccountData, setAccount } from '../store/actions/setAccount';
import { connect } from '../store/actions/connect';
import { BlockchainNetworkId } from '../../common/conts';
import { changeNetworkToSupported } from '../store/actions/changeNetworkToSupported';
import { updateAccount } from '../store/actions/updateAccount';
import { makeStyles } from '@material-ui/styles';
import BigNumber from 'bignumber.js';
import { getWeb3NoAccount } from 'modules/web3/utils';

interface IData {
  address: string;
  chainId: number;
}
export const useAccount = () => {
  const dispatch = useAppDispatch();

  const { loading: loading_1, data: data_1 } = useQuery<ISetAccountData | null>(
    {
      type: setAccount.toString(),
    },
  );

  const { account, chainId, error, library } = useWeb3React();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IData>();
  const walletSupportNetworkChange = !!library;
  const [balance, steBalance] = useState(new BigNumber(0.0));
  const initWeb3 = async (address: string) => {
    const web3 = getWeb3NoAccount();
    const balance = await web3.eth.getBalance(address);
    steBalance(new BigNumber(web3.utils.fromWei(balance)));
  };

  // console.log(account, loading, data, error, data_1)

  useEffect(() => {
    if (typeof account === 'string' && typeof chainId === 'number') {
      localStorage.setItem('account', account);
      setData({
        address: account,
        chainId,
      });
      initWeb3(account);
      setLoading(false);
    }
  }, [account, chainId]);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (data_1?.balance) {
      steBalance(data_1?.balance);
    }
    if (data_1?.address) {
      localStorage.setItem('account', data_1?.address);
    }
  // eslint-disable-next-line
  }, [loading_1]);

  const address = data?.address ?? data_1?.address ?? '';
  const isConnected = !!address;

  const isChainSupported =
    parseInt((data?.chainId ?? data_1?.chainId ?? 0).toString()) ===
    BlockchainNetworkId.smartchain;

  const handleConnect = useCallback(() => {
    dispatch(connect());
  }, [dispatch]);

  const handleChangeNetworkToSupported = useCallback(() => {
    dispatch(changeNetworkToSupported());
  }, [dispatch]);

  // Fix styles for wallet connection QR-code modal
  const useStyles = makeStyles({
    '@global': {
      '#walletconnect-qrcode-modal': {
        overflow: 'auto',
      },
      '#walletconnect-qrcode-modal .walletconnect-modal__base': {
        top: 'auto',
        transform: 'none',
        margin: '50px auto',
        maxWidth: '400px',
      },
    },
  });
  useStyles();

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
    balance,
  };
};
