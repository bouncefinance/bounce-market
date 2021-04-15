import { createAction as createSmartAction } from 'redux-smart-actions';
import { IPoolsData } from '../../marketplace/api/getPools';
import { RequestAction } from '@redux-requests/core';
import { connectWallet } from '../api/connectWallet';
import { getAuthToken } from '../api/getAuthToken';

const SIGN_STR = 'Welcome to Bounce!';

interface ISetAccountData {
  token: string;
  address: string;
  provider?: any;
}

export const AccountActions = {
  connect: createSmartAction<RequestAction<IPoolsData>>('CONNECT_WALLET'),
  setAccount: createSmartAction('SET_ACCOUNT', () => ({
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
        return { token, address, provider };
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
  })),
};
