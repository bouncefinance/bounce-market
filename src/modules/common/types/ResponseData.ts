import { RequestAction } from '@redux-requests/core';

export type ResponseData<
  Request extends (...args: any[]) => RequestAction
> = ReturnType<
  Exclude<Exclude<ReturnType<Request>['meta'], undefined>['getData'], undefined>
>;

export interface IResponse<T> {
  code: number;
  msg?: string;
  total?: number;
  data: T;
  tokenSymbol?: string;
}
