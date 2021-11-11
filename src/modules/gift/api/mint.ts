import { IMintPayload } from '../actions/mint';

export type IApiMint = {
  code: number;
  msg: string;
  data: IMintPayload;
};
