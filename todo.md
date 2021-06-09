- 重新连接钱包
    [完成]保持连接 [操作步骤](https://juejin.cn/post/6971703783868858382/)
    [完成]状态状态恢复(获取状态帐户hooks、token请求数据恢复)
    [完成]获取钱包金额and钱包获取轮询   `src\modules\layout\components\Wallet\Wallet.tsx`
    [完成]删除连接 `src\modules\layout\components\WalletCard\WalletCard.tsx`
    [完成]登陆修改状态（web3react无法在登陆后马上获取account,顾用Web3Modal当第一次的值）
    [未完成]代码优化
- 英氏拍卖3天 
加一个1天的进行测试


history

前面列表的数据
# /api/v2/main/getpoolactivities

interface IHistoryData {
    contract: string as address,
    event: string,					// Event name Enum: Created Claimed Swapped 
    from: string as address,
    id: number,
    price: string,
    quantity: number,
    timestamp: number,
    to: string as address,
    tokenId: number
}
 
// 后台缺少minted
event === item.Minted ? `minted by ${名称}` :
event === item.Created ? `put on sale ${quantity} edition for ${item.price} BNB ${item.from}` :
// BNB有问题   后台需要返回一个支付货币的合约地址
// from名称后台没返回
event === item.Swapped ? `offered ${item.price} BNB for ${item.quantity} edition by ${item.from}` : 
event === item.Claimed ? 'Claimed' : 
''
timestamp








后面列表的数据
# /api/v2/main/getpoolbids


```ts
interface IOfferData_EnglishAuction {
    "id": number,						
    "height": number,				// Block height
    "sender": string as address,	
    "pool_id": number,				// Pool ID
    "amount1": string,				// offer a price
    "ctime": number,				// timetamp
    "created_at": string
}

interface IOfferData_FixedSwap {
    "id": number,
    "height": number,
    "sender": string as address,
    "pool_id": number,
    "swapped_amount0": number,		// NFT number
    "swapped_amount1": string,		// Pay the total price
    "ctime": number,
    "created_at": string
}

```

// 缺少名称
// 缺少交易哈希
Bid placed by ${item.sender} ${item.swapped_amount1} ${转美元} 
   
${ctime格式化时间}


// owners 没做