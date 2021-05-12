import { DispatchRequest, getQuery, RequestAction } from '@redux-requests/core';
import { t } from 'modules/i18n/utils/intl';
import { NotificationActions } from 'modules/notification/store/NotificationActions';
import { Store } from 'redux';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { RootState } from 'store/store';
import { IProfileInfo } from '../api/profileInfo';
import { editProfile } from './editProfile';
import { fetchProfileInfo } from './fetchProfileInfo';

export const fileUpload = createSmartAction<RequestAction>(
  'fileUpload',
  (formData: FormData) => ({
    request: {
      url: '/api/v2/main/auth/fileupload',
      method: 'post',
      data: formData,
    },
    meta: {
      asMutation: true,
      auth: true,
      driver: 'axios',
      onSuccess: (
        request: any,
        _action: RequestAction,
        store: Store<RootState> & { dispatchRequest: DispatchRequest },
      ) => {
        store.dispatch(
          NotificationActions.showNotification({
            message: t('profile.edit.success-message'),
            severity: 'success',
          }),
        );

        const { data: profileInfo } = getQuery<IProfileInfo | null>(
          store.getState(),
          {
            type: fetchProfileInfo.toString(),
          },
        );

        if (profileInfo && request.data.code === 200) {
          store.dispatch(
            editProfile({
              ...profileInfo,
              imgUrl: request.data.result.path,
            }),
          );
        }

        return request;
      },
    },
  }),
);
