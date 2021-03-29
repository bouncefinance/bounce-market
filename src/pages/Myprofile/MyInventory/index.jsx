import React, { useEffect, useState } from 'react'
import CommonHeader from '../CommonHeader'
import styled from 'styled-components'
// import Search from './Search'
import { PullRadioBox } from '@components/UI-kit'
import { CardItem, AddCardItem } from './CardItem'
import { useLazyQuery } from '@apollo/client';
import { QueryMyNFT, QueryMyTradePools } from '@/utils/apollo'

import { useActiveWeb3React } from '@/web3'
import useAxios from '@/utils/useAxios'
import { Controller } from '@/utils/controller'
import { SkeletonNFTCards } from '@/pages/component/Skeleton/NFTCard'
import { weiToNum } from '@/utils/useBigNumber'

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
  // eslint-disable-next-line
  const [type, setType] = useState('image');
  const [loading, setLoading] = useState(true)
  // const { tradeData } = useQuery(QueryTradePools)
  const [myNftData, setMyNftData] = useState([])
  const [myTradeData, setMyTradeData] = useState([])

  // const handleMyNFT = (data) => {
  //   console.log(data)
  //   const nft721Items = data.nft721Items.map(item => item.tokenId);
  //   const nft1155Items = data.nft1155Items.map(item => item.tokenId);
  //   const list = nft721Items.concat(nft1155Items);

  //   const nft721ItemTar = data.nft721Items.map(item => {
  //     return {
  //       ...item,

  //     }
  //   });

  //   console.log(nft721ItemTar)
  //   // const list_2 = list.sort()
  //   setLoading(true)
  //   sign_Axios.post(Controller.items.getitemsbyfilter, {
  //     ids: list,
  //     category: type,
  //     channel: ''
  //   })
  //     .then(res => {
  //       if (res.status === 200 && res.data.code === 1) {
  //         setItemList(res.data.data);
  //       }
  //       setLoading(false)
  //     })
  // }

  const [getMyNFT, { data }] = useLazyQuery(QueryMyNFT,
    {
      variables: { user: String(account).toLowerCase() },
      fetchPolicy: "network-only",
      onCompleted: async () => {
        // handleMyNFT(data);
        setMyNftData(data || [])
      },
      onError: (err) => {
        console.log('onerror', err);
      }
    });

  const [getMyTradeNFT, { data: traddata }] = useLazyQuery(QueryMyTradePools,
    {
      variables: { user: String(account).toLowerCase() },
      fetchPolicy: "network-only",
      onCompleted: () => {
        // handleMyNFT(data);
        setMyTradeData(traddata || [])
      },
      onError: (err) => {
        console.log('onerror', err);
      }
    });


  useEffect(() => {
    if (!active) return;
    getMyNFT();
    getMyTradeNFT()
  }, [active, account, getMyNFT, getMyTradeNFT]);


  useEffect(() => {
    if (!account || myTradeData.length === 0 || myNftData.length === 0) return
    const nft721_ids = myNftData.nft721Items.map(item => item.tokenId);
    const nft1155Items_ids = myNftData.nft1155Items.map(item => item.tokenId);
    const trade721_ids = myTradeData.tradePools.map(item => item.tokenId);
    const trade1155Items_ids = myTradeData.tradeAuctions.map(item => item.tokenId);

    const tradePools = myTradeData.tradePools.map(item => {
      return {
        ...item,
        poolType: 'fixed-swap'
      }
    });
    const tradeAuctions = myTradeData.tradeAuctions.map(item => {
      return {
        ...item,
        price: item.lastestBidAmount !== '0' ? item.lastestBidAmount : item.amountMin1,
        poolType: 'english-auction'
      }
    });

    const ids_list = nft721_ids.concat(nft1155Items_ids).concat(trade721_ids).concat(trade1155Items_ids)
    const pools = myNftData.nft721Items.concat(myNftData.nft1155Items)
      .concat(tradePools).concat(tradeAuctions)
    console.log(ids_list)
    console.log(pools)
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
              price: item.price && weiToNum(item.price),
              createTime: item.createTime
            }
          })
          // console.log(list)
          setItemList(list.sort((a, b) => b.createTime - a.createTime));
          setLoading(false)
        }
      })
      .catch(() => { })
      // eslint-disable-next-line
  }, [myNftData, myTradeData, account])


  return (
    <>
      <CommonHeader />
      <MyInventoryStyled>
        <div className="flex flex-space-x" style={{ marginTop: '32px' }}>
          {/* <Search placeholder={'Search Items, Shops and Accounts'} /> */}
          <AddCardItem />

          <div className="flex">
            <PullRadioBox prefix={'Items:'} options={[{
              value: 'All'
            },]} defaultValue='All' onChange={(item) => {
              // setType(item.value);
            }} />
            <div style={{ width: '16px' }}></div>
            <PullRadioBox prefix={'Status:'} options={[{
              value: 'All'
            }, {
              value: 'On sale'
            }, {
              value: 'Not on sale'
            }]} defaultValue='All' onChange={(item) => {
              // console.log(item)
            }} />
          </div>

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
          {itemList.map((item, index) => {
            return <li key={index}>
              <CardItem
                nftId={item.id}
                cover={item.fileurl}
                itemname={item.itemname}
                user={item.ownername}
                status={item.poolId && 'Listed'}
                //  status={index % 2 === 0 ? 'Listed' : ''} 
                poolInfo={item}
              />
            </li>
          })}
        </ul>
        {loading && <SkeletonNFTCards n={4} ></SkeletonNFTCards>}
      </MyInventoryStyled>
    </>
  )
}
