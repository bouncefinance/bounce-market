import axios from 'axios';
import { BASE_URL } from '../../common/conts';

export interface IParams {
  accountaddress: string;
  message: string;
  signature: string;
}

export function getAuthToken(params: IParams) {
  return axios.post<{ data: { token: string } }>(
    BASE_URL + '/api/v2/main/jwtauth',
    params,
  );
}
