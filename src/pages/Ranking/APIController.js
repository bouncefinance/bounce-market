import axios from 'axios'
import useAxios from '@/utils/useAxios'


/** 获取所有数据列表 */
export function apiGetRankingList (params) {
    return axios.get('/rankings', { params: params });
}