import { createAction as createSmartAction } from 'redux-smart-actions';
import { connectWallet } from './api/connectWallet';

export const WalletActions = {
  connect: createSmartAction('CONNECT_WALLET', () => ({
    request: {
      promise: (async function () {
        return await connectWallet();
      })(),
    },
  })),
};
