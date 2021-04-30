import { createAction as createSmartAction } from 'redux-smart-actions';
import { RequestAction } from '@redux-requests/core';
import {
  IApiUploadFileResponse,
  IApiUploadFileSuccess,
} from '../api/uploadFile';

export const uploadFile = createSmartAction<
  RequestAction<IApiUploadFileResponse, IApiUploadFileSuccess['result']>,
  [{ file: File }]
>('CreateNftActions/uploadFile', data => {
  const formData = new FormData();
  formData.append('filename', data.file);
  return {
    request: {
      url: '/api/v2/main/auth/fileupload',
      method: 'post',
      data: formData,
    },
    meta: {
      auth: true,
      driver: 'axios',
      asMutation: true,
      getData: (data: IApiUploadFileResponse) => {
        if (data.code !== 200) {
          throw new Error(data.msg);
        }
        return data.result;
      },
    },
  };
});
