import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useHistory, useParams } from 'react-router'
import Search from '../component/Other/Search'
import { CardItem } from './CardItem'
import { PullRadioBox } from '@components/UI-kit'

import nav_audio from '@assets/images/icon/nav_audio.svg'
import nav_game from '@assets/images/icon/nav_game.svg'
import nav_image from '@assets/images/icon/nav_image.svg'
import nav_other from '@assets/images/icon/nav_other.svg'
import nav_video from '@assets/images/icon/nav_video.svg'
import icon_arts from '@assets/images/icon/image.svg'
import icon_comics from '@assets/images/icon/comics.svg'
import icon_sport from '@assets/images/icon/sport.svg'

import useAxios from '@/utils/useAxios'
import { Controller } from '@/utils/controller'
import { useLazyQuery } from '@apollo/client'
import { QueryMyPools, queryTradeInfo } from '@/utils/apollo'
import { useActiveWeb3React } from '@/web3'
import { SkeletonNFTCards } from '../component/Skeleton/NFTCard'
import { AUCTION_TYPE, NFT_CATEGORY } from '@/utils/const'
import Button from '@/components/UI-kit/Button/Button'

import useWrapperIntl from '@/locales/useWrapperIntl'

const MarketplaceStyled = styled.div`
    width: 1100px;
    margin: 0 auto;
    margin-bottom: 30px;

    flex: 1;

    .nav_wrapper{
      
        width: 1100px;
        margin: 0 auto;
        margin-top: 50px;
        display: flex;
        padding-bottom: 16px;
        border-bottom: 2px solid rgba(0,0,0,.1);
        position: relative;
        li{
            padding: 7px 20px;
            height: 48px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            user-select: none;
            opacity: .4;
            img{
                margin-right: 7.15px;
            }

            &.active{
                background-color: rgba(0,0,0,.1);
                opacity: 1;
            }
        }
        .link {
          position: absolute;
          right: -20px;
        }
    }

    .filterBox{
        margin-top: 32px;
        /* margin-bottom: 50px; */
        display: flex;
        justify-content: space-between;
    }

    .list_wrapper{
        width: 1100px;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;

        li{
            margin-top: 32px;
            margin-right: 17px;

            &:nth-child(4n){
                margin-right: 0;
            }
        }

        &.Video{
            li{
                margin-top: 32px;
                margin-right: 18px;

                &:nth-child(2n){
                    margin-right: 0;
                }
            }
        }
    }
`

const nav_list = [{
  name: 'Images',
  icon: nav_image,
  route: 'Images'
}, {
  name: 'Video',
  icon: nav_video,
  route: 'Video'
}, {
  name: 'Audios',
  icon: nav_audio,
  route: 'Audio'
}, {
  name: 'Game',
  icon: nav_game,
  route: 'Games'
}, {
  name: 'Others',
  icon: nav_other,
  route: 'Others'
}]

export default function MyMarket() {
  let { type, channel } = useParams()
  const { wrapperIntl } = useWrapperIntl()

  const history = useHistory()
  const { active, account } = useActiveWeb3React()

  const { sign_Axios } = useAxios();
  const [tokenList, setTokenList] = useState([]);
  const [claimList, setClaimList] = useState([]);
  const [soldList, setSoldList] = useState([]);
  const [filterList, setFilterList] = useState([]);
  /* const [channel, setChannel] = useState(
    type === NFT_CATEGORY.Sports ? NFT_CATEGORY.Sports :
      type === NFT_CATEGORY.ComicBooks ? NFT_CATEGORY.ComicBooks :
        NFT_CATEGORY.FineArts); */

  const [loading, setLoading] = useState(true)
  const [length, setLength] = useState(4);
  const [tradeData, setTradeData] = useState(null);
  const [poolIdList, setPoolIdList] = useState(null);
  const [tradeInfo, setTradeInfo] = useState(null);

  type = ''

  const NavList = [
    {
      /* title: "Fine Arts", */
      title: wrapperIntl("market.fineArts"),
      route: "FineArts",
      channelRequestParam: "Fine Arts",
    },
    {
      /* title: "Sports", */
      title: wrapperIntl("market.sports"),
      route: "Sports",
      channelRequestParam: "Sports",
    },
    {
      /* title: "Comics", */
      title: wrapperIntl("market.comics"),
      route: "Comics",
      channelRequestParam: "Conicbooks",
    },
  ]

  const [channelRequestParam, setChannelRequestParam] = useState(
    channel === NavList[0].route ? NavList[0].channelRequestParam :
      channel === NavList[1].route ? NavList[1].channelRequestParam :
        NavList[2].channelRequestParam);

  const handleTradeData = useCallback((tradeInfo) => {
    const tradePools = tradeData.tradePools.map(item => ({
      ...item,
      poolType: AUCTION_TYPE.FixedSwap
    }));

    const claimTradePools = tradePools
      .filter(item => item.state === 0);

    const soldTradePools = tradePools
      .filter(item => !claimTradePools.includes(item))

    const tradeAuctions = tradeData.tradeAuctions.map(item => ({
      ...item,
      price: item.lastestBidAmount !== '0' ? item.lastestBidAmount : item.amountMin1,
      poolType: AUCTION_TYPE.EnglishAuction
    }));

    const claimTradeAuctions = tradeAuctions
      .filter(item => {
        if (String(account).toLowerCase() === item.creator) {
          return item.createrClaimed === 0
        } else {
          return item.bidderClaimed === 0
        }
      })
      .filter(item => item.lastestBidAmount !== item.amountMax1);
    const soldTradeAuctions = tradeAuctions
      .filter(item => !claimTradeAuctions.includes(item))


    const auctionBids = tradeData.auctionBids.map(item => {
      const poolInfo = tradeInfo.tradeAuctions.find(pool => pool.poolId === item.poolId);
      return {
        ...item,
        poolType: AUCTION_TYPE.EnglishAuction,
        price: poolInfo && (poolInfo.lastestBidAmount !== '0' ? poolInfo.lastestBidAmount : poolInfo.amountMin1),
        token1: poolInfo && poolInfo.token1,
        createTime: item.timestamp,
        creator: poolInfo && poolInfo.creator,
        lastestBidAmount: poolInfo && poolInfo.lastestBidAmount,
        amountMax1: poolInfo && poolInfo.amountMax1,
        createrClaimed: poolInfo && poolInfo.createrClaimed,
        bidderClaimed: poolInfo && poolInfo.bidderClaimed
      }
    });
    const claimAuctionBids = auctionBids
      .filter(item => {
        if (String(account).toLowerCase() === item.creator) {
          return item.createrClaimed === 0
        } else {
          return item.bidderClaimed === 0
        }
      })
      .filter(item => item.lastestBidAmount !== item.amountMax1)
      .filter(item => item.lastestBidAmount === item.amount1)
    const soldAuctionBids = auctionBids
      .filter(item => !claimAuctionBids.includes(item))

    const poolData = tradePools
      .concat(tradeAuctions)
      .concat(auctionBids)

    const claimPoolData = claimTradePools
      .concat(claimTradeAuctions)
      .concat(claimAuctionBids)

    const soldPoolData = soldTradePools
      .concat(soldTradeAuctions)
      .concat(soldAuctionBids)
    const ids_list = poolData.map(item => item.tokenId);
    const cts_list = poolData.map(item => item.token0);
    
    // console.log(poolData)
    setLength(ids_list.length);
    /* const channel_2 = channel === 'Comics' ? 'Conicbooks' : channel */

    sign_Axios.post(Controller.items.getitemsbyfilter, {
      ids: ids_list,
      cts: cts_list,
      category: type,
      /* channel: channel_2 */
      channel: channelRequestParam
    })
      .then(res => {
        if (res.status === 200 && res.data.code === 1) {
          const claimList = claimPoolData.map(pool => {
            const item = res.data.data.find(r => r.id === pool.tokenId);
            
            return {
              ...item,
              poolType: pool.poolType,
              poolId: pool.poolId,
              price: pool.price,
              token1: pool.token1,
              createTime: pool.createTime
            }
          }).filter(item => item.fileurl)

          const soldList = soldPoolData.map(pool => {
            const item = res.data.data.find(r => r.id === pool.tokenId);
            // if (item.id === 17092) {
            //   item.category = 'video'
            // } else {
            //   item.category = 'image'
            // }
            return {
              ...item,
              poolType: pool.poolType,
              poolId: pool.poolId,
              price: pool.price,
              token1: pool.token1,
              createTime: pool.createTime
            }
          })
          const claimResult = claimList.sort((a, b) => b.createTime - a.createTime)
          const soldResult = soldList.sort((a, b) => b.createTime - a.createTime)
          setTokenList(claimResult);
          setSoldList(soldResult);
          setClaimList(claimResult);
          setFilterList(claimResult);
          setLoading(false)
        }
      })
    // eslint-disable-next-line
  }, [channel, tradeData, type]);

  const [getTradeInfo, { data }] = useLazyQuery(queryTradeInfo, {
    variables: { poolIdList: poolIdList },
    onCompleted: () => {
      setTradeInfo(data);
    }
  })

  const [getMyTradeNFT, { data: myTrade }] = useLazyQuery(QueryMyPools, {
    variables: { user: String(account).toLowerCase() },
    fetchPolicy: "network-only",
    onCompleted: () => {
      const auctionBids = myTrade.auctionBids.map(item => Number(item.poolId));
      setPoolIdList(auctionBids)
      setTradeData(myTrade)
    },
  })

  useEffect(() => {
    if (!active) return
    getMyTradeNFT()
    if (tradeData) {
      getTradeInfo();
    }
    if (tradeInfo) {
      handleTradeData(tradeInfo);
    }
  }, [active, tradeData, tradeInfo, getMyTradeNFT, getTradeInfo, handleTradeData])

  const handleChange = (filterSearch) => {
    const list = tokenList.filter(item => item.itemname.toLowerCase().indexOf(filterSearch) > -1
      || item.owneraddress.toLowerCase().indexOf(filterSearch) > -1);
    setFilterList(list);
  }

  const renderListByType = (type) => {
    switch (type) {
      case 'Image':
        return <ul className={`list_wrapper ${type}`}>
          {filterList.map((item, index) => {
            return <li key={index}>
              <CardItem
                cover={item.fileurl}
                name={item.itemname}
                cardId={item.poolId}
                nftId={item.id}
                price={item.price}
                token1={item.token1}
                poolType={item.poolType}
              />
            </li>
          })}
        </ul>

      default:
        return <ul className={`list_wrapper ${type}`}>
          {filterList.map((item, index) => {
            return <li key={index}>
              <CardItem
                cover={item.fileurl}
                name={item.itemname}
                cardId={item.poolId}
                price={item.price}
                token1={item.token1}
                poolType={item.poolType}
                poolInfo={item}
              />
            </li>
          })}
        </ul>
    }
  }



  return (
    <MarketplaceStyled>
      {false && <ul className="nav_wrapper">
        {nav_list.map((item) => {
          return <li key={item.name} className={type === item.route ? 'active' : ''} onClick={() => {
            history.push(`/Marketplace/${item.route}`)
          }}>
            <img src={item.icon} alt="" />
            <p>{item.name}</p>
          </li>
        })}
      </ul>}
      <ul className="nav_wrapper">
        {/* {'Fine Arts、Sports、Comics'.split('、').map(e => ({ name: e })).map((item) => {
          return <li key={item.name} className={channel === item.name ? 'active' : ''} onClick={() => {
            setChannel(item.name)
          }}>
            <p className="flex flex-center-y"><img src={
              item.name === NFT_CATEGORY.FineArts ? icon_arts :
                item.name === NFT_CATEGORY.Sports ? icon_sport :
                  item.name === NFT_CATEGORY.ComicBooks ? icon_comics :
                    ''
            } alt="" />{item.name}</p>
          </li>
        })} */}
        {NavList.map(nav => {
          return <li key={nav.title} className={channel === nav.route ? 'active' : ''} onClick={
            () => {
              setChannelRequestParam(nav.channelRequestParam)
              history.push('/MyMarket/' + nav.route)
              // setChannelRequestParam(item.name)
            }}>
            <p className="flex flex-center-y"><img src={
              nav.title === NFT_CATEGORY.FineArts ? icon_arts :
                nav.title === NFT_CATEGORY.Sports ? icon_sport :
                  nav.title === NFT_CATEGORY.ComicBooks ? icon_comics :
                    ''
            } alt="" />{nav.title}</p>
          </li>
        })}
        <li className="link"><Button onClick={() => { history.push('/Marketplace/FineArts') }}>{wrapperIntl("market.Marketplace")}</Button></li>
      </ul>

      <div className="filterBox">
        <Search placeholder={wrapperIntl("market.placeholder")} onChange={handleChange} />

        {/* <PullRadioBox prefix={'Gategory:'} width={'160px'} options={[{ value: 'Image' }]} defaultValue='Image' onChange={(item) => {
          // console.log(item)
        }} /> */}

        <PullRadioBox prefix={'Currency:'} width={'190px'} options={[{ value: 'All' }]} defaultValue='All' onChange={(item) => {
          // console.log(item)
        }} />

        <PullRadioBox prefix={'Sort by:'} width={'190px'} options={[{ value: 'New' }, { value: 'Popular' }]} defaultValue='New' onChange={(item) => {
          // console.log(item)
        }} />

        <PullRadioBox prefix={'Claim state: '} width={'210px'} options={[{ value: 'UnClaim' }, { value: 'Claimed' }]} defaultValue='UnClaim' onChange={item => {
          if (item.value === 'UnClaim') {
            setTokenList(claimList);
            setFilterList(claimList);
          } else if (item.value === 'Claimed') {
            setTokenList(soldList);
            setFilterList(soldList)
          }
        }} />
      </div>

      {loading && <SkeletonNFTCards n={length} ></SkeletonNFTCards>}
      {renderListByType(type)}

      {/* <PagingControls /> */}
    </MarketplaceStyled>
  )
}

