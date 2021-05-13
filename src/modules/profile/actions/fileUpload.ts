import { DispatchRequest, getQuery, RequestAction } from '@redux-requests/core';
import { Store } from 'redux';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { RootState } from 'store/store';
import { IProfileInfo } from '../api/profileInfo';
import { editProfile } from './editProfile';
import { editProfileBandImg } from './editProfileBandImg';
import { fetchProfileInfo } from './fetchProfileInfo';

interface IFileUploadArgs {
  formData: FormData;
  fileType: 'avatar' | 'bandImg';
}

export const fileUpload: (
  payload: IFileUploadArgs,
) => RequestAction<any, any> = createSmartAction(
  'fileUpload',
  ({ formData, fileType }: IFileUploadArgs) => ({
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
        const { data: profileInfo } = getQuery<IProfileInfo | null>(
          store.getState(),
          {
            type: fetchProfileInfo.toString(),
          },
        );

        const isSuccessfulUpload = request.data.code === 200;

        if (fileType === 'avatar' && isSuccessfulUpload) {
          store.dispatch(
            editProfile({
              ...(profileInfo || {}),
              imgUrl: request.data.result.path,
            }) as any,
          );
        } else if (fileType === 'bandImg' && isSuccessfulUpload) {
          store.dispatch(
            editProfileBandImg({
              imgUrl: request.data.result.path,
            }),
          );
        }

        return request;
      },
    },
  }),
);
