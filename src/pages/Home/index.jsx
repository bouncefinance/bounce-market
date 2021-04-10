import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CardBanner from './CardBanner'
import CardGroup from './CardGroup'
import PopularItem from './PopularItem'
import BrandsItem from './BrandsItem'
// import RequestsItem from './RequestsItem'
import arrows_white from '@assets/images/icon/arrows-white.svg'
import img_banner from '@assets/images/banner2.png'
import img_example_1 from '@assets/images/example_1.svg'
// import img_alpaca_city from '@assets/images/alpaca_city.svg'
import two_setting from './assets/two-setting.svg'
import { Link, useHistory } from 'react-router-dom'
import useAxios from '@/utils/useAxios'
import { useWeb3React } from '@web3-react/core'
import { SkeletonBrandCards } from '../component/Skeleton/BrandItem'
import { NewSkeletonNFTCards } from '../component/Skeleton/NFTCard'
import Button from '@/components/UI-kit/Button/Button'
// import { myContext } from '@/redux'


import { useQuery } from '@apollo/client'
import { QueryTradePools } from '@/utils/apollo'
// import { useActiveWeb3React } from '@/web3'
// import useToken from '@/utils/useToken'
// import { weiToNum } from '@/utils/useBigNumber'
import { AUCTION_TYPE } from '@/utils/const'
import { Controller } from '@/utils/controller'
import useWrapperIntl from '@/locales/useWrapperIntl'


const HomeStyled = styled.div`
  .banner{
    display: flex;
    /* justify-content: center; */
    flex-wrap: wrap;
    &>ul{
      width: 1100px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      height: 37px;
      align-items: center;

      li{
        margin-right: 59px;
        font-weight: 500;
        font-size: 12px;
        color: rgba(36,36,36,.8);
        &:nth-last-child(){
          margin-right: 0;
        }
      }
    }

    .banner_wrapper{
      width: 100%;
      min-width: 1100px;
      height: 280px;
      box-sizing: border-box;
      background-color: #000;
      position: relative;

      .banner_img{
        width: 1100px;
        height: 100%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .content{
          margin: auto;
          position: relative;
          z-index: 1;
          text-align: center;
        }

        .bg{
          position: absolute;
          left: 0px;
          top: 0px;
        }

        h1{
          /* width: 517px; */
          color: #fff;
          font-size: 38px;
          line-height: 46.13px;
        }

        button{
          width: 124px;
          height: 44px;
          box-sizing: border-box;
          border: 1px solid #FFFFFF;
          font-weight: 700;
          color: #fff;
          background-color:rgba(0,0,0,0);
          cursor: pointer;
          margin-top: 24px;
          a{
            color: #fff;
          }
        }
      }
    }
      @media screen and (min-width: 1500px){
        .banner_wrapper{
          background-size: 100%!important;
        }
      }
  }

  .bottom_banner{
      width: 1100px;
      height: 120px;
      box-sizing: border-box;
      background-color: #000;
      margin: 0 auto;
      margin-top: 68px;
      margin-bottom: 84px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left{
        color: #fff;
        display: flex;
        align-items: center;
        margin-left: 28px;
        cursor: pointer;

        h3{
          font-size: 30px;
        }

        img{
          margin-left: 20px;
          width: 30px;
        }
      }

      .right{
        /* margin-top: 25px; */
        margin-right: 67px;
      }
  }

  .Button_LoadMore {
    margin: 0 auto;
    display: flex;
    justify-content: center;
  }

`

/* const banner_Nav = [
  ----sort----
  { name: 'New' },
  { name: 'Popular' },
  ----channel----
  { name: 'Fine Arts' },
  { name: 'Sports' },
  { name: 'Comics' },
] */

export default function Index() {
  // const { state } = useContext(myContext);
  const { sign_Axios } = useAxios()
  const { account, active } = useWeb3React();
  const history = useHistory()
  const [brands, setbrands] = useState([])
  const { data } = useQuery(QueryTradePools)
  // const { data } = []
  const [itemList, setItemList] = useState()
  // const { exportArrayNftInfo } = useToken()
  const [loadingBrands, setLoadingBrands] = useState(false)
  const [loadingItems, setLoadingItems] = useState(true)
  // const { dispatch } = useContext(myContext)
  const { wrapperIntl } = useWrapperIntl()

  useEffect(() => {
    // if (!account) {
    //   return
    // }

    const init = async () => {
      setLoadingBrands(true)
      const brandsRes = await sign_Axios.post('/api/v2/main/getpopularbrands', {})
      setLoadingBrands(false)
      if (brandsRes.data.code === 200 || brandsRes.data.code === 1) {
        const brands = brandsRes.data.data
        const brands_2 = brands.filter(item => {
          return item.id !== 10 && item.id !== 11 && item.id !== 117
        }).slice(0, 4)
        setbrands(brands_2)
        // console.log('---brands----', brands_2)
      } else {
        // TODO ERROR SHOW
        // dispatch({ type: 'Modal_Message', showMessageModal: true, modelType: 'error', modelMessage: "Oops! Something went wrong. Try again." });
      }
    }

    init()
    // eslint-disable-next-line
  }, [account])

  useEffect(() => {
    // if (!active || !data) return
    if (!data) return
    setLoadingItems(true)
    const tradePools = data.tradePools.map(item => ({
      ...item,
      poolType: AUCTION_TYPE.FixedSwap
    })).filter(item => item.state !== 1)
    const tradeAuctions = data.tradeAuctions.map(item => ({
      ...item,
      price: item.lastestBidAmount !== '0' ? item.lastestBidAmount : item.amountMin1,
      poolType: AUCTION_TYPE.EnglishAuction
    })).filter(item => item.state !== 1 && item.poolId !== 0)

    const pools = tradePools.concat(tradeAuctions)
    const list = pools.map(item => item.tokenId)
    const poolIds = pools.map(item => {
      return item.poolId
    })
    const standards = pools.map(item => {
      if (item.poolType === 'fixed-swap') {
        return 1
      } else {
        return 2
      }
    })

    // console.log(standards)

    sign_Axios.post(Controller.pools.getpoolsinfo, {
      poolids: poolIds,
      standards: standards
    }).then(stardRes => {
      sign_Axios.post(Controller.items.getitemsbyids, {
        ids: list,
        // category: '',
        // channel: ''
      })
        .then(res => {

          // console.log(res.data.data)
          if (res.status === 200 && res.data.code === 1) {
            const list = pools.map((pool, index) => {
              const poolInfo = res.data.data.find(item => pool.tokenId === item.id);
              const standardInfo = stardRes.data.data.find(item => pool.poolId === item.poolid);

              return {
                ...poolInfo,
                poolweight: 1,
                ...standardInfo,
                tokenId: pool.tokenId,
                poolType: pool.poolType,
                poolId: pool.poolId,
                price: pool.price,
                createTime: pool.createTime,
                token1: pool.token1
              }
            })
            console.log(list)
            const list_2 = list.sort((a, b) => b.poolweight - a.poolweight)
            const list_3 = list_2.slice(0, 8)

            // console.log(list_3)
            // console.log(list_3)
            // const list_3 = list_2.sort((a, b) => b.createTime - a.createTime)
            setItemList(list_3);
            setLoadingItems(false)
          }
        })
        .catch(() => { })
    })



    // eslint-disable-next-line
  }, [active, data])



  return (
    <HomeStyled>
      <div className="banner">
        {/* <ul>
          {banner_Nav.map((item) => {
            return <li key={item.name}><Link to={`/Marketplace/${item.name}`}>{item.name}</Link></li>
          })}
        </ul> */}
        <div className="banner_wrapper" style={{ background: `url(${img_banner}) center center no-repeat`, backgroundSize: '100%!important', position: 'relative', }}>
          <div className='banner_img'>
            <div className='content'>
              <h1>
                <p>{wrapperIntl('home.banner1')}</p>
                <p>{wrapperIntl('home.banner2')}</p>
              </h1>
              <Link to="/Marketplace">
                <button>{wrapperIntl('home.Explore')}</button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <CardBanner />

      <CardGroup title='Fast movers' link='/Marketplace/FineArts' marinTop='64px'>
        {loadingItems ? <NewSkeletonNFTCards n={8} /> : itemList.map((item, index) => {
          return <PopularItem itemInfo={item} key={index} src={img_example_1} />
        })}
      </CardGroup>

      {/* <div className="load_more" onClick={() => {
        history.push('/Marketplace/FineArts')
      }}>Load More</div> */}
      <div className="Button_LoadMore">
        <Button
          width="280px"
          height="48px"
          value="Load More"
          primary
          onClick={() => {
            history.push('/Marketplace/FineArts')
          }}
        />
      </div>

      <CardGroup title='Name droppers' link='/Brands'>
        {brands.map((item, index) => {
          return <BrandsItem key={index} src={item.imgurl} id={item.id} standard={item.standard} name={item.brandname} />
        })}
        {loadingBrands && <SkeletonBrandCards n={4} />}
      </CardGroup>

      {/* <CardGroup title='Newest Requests' link=''>
        {[...new Array(4)].map((item, index) => {
          return <RequestsItem
            key={index}
            title='B-day Video'
            type='Video'
            context='I want to a custom video for my birthday. It shouldn’t be longer then ~20-30 sec. I want to a custom video for my birthday.
It shouldn’t be longer then ~20-30 sec.'
            price='100 USDT'
          />
        })}
      </CardGroup> */}

      <div className="bottom_banner">

        <Link to="/Factory">
          <div className="left">
            <h3>Create your unique NFT on Fangible</h3>
            <img src={arrows_white} alt="" />
          </div>
        </Link>
        <img className='right' src={two_setting} alt="" />
      </div>
    </HomeStyled>
  )
}