import React from 'react';
import { Provider } from 'react-redux';
import { AppBase } from './modules/layout/components/AppBase/AppBase';
import { Routes } from './Routes';
import { store } from './store/store';
import { NoSsr } from '@material-ui/core';
import { Notifications } from './modules/notification/components/Notifications';

function App() {
  return (
    <Provider store={store}>
      <AppBase>
        <Routes />
        <NoSsr>
          <Notifications />
        </NoSsr>
      </AppBase>
    </Provider>
  );
}

export default App;
