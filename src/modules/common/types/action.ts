import { Action } from 'redux';

export interface PayloadAction<T> extends Payload<T>, Action {}

export interface Payload<T> {
  payload?: T;
}

export function createActionPayload<T>(payload: T): Payload<T> {
  return {
    payload,
  };
}
