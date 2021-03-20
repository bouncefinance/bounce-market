
import { useEffect, useState } from 'react'
import useAxios from '@utils/useAxios.js'
import { useActiveWeb3React } from '@/web3'

export default function useHook(brandId, type) {
    
    const { sign_Axios } = useAxios()
    const { active, account, chainId } = useActiveWeb3React()
    const [brand_info, setBrand_info] = useState([])

    useEffect(() => {
        if (!active) return
        getBrandInfo()
        // eslint-disable-next-line
    }, [account, chainId, brandId])

    useEffect(() => {
        if (!active) return
        getBrandInfo()
        // eslint-disable-next-line
    }, [type])


    const getBrandInfo = async () => {
        const res = await sign_Axios.post('/api/v2/main/auth/getaccountbrands', {})
        if (res.status === 200 && res.data.code === 1) {
            setBrand_info(res.data.data)
        }
    }


    return {
        brand_info, // brand 列表
    }
}