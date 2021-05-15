import React from 'react';
import { Provider } from 'react-redux';
import { AppBase } from './modules/layout/components/AppBase/AppBase';
import { Routes } from './Routes';
import { persistor, store } from './store/store';
import { NoSsr } from '@material-ui/core';
import { Notifications } from './modules/notification/components/Notifications';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryLoadingAbsolute } from './modules/common/components/QueryLoading/QueryLoading';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<QueryLoadingAbsolute />} persistor={persistor}>
        <AppBase>
          <Routes />
          <NoSsr>
            <Notifications />
          </NoSsr>
        </AppBase>
      </PersistGate>
    </Provider>
  );
}

export default App;
