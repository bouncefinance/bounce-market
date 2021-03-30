import React, { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import UpdateTopBarImg from '../Myprofile/MyBrands/updateTopBarImg'
import edit_white from '@assets/images/icon/edit_white.svg'
import PullRadioBox from '@/components/UI-kit/Select/PullRadioBox'
import Search from '../component/Other/Search'
import { useHistory, useParams } from 'react-router'
import { CardItem } from '../Marketplace/CardItem'

import { useLazyQuery } from '@apollo/client'
import { QueryBrandTradeItems, QueryOwnerBrandItems } from '@/utils/apollo'
import { useActiveWeb3React } from '@/web3'
import useAxios from '@/utils/useAxios'
import { Controller } from '@/utils/controller'
// import Web3 from 'web3'
import { weiToNum } from '@/utils/useBigNumber'

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
  name: 'Image',
  // icon: nav_image,
  route: 'Image'
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

  const { active } = useActiveWeb3React();
  const { id, standard, type } = useParams();
  const { sign_Axios } = useAxios();

  const [brandInfo, setBrandInfo] = useState({});
  const [tokenList, setTokenList] = useState([]);
  const [itemList, setItemList] = useState([]);

  const handleBrandTradeItems = (pools) => {
    sign_Axios.post(Controller.items.getitemsbyfilter, {
      ids: tokenList,
      category: type,
      channel: ''
    })
      .then(res => {
        if (res.status === 200 && res.data.code === 1) {
          const list = res.data.data.map(item => {
            const poolInfo = pools.find(pool => pool.tokenId === item.id);
            return {
              ...item,
              poolId: poolInfo ? poolInfo.poolId : null,
              price: poolInfo ? weiToNum(poolInfo.price, 2) : '--',
            }
          })
          const list_2 = list.filter(item => {
            return item.poolId
          })

          setItemList(list_2);
        }
      })
  }

  const [getBrandTradeItems, brandTradeItems] = useLazyQuery(QueryBrandTradeItems, {
    variables: { tokenList: tokenList },
    fetchPolicy:"network-only",
    onCompleted: () => {
      const tradePools = brandTradeItems.data.tradePools;
      const tradeAuctions = brandTradeItems.data.tradeAuctions;
      handleBrandTradeItems(tradePools.concat(tradeAuctions));
    }
  })

  const handleBrandItems = (data) => {
    const brands = standard === '1' ? data.bounce721Brands[0] : data.bounce1155Brands[0];
    const tokenList = brands.tokenList.map(item => item.tokenId);
    setTokenList(tokenList);
    getBrandTradeItems();
  }

  const [getBrandItems, brandItems] = useLazyQuery(QueryOwnerBrandItems, {
    variables: { owner: brandInfo.owneraddress },
    fetchPolicy:"network-only",
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
        const data = res.data.data;
        setBrandInfo(data);
        getBrandItems();
      })
    // eslint-disable-next-line
  }, [active, id]);


  const renderListByType = (type) => {
    switch (type) {
      case 'Image':
        return <ul className={`list_wrapper ${type}`}>
          {itemList.map((item, index) => {
            return <li key={index}>
              <CardItem
                cover={item.fileurl}
                name={item.itemname}
                cardId={item.poolId}
                price={!!item.price ? `${item.price} ETH` : `--`}
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
      <div className='bg_wrapper' style={brandInfo ? { backgroundSize: '100%!important', background: `url(${brandInfo.bandimgurl}) center center no-repeat` } : {}}>
        <button onClick={() => setOpenUpdateTopBarImg(true)}>
          <img src={edit_white} alt="" />
          <p>Change</p>
        </button>
      </div>
      <div className="userinfo">
        <img src={brandInfo.bandimgurl} alt="" />
        <h2>{brandInfo.ownername}</h2>
        <p>{brandInfo.contractaddress}</p>
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

      {/* <PagingControls /> */}
    </MarketplaceStyled>
    <UpdateTopBarImg open={openUpdateTopBarImg} setOpen={setOpenUpdateTopBarImg} run={run} />
  </AirHomeStyled>
}

