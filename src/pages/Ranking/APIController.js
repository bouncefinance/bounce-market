import axios from 'axios'
import useAxios from '@/utils/useAxios'


/** 获取所有数据列表 */
export function apiGetRankingList (params) {
    return axios.get('https://api1-bsc.fangible.com/v1/bsc/rankings', { params: params });
}