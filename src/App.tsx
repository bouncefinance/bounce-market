import React from 'react';
import { Provider } from 'react-redux';
import { AppBase } from './modules/layout/components/AppBase/AppBase';
import { Routes } from './Routes';
import { store } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <AppBase>
        <Routes />
      </AppBase>
    </Provider>
  );
}

export default App;
