import { createAction as createSmartAction } from 'redux-smart-actions';
import { RPC } from '../../api/connectWallet';
import { BlockchainNetworkId } from '../../../common/conts';
import Web3 from 'web3';
import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { Store } from 'redux';
import { RootState } from '../../../../store';
import { updateAccount } from './updateAccount';
import { t } from '../../../i18n/utils/intl';

export const changeNetworkToSupported = createSmartAction(
  'AccountActions/changeNetworkToSupported',
  () => ({
    request: {
      promise: (async function () {})(),
    },
    meta: {
      asMutation: true,
      onRequest: (
        request: { promise: Promise<any> },
        action: RequestAction,
        store: Store<RootState> & { dispatchRequest: DispatchRequest },
      ) => {
        return {
          promise: (async function () {
            const provider = Web3.givenProvider;

            if (provider) {
              try {
                await provider.request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                      chainId: `0x${BlockchainNetworkId.smartchain.toString(
                        16,
                      )}`,
                      chainName: 'Binance Smart Chain Mainnet',
                      nativeCurrency: {
                        name: 'BNB',
                        symbol: 'bnb',
                        decimals: 18,
                      },
                      rpcUrls: Object.values(RPC),
                      blockExplorerUrls: ['https://bscscan.com/'],
                    },
                  ],
                });
                store.dispatch(
                  updateAccount({ chainId: BlockchainNetworkId.smartchain }),
                );
                return true;
              } catch (error) {
                console.error(error);
                return false;
              }
            } else {
              console.error(t('change-wallet.network-change-error'));
              return false;
            }
          })(),
        };
      },
      getData: (data: boolean) => data,
    },
  }),
);
