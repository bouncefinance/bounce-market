import React from 'react';
import { Provider, ReactReduxContext } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store';
import { QueryLoadingAbsolute } from './modules/layout/components/QueryLoading/QueryLoading';
import { AppBase } from './modules/layout/components/AppBase/AppBase';
import { Routes } from './Routes';

function App() {
  return (
    <Provider store={store} context={ReactReduxContext}>
      <PersistGate loading={<QueryLoadingAbsolute />} persistor={persistor}>
        <AppBase>
          <Routes />
        </AppBase>
      </PersistGate>
    </Provider>
  );
}

export default App;
