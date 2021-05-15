import { createAction as createSmartAction } from 'redux-smart-actions';
import { connectWallet } from '../../api/connectWallet';
import { getAuthToken } from '../../api/getAuthToken';
import { RequestAction } from '@redux-requests/core';
import Web3 from 'web3';
import { BlockchainNetworkId } from '../../../common/conts';

const SIGN_STR = 'Welcome to Bounce!';

export interface ISetAccountData {
  token: string;
  address: string;
  provider?: any;
  chainId: BlockchainNetworkId;
  web3: Web3;
}

export const setAccount = createSmartAction(
  'AccountActions/setAccount',
  () => ({
    request: {
      promise: (async function () {
        const [web3, provider] = await connectWallet();
        const address = (await web3.eth.getAccounts())[0];
        const signature = await web3.eth.personal.sign(SIGN_STR, address, '');

        const params = {
          accountaddress: address,
          message: SIGN_STR,
          signature: signature,
        };

        const authResponse = await getAuthToken(params);
        const token = authResponse.data.data.token;
        const chainId = await web3.eth.getChainId();
        return { token, address, provider, chainId, web3 };
      })(),
    },
    meta: {
      getData: (data: ISetAccountData) => data,
      onSuccess: (
        request: { data: ISetAccountData },
        action: RequestAction,
      ) => {
        const provider = request.data.provider;
        delete request.data.provider;
        if (action.meta) {
          action.meta.provider = provider;
        }
        return request;
      },
    },
  }),
);
