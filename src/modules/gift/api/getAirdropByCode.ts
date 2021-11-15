import { IGetAirdropByCodePayload } from '../actions/getAirdropByCode';

export type IApiGetAirdropByCode = {
  code: number;
  msg: string;
  data: IGetAirdropByCodePayload;
};
