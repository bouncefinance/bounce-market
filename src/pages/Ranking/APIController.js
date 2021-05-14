import axios from 'axios'
import useAxios from '@/utils/useAxios'

const { sign_Axios, axios } = useAxios();

/** 获取所有数据列表 */
export function apiGetRankingList (body) {
    return axios.get('/', body);
}