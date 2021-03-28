import { weiDiv } from "@/utils/useBigNumber";
import useToken from "@/utils/useToken";
import { getContract, useActiveWeb3React } from "@/web3"
import BounceEnglishAuctionNFT from '@/web3/abi/BounceEnglishAuctionNFT.json'
import { getEnglishAuctionNFT } from "@/web3/address_list/contract";
import { useEffect, useState } from "react";

export default function useHook(poolIndex) {
    const { active, chainId, library, account } = useActiveWeb3React()
    const { exportErc20Info, exportNftInfo } = useToken()
    const [poolInfo, setPoolInfo] = useState({})
    const [nftInfo, setNftInfo] = useState({})

    useEffect(() => {
        if (!active) return
        getPoolsByIndex(poolIndex)
        // eslint-disable-next-line
    }, [active])

    const getPoolsByIndex = async (poolIndex) => {
        const BounceEnglishAuctionNFT_CT = getContract(library, BounceEnglishAuctionNFT.abi, getEnglishAuctionNFT(chainId))
        const pools = await BounceEnglishAuctionNFT_CT.methods.pools(poolIndex).call()
        const currentBidderAmount = await BounceEnglishAuctionNFT_CT.methods.currentBidderAmount1P(poolIndex).call()
        const bidCountP = await BounceEnglishAuctionNFT_CT.methods.bidCountP(poolIndex).call()
        const myClaimedP = await BounceEnglishAuctionNFT_CT.methods.myClaimedP(account, poolIndex).call()
        const creatorClaimedP = await BounceEnglishAuctionNFT_CT.methods.creatorClaimedP(poolIndex).call()
        const reserveAmount1P = await BounceEnglishAuctionNFT_CT.methods.reserveAmount1P(poolIndex).call()
        const currentBidderP = await BounceEnglishAuctionNFT_CT.methods.currentBidderP(poolIndex).call()



        // console.log(pools)
        if (pools.tokenId) {
            const info = await exportNftInfo(pools.tokenId)
            setNftInfo(info)
        }

        const poolsObj = {
            poolType: 'EA',
            name: pools.name,
            token0: pools.token0,
            token1: await exportErc20Info(pools.token1),
            tokenAmount0: pools.tokenAmount0,
            amountMax1: pools.amountMax1,
            amountMin1: pools.amountMin1,
            amountMinIncr1: pools.amountMinIncr1,
            nftType: pools.nftType,
            tokenId: pools.tokenId,
            creator: pools.creator,
            closeAt: pools.closeAt,
            duration: pools.duration,
            currentBidderAmount: currentBidderAmount,
            bidCountP: bidCountP,
            myClaimedP,
            currentBidderP,
            creatorClaimedP,
        }


        const curTime = parseInt(new Date().getTime() / 1000)
        const diffTime = parseInt(poolsObj.closeAt) - curTime

        

        if (diffTime < 0) {
            poolsObj.showTime = 'This Tranding Closed'
            poolsObj.status = 'Close'
            
        } else {
            poolsObj.status = 'Live'
            if (diffTime >= 86400) {
                const day = parseInt(diffTime % 86400)
                const hour =parseInt( (diffTime / 3600) % 24)
                poolsObj.showTime = `Sale ends in ${day} days ${hour} hours`
            } else {
                const hour = parseInt(diffTime / 3600)
                const minute = parseInt((diffTime / 60) % 60)
                poolsObj.showTime = `Sale ends in ${hour} hours ${minute} minutes`
            }
        }

        if (parseFloat(weiDiv(currentBidderAmount, pools.amountMax1)) >= 1) {
            // 一口价成交
            poolsObj.showTime = 'This Tranding Closed'
            poolsObj.status = 'Close'
        } else if (parseFloat(weiDiv(currentBidderAmount, reserveAmount1P)) >= 1) {
            // 预期价成交
            
        } else {
            // 流拍
            
        }

        console.log(poolsObj)

        setPoolInfo(poolsObj)
    }


    return {
        poolInfo,
        nftInfo
    }
}
