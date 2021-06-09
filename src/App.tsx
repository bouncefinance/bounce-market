import React from 'react';
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core';
import { Provider } from 'react-redux';
import { AppBase } from './modules/layout/components/AppBase/AppBase';
import { Routes } from './Routes';
import { persistor, store } from 'store';
import { NoSsr } from '@material-ui/core';
import { Notifications } from './modules/notification/components/Notifications';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryLoadingAbsolute } from './modules/common/components/QueryLoading/QueryLoading';
import getLibrary from 'modules/web3/utils/getLibrary';
import { NetworkContextName } from 'constants/index';
import Web3ReactManager from 'modules/Web3ReactManager';

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <Web3ReactManager>
          <Provider store={store}>
            <PersistGate
              loading={<QueryLoadingAbsolute />}
              persistor={persistor}
            >
              <AppBase>
                <Routes />
                <NoSsr>
                  <Notifications />
                </NoSsr>
              </AppBase>
            </PersistGate>
          </Provider>
        </Web3ReactManager>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  );
}

export default App;
