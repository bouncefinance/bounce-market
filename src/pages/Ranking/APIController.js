import axios from 'axios'
import useAxios from '@/utils/useAxios'

const { sign_Axios } = useAxios();

export function apiGetRankingList (body) {
    return axios.get('/', body);
}