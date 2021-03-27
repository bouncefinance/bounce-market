import React, { useEffect, useState } from 'react'
import CommonHeader from '../CommonHeader'
import styled from 'styled-components'
import Search from './Search'
import { PullRadioBox } from '@components/UI-kit'
import { CardItem, AddCardItem } from './CardItem'
import { useLazyQuery } from '@apollo/client';
import { QueryMyNFT } from '@/utils/apollo'
import { useActiveWeb3React } from '@/web3'
import useAxios from '@/utils/useAxios'
import { Controller } from '@/utils/controller'

const MyInventoryStyled = styled.div`
    width: 1100px;
    margin: 0 auto;
    .filterBox{
        margin-top: 32px;
        /* margin-bottom: 50px; */
        display: flex;
        justify-content: space-between;
    }

    ul.list{
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 84px;

        li{
            margin-top: 32px;
            margin-right: 17px;

            &:nth-child(4n){
                margin-right: 0px;
            }
        }
    }
`

export default function Index() {
  const { account, active } = useActiveWeb3React();
  const { sign_Axios } = useAxios();
  const [itemList, setItemList] = useState([]);
  const [type, setType] = useState('image');

  const handleMyNFT = (data) => {
    const nft721Items = data.nft721Items.map(item => item.tokenId);
    const nft1155Items = data.nft1155Items.map(item => item.tokenId);
    const list = nft721Items.concat(nft1155Items);
    sign_Axios.post(Controller.items.getitemsbyfilter, {
      ids: list,
      category: type,
      channel: ''
    })
    .then(res => {
      if (res.status === 200 && res.data.code === 1) {
        setItemList(res.data.data);
      }
    })
  }

  const [getMyNFT, { data }] = useLazyQuery(QueryMyNFT, 
    {variables: { user: account },
    onCompleted: () => {
      handleMyNFT(data);
    }
  });
  

  useEffect(() => {
    if (!active) return;
    getMyNFT();
    
  }, [active, getMyNFT]);


  return (
    <>
      <CommonHeader />
      <MyInventoryStyled>
        <div className="filterBox">
          <Search placeholder={'Search Items, Shops and Accounts'} />

          <PullRadioBox prefix={'Status:'} options={[{
            value: 'All'
          }, {
            value: 'Listed'
          }, {
            value: 'Unlisted'
          }]} defaultValue='All' onChange={(item) => {
            // console.log(item)
          }} />

          <PullRadioBox prefix={'Categories:'} options={[{
            value: 'Image'
          }, {
            value: 'Video'
          }, {
            value: 'Audio'
          }, {
            value: 'Games'
          }, {
            value: 'Others'
          }]} defaultValue='Image' onChange={(item) => {
            setType(item.value);
          }} />
        </div>

        <ul className="list">
          <li>
            <AddCardItem />
          </li>
          {itemList.map((item, index) => {
            return <li key={index}>
              <CardItem 
                nftId={item.id} 
                cover={item.fileurl} 
                itemname={item.itemname}
                user={item.ownername}
              //  status={index % 2 === 0 ? 'Listed' : ''} 
                status=''
              />
            </li>
          })}
        </ul>
      </MyInventoryStyled>
    </>
  )
}
