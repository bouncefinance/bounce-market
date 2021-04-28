import React, { useEffect, useState } from 'react'
import CommonHeader from '../CommonHeader'
import styled from 'styled-components'
// import Search from './Search'
import { CardItem, AddCardItem, PenddingCardItem } from '../CardItem'
// import { useLazyQuery } from '@apollo/client';
// import { QueryMyNFT } from '@/utils/apollo'
import { useActiveWeb3React } from '@/web3'
import useAxios from '@/utils/useAxios'
import { Controller } from '@/utils/controller'
import { SkeletonNFTCards } from '@/pages/component/Skeleton/NFTCard'
// import { weiToNum } from '@/utils/useBigNumber'
import { AUCTION_TYPE } from '@/utils/const'
import Category from '../Category'

import useWrapperIntl from '@/locales/useWrapperIntl'
// import axios from 'axios';

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

    .noticeWrapper{
      display: flex;
      align-items: center;
      height: 300px;
      .emptyNotive {
        margin: auto;
      }
    }
`


export default function Index() {
  const { account, active } = useActiveWeb3React();
  // FMG: 0xc591be7A2f0999E0de9Edab0e07bddD4E1ee954f
  // xxy: 0x4074A8deA884611F6553932CDF0B8390CDbA427E
  // homie: '0x2D3Fff58da3346dCE601F6DB8eeC57906CDB17bE'
  const current_account = account //account
  const { sign_Axios, axios } = useAxios();
  const [itemList, setItemList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  // eslint-disable-next-line
  // const [type, setType] = useState('image');
  const [loading, setLoading] = useState(true)
  // const { tradeData } = useQuery(QueryTradePools)
  const [myNftData, setMyNftData] = useState([])
  const [myTradeData, setMyTradeData] = useState([])
  // const [myApiData, setMyApiData] = useState([])

  const { wrapperIntl } = useWrapperIntl()
  const [listLength, setListLength] = useState(0)

  const getMyNFT = async () => {
    let myNftData = {
      nft721Items: [],
      nft1155Items: []
    }

    try {
      const params = {
        user_address: current_account
      }
      const res = await axios.get('[V2]/nft', { params })
      if (res.status === 200 && res.data.code === 200) {

        console.log('myNftData', myNftData)
        const data = res.data.data
        myNftData.nft721Items = data.nfts721.filter(item => parseInt(item.token_id) < 9999999999)
        myNftData.nft1155Items = data.nfts1155.filter(item => parseInt(item.token_id) < 9999999999)
      }
    } catch (error) {

    }


    setMyNftData(myNftData)
  }

  // const [getMyTradeNFT, { data: traddata }] = useLazyQuery(QueryMyTradePools,
  //   {
  //     variables: { user: String(current_account).toLowerCase() },
  //     // variables: { user: String('0x647d7adCC163CebE75aBCf81364eF99d06e6cE4E').toLowerCase() },
  //     fetchPolicy: "network-only",
  //     onCompleted: () => {
  //       setMyTradeData(traddata || [])
  //     },
  //     onError: (err) => {
  //       console.log('onerror', err)
  //     }
  //   })

  const getMyTradeNFT = async () => {
    let traddata = {
      tradePools: [],
      tradeAuctions: []
    }

    try {
      const params = {
        offset: 0,
        count: 100,
        user_address: current_account
      }
      const res = await axios.get('pools', { params })
      if (res.status === 200 && res.data.code === 200) {
        traddata = res.data.data
      }
    } catch (error) {

    }



    setMyTradeData(traddata)
  }


  // const getMyApi = async () => {
  //   const params = {
  //     accountaddress: current_account
  //   }
  //   sign_Axios.post('/api/v2/main/getitemsext', params).then(res => {
  //     if (res.status === 200 && res.data.code === 1) {
  //       return res.data.data
  //     } else {
  //       throw new Error('Error:/api/v2/main/getitemsext')
  //     }
  //   }).then(data => {
  //     const apiNftList = wrapperItem(data)
  //     // console.log(apiNftList)
  //     // setItemList([...apiNftList, ...itemList])
  //     const filterList = apiNftList.filter(item => item.itemname && item.itemname !== 'Untitled (External import)')
  //     // console.log(filterList)
  //     setMyApiData(filterList)
  //   })
  // }

  // const wrapperItem = (data) => {
  //   const isArray = Object.prototype.toString.call(data) === '[object Array]';//true
  //   if (isArray) {
  //     const list = data.map(item => {
  //       return {
  //         getType: 'getMyApi',
  //         ...item
  //       }
  //     })
  //     return list
  //   } else {
  //     return []
  //   }
  // }


  useEffect(() => {
    if (!active) return;
    getMyNFT();
    getMyTradeNFT()
    // getMyApi()
    // eslint-disable-next-line
  }, [active, account]);

  useEffect(() => {
    console.log(myTradeData, myNftData)
    const PenddingItem = JSON.parse(window.localStorage.getItem('PenddingItem')) || null

    if (!account || myTradeData.length === 0 || myNftData.length === 0) return



    const nft721_ids = myNftData.nft721Items.map(item => parseInt(item.token_id))
    const nft1155Items_ids = myNftData.nft1155Items.map(item => parseInt(item.token_id));
    const trade721_ids = myTradeData.tradePools.map(item => item.tokenId);
    const trade1155Items_ids = myTradeData.tradeAuctions.map(item => item.tokenId)

    const nft721_cts = myNftData.nft721Items.map(item => item.token0 || item.contract_addr);
    const nft1155Items_cts = myNftData.nft1155Items.map(item => item.token0 || item.contract_addr);
    const trade721_cts = myTradeData.tradePools.map(item => item.token0 || item.contract);
    const trade1155Items_cts = myTradeData.tradeAuctions.map(item => item.token0 || item.contract)

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
    }).filter(item => item.state !== 1)




    const ids_list = nft721_ids.concat(nft1155Items_ids).concat(trade721_ids).concat(trade1155Items_ids)
    const cts_list = nft721_cts.concat(nft1155Items_cts).concat(trade721_cts).concat(trade1155Items_cts)

    const pools = myNftData.nft721Items.concat(myNftData.nft1155Items)
      .concat(tradePools).concat(tradeAuctions)

    // console.log(pools)

    if (PenddingItem) {
      if ([...ids_list].includes(PenddingItem.tokenId)) return window.localStorage.setItem('PenddingItem', null)
      ids_list.unshift(PenddingItem.tokenId)
      cts_list.unshift(PenddingItem.contract)
      pools.unshift({ ...PenddingItem, isPendding: true })
    }
    sign_Axios.post(Controller.items.getitemsbyfilter, {
      ids: ids_list,
      cts: cts_list,
      category: '',
      channel: ''
    })
      .then(res => {

        if (res.status === 200 && res.data.code === 1) {

          const res_data = res.data.data
          console.log(pools)
          console.log(res_data)
          const list = pools.map((item, index) => {
            const poolInfo = res_data.find(res => {
              return (item.tokenId === res.id || parseInt(item.token_id) === res.id)
                && (
                  String(item.token0).toLowerCase() === String(res.contractaddress).toLowerCase() ||
                  String(item.contract).toLowerCase() === String(res.contractaddress).toLowerCase() ||
                  String(item.contract_addr).toLowerCase() === String(res.contractaddress).toLowerCase()
                )
            });

            if (!poolInfo) return {}

            return {
              ...poolInfo,
              poolType: item.poolType,
              poolId: item.poolId,
              price: item.price,
              token1: item.token1,
              createTime: item.createTime,
              isPendding: item.isPendding,
              category: poolInfo.category,
            }

          }).filter(item => item.fileurl && item.itemname !== 'Untitled (External import)')


          console.log(list)
          let result = list.sort((a, b) => a.tokenId - b.tokenId)
          // if (myApiData.length !== 0) {
          //   result = [...myApiData, ...result]
          // }

          setItemList(result);
          setStatusList(result);
          setLoading(false)
        }
      })
      .catch((err) => {



        console.log(err)
      })
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
          {
            active && statusList.length > 0
            ?
            <ul className="list">
              {/* <li>
                <AddCardItem />
              </li> */}
              {statusList.map((item, index) => {
                return <li key={index}>
                  {item.isPendding ? <PenddingCardItem pools={item} category={item.category} /> : <CardItem
                    nftId={item.id}
                    cover={item.fileurl}
                    itemname={item.itemname === '' ? 'Unname (External import)' : item.itemname}
                    user={item.ownername}
                    status={parseInt(item.poolId) >= 0 && wrapperIntl("Listed")}
                    poolType={item.poolType}
                    //  status={index % 2 === 0 ? 'Listed' : ''} 
                    poolInfo={item}
                    category={item.category}
                  />}
                </li>
              })}
            </ul>
            :
            <div className="noticeWrapper">
              <div className="emptyNotive">
                You dosen’t have any NFT
              </div>
            </div>
          }
          {active && loading && <SkeletonNFTCards n={4} ></SkeletonNFTCards>}
        </MyGalleryStyled>
    </>
  )
}
