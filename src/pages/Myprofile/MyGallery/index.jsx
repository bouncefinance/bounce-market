import React, { useEffect, useState } from 'react'
import CommonHeader from '../CommonHeader'
import styled from 'styled-components'
// import Search from './Search'
import { CardItem, AddCardItem } from '../CardItem'
import { useLazyQuery } from '@apollo/client';
import { QueryMyNFT, QueryMyTradePools } from '@/utils/apollo'
import { useActiveWeb3React } from '@/web3'
import useAxios from '@/utils/useAxios'
import { Controller } from '@/utils/controller'
import { SkeletonNFTCards } from '@/pages/component/Skeleton/NFTCard'
// import { weiToNum } from '@/utils/useBigNumber'
import { AUCTION_TYPE } from '@/utils/const'
import Category from '../Category'

import useWrapperIntl from '@/locales/useWrapperIntl'

const MyGalleryStyled = styled.div`
    width: 1100px;
    margin: 0 auto;
    flex: 1;
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
  const [statusList, setStatusList] = useState([]);
  // eslint-disable-next-line
  // const [type, setType] = useState('image');
  const [loading, setLoading] = useState(true)
  // const { tradeData } = useQuery(QueryTradePools)
  const [myNftData, setMyNftData] = useState([])
  const [myTradeData, setMyTradeData] = useState([])

  const { wrapperIntl } = useWrapperIntl()

  const [getMyNFT, { data }] = useLazyQuery(QueryMyNFT,
    {
      variables: { user: String(account).toLowerCase() },
      // variables: { user: String('0x2d3fff58da3346dce601f6db8eec57906cdb17be').toLowerCase() },
      fetchPolicy: "network-only",
      onCompleted: async () => {
        setMyNftData(data || [])
      },
      onError: (err) => {
        console.log('onerror', err);
      }
    });

  const [getMyTradeNFT, { data: traddata }] = useLazyQuery(QueryMyTradePools,
    {
      variables: { user: String(account).toLowerCase() },
      // variables: { user: String('0x2d3fff58da3346dce601f6db8eec57906cdb17be').toLowerCase() },
      fetchPolicy: "network-only",
      onCompleted: () => {
        setMyTradeData(traddata || [])
      },
      onError: (err) => {
        console.log('onerror', err);
      }
    })


  useEffect(() => {
    if (!active) return;
    getMyNFT();
    getMyTradeNFT()
  }, [active, account, getMyNFT, getMyTradeNFT]);

  useEffect(() => {
    const penddingList = {}
    // { tokenId: 17031, isPendding: true }

    if (!account || myTradeData.length === 0 || myNftData.length === 0) return



    const nft721_ids = myNftData.nft721Items.map(item => item.tokenId);
    const nft1155Items_ids = myNftData.nft1155Items.map(item => item.tokenId);
    const trade721_ids = myTradeData.tradePools.map(item => item.tokenId);
    const trade1155Items_ids = myTradeData.tradeAuctions.map(item => item.tokenId)



    const tradePools = myTradeData.tradePools.map(item => {
      return {
        ...item,
        poolType: AUCTION_TYPE.FixedSwap
      }
    }).filter(item => item.state !== 1);

    const tradeAuctions = myTradeData.tradeAuctions.map(item => {
      return {
        ...item,
        price: item.lastestBidAmount !== '0' ? item.lastestBidAmount : item.amountMin1,
        poolType: AUCTION_TYPE.EnglishAuction
      }
    }).filter(item => item.state !== 1);




    const ids_list = nft721_ids.concat(nft1155Items_ids).concat(trade721_ids).concat(trade1155Items_ids)
    const pools = myNftData.nft721Items.concat(myNftData.nft1155Items)
      .concat(tradePools).concat(tradeAuctions)

    if (penddingList) {
      ids_list.unshift(penddingList.tokenId)
      pools.unshift(penddingList)
    }
    sign_Axios.post(Controller.items.getitemsbyfilter, {
      ids: ids_list,
      category: '',
      channel: ''
    })
      .then(res => {
        if (res.status === 200 && res.data.code === 1) {
          const res_data = res.data.data
          const list = pools.map((item, index) => {
            const poolInfo = res_data.find(res => item.tokenId === res.id);
            return {
              ...poolInfo,
              poolType: item.poolType,
              poolId: item.poolId,
              price: item.price,
              token1: item.token1,
              createTime: item.createTime,
              isPendding: item.isPendding
            }
          }).filter(item => item.fileurl)
          const result = list.sort((a, b) => b.tokenId - a.tokenId)
          setItemList(result);
          setStatusList(result);
          setLoading(false)
        }
      })
      .catch(() => { })
    // eslint-disable-next-line
  }, [myNftData, myTradeData, account])

  return (
    <>
      <CommonHeader />
      <MyGalleryStyled>
        <div className="flex flex-space-x" style={{ marginTop: '32px' }}>
          {/* <Search placeholder={'Search items，Brands and Accounts'} /> */}
          <AddCardItem />
          <Category itemList={itemList} onStatusChange={setStatusList} />

          {/* <PullRadioBox prefix={'Categories:'} options={[{
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
          }} /> */}
        </div>

        <ul className="list">
          {/* <li>
            <AddCardItem />
          </li> */}
          {statusList.map((item, index) => {
            return <li key={index}>
              <CardItem
                nftId={item.id}
                cover={item.fileurl}
                itemname={item.itemname}
                user={item.ownername}
                status={parseInt(item.poolId) >= 0 && wrapperIntl("Listed")}
                poolType={item.poolType}
                //  status={index % 2 === 0 ? 'Listed' : ''} 
                poolInfo={item}
              />
            </li>
          })}
        </ul>
        {loading && <SkeletonNFTCards n={4} ></SkeletonNFTCards>}
      </MyGalleryStyled>
    </>
  )
}
