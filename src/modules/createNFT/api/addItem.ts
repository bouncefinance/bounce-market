import { Seconds } from '../../common/types/unit';

export interface IApiAddItem {
  code: 1 | number;
  data: {
    id: number;
    expiredtime: Seconds;
    signaturestr: string;
  };
}

export interface IAddItem {
  id: number;
  expiredTime: Seconds;
  signatureStr: string;
}

export function mapAddItem({ data }: IApiAddItem): IAddItem {
  return {
    id: data.id,
    expiredTime: data.expiredtime,
    signatureStr: data.signaturestr,
  };
}
