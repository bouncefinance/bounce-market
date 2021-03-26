import { getContract, useActiveWeb3React } from "@/web3"
import BounceFixedSwapNFT from '@/web3/abi/BounceFixedSwapNFT.json'
import { getFixedSwapNFT } from "@/web3/address_list/contract";
import { useEffect, useState } from "react";

export default function useHook(poolIndex) {
    const { active, chainId, library } = useActiveWeb3React()
    const [poolsInfo, set_poolsInfo] = useState({})

    useEffect(() => {
        if (!active) return
        getPoolsByIndex(poolIndex)
        // eslint-disable-next-line
    }, [active])

    const getPoolsByIndex = async (poolIndex) => {
        const BounceFixedSwapNFT_CT = getContract(library, BounceFixedSwapNFT.abi, getFixedSwapNFT(chainId))
        const pools = await BounceFixedSwapNFT_CT.methods.pools(poolIndex).call()
        
        const poolsObj = {
            _name: pools.name,
            _token0: pools.token0,
            _token1: pools.token1,
            _amountTotal0: pools.amountTotal0,
            _amountTotal1: pools.amountTotal1,
            _nftType: pools.nftType,
            _tokenId: pools.tokenId,
            _creator: pools.creator,
        }

        console.log(poolsObj)

        set_poolsInfo(poolsObj)
    }


    return {
        poolsInfo
    }
}
