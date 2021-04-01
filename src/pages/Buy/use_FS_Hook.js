import useToken from "@/utils/useToken";
import { getContract, useActiveWeb3React } from "@/web3"
import BounceFixedSwapNFT from '@/web3/abi/BounceFixedSwapNFT.json'
import { getFixedSwapNFT } from "@/web3/address_list/contract";
import { useEffect, useState } from "react";

export default function useHook(poolIndex) {
    const { active, chainId, library } = useActiveWeb3React()
    const { exportErc20Info, exportNftInfo } = useToken()
    const [poolInfo, setPoolInfo] = useState({})
    const [nftInfo, setNftInfo] = useState({})

    useEffect(() => {
        if (!active) return
        getPoolsByIndex(poolIndex)
        // eslint-disable-next-line
    }, [active])

    const getPoolsByIndex = async (poolIndex) => {
        const BounceFixedSwapNFT_CT = getContract(library, BounceFixedSwapNFT.abi, getFixedSwapNFT(chainId))
        const pools = await BounceFixedSwapNFT_CT.methods.pools(poolIndex).call()
        const swappedAmount0P = await BounceFixedSwapNFT_CT.methods.swappedAmount0P(poolIndex).call()
        const creatorCanceledP = await BounceFixedSwapNFT_CT.methods.creatorCanceledP(poolIndex).call()

        
        if (pools.tokenId) {
            const info = await exportNftInfo(pools.tokenId)
            setNftInfo(info)
        }

        const poolsObj = {
            poolType: 'FS',
            name: pools.name,
            token0: pools.token0,
            token1: await exportErc20Info(pools.token1, true),
            amountTotal0: pools.amountTotal0,
            amountTotal1: pools.amountTotal1,
            nftType: pools.nftType,
            tokenId: pools.tokenId,
            creator: pools.creator,
            swappedAmount0P: swappedAmount0P,
            creatorCanceledP: creatorCanceledP
        }
        if (parseInt(swappedAmount0P) < parseInt(poolsObj.amountTotal0)) {
            poolsObj.status = 'Live'
        } else if (parseInt(swappedAmount0P) === parseInt(poolsObj.amountTotal0)) {
            poolsObj.status = 'Filled'
        } else {
            poolsObj.status = 'Closed'
        }

        console.log(poolsObj)

        setPoolInfo(poolsObj)
    }


    return {
        poolInfo,
        nftInfo
    }
}
