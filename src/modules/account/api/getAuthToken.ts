import axios from 'axios';
import { API_BASE } from '../../common/conts';

export interface IParams {
  accountaddress: string;
  message: string;
  signature: string;
}

export function getAuthToken(params: IParams) {
  return axios.post<{ data: { token: string } }>(
    API_BASE + '/api/v2/main/jwtauth',
    params,
  );
}
