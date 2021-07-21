import { createAction as createSmartAction } from 'redux-smart-actions';
import { RPC } from '../../api/connectWallet';
import {
  BlockchainNetworkId,
  getBlockChainExplorerAddress,
} from '../../../common/conts';
import Web3 from 'web3';
import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { Store } from 'redux';
import { RootState } from '../../../../store';
import { updateAccount } from './updateAccount';

export const changeNetworkToSupported = createSmartAction(
  'AccountActions/changeNetworkToSupported',
  chainConfig => ({
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
                await provider
                  .request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: chainConfig.chainId }],
                  })
                  .then(() => {
                    store.dispatch(
                      updateAccount({
                        chainId:
                          chainConfig?.chainId ??
                          BlockchainNetworkId.smartchain,
                      }),
                    );
                    window.location.reload();
                  });
              } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
                  try {
                    await provider
                      .request({
                        method: 'wallet_addEthereumChain',
                        params: [
                          chainConfig
                            ? chainConfig
                            : {
                                chainId: `0x${BlockchainNetworkId.smartchain.toString(
                                  16,
                                )}`,
                                chainName: 'Binance Smart Chain Mainnet',
                                nativeCurrency: {
                                  name: 'Binance',
                                  symbol: 'BNB',
                                  decimals: 18,
                                },
                                rpcUrls: Object.values(RPC),
                                blockExplorerUrls: [
                                  getBlockChainExplorerAddress(
                                    BlockchainNetworkId.smartchain,
                                  ),
                                ],
                              },
                        ],
                      })
                      .then(() => {
                        store.dispatch(
                          updateAccount({
                            chainId:
                              chainConfig?.chainId ??
                              BlockchainNetworkId.smartchain,
                          }),
                        );
                        window.location.reload();
                      });
                  } catch (addError) {
                    // handle "add" error
                  }
                }
                // handle other "switch" errors
              }

              return true;
            } else {
              return false;
            }
          })(),
        };
      },
      getData: (data: boolean) => data,
    },
  }),
);
