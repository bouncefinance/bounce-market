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