import { SkeletonNFTCards } from '@/pages/component/Skeleton/NFTCard'
// import PopularItem from '@/pages/Home/PopularItem'
import { CardItem } from '@/pages/Marketplace/CardItem'
import useAxios from '@/utils/useAxios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CommonHeader from '../CommonHeader'
import MessageTips from '@/components/Modal/MessageTips';
import { useActiveWeb3React } from '@/web3'
import { useQuery } from '@apollo/client'
import { QueryTradePools } from '@/utils/apollo'
import { AUCTION_TYPE } from '@/utils/const'

const MyLikedStyled = styled.div`
    flex: 1;
    width: 1100px;
    margin: 0 auto;
    padding-bottom: 20px;
    .con{

        display: flex;
        flex-wrap: wrap;
        /* margin-top: 16px; */
        >div{

            margin-top: 17px;
            margin-right: 17px;

            &:nth-child(4n){
                margin-right: 0;
            }
        }
    }
`
export default function MyLiked() {
  const [loading, setLoding] = useState(true)
  const [list, setlist] = useState([])
  const { sign_Axios,axios } = useAxios()
  const { account, } = useActiveWeb3React()
  const [openMessage, setopenMessage] = useState({ open: false, message: 'error', severity: 'error' })
  const { data } = useQuery(QueryTradePools)

  const getAllPoolData = async () => {
    const poolsParmas = { offset: 0, count: 1e4 }
    try {
      const res = await axios.get('/pools', { params: poolsParmas })
      if (res.status === 200 && res.data.code === 200) {
        return res.data.data
      } else {
        return []
      }
    } catch (error) {
      return []
    }
  }

  useEffect(() => {
    const init = async () => {
      setLoding(true)
      // await new Promise((resolve,) => setTimeout(resolve, 600))
      // console.log(data)
      const newData =await getAllPoolData()

      const tradePools = newData.tradePools.map(item => ({
        ...item,
        poolType: AUCTION_TYPE.FixedSwap
      })).filter(item => item.state !== 1)
      const tradeAuctions = newData.tradeAuctions.map(item => ({
        ...item,
        price: item.lastestBidAmount !== '0' ? item.lastestBidAmount : item.amountMin1,
        poolType: AUCTION_TYPE.EnglishAuction
      })).filter(item => item.state !== 1)
      // new Api 

      const pools = tradePools.concat(tradeAuctions)
      // console.log('newData',pools)

      const res = await sign_Axios.post('/api/v2/main/auth/getaccountlike', {})
      setLoding(false)
      // console.log(res.data.data)
      if (res.data.code === 200 || res.data.code === 1) {
        console.log("res.data.data: ", res.data.data)
        setlist(res.data.data.map(item => {
          const poolInfo = pools.find(pool => pool.tokenId === item.itemid);
          if (!poolInfo) {
            console.error('poolInfo error:', pools, item)
            return null
          } else {
            return {
              ...item,
              poolType: poolInfo.poolType,
              poolId: poolInfo.poolId,
              price: poolInfo.price,
              createTime: poolInfo.createTime,
              token1: poolInfo.token1
            }
          }
        }).filter((e => e)))
      } else {
        setopenMessage({ open: true, message: res.data?.msg || 'error', severity: 'error' })
      }
      // setlist(new Array(8).fill().map((_, i) => ({
      //   src:
      //     i === 0 ? 'https://market-test.bounce.finance/pngfileget/wheatfield--big-1616654589.png' :
      //       i === 1 ? 'https://market-test.bounce.finance/pngfileget/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20210325152735-1616657350.png' :
      //         i === 2 ? 'https://market-test.bounce.finance/pngfileget/20210325154254-1616658231.png' :
      //           '//edu-image.nosdn.127.net/BB712DAF6CB2760EE4EE6284EB243773.png'
      //   , name: 'name' + i, price: i + 'E'
      // })))
    }
    account && data && init()
    // eslint-disable-next-line
  }, [account, data])

  return <>
    <CommonHeader />
    <MyLikedStyled>
      <div className="con">
        {list.map((item, index) => {
          // <PopularItem style={{ marginTop: '17px' }} key={name} src={src} name={name} price={price} />
          return <CardItem
            // cover={item.fileurl}
            // name={item.itemname}
            // cardId={item.poolId}
            // price={!!item.price ? `${item.price} ETH` : `--`}
            // poolType={item.poolType}
            cover={item.imageurl}
            name={item.itemname}
            cardId={item.poolId}
            nftId={item.id}
            price={item.price}
            token1={item.token1}
            poolType={item.poolType}
            key={index}
          />
        })}
      </div>
      {loading && <SkeletonNFTCards n={3} ></SkeletonNFTCards>}
      <MessageTips open={openMessage} setopen={setopenMessage} />
    </MyLikedStyled>
  </>
}