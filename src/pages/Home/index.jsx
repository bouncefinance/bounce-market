import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CardBanner from './CardBanner'
import CardGroup from './CardGroup'
import PopularItem from './PopularItem'
import BrandsItem from './BrandsItem'
// import RequestsItem from './RequestsItem'
import arrows_white from '@assets/images/icon/arrows-white.svg'
import img_banner from '@assets/images/banner.svg'
import img_example_1 from '@assets/images/example_1.svg'
// import img_alpaca_city from '@assets/images/alpaca_city.svg'
import two_setting from './assets/two-setting.svg'
import { Link } from 'react-router-dom'
import useAxios from '@/utils/useAxios'
import { useWeb3React } from '@web3-react/core'
import { SkeletonBrandCards } from '../component/Skeleton/BrandItem'
// import { myContext } from '@/redux/index.js';


import { useQuery } from '@apollo/client'
import { QueryTradePools } from '@/utils/apollo'
import { useActiveWeb3React } from '@/web3'
// import useToken from '@/utils/useToken'
import { weiToNum } from '@/utils/useBigNumber'

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

      .banner_img{
        width: 1100px;
        height: 100%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;


        h1{
          width: 517px;
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
          background-color:#000;
          cursor: pointer;
          margin-top: 24px;
          a{
            color: #fff;
          }
        }
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
  .load_more{
    height: 48px;
    line-height: 48px;
    width: 280px;
    border-radius: 0px;
    background: #000000;
    color: #fff;
    font-size: 14px;
    text-align: center;
    margin: auto;
    margin-top:32px;
    cursor: pointer;
    user-select: none;
  }
`

const banner_Nav = [
  // ----sort----
  { name: 'New' },
  { name: 'Popular' },
  // ----channel----
  { name: 'Fine Arts' },
  { name: 'Sports' },
  { name: 'Comic Books' },
]

export default function Index() {
  // const { state } = useContext(myContext);
  const { sign_Axios } = useAxios()
  const { account } = useWeb3React();
  const [brands, setbrands] = useState([])
  const { data } = useQuery(QueryTradePools)
  const { active } = useActiveWeb3React()
  // const { exportArrayNftInfo } = useToken()
  const [loadingBrands, setLoadingBrands] = useState(false)

  useEffect(() => {
    if (!account) {
      return
    }

    const init = async () => {
      setLoadingBrands(true)
      const brandsRes = await sign_Axios.post('/api/v2/main/auth/getpopularbrands', {})
      setLoadingBrands(false)
      if (brandsRes.data.code === 200 || brandsRes.data.code === 1) {
        const brands = brandsRes.data.data
        setbrands(brands)
        // console.log('---brands----', brands)
      } else {
        // TODO ERROR SHOW
        alert('error')
      }
    }

    init()
    // eslint-disable-next-line
  }, [account])

  useEffect(() => {
    if (!active || !data) return
    // console.log(data)
    const tradeAuctions = data.tradeAuctions || []
    const tradePools = data.tradePools || []

    const pools = tradePools.concat(tradeAuctions);
    const list = pools.map(item => item.tokenId);

    sign_Axios.post('/api/v2/main/auth/getitemsbyfilter', {
      ids: list,
      category: '',
      channel: ''
    })
      .then(res => {
        if (res.status === 200 && res.data.code === 1) {
          const list = res.data.data.map((item, index) => {
            const poolInfo = pools.find(pool => pool.tokenId === item.id);
            return {
              ...item,
              poolType: poolInfo.poolType,
              poolId: poolInfo.poolId,
              price: poolInfo.price ? weiToNum(poolInfo.price) : '--',
              createTime: poolInfo.createTime
            }
          })
          const list_2 = list.sort((a, b) => b.createTime - a.createTime)
          console.log(list_2)
          // const list_3 = list_2.sort((a, b) => b.createTime - a.createTime)
          // setTokenList();

          // setLoding(false)
        }
      })
      .catch(() => { })
    // const dataList = [...data.tradeAuctions,]
    // eslint-disable-next-line
  }, [active, data])



  return (
    <HomeStyled>
      <div className="banner">
        <ul>
          {banner_Nav.map((item) => {
            return <li key={item.name}><Link to={`/Marketplace/${item.name}`}>{item.name}</Link></li>
          })}
        </ul>
        <div className="banner_wrapper">
          <div className='banner_img'>
            <div className='left'>
              <h1>On Bounce you will find
                    unique content for every taste</h1>
              <button>
                <Link to="/Marketplace">Explore</Link>
              </button>
            </div>

            <div className="right">
              <img src={img_banner} alt="" />
            </div>
          </div>
        </div>
      </div>

      <CardBanner />

      <CardGroup title='Most Popular Items' link='' marinTop='64px'>
        {[...new Array(4)].map((item, index) => {
          return <PopularItem key={index} src={img_example_1} name='Digital Image Name' price='0,9931 ETH' />
        })}
      </CardGroup>
      <div className="load_more">Load More</div>

      <CardGroup title='Hotest Brands' link='/Brands'>
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
            <h3>Create your unique NFT on Bounce</h3>
            <img src={arrows_white} alt="" />
          </div>
        </Link>
        <img className='right' src={two_setting} alt="" />
      </div>
    </HomeStyled>
  )
}