import { createAction as createSmartAction } from 'redux-smart-actions';
import { Locale } from '../../modules/i18n/types/locale';
import {
  Payload,
  createActionPayload,
} from '../../modules/common/types/action';

export interface ISetLocalePayload {
  locale: Locale;
}

export const UserActions = {
  setLocale: createSmartAction<Payload<ISetLocalePayload>, [Locale]>(
    'SET_LOCALE',
    locale => createActionPayload({ locale }),
  ),
};
