import { useActiveWeb3React } from '@/web3'
import { useEffect } from 'react'

export default function useApollo() {
    const { chainId } = useActiveWeb3React()

    useEffect(() => {
        if (!chainId) return
        
    }, [chainId])

    return
}
