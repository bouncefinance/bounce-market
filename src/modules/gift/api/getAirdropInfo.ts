import { IGetAirdropInfoPayload } from '../actions/getAirdropInfo';

export type IApiGetAirdropInfo = {
  code: number;
  msg: string;
  data: IGetAirdropInfoPayload;
};
