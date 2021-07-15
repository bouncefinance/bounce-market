import BigNumber from 'bignumber.js';
import { getJWTToken } from 'modules/common/utils/localStorage';
import { useCallback, useEffect, useState } from 'react';
import Web3 from 'web3';
import { connectWallet } from '../api/connectWallet';

let web3: Web3;
let provider: any;
let topBalance: BigNumber;
let topAddress: string;
let topChainId: number;
export const useWeb3React = () => {
  const [address, setAddress] = useState<string>(topAddress);
  const [chainId, setChainId] = useState<number>(topChainId);
  const [balance, setBalance] = useState<BigNumber>(topBalance);
  const [loading, setLoading] = useState(true);
  const init = useCallback(async () => {
    const [_web3, _provider] = web3
      ? [web3, provider]
      : await connectWallet(true);
    if (!web3) {
      web3 = _web3;
      provider = _provider;
    }
    const _address = (await web3.eth.getAccounts())[0];
    const balance = await web3.eth.getBalance(_address);
    const balanceBigNumber = new BigNumber(web3.utils.fromWei(balance));
    topBalance = balanceBigNumber;
    topAddress = _address;
    topChainId = await web3.eth.getChainId();
    setChainId(topChainId);
    setAddress(_address);
    setBalance(balanceBigNumber);
  }, []);

  useEffect(() => {
    if (provider) {
      provider.on('chainChanged', (chainId: number) => {
        init();
      });
      provider.on('disconnect', (error: { code: number; message: string }) => {
        setLoading(true);
        setChainId(0);
      });
      provider.on('accountsChanged', (accounts: string[]) => {
        init();
      });
    }
  }, [init]);

  useEffect(() => {
    if (chainId && balance) {
      setLoading(false);
    }
  }, [chainId, balance, loading]);

  useEffect(() => {
    if (getJWTToken()) {
      init();
    } else {
      setLoading(false);
    }
  }, [init]);
  return {
    web3,
    address,
    account: address,
    loading,
    provider,
    chainId,
    balance,
  };
};
