import React, { useCallback, useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import UpdateTopBarImg from '../Myprofile/MyBrands/updateTopBarImg'
import edit_white from '@assets/images/icon/edit_white.svg'
import PullRadioBox from '@/components/UI-kit/Select/PullRadioBox'
import Search from '../component/Other/Search'
import { useHistory, useParams } from 'react-router'
import { CardItem } from '../Marketplace/CardItem'

import icon_arts from '@assets/images/icon/image.svg'
import icon_comics from '@assets/images/icon/comics.svg'
import icon_sport from '@assets/images/icon/sport.svg'
import { useLazyQuery } from '@apollo/client'
import { QueryBrandTradeItems, QueryOwnerBrandItems } from '@/utils/apollo'
import { useActiveWeb3React } from '@/web3'
import useAxios from '@/utils/useAxios'
import { Controller } from '@/utils/controller'
// import { weiToNum } from '@/utils/useBigNumber'
import { AUCTION_TYPE, NFT_CATEGORY } from '@/utils/const'
import themeBgImg from '@assets/images/big/d84d87b4548a138b206be2bae58a0362.png'
import useWrapperIntl from '@/locales/useWrapperIntl'

const AirHomeStyled = styled.div`
.top_bar{
  position: relative;
    .bg_wrapper{
        width: 100%;
        height: 180px;
        /* background: linear-gradient(154.16deg, #306AFF 6.12%, #3E74FE 49.44%, #003BD3 89.29%); */
        background: url(${themeBgImg}) center center no-repeat;
        position: relative;
        background-size: 100%!important;
        button{
            background: none;
            width: 124px;
            height: 40px;
            box-sizing: border-box;
            border: 1px solid #fff;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 28px;
            right: 40px;
            cursor: pointer;
            img{
                margin-right: 6.8px;
            }
        }
    }
   .userinfo{
     text-align: center;
     margin-top: -80px;
      z-index: 2;
      position: relative;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
     img{
        width: 160px;
        height: 160px;
        border-radius: 100%;
     }
     h2{
       font-size: 24px;
       color:#000;
       margin-top: 15px;
     }
     p{
       font-size: 16px;
       color: #1F191B;
       margin-top: 5px;
     }
   }
}
`

const MarketplaceStyled = styled.div`
    width: 1100px;
    margin: 0 auto;

    .nav_wrapper{
        width: 1100px;
        margin: 0 auto;
        margin-top: 50px;
        display: flex;
        padding-bottom: 16px;
        border-bottom: 2px solid rgba(0,0,0,.1);
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
    }

    .filterBox{
        margin-top: 32px;
        /* margin-bottom: 50px; */
        display: flex;
        justify-content: space-between;
    }

    .list_wrapper{
        width: 1100px;
        min-height: 260px;
        flex: 1;
        margin: 0 auto 32px auto;
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

export function AirHome() {
  const history = useHistory()
  const [openUpdateTopBarImg, setOpenUpdateTopBarImg] = useState(false)
  const run = () => { }

  const { account, active } = useActiveWeb3React();
  const { id, standard, channel, /* type */ } = useParams();
  const { sign_Axios } = useAxios();

  const [brandInfo, setBrandInfo] = useState({});
  const [tokenList, setTokenList] = useState([]);
  const [ctList, setCtList] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [pools, setPools] = useState([]);

  const { wrapperIntl } = useWrapperIntl()

  /* const type = "Image" */

  const NavList = [
    {
      title: wrapperIntl("AirHome.fineArts"),
      route: "FineArts",
      channelRequestParam: "Fine Arts",
    },
    {
      title: wrapperIntl("AirHome.sports"),
      route: "Sports",
      channelRequestParam: "Sports",
    },
    {
      title: wrapperIntl("AirHome.comics"),
      route: "Comics",
      channelRequestParam: "Conicbooks",
    },
  ]

  const [channelRequestParam, setChannelRequestParam] = useState(
    channel === NavList[0].route ? NavList[0].channelRequestParam :
      channel === NavList[1].route ? NavList[1].channelRequestParam :
        NavList[2].channelRequestParam);
  const [categoryRequestParam, setCategoryRequestParam] = useState(wrapperIntl("Category.All"))
  
  // useEffect(() => {
  //   console.log("categoryRequestParam:", categoryRequestParam)
  // }, [categoryRequestParam])
  
  const handleBrandTradeItems = useCallback((pools) => {
    // console.log('pools',tokenList,categoryRequestParam,channelRequestParam)
    /* const chanel_2 =  channel === 'Comics' ? 'Conicbooks' : channel; */

    sign_Axios.post(Controller.items.getitemsbyfilter, {
      ids: tokenList,
      cts: ctList,
      /* category: type, */
      category: categoryRequestParam,
      channel: channelRequestParam,
    })
      .then(res => {
        if (res.status === 200 && res.data.code === 1) {
          const list = pools.map(poolInfo => {
            const item = res.data.data.find(item => poolInfo.tokenId === item.id);
            return {
              ...item,
              poolType: poolInfo ? poolInfo.poolType : null,
              poolId: poolInfo ? poolInfo.poolId : null,
              price: poolInfo && poolInfo.price,
              createTime: poolInfo && poolInfo.createTime,
              token1: poolInfo && poolInfo.token1
            }
          })

          const result = list
            // .filter(item => item.poolId || item.poolId === 0)
            .sort((a, b) => b.createTime - a.createTime);
          setItemList(result);
        }
      })
    // eslint-disable-next-line
  }, [channel, ctList, tokenList, channelRequestParam, categoryRequestParam]);

  const [getBrandTradeItems, brandTradeItems] = useLazyQuery(QueryBrandTradeItems, {
    variables: { tokenList: tokenList },
    fetchPolicy: "network-only",
    onCompleted: () => {
      const tradePools = brandTradeItems.data.tradePools.map(item => ({
        ...item,
        poolType: AUCTION_TYPE.FixedSwap
      }))
      const tradeAuctions = brandTradeItems.data.tradeAuctions.map(item => ({
        ...item,
        price: item.lastestBidAmount !== '0' ? item.lastestBidAmount : item.amountMin1,
        poolType: AUCTION_TYPE.EnglishAuction
      }));
      const pools = tradePools.concat(tradeAuctions);
      setPools(pools);
      handleBrandTradeItems(pools);
    }
  })

  const handleBrandItems = (data) => {
    const brands = [].concat(
        (data?.bounce721Brands ?? [])[0],
        (data?.bounce1155Brands ?? [])[0]
      )
      .map(v => (v?.tokenList ?? []).map(e => ({ ...e, nft: v.nft }))).flat()
    const tokenList = brands.map(item => item.tokenId);
    const ctList = brands.map(item => item.nft);
    // console.log(brands, tokenList, ctList)
    setTokenList(tokenList);
    setCtList(ctList);
    getBrandTradeItems();
  }

  const [getBrandItems, brandItems] = useLazyQuery(QueryOwnerBrandItems, {
    variables: { owner: brandInfo.owneraddress },
    fetchPolicy: "network-only",
    onCompleted: () => {
      handleBrandItems(brandItems.data);
    }
  })

  useEffect(() => {
    if (!active) return;
    sign_Axios.post(Controller.brands.getbrandbyid, {
      id: Number(id)
    })
      .then(res => {
        if (res.status === 200 && res.data.code === 1) {
          const data = res.data.data;
          // console.log(data)
          setBrandInfo(data);
          getBrandItems();
          if (channel && tokenList.length > 0) {
            handleBrandTradeItems(pools);
          }
        } else {
          
        }
      })
    // eslint-disable-next-line
  }, [active, id, channel, categoryRequestParam])

  const renderListByChannel = (channel) => {
    switch (channel) {
      case 'FineArts':
        return <ul className={`list_wrapper ${channel}`} style={{ marginBottom: 30 }}>
          {itemList.map((item, index) => {
            return <li key={index}>
              <CardItem
                poolType={item.poolType}
                cover={item.fileurl}
                name={item.itemname}
                cardId={item.poolId}
                price={item.price}
                token1={item.token1}
                category={item.category}
              />
            </li>
          })}
        </ul>
      default:
        return <ul className={`list_wrapper ${channel}`} style={{ marginBottom: 30 }}>
          {itemList.map((item, index) => {
            return <li key={index}>
              <CardItem
                poolType={item.poolType}
                cover={item.fileurl}
                name={item.itemname}
                cardId={item.poolId}
                price={item.price}
                token1={item.token1}
                category={item.category}
              />
            </li>
          })}
        </ul>
    }
  }
  
  return <AirHomeStyled>
    <div className="top_bar">
      <div className='bg_wrapper' style={brandInfo?.bandimgurl ? { backgroundSize: '100%!important', background: `url(${brandInfo.bandimgurl}) center center no-repeat` } : {}}>
        {brandInfo?.owneraddress && String(brandInfo.owneraddress).toLowerCase() === String(account).toLowerCase() && <button onClick={() => setOpenUpdateTopBarImg(true)}>
          <img src={edit_white} alt="" />
          <p>{wrapperIntl("AirHome.Change")}</p>
        </button>}
      </div>
      <div className="userinfo">
        <img src={/* brandInfo.bandimgurl */brandInfo.imgurl} alt="" />
        <h2>{brandInfo.ownername}</h2>
        <p>{brandInfo.contractaddress}</p>
      </div>
    </div>
    <MarketplaceStyled>
      <ul className="nav_wrapper">
        {/* {'Fine Arts、Sports、Comic Books'.split('、').map(e => ({ name: e })).map((item) => {
          return <li key={item.name} className={channel === item.name ? 'active' : ''} onClick={() => {
            history.push(`/AirHome/${id}/${standard}/${item.name}`)
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
              history.push(`/AirHome/${id}/${standard}/${nav.route}`)
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
      </ul>

      <div className="filterBox">
        <Search placeholder={ wrapperIntl("AirHome.placeholder")} />

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
                setCategoryRequestParam('')
                break;
            }
          }}
        />

        <PullRadioBox prefix={'Currency:'} width={'205px'} options={[{ value: 'BNB' }]} defaultValue='BNB' onChange={(item) => {
          // console.log(item)
        }} />

        <div style={{ opacity: 0, }}>
          <PullRadioBox prefix={'Sort by:'} width={'204px'} options={[{ value: 'New' }, { value: 'Popular' }]} defaultValue='New' onChange={(item) => {
            // console.log(item)
          }} />
        </div>
      </div>

      {renderListByChannel(channel)}

      {/* <PagingControls /> */}
    </MarketplaceStyled>
    <UpdateTopBarImg open={openUpdateTopBarImg} setOpen={setOpenUpdateTopBarImg} run={run} />
  </AirHomeStyled>
}

