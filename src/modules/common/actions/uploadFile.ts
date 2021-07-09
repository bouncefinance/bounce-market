import { DispatchRequest, getQuery, RequestAction } from '@redux-requests/core';
import { setAccount } from 'modules/account/store/actions/setAccount';
import { Store } from 'redux';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { RootState } from 'store';
import { editBrandImg } from '../../brand/actions/editBrandImg';
import { editProfile } from '../../profile/actions/editProfile';
import { editProfileBgImg } from '../../profile/actions/editProfileBgImg';
import { fetchProfileInfo } from '../../profile/actions/fetchProfileInfo';
import { IProfileInfo } from '../../profile/api/profileInfo';
import {
  IApiUploadFileResponse,
  IApiUploadFileSuccess,
} from '../api/uploadFile';

export enum UploadFileType {
  Avatar = 'avatar',
  BgImg = 'bgImg',
  BrandImg = 'brandImg',
}

export interface IUploadFileArgs {
  file: File;
  fileType?: 'avatar' | 'bgImg' | 'brandImg';
  contractaddress?: string;
}

export const uploadFile: (
  payload: IUploadFileArgs,
) => RequestAction<
  IApiUploadFileResponse,
  IApiUploadFileSuccess
> = createSmartAction(
  'uploadFile',
  ({ file, fileType, contractaddress }: IUploadFileArgs) => {
    const formData = new FormData();
    formData.append('filename', file);

    return {
      request: {
        url: '/auth/fileupload',
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

          const {
            data: { address },
          } = getQuery(store.getState(), {
            type: setAccount.toString(),
            action: setAccount,
          });

          const isSuccessfulUpload = response.data.code === 200;

          if (fileType === UploadFileType.Avatar && isSuccessfulUpload) {
            store.dispatch(
              editProfile({
                ...(profileInfo || {}),
                imgUrl: response.data.result.path,
                accountAddress: address,
              }) as any,
            );
          } else if (fileType === UploadFileType.BgImg && isSuccessfulUpload) {
            store.dispatch(
              editProfileBgImg({
                imgUrl: response.data.result.path,
              }),
            );
          } else if (
            fileType === UploadFileType.BrandImg &&
            isSuccessfulUpload
          ) {
            store.dispatch(
              editBrandImg({
                contractaddress: contractaddress,
                imgUrl: response.data.result.path,
                accountaddress: address,
              }),
            );
          }

          return response;
        },
      },
    };
  },
);
