import { createAction as createSmartAction } from 'redux-smart-actions';
import {
  connectorLocalStorageKey,
  tokenLocalStorageKey,
} from 'constants/index';
import { connectWallet } from '../../api/connectWallet';
import { getAuthToken } from '../../api/getAuthToken';
import { RequestAction } from '@redux-requests/core';
import Web3 from 'web3';
import { BlockchainNetworkId } from '../../../common/conts';
import BigNumber from 'bignumber.js';

const SIGN_STR = 'Welcome to Fangible!';

// TODO pass unit (now BNB hardcoded)
export interface ISetAccountData {
  token: string;
  address: string;
  provider?: any;
  chainId: BlockchainNetworkId;
  web3: Web3;
  balance: BigNumber;
}

export const setAccount = createSmartAction(
  'AccountActions/setAccount',
  (updateData?: ISetAccountData) => ({
    request: {
      promise: (async function () {
        if (updateData) {
          return updateData
        }
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
        const balance = await web3.eth.getBalance(address);

        window.localStorage.setItem(
          connectorLocalStorageKey,
          chainId.toString(),
        );
        window.localStorage.setItem(tokenLocalStorageKey, token);

        return {
          token,
          address,
          provider,
          chainId,
          web3,
          balance: new BigNumber(web3.utils.fromWei(balance)),
        };
      })(),
    },
    meta: {
      // TODO custom notification. Filter close modal error
      suppressErrorNotification: true,
      getData: (data: ISetAccountData) => data,
      onSuccess: (
        response: { data: ISetAccountData },
        action: RequestAction,
      ) => {
        const provider = response.data.provider;
        delete response.data.provider;
        if (action.meta) {
          action.meta.provider = provider;
        }
        return response;
      },
    },
  }),
);
