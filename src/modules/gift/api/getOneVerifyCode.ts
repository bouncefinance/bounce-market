import { IGetOneVerifyCodePayload } from '../actions/getOneVerifyCode';

export type IApiGetOneVerifyCode = {
  code: number;
  msg: string;
  data: IGetOneVerifyCodePayload;
};
