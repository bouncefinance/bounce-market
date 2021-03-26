import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import UpdateTopBarImg from '../Myprofile/MyBrands/updateTopBarImg'
import edit_white from '@assets/images/icon/edit_white.svg'
import PagingControls from '../component/Other/PagingControls'
import PullRadioBox from '@/components/UI-kit/Select/PullRadioBox'
import Search from '../component/Other/Search'
import { useHistory } from 'react-router'
import { CardItem } from '../Marketplace/CardItem'

import example_2 from '@assets/images/example_2.svg'

const AirHomeStyled = styled.div`
.top_bar{
  position: relative;
    .bg_wrapper{
        width: 100%;
        height: 180px;
        background: linear-gradient(154.16deg, #306AFF 6.12%, #3E74FE 49.44%, #003BD3 89.29%);
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
            width: 124px;
            height: 48px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 20px;
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
  // icon: nav_image,
  route: 'Images'
}, {
  name: 'Video',
  // icon: nav_video,
  route: 'Video'
}, {
  name: 'Audios',
  // icon: nav_audio,
  route: 'Audio'
}, {
  name: 'Game',
  // icon: nav_game,
  route: 'Games'
}, {
  name: 'Others',
  // icon: nav_other,
  route: 'Others'
}]

export function AirHome() {
  const history = useHistory()
  const [openUpdateTopBarImg, setOpenUpdateTopBarImg] = useState(false)
  const run = () => { }
  // test data
  const brandInfo = {
    bandimgurl: `https://market-test.bounce.finance/pngfileget/blob-1616653069.png`
  }
  const userImage = `https://market-test.bounce.finance/jpgfileget/%E6%B3%B0%E5%8B%922-1616658302.jpg`

  const type = 'Images'
  const renderListByType = (type) => {
    switch (type) {
      case 'Images':
        return <ul className={`list_wrapper ${type}`}>
          {[...new Array(16)].map((item, index) => {
            return <li key={index}>
              <CardItem
                cover={example_2}
                name={'Image Name'}
                cardId={index + 1}
                price={'0.93512 ETH '}
              />
            </li>
          })}
        </ul>
      default:
        return
    }
  }
  return <AirHomeStyled>
    <div className="top_bar">
      <div className='bg_wrapper' style={brandInfo.bandimgurl ? { backgroundSize: '100%!important', background: `url(${brandInfo.bandimgurl}) center center no-repeat` } : {}}>
        <button onClick={() => setOpenUpdateTopBarImg(true)}>
          <img src={edit_white} alt="" />
          <p>Change</p>
        </button>
      </div>
      <div className="userinfo">
        <img src={userImage} alt="" />
        <h2>Unnamed User</h2>
        <p>0x33a9b7ed8c71c6910fb4a9bc41de2391b74c2976</p>
      </div>
    </div>
    <MarketplaceStyled>
      {false && <ul className="nav_wrapper">
        {nav_list.map((item) => {
          return <li key={item.name} className={type === item.route ? 'active' : ''} onClick={() => {
            history.push(`/Marketplace/${item.route}`)
          }}>
            {/* <img src={item.icon} alt="" /> */}
            <p>{item.name}</p>
          </li>
        })}
      </ul>}
      <ul className="nav_wrapper">
        {'Fine Arts、Sports、Comic Books'.split('、').map(e => ({ name: e })).map((item) => {
          return <li key={item.name} className={type === item.name ? 'active' : ''} onClick={() => {
            history.push(`/Marketplace/${item.name}`)
          }}>
            <p>{item.name}</p>
          </li>
        })}
      </ul>

      <div className="filterBox">
        <Search placeholder={'Search Items and Accounts'} />

        <PullRadioBox prefix={'Gategory:'} width={'205px'} options={[{ value: 'Image' }]} defaultValue='Image' onChange={(item) => {
          // console.log(item)
        }} />

        <PullRadioBox prefix={'Currency:'} width={'205px'} options={[{ value: 'ETH' }]} defaultValue='ETH' onChange={(item) => {
          // console.log(item)
        }} />

        <div style={{ opacity: 0, }}>
          <PullRadioBox prefix={'Sort by:'} width={'204px'} options={[{ value: 'New' }, { value: 'Popular' }]} defaultValue='New' onChange={(item) => {
            // console.log(item)
          }} />
        </div>
      </div>

      {renderListByType(type)}

      <PagingControls />
    </MarketplaceStyled>
    <UpdateTopBarImg open={openUpdateTopBarImg} setOpen={setOpenUpdateTopBarImg} run={run} />
  </AirHomeStyled>
}

// http://localhost:8889/AirHome/88/Images