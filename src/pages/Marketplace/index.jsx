import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useHistory, useParams } from 'react-router'
import Search from '../component/Other/Search'
import { CardItem, VideoCardItem, AudioCardItem } from './CardItem'
import { PullRadioBox } from '@components/UI-kit'

import nav_audio from '@assets/images/icon/nav_audio.svg'
import nav_game from '@assets/images/icon/nav_game.svg'
import nav_image from '@assets/images/icon/nav_image.svg'
import nav_other from '@assets/images/icon/nav_other.svg'
import nav_video from '@assets/images/icon/nav_video.svg'

import useAxios from '@/utils/useAxios'
import { Controller } from '@/utils/controller'
import { useQuery } from '@apollo/client'
import { QueryItesms } from '@/utils/apollo'
import { useActiveWeb3React } from '@/web3'

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

export default function Marketplace() {
  const { type } = useParams()
  const history = useHistory()
  const { active } = useActiveWeb3React()

  const { data } = useQuery(QueryItesms)
  const { sign_Axios } = useAxios();

  const [tokenList, setTokenList] = useState([]);
  const [isSet, setIsSet] = useState(false);
  const [channel, setChannel] = useState('');

  useEffect(() => {
    if (!active) return
    
    if ( data && !isSet) {
      const bounce721Items = data.bounce721Items.map(item => item.tokenId);
      const bounce1155Items = data.bounce1155Items.map(item => item.tokenId);
      const list = bounce721Items.concat(bounce1155Items);
      sign_Axios.post(Controller.items.getitemsbyfilter, {
        ids: list,
        category: type,
        channel: channel
      })
      .then(res => {
        if (res.status === 200 && res.data.code === 1) {
          setIsSet(true);
          setTokenList(res.data.data);
        }
      })
      .catch(() =>{})
    }
  }, [active, data, type, channel, isSet, sign_Axios])


  const renderListByType = (type) => {
    switch (type) {
      case 'Images':
        return <ul className={`list_wrapper ${type}`}>
          {tokenList.map((item, index) => {
            return <li key={index}>
              <CardItem
                cover={item.fileurl}
                name={item.itemname}
                cardId={item.id}
                price={!!item.price ? `${item.price} ETH` : '--'}
              />
            </li>
          })}
        </ul>

      case 'Video':
        return <ul className={`list_wrapper ${type}`}>
          {tokenList.map((item, index) => {
            return <li key={index}>
              <VideoCardItem
                cover={item.fileurl}
                name={item.itemname}
                cardId={item.id}
                price={!!item.price ? `${item.price} ETH` : '--'}
              />
            </li>
          })}
        </ul>

      case 'Audio':
        return <ul className={`list_wrapper ${type}`}>
          {tokenList.map((item, index) => {
            return <li key={index}>
              <AudioCardItem
                cover={item.fileurl}
                name={item.itemname}
                cardId={item.id}
                price={!!item.price ? `${item.price} ETH` : '--'}
                describe={`Audio with a fun birthday song.
                                Recorded using guitar and drums.
                                Please enjoy`}
              />
            </li>
          })}
        </ul>

      case 'Games':
        return <ul className={`list_wrapper ${type}`}>
          {tokenList.map((item, index) => {
            return <li key={index}>
              <CardItem
                cover={item.fileurl}
                name={item.itemname}
                cardId={item.id}
                price={!!item.price ? `${item.price} ETH` : '--'}
              />
            </li>
          })}
        </ul>

      case 'Others':
        return <ul className={`list_wrapper ${type}`}>
          {tokenList.map((item, index) => {
            return <li key={index}>
              <CardItem
                cover={item.fileurl}
                name={item.itemname}
                cardId={item.id}
                price={!!item.price ? `${item.price} ETH` : '--'}
              />
            </li>
          })}
        </ul>

      default:
        return <ul className={`list_wrapper ${type}`}>
          {tokenList.map((item, index) => {
            return <li key={index}>
               <CardItem
                cover={item.fileurl}
                name={item.itemname}
                cardId={item.id}
                price={!!item.price ? `${item.price} ETH` : '--'}
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
        {'Fine Arts、Sports、Comic Books'.split('、').map(e => ({ name: e })).map((item) => {
          return <li key={item.name} className={type === item.name ? 'active' : ''} onClick={() => {
            setIsSet(false);
            setChannel(item.name)
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

        <PullRadioBox prefix={'Sort by:'} width={'204px'} options={[{ value: 'New' }, { value: 'Popular' }]} defaultValue='New' onChange={(item) => {
          // console.log(item)
        }} />
      </div>

      {renderListByType(type)}

      {/* <PagingControls /> */}
    </MarketplaceStyled>
  )
}


