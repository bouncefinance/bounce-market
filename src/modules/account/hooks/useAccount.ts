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
import { tokenLocalStorageKey } from 'constants/index';
import Web3 from 'web3';
import { useTimer } from 'modules/common/hooks/useInterval';

export const useAccount = () => {
  const dispatch = useAppDispatch();

  const { loading: loading_1, data: data_1 } = useQuery<ISetAccountData | null>(
    {
      type: setAccount.toString(),
    },
  );

  const { account, chainId, error, library } = useWeb3React();
  const [loading, setLoading] = useState(true);
  const walletSupportNetworkChange = !!library;
  const [balance, steBalance] = useState(new BigNumber(0.0));
  const [web3, setWeb3] = useState<Web3>(getWeb3NoAccount())
  const initWeb3 = async (address: string) => {
    try {
      if (!address) {
        return
      }
      const web3 = getWeb3NoAccount();
      setWeb3(web3)
      const balance = await web3.eth.getBalance(address);
      steBalance(new BigNumber(web3.utils.fromWei(balance)));
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    if (typeof account === 'string' && typeof chainId === 'number') {
      initWeb3(account);
      setLoading(false);
    }
  }, [account, chainId]);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 700);
  }, []);

  useEffect(() => {
    if (data_1?.balance) {
      steBalance(data_1?.balance);
    }
    // eslint-disable-next-line
  }, [loading_1]);

  const address = account ?? data_1?.address ?? '';
  const isConnected = !!address;

  const isChainSupported =
    parseInt((chainId ?? data_1?.chainId ?? 0).toString()) ===
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

  const token = localStorage.getItem(tokenLocalStorageKey) ?? ''
  useEffect(() => {
    // no first
    if (!(data_1?.address) && address) {
      dispatch(setAccount({ address, token, chainId: chainId as BlockchainNetworkId, web3: web3, balance, }))
    }
    // eslint-disable-next-line
  }, [address, token,])

  const timer = useTimer(1000 * 10)
  useEffect(() => {
    initWeb3(address)
  }, [timer, address])

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
