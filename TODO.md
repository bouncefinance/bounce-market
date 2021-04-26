src\pages\AirHome\index.jsx
```jsx
    const brands = [].concat(
        (data?.bounce721Brands ?? [])[0],
        (data?.bounce1155Brands ?? [])[0]
      )
      .map(v => (v?.tokenList ?? []).map(e => ({ ...e, tokenCnt: v.tokenCnt })))
    const tokenList = brands.map(item => item.tokenId);
    const ctList = brands.map(item => item.tokenCnt);
    // console.log(tokenList, ctList)
    setTokenList(tokenList);
    setCtList(ctList);
    getBrandTradeItems();
```

src\utils\apollo.js
```
export const QueryOwnerBrandItems = gql`
  query nftItems($owner: String!) {
    bounce721Brands(where: {owner: $owner}) {
      tokenCnt
      tokenList {
        tokenId
      } 
    }
    bounce1155Brands(where: {owner: $owner}) {
      tokenCnt
      tokenList {
        tokenId
      }
    }
  }
```

image zip
```js
import { ImgCompressorCreate } from '@utils/img-compressor'
import { Create as ImgCompressorCreate } from 'img-compressor'
const previewImage = await new Promise((resolve, reject) => new ImgCompressorCreate({ mimeType: 'image/jpeg', quality: 0.4 }).compress(blob, {
        success: resolve,
      }))

      
import { ImgToUrl } from '@/utils/imgToUrl'
```

HOME
```jsx
 useEffect(() => {
    // if (!active || !data) return
    if (!active) {
      if (!active) {
        dispatch({
        type: 'Modal_Message',
        showMessageModal: true,
        modelType: 'error',
        modelMessage: wrapperIntl("ConnectWallet"),
        modelTimer: 24 * 60 * 60 * 1000,
        });
      }
    }

    if (!data) return
    setLoadingItems(true)
    const tradePools = data.tradePools.map(item => ({
      ...item,
      poolType: AUCTION_TYPE.FixedSwap
    })).filter(item => item.state !== 1)
    const tradeAuctions = data.tradeAuctions.map(item => ({
      ...item,
      price: item.lastestBidAmount !== '0' ? item.lastestBidAmount : item.amountMin1,
      poolType: AUCTION_TYPE.EnglishAuction
    })).filter(item => item.state !== 1 && item.poolId !== 0)

    const pools = tradePools.concat(tradeAuctions)
    const list = pools.map(item => item.tokenId)
    const poolIds = pools.map(item => {
      return item.poolId
    })
    const standards = pools.map(item => {
      if (item.poolType === 'fixed-swap') {
        return 1
      } else {
        return 2
      }
    })
    sign_Axios.post(Controller.items.getitemsbyids, { ids: list })
      .then(res => {
        // .filter((_) => _.id).slice(0, 8)
        const _list = pools.map((pool, index) => {
          const poolInfo = res.data.data.find((item) => pool.tokenId === item.id);
          return {
            ...poolInfo,
            tokenId: pool.tokenId,
            poolType: pool.poolType,
            poolId: pool.poolId,
            price: pool.price,
            createTime: pool.createTime,
            token1: pool.token1
          }

        })
          .sort((a, b) => b.createTime - a.createTime);
        getPoolsWeight(_list)
      })
    const getPoolsWeight = async (list) => {
      weightMap = new Map()
      const _res = await sign_Axios.post(Controller.pools.getpoolsinfo, {
        poolids: poolIds,
        standards: standards
      })
      const res = _res.data
      if (res.code === 1) {
        res.data?.forEach((item) => {
          weightMap.set(`${item.poolid}_${getStandardTypeValue(item.standard)}`, item.poolweight)
        })
        const _list = list.map((item) => {
          return {
            ...item,
            defaultWeight: weightMap.get(`${item.poolId}_${item.poolType}`) ?? 0
          }
        })
          .sort((a, b) => b.defaultWeight - a.defaultWeight)
        // console.log(_list, weightMap)
        setItemList(_list.filter((_) => _.id).slice(0, 8));
        setLoadingItems(false)
      }
    }
    // eslint-disable-next-line
  }, [active, data])
```