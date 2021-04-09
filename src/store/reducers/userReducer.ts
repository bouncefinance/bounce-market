import { Locale } from '../../modules/i18n/types/locale';
import { createReducer } from 'redux-smart-actions';
import { ISetLocalePayload, UserActions } from '../actions/UserActions';
import { PayloadAction } from '../../modules/common/types/action';
import { AnyAction } from 'redux';

export interface IUserState {
  locale: Locale;
}

const initialState: IUserState = {
  locale: Locale.en,
};

export const userReducer = createReducer(
  {
    [UserActions.setLocale.toString()]: (
      state,
      action: PayloadAction<ISetLocalePayload> & AnyAction,
    ) => {
      return { ...state, locale: action.payload?.locale || Locale.en };
    },
  },
  initialState,
);
