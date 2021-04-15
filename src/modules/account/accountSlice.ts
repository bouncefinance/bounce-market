import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAction as createSmartAction } from 'redux-smart-actions';

interface ISetAccountPayload {
  address: string;
  token: string;
}

export interface AccountSlice {
  address?: string;
  token?: string;
}

const initialState: AccountSlice = {};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccount: (state, action: PayloadAction<ISetAccountPayload>) => {
      state.address = action.payload.address;
      state.token = action.payload.token;
    },
    disconnect: state => {
      state.address = undefined;
      state.token = undefined;
    },
  },
});

export const connect = createSmartAction('CONNECT_WALLET');
