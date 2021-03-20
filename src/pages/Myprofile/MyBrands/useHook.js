
import { useEffect, useState } from 'react'
import useAxios from '@utils/useAxios.js'
import { useActiveWeb3React } from '@/web3'

export default function useHook() {
    const { sign_Axios, axios } = useAxios()
    const { active, account, chainId } = useActiveWeb3React()
    const [brand_list, setBrand_list] = useState([])


    useEffect(() => {
        if (!active) return
        let source = axios.CancelToken.source();
        getBrandList(source)

        return () => {
            source.cancel("Cancelling in cleanup");
        }
        // eslint-disable-next-line
    }, [account, chainId])


    const getBrandList = async (source) => {
        const res = await sign_Axios.get('/api/v2/main/auth/getaccountbrands', { cancelToken: source.token })
        if (res.status === 200 && res.data.code === 1) {
            setBrand_list(res.data.data)
        }
    }


    return {
        brand_list, // brand 列表
    }
}
