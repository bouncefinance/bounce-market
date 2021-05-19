import { DispatchRequest, getQuery, RequestAction } from '@redux-requests/core';
import { Store } from 'redux';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { RootState } from 'store';
import { editProfile } from '../../profile/actions/editProfile';
import { editProfileBgImg } from '../../profile/actions/editProfileBgImg';
import { fetchProfileInfo } from '../../profile/actions/fetchProfileInfo';
import { IProfileInfo } from '../../profile/api/profileInfo';
import {
  IApiUploadFileResponse,
  IApiUploadFileSuccess,
} from '../api/uploadFile';
import { editBrandImg } from '../../brand/actions/editBrandImg';

export enum UploadFileType {
  Avatar = 'avatar',
  BgImg = 'bgImg',
  BrandImg = 'brandImg',
}

export interface IUploadFileArgs {
  file: File;
  fileType?: 'avatar' | 'bgImg' | 'brandImg';
  brandId?: number;
}

export const uploadFile: (
  payload: IUploadFileArgs,
) => RequestAction<
  IApiUploadFileResponse,
  IApiUploadFileSuccess
> = createSmartAction('uploadFile', ({ file, fileType, brandId }: IUploadFileArgs) => {
  const formData = new FormData();
  formData.append('filename', file);

  return {
    request: {
      url: '/api/v2/main/auth/fileupload',
      method: 'post',
      data: formData,
    },
    meta: {
      asMutation: true,
      auth: true,
      driver: 'axios',
      getData: data => {
        if (data.code !== 200) {
          throw new Error(data.msg);
        }
        return data;
      },
      onSuccess: (
        response,
        action: RequestAction,
        store: Store<RootState> & { dispatchRequest: DispatchRequest },
      ) => {
        const { data: profileInfo } = getQuery<IProfileInfo | null>(
          store.getState(),
          {
            type: fetchProfileInfo.toString(),
          },
        );

        const isSuccessfulUpload = response.data.code === 200;

        if (fileType === UploadFileType.Avatar && isSuccessfulUpload) {
          store.dispatch(
            editProfile({
              ...(profileInfo || {}),
              imgUrl: response.data.result.path,
            }) as any,
          );
        } else if (fileType === UploadFileType.BgImg && isSuccessfulUpload) {
          store.dispatch(
            editProfileBgImg({
              imgUrl: response.data.result.path,
            }),
          );
        } else if (fileType === UploadFileType.BrandImg && isSuccessfulUpload) {
          store.dispatch(
            editBrandImg({
              brandId: brandId,
              imgUrl: response.data.result.path,
            })
          )
        } 

        return response;
      },
    },
  };
});
