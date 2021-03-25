
import { useEffect, useState } from 'react'
import useAxios from '@utils/useAxios.js'
import { useActiveWeb3React } from '@/web3'

export const useBrandList = () => {
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
    }, [active, account, chainId])

    const getBrandList = async (source) => {
        const res = await sign_Axios.post('/api/v2/main/auth/getaccountbrands')
        if (res.status === 200 && res.data.code === 1) {
            setBrand_list(res.data.data)
        }
    }

    return {
        brand_list, // brand 列表
        getBrandList
    }
}

export const useBrandInfo = (brandId) => {
    const { sign_Axios } = useAxios()
    const [brandInfo, setBrandInfo] = useState({})
    const {account} = useActiveWeb3React()

    useEffect(() => {
        getBrandInfoById()
        // eslint-disable-next-line
    }, [brandId,account])

    const getBrandInfoById = () => {
        sign_Axios.post(`/api/v2/main/auth/getbrandbyid`, { id: parseInt(brandId), accountaddress: account })
            .then(res => {
                if (res.status === 200 && res.data.code === 1) {
                    setBrandInfo(res.data.data)
                }
            }).catch(err => {

            })
    }

    return { brandInfo, run: getBrandInfoById }
}
