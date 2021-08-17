import { createAction as createSmartAction } from 'redux-smart-actions';
import { connectWallet } from '../../api/connectWallet';
import { getAuthToken } from '../../api/getAuthToken';
import { DispatchRequest, RequestAction } from '@redux-requests/core';
import Web3 from 'web3';
import { BlockchainNetworkId } from '../../../common/conts';
import BigNumber from 'bignumber.js';
import { Store } from 'redux';
import { RootState } from '../../../../store';
import { setChainId, setJWTToken } from 'modules/common/utils/localStorage';

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
  (data?: ISetAccountData) => ({
    request: {
      promise: (async function () {})(),
    },
    meta: {
      asQuery: true,
      onRequest: (
        request: { promise: Promise<any> },
        action: RequestAction,
        store: Store<RootState> & { dispatchRequest: DispatchRequest },
      ) => {
        return {
          promise: (async () => {
            if (data) {
              return data;
            }
            const [web3, provider] = await connectWallet();
            const address = (await web3.eth.getAccounts())[0];
            const signature = await web3.eth.personal.sign(
              SIGN_STR,
              address,
              '',
            );

            const params = {
              accountaddress: address,
              message: SIGN_STR,
              signature: signature,
            };

            const authResponse = await store.dispatchRequest(
              getAuthToken(params),
            );

            const token = authResponse.data.data.token;
            const chainId = await web3.eth.getChainId();
            let balance: string;
            try {
              // TODO Rpc may be slow
              balance = await web3.eth.getBalance(address);
            } catch (error) {
              balance = '0';
            }
            setJWTToken(token);
            setChainId(chainId);
            return {
              token,
              address,
              provider,
              chainId,
              web3,
              balance: new BigNumber(web3.utils.fromWei(balance)),
            };
          })(),
        };
      },
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
