import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useHistory, useParams } from 'react-router'
import Search from '../component/Other/Search'
import { CardItem } from './CardItem'
import { PullRadioBox } from '@components/UI-kit'

import icon_arts from '@assets/images/icon/image.svg'
import icon_comics from '@assets/images/icon/comics.svg'
import icon_sport from '@assets/images/icon/sport.svg'

import useAxios from '@/utils/useAxios'
import { Controller } from '@/utils/controller'
import { useQuery } from '@apollo/client'
import { QueryMarketTradePools, QueryMarketTradePools_0 } from '@/utils/apollo'
import { useActiveWeb3React } from '@/web3'
import { SkeletonNFTCards } from '../component/Skeleton/NFTCard'
import { AUCTION_TYPE, NFT_CATEGORY } from '@/utils/const'
import Button from '@/components/UI-kit/Button/Button'
import { getCoinList } from '@/utils/coin'
// import { ZERO_ADDRESS } from "@/web3/address_list/token"
import useWrapperIntl from '@/locales/useWrapperIntl'

const MarketplaceStyled = styled.div`
    width: 1100px;
    flex: 1;
    margin: 0 auto;
    margin-bottom: 30px;

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

export default function Marketplace() {
  const { wrapperIntl } = useWrapperIntl()



  const NavList = [
    {
      title: wrapperIntl('market.fineArts'),
      route: "FineArts",
      channelRequestParam: "Fine Arts",
    },
    {
      title: wrapperIntl('market.sports'),
      route: "Sports",
      channelRequestParam: "Sports",
    },
    {
      title: wrapperIntl('market.comics'),
      route: "Comics",
      channelRequestParam: "Conicbooks",
    },
  ]

  let { channel } = useParams()
  const history = useHistory()
  const { active, chainId } = useActiveWeb3React()
  // const { exportErc20Info } = useToken()

  const [getpollsVariables, _setGetPollsVariables] = useState({ contract: '' })
  const [getpollsMethods, _setGetPollsMethods] = useState(QueryMarketTradePools)

  const setGetPollsVariables = (v) => {
    // console.log(v)
    if (!v.contract) {
      _setGetPollsMethods(QueryMarketTradePools_0)
    } else {
      _setGetPollsMethods(QueryMarketTradePools)
    }
    _setGetPollsVariables(v)
  }
  const { data } = useQuery(getpollsMethods, { variables: getpollsVariables, skip: getpollsVariables.contract === '' })


  const { sign_Axios } = useAxios();
  const [tokenList, setTokenList] = useState([]);
  const [filterList, setFilterList] = useState([]);
  // const [channel, setChannel] = useState(
  //   type === NFT_CATEGORY.Sports ? NFT_CATEGORY.Sports :
  //     type === NFT_CATEGORY.ComicBooks ? NFT_CATEGORY.ComicBooks :
  //       NFT_CATEGORY.FineArts);



  const [loading, setLoding] = useState(true)


  const [length, setLength] = useState(4);
  const [coinList, setCoinList] = useState([])
  const [channelRequestParam, setChannelRequestParam] = useState(
    channel === NavList[0].route ? NavList[0].channelRequestParam :
      channel === NavList[1].route ? NavList[1].channelRequestParam :
        NavList[2].channelRequestParam);
  const [categoryRequestParam, setCategoryRequestParam] = useState(wrapperIntl("Category.All"))


  /* type = 'video' */

  /* useEffect(() => {
    console.log("type:", type)
    console.log("categoryRequestParam:", categoryRequestParam)
  }, [type, categoryRequestParam]) */

  useEffect(() => {
    // if (!active) return

    if (chainId) {
      // console.log(getCoinList(chainId))
      setCoinList([{
        value: 'All'
      }, ...getCoinList(chainId).filter(item => item.contract)])
    }
    if (data) {
      // console.log(data)
      const tradePools = data.tradePools.map(item => ({
        ...item,
        poolType: AUCTION_TYPE.FixedSwap
      })).filter(item => item.state !== 1)
      const tradeAuctions = data.tradeAuctions.map(item => ({
        ...item,
        price: item.lastestBidAmount !== '0' ? item.lastestBidAmount : item.amountMin1,
        poolType: AUCTION_TYPE.EnglishAuction
      }))
        .filter(item => item.state !== 1 && item.poolId !== 0)

      const pools = tradePools.concat(tradeAuctions);
      console.log(pools)
      const list = pools.map(item => item.tokenId);
      const cts_list = pools.map(item => item.token0);
      // console.log(pools)

      setLength(list.length);
      setLoding(true)
      // console.log(pools)
      // const channel_2 = channel === 'Comics' ? 'Conicbooks' : channel
      sign_Axios.post(Controller.items.getitemsbyfilter, {
        ids: list,
        cts: cts_list,
        /* category: type, */
        category: categoryRequestParam,
        channel: channelRequestParam,
      })
        .then(res => {
          if (res.status === 200 && res.data.code === 1) {
            // const list = res.data.data.map((item, index) => {
            //   const poolInfo = pools.find(pool => pool.tokenId === item.id);
            //   return {
            //     ...item,
            //     poolType: poolInfo.poolType,
            //     poolId: poolInfo.poolId,
            //     price: poolInfo.price,
            //     createTime: poolInfo.createTime,
            //     token1: poolInfo.token1
            //   }
            // })

            const list = pools.map((item, index) => {
              const poolInfo = res.data.data.find(r => item.tokenId === r.id);
              // console.log(poolInfo)
              return {
                ...poolInfo,
                category: poolInfo?.category,
                poolType: item.poolType,
                poolId: item.poolId,
                price: item.price,
                createTime: item.createTime,
                token1: item.token1
              }
            }).filter(item => item.fileurl)
              .sort((a, b) => b.createTime - a.createTime);
            setTokenList(list);
            setFilterList(list);
            setLoding(false)
            // console.log('---setFilterList---', list)
          }
        })
        .catch(() => {
          setLoding(false)
        })
    }
    // eslint-disable-next-line
  }, [active, data, channel, categoryRequestParam])

  const handleChange = (filterSearch) => {
    const list = tokenList.filter(item => item.itemname?.toLowerCase().indexOf(filterSearch) > -1
      || item.owneraddress?.toLowerCase().indexOf(filterSearch) > -1);
    setFilterList(list);
  }

  const renderListByChannel = (channel) => {
    switch (channel) {
      case 'FineArts':
        return <ul className={`list_wrapper ${channel}`}>
          {filterList.map((item, index) => {
            return <li key={index}>
              <CardItem
                category={item.category}
                cover={item.fileurl}
                name={item.itemname}
                cardId={item.poolId}
                nftId={item.id}
                price={item.price}
                token1={item.token1}
                poolType={item.poolType}
                litimgurl={item.litimgurl}
              />
            </li>
          })}
        </ul>

      default:
        return <ul className={`list_wrapper ${channel}`}>
          {filterList.map((item, index) => {
            return <li key={index}>
              <CardItem
                category={item.category}
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
    }
  }



  return (
    <MarketplaceStyled>
      <ul className="nav_wrapper">
        {/* {'Fine Arts、Sports、Comic Books'.split('、').map(e => ({ name: e })).map((item) => {
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
              history.push('/Marketplace/' + nav.route)
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
        {(active && localStorage.getItem('JWT_TOKEN_V2')) && <li className="link">
          <Button onClick={() => { history.push('/MyMarket') }}>
            {wrapperIntl('market.myMarket')}
          </Button>
        </li>}
      </ul>
      <div className="filterBox">
        <Search placeholder={wrapperIntl('market.placeholder')} onChange={handleChange} />

        <PullRadioBox
          prefix={wrapperIntl("Category.Category") + ':'}
          width={'205px'}
          options={[
            { value: wrapperIntl("Category.All"), },
            { value: wrapperIntl("Category.Image"), },
            { value: wrapperIntl("Category.Video"), },
          ]}
          defaultValue={wrapperIntl("Category.All")}
          onChange={(option) => {
            console.log(option)
            switch (option.value) {
              case wrapperIntl("Category.All"):
                setCategoryRequestParam('')
                break;

              case wrapperIntl("Category.Image"):
                setCategoryRequestParam('Image')
                break;

              case wrapperIntl("Category.Video"):
                setCategoryRequestParam('Video')
                break;

              default:
                break;
            }
          }}
        />

        {coinList.length > 0 && <PullRadioBox prefix={'Currency:'}
          width={'205px'} options={coinList}
          // defaultValue={chainId === 56 ? 'BNB' : 'ETH'} 
          defaultValue={'All'}
          onChange={(item) => {
            // console.log(item)
            if (item) {
              setLoding(false)
              setGetPollsVariables({ contract: item.contract })
            }
          }} />}

        <PullRadioBox prefix={'Sort by:'} width={'204px'} options={[{ value: 'New' }, { value: 'Popular' }]} defaultValue='New' onChange={(item) => {
          // console.log(item)
        }} />
      </div>

      {loading && <SkeletonNFTCards n={length} ></SkeletonNFTCards>}
      {renderListByChannel(channel)}

      {/* <PagingControls /> */}
    </MarketplaceStyled>
  )
}


