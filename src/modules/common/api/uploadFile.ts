interface IApiUploadFileError {
  code: -1 | 400;
  msg: string;
}

export interface IApiUploadFileSuccess {
  code: 200;
  msg: string;
  result: {
    path: string;
  };
}

export type IApiUploadFileResponse =
  | IApiUploadFileSuccess
  | IApiUploadFileError;
