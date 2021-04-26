import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import CardBanner from './CardBanner'
import CardGroup from './CardGroup'
import PopularItem from './PopularItem'
import BrandsItem from './BrandsItem'
// import RequestsItem from './RequestsItem'
import arrows_white from '@assets/images/icon/arrows-white.svg'
// import img_banner from '@assets/images/banner2.png'
import img_banner_fmg from './assets/FMG/FMG.gif'

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


// import { useActiveWeb3React } from '@/web3'
// import useToken from '@/utils/useToken'
// import { weiToNum } from '@/utils/useBigNumber'
import { AUCTION_TYPE } from '@/utils/const'
import { Controller } from '@/utils/controller'
import useWrapperIntl from '@/locales/useWrapperIntl'
import axios from 'axios'

import { myContext } from '@/redux/index.js';

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

const poolsParmas = { offset: 0, count: 1e4 }
let weightMap = new Map()
const HOMETOPLISTNUMBER = 8
const getStandardTypeValue = (e) => e === 2 ? 'english-auction' : 'fixed-swap'
export default function Index() {
  // const { state } = useContext(myContext);
  const { sign_Axios } = useAxios()
  const { account, active } = useWeb3React();
  const history = useHistory()
  const [brands, setbrands] = useState([])
  // const { data } = useQuery(QueryTradePools)

  const [data, setData] = useState()
  const initPools = async (params) => {
    let offset = 0
    const weightRes = await sign_Axios.post(Controller.pools.getpoolsinfobypage, { offset, limit: HOMETOPLISTNUMBER, orderweight: 1 })
    if (weightRes.data.code === 1) {
      console.log('weightRes: ', weightRes)
      // artistpoolweight poolweight poolid id standard
      let { data, total } = weightRes.data
    }
    const res = await axios.get('/pools', { params: params })
    if (res.data.code === 200) {
      setData(res.data.data)
    }
  }
  useEffect(() => {
    initPools(poolsParmas)
  }, [])
  // const { data } = []
  const [itemList, setItemList] = useState()
  // const { exportArrayNftInfo } = useToken()
  const [loadingBrands, setLoadingBrands] = useState(false)
  const [loadingItems, setLoadingItems] = useState(true)
  // const { dispatch } = useContext(myContext)
  const { wrapperIntl } = useWrapperIntl()
  const { dispatch } = useContext(myContext);

  const bannerSetting = {
    img: img_banner_fmg,
    href: 'https://bsc.fmg.art',
    showText: false,
  }

  useEffect(() => {

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
      } else {
        // TODO ERROR SHOW
        // dispatch({ type: 'Modal_Message', showMessageModal: true, modelType: 'error', modelMessage: "Oops! Something went wrong. Try again." });
      }
    }

    init()
    // eslint-disable-next-line
  }, [account])

  return (
    <HomeStyled>
      <div className="banner">
        {/* <ul>
          {banner_Nav.map((item) => {
            return <li key={item.name}><Link to={`/Marketplace/${item.name}`}>{item.name}</Link></li>
          })}
        </ul> */}
        <div
          className="banner_wrapper"
          style={{ background: `url(${bannerSetting.img}) center center no-repeat`, backgroundSize: '100%!important', position: 'relative', cursor: 'pointer' }}
          onClick={() => { window.open(bannerSetting.href) }}
          title={`jump to ${bannerSetting.href}`}
        >
          {
            bannerSetting.showText && <div className='banner_img'>
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
          }
        </div>
      </div>

      <CardBanner />

      <CardGroup title={wrapperIntl('home.fast')} link='/Marketplace/FineArts' marinTop='64px'>
        {loadingItems ? <NewSkeletonNFTCards n={8} /> : itemList.map((item, index) => {
          return <PopularItem itemInfo={item} key={index} src={img_example_1} />
        })}
      </CardGroup>

      <div className="Button_LoadMore">
        <Button
          width="280px"
          height="48px"
          value={wrapperIntl('home.more')}
          primary
          onClick={() => {
            history.push('/Marketplace/FineArts')
          }}
        />
      </div>

      <CardGroup title={wrapperIntl('home.brand')} link='/Brands'>
        {brands.map((item, index) => {
          return <BrandsItem key={index} src={item.imgurl} id={item.id} standard={item.standard} name={item.brandname} />
        })}
        {loadingBrands && <SkeletonBrandCards n={4} />}
      </CardGroup>
      <div className="bottom_banner">
        <Link to="/Factory">
          <div className="left">
            <h3>{wrapperIntl('home.footerBanner')}</h3>
            <img src={arrows_white} alt="" />
          </div>
        </Link>
        <img className='right' src={two_setting} alt="" />
      </div>
    </HomeStyled>
  )
}