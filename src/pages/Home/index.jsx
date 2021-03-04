import React from 'react'
import styled from 'styled-components'
import CardGroup from './CardGroup'
import PopularItem from './PopularItem'
import BrandsItem from './BrandsItem'
import RequestsItem from './RequestsItem'
import img_banner from '@assets/images/banner.svg'
import img_example_1 from '@assets/images/example_1.svg'
import img_alpaca_city from '@assets/images/alpaca_city.svg'

const HomeStyled = styled.div`
  .banner{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    &>ul{
      display: flex;
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
        }
      }
    }
  }
`

const banner_Nav = [{
  name: 'New'
}, {
  name: 'Popular'
}, {
  name: 'Pictures'
}, {
  name: 'Audios'
}, {
  name: 'Videos'
}, {
  name: 'Games'
}, {
  name: 'Requests'
}]

export default function Index() {
  return (
    <HomeStyled>
      <div className="banner">
        <ul>
          {banner_Nav.map((item) => {
            return <li key={item.name}>{item.name}</li>
          })}
        </ul>
        <div className="banner_wrapper">
          <div className='banner_img'>
            <div className='left'>
              <h1>On Bounce you will find
                    unique content for every taste</h1>
              <button>Explore</button>
            </div>

            <div className="right">
              <img src={img_banner} alt="" />
            </div>
          </div>
        </div>
      </div>

      <CardGroup title='Most Popular Items' link='' marinTop='64px'>
        <PopularItem src={img_example_1} name='Digital Image Name' price='0,9931 ETH' />
        <PopularItem src={img_example_1} name='Digital Image Name' price='0,9931 ETH' />
        <PopularItem src={img_example_1} name='Digital Image Name' price='0,9931 ETH' />
        <PopularItem src={img_example_1} name='Digital Image Name' price='0,9931 ETH' />
      </CardGroup>

      <CardGroup title='Hotest Brands' link=''>
        <BrandsItem src={img_alpaca_city} name='Alpaca City' />
        <BrandsItem src={img_alpaca_city} name='Alpaca City' />
        <BrandsItem src={img_alpaca_city} name='Alpaca City' />
        <BrandsItem src={img_alpaca_city} name='Alpaca City' /> 
      </CardGroup>

      <CardGroup title='Newest Requests' link=''>
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
      </CardGroup>
    </HomeStyled>
  )
}