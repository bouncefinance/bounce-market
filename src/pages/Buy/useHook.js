import useToken from "@/utils/useToken";
import { getContract, useActiveWeb3React } from "@/web3"
import BounceFixedSwapNFT from '@/web3/abi/BounceFixedSwapNFT.json'
import { getFixedSwapNFT } from "@/web3/address_list/contract";
import { useEffect, useState } from "react";

export default function useHook(poolIndex) {
    const { active, chainId, library } = useActiveWeb3React()
    const { exportErc20Info } = useToken()
    const [poolsInfo, set_poolsInfo] = useState({})

    useEffect(() => {
        if (!active) return
        getPoolsByIndex(poolIndex)
        // eslint-disable-next-line
    }, [active])

    const getPoolsByIndex = async (poolIndex) => {
        const BounceFixedSwapNFT_CT = getContract(library, BounceFixedSwapNFT.abi, getFixedSwapNFT(chainId))
        const pools = await BounceFixedSwapNFT_CT.methods.pools(poolIndex).call()
        const swappedAmount0P = await BounceFixedSwapNFT_CT.methods.swappedAmount0P(poolIndex).call()

        const poolsObj = {
            poolType: 'Fixed-Swap',
            name: pools.name,
            token0: pools.token0,
            token1: await exportErc20Info(pools.token1),
            amountTotal0: pools.amountTotal0,
            amountTotal1: pools.amountTotal1,
            nftType: pools.nftType,
            tokenId: pools.tokenId,
            creator: pools.creator,
            swappedAmount0P: swappedAmount0P
        }

        if (swappedAmount0P < poolsObj.amountTotal0) {
            poolsObj.status = 'Live'
        } else if (swappedAmount0P === poolsObj.amountTotal0) {
            poolsObj.status = 'Filled'
        } else {
            poolsObj.status = 'Closed'
        }

        // console.log(poolsObj)

        set_poolsInfo(poolsObj)
    }


    return {
        poolsInfo
    }
}
