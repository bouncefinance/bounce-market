import { RequestAction } from '@redux-requests/core';

export type ResponseData<
  Request extends (...args: any[]) => RequestAction
> = ReturnType<
  Exclude<Exclude<ReturnType<Request>['meta'], undefined>['getData'], undefined>
>;
