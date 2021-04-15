

## Bounce NFT API 接口文档

最新更新时间: 2021-04-15

### 一、平台共识

#### 1.1 MateData 格式

> 平台内通过Genrate 生成以及通过Factory 生成子合约生成的NFT，不管ERC-721还是ERC-1155， 均遵循以下MateDate格式

```json
{
    "id":{	// NFT 的唯一tokenID
    	type: int,
    	require: true,
    	value: 16944
    },
    "brandid":{		// item 对应的创建合约所属的 brandId，bounce721对应10， bounce1155对应11
    	type: int,
    	reqiure: true,
    	value: 10
    },
    "contractaddress":{	// NFT 合约地址
    	type: String(address),
    	require: true,
    	value: "0x..."
    },
    "metadata":"",
    "category":{	// 分类（Image, video, audio...）
    	type: String,
    	require: true,
    	defaule: 'image'
    	value: ""
    },
    "channel":{		// 分类频道（Fine Arts, sports, Comic Books...）
    	type: String,
    	require: true,
    	defaule: 'Fine Arts'
    	value: ""
    },
    "itemsymbol":{		// NFT Symbol 
    	type: String,
    	require: true,
    	value: ""
    },
    "standard":{	// NFT类型， 1: ERC-721 2: ERC-1155
    	type: Int,
    	require: true,
    	value: 1  
    },
    "itemname":{	// NFT Name 
    	type: String,
    	require: true,
    	value: ''
    },
    "externallink":{	// 外链
    	type: String(link),
    	require: false,
    	value: ""
    },
    "description":{		// NFT 描述信息
    	type: String, 
    	require: true,
    	maxLength: 300,
    	value: '721_1'
    },
    "fileurl":{		// NFT 文件预览在线链接，一般为在线图片，音频，视频等，用于展示
    	type: String(link),
    	require: true,
    	value: ''
    },
    "properties":{
    	type: String,
    	require: false,
    	value: ""
    },
    "levels":{
    	type: String,
    	require: false,
    	value: ""
    },
    "stats":{	
    	type: String,
    	require: false,
    	value: ""
    },
    "unlockablecontent":{
    	type: String,
    	require: false,
    	value: ""
    },
    "supply":{		// 发行量，721默认为1， 1155可自定义数量
    	type: Int,
    	require: true,
    	value: ""
    },
    "ownername":{
    	type: String,	// 拥有者的昵称
    	require: false,
    	value: ""
    },
    "owneraddress":{	// 拥有者的钱包地址，这个NFT的所属管理员
    	type: String(address),
    	require: true,
    	value: ""
    },
    "status":{
    	type: String,
    	require: false,
    	value: ""
    },
    "created_at":{		// 创建时刻的时间戳
    	type: Timestamp,
    	require: true,
    	value: ""
    },
    "updated_at":{	// 信息最后一次被更改的时候的时间戳
    	type: Timestamp,
    	require: true,
    	value: ""
    }
  }
```

#### 1.2 用户信息格式

```json
{
    "accountaddress": {		// 用户钱包地址	
        type: String(address),
        require: true,
        value: '0x...'
    },
    bandimgurl: {	// brand 的背景图的在线链接
        type: String(link),
        require: false,
        value: 'https://...'
    },
    bio: {		// 描述自己的一句话
        type: String,
        require: false,
        value: ''
    },
    email: {
        type: String(email),	// 电子邮箱
        require: true,
        value: '...@...'
    },
    fullname: {		// 全名，唯一
        type: String,
        require: true,
        value: ''
    },
    imgurl: {	// 头像对的在线链接
        type: String(link),
        require: true,
        value: 'https://...'
    },
    username: {		// 用户名（昵称）
        type: String,
        require: true,
        value: ''
    }
}
```

#### 1.3 brand 格式

```json
{
  "brandname": {	// 用户品牌名
      type: String,
      require: true, 
      value: ''
  },
  "brandsymbol":  {		// 本品牌内创建的所以NFT 的symbol
      type: String,
      require: true, 
      value: ''
  },
  "contractaddress":  {	// 通过调用工厂合约生成的子合约地址
      type: String,
      require: true, 
      value: ''
  },
  "description":  {	// 品牌描述
      type: String,
      require: true, 
      value: ''
  },
  "imgurl": {	// 品牌封面的在线链接
      type: String,
      require: true, 
      value: ''
  },
  "owneraddress": {	// 品牌创建人地址
      type: String,
      require: true, 
      value: ''
  },
  "ownername": {	// 品牌创建人昵称
      type: String,
      require: true, 
      value: ''
  },
  "standard": {		// 本品牌类型： 1、ERC-721 , 2、ERC-1155
      type: String,
      require: true, 
      value: ''
  },
  "status":{
      type: String,
      require: true, 
      value: ''
  },
}
```







### 二、基础操作

Swagger UI 接口文档汇总：[网页链接](https://market-test.bounce.finance/swagger/index.html)

BaseHost: 

- Binance Smart Chain: https://bounce-market.bounce.finance

- Rinkeby (https):  https://bounce-market.bounce.financ
- Rinkeby (http):  https://market-test.bounce.finance

#### 2.1 创建使用签名

**创建签名**

> 根据MateMask 签名生成 JWT签名，使用这个接口前必须先拿到MateMask 进行签名的签名数据

```jsx
# POST
# /api/v2/main/jwtauth

const sign = await web3.eth.personal.sign(signStr, account)

const params = {
            "accountaddress": account,
            "message": signStr,
            "signature": sign
        }

const res_getSignToken = await axios.post(Base_URL + '/api/v2/main/jwtauth', params)
    if (res_getSignToken.status === 200 && res_getSignToken.data.code === 200) {
        const { token } = res_getSignToken.data.data
        return token
    }
```

**使用签名**

> 所有接口都必须带一个 `accountaddress` 参数，传入用户签名的地址。如果地址和签名不匹配，会对应返回错误

```jsx
const token = await getSignToken()
const config = {
    headers:{
        token: token
    }
}

const params = {
    accountaddress: account,	// 每个接口必传
    ...
}

axios.post(Base_URL + '/api/v2/main/...', params, config)
```

**签名返回状态**

- code = 1:  正常返回信息
- code = -1 && msg='jwt error': 请求未携带token，或者签名与当前账号不符



#### 2.2 创建使用NFT

**创建NFT**

> 首先需要将MateData 封装存取到后端后，后返回签名

```jsx
# POST
# /api/v2/main/auth/additem

const params = {
    "accountaddress": account,
    ... // 这里填入NFT MateData格式的对应字段信息
    // 详见 1.1 MateData 格式
}
    
    
return result = {	// 返回的三个值在合约中都需要用到
            expiredtime: 1617444595,		//  时间戳
            id: 17139	// token ID
            signaturestr:  // 经由管理员账号签名的字符串	"0x0cfe6b4fd1407c9a9f6e860fb5b323da85e2f0234f3077c619d5bbeab32286836595a52e39db04348ddee5ba5d03c62c49983bfcc1135e3053cc0f3fe153f42c1b"
        }
```



**查询指定ID的NFT信息**

> 单个查询：由于平台大部分MateData 是存在后端服务器，并且NFT ID由后端生成，所以大部分接口仅需要传入NFT ID 即可查询MateDate信息

```jsx
# POST
# /api/v2/main/auth/getoneitembyid

const params = {
    "accountaddress": account,
    "id": 10086
}

const result = {
    // 返回一个matedata 格式的数据对象，如下图
}
```

![image-20210403174431080](http://yitian-2020.oss-cn-shenzhen.aliyuncs.com/img/image-20210403174431080.png)

> 批量查询：有很多情况下需要批量查询NFT ID 的MateData 情况，这时候可以使用批量查询方法，同样也可以传入分类参数进行分类查询

```jsx
# POST
# /api/v2/main/auth/getitemsbyids

const params = {
    "accountaddress": account,
    "ids": [10086, 10010],
    "category": "Image",	// 选填
  	"channel": "Fine Arts",		// 选填
}

const result = {
    // 返回一个由上面格式数据组成的一个数组
}
```



#### 2.3 文件上传

> 平台所用到的媒体资源文件由后端服务器保存，将文件二进制文件传至后端后，后端接口会返回一个在线引用链接，在多处使用到的地方均使用此链接

**获取文件二进制数据，配合文件预览**

```jsx
// 获取到图片的二进制文件数据
 const handelFileChange = (e) => {
        const file = e.target.files[0]
        // console.log(file)
        if (!file) return
        if (file.type === 'image/png' || file.type === 'image/jpg'|| file.type === 'image/jpeg' || file.type === 'image/gif') {
            let reader = new FileReader();  //调用FileReader
            reader.readAsDataURL(file); //将文件读取为 DataURL(base64)
            reader.onload = function (evt) {   //读取操作完成时触发。
                setCoverSrc(evt.target.result)  //将img标签的src绑定为DataURL
                setInfoTitle(file.name)
            }
            let formData = new FormData()
            formData.append('filename', file)
            onFileChange && onFileChange(formData, file)
            // setFormData(formData)
        } else {
            dispatch({ type: 'Modal_Message', showMessageModal: true, modelType: 'error', modelMessage: "The file format you selected is incorrect" });
        }
    }

```

**上传文件流**

```jsx
# POST
# /api/v2/main/auth/fileupload

const res = await sign_Axios.post('/api/v2/main/auth/fileupload', fileData, { appendAccount: false })
                if (res.data.code === 200) {
                    imgUrl = res.data.result.path
                }
// 这里的imgUrl 便是返回的在线链接

```



#### 2.4 用户信息

> 本平台内嵌一个用户系统，主要用到了以下的一些接口

**上传用户信息**

```jsx
# POST
# /api/v2/main/auth/addaccount

const params = {
    accountaddress: account,
    // 详见 1.2 用户信息格式
}

const res = {
    code === 1: success
    code !== 0: error
}
```

**查询用户信息**

```jsx
# POST
# /api/v2/main/auth/addaccount

const params = {
    accountaddress: account
}

const res = {
    // 情况一：正常返回
    返回符合1.2 用户信息格式的用户数据，按信息进行展示即可

	// 情况二：请求的用户不存在
    用户在进入平台后，只需要连接了钱包，钱包地址即为身份令牌，可以按意愿选择是否完善用户信息
    当返回{code: 0 && msg: "record of accountaddress is not existed."}时
    代表服务器请求成功，但是该用户并未完善用户信息
}
```

**更新用户信息**

> 可以通过此接口更新指定用户的信息，但是仅限于以下几种列出的字段，其余字段不得随意修改

```jsx
# POST
# /api/v2/main/auth/updateaccount

const param = {
    accountaddress :account,	// 用户地址，作为索引字段	
    username : '',	// 用户昵称
    imgurl :'',		// 用户头像
    email :'',		// 用户电子邮箱
    bio :''			// 用户自我评价短句
}

return result = {
    code === 1: success
    code !== 0: error
}

```

**判断用户的fullName 是否存在**

> 在平台用户系统设计中，fullname 字段为唯一的，所以需要在新增或修改之前，判断fullname 是否已被占用

```jsx
# POST
# /api/v2/main/auth/getaccountname

const param = {
    accountaddress :account,	// 用户地址，作为索引字段	
    fullname : '',	// 用户全名
}

return result = {
    code === 1: success
    code !== 0: error
}

```

**其他**

```jsx
# POST
# /api/v2/main/auth/updateaccountbandimg
根据address更新用户的band图片信息
```



#### 2.5  *update  Brand 操作

> brand 系统是平台的一个特色，用户可以在平台中创建brand（目前一个用户仅可创建一个brand），创建成功之后，工厂合约会生成出一个对应的子合约，这个子合约可以进行一系列平台NFT 的操作

**创建brand**

```jsx
# POST
# /api/v2/main/auth/addbrand

const params = {
    accountaddress :account,
    ... // 1.3 brand 格式
}
    
return result = {
    code === 1: success
    code !== 0: error
}
```

**更新brand**

> 可以通过此接口更新指定brand id 的brand 信息，但是仅限于以下几种列出的字段，其余字段不得随意修改

```jsx
# POST
# /api/v2/main/auth/updatebrandbyid

const param = {
  "accountaddress": "string",
  "brandname": "string",
  "description": "string",
  "id": 0,
  "imgurl": "string",
  "ownername": "string"
}

return result = {
    code === 1: success
    code !== 0: error
}
```

**更新brand 背景图片**

```jsx
# POST
# /api/v2/main/auth/updatebandimg

const param = {
  "accountaddress": "string",
  "bandimgurl": "string",	// 更新背景图片的在线链接
  "id": 0
}

return result = {
    code === 1: success
    code !== 0: error
}
```

*** new 判断用户是否有Brand**

```jsx
# POST
# /api/v2/main/ifaccounthavebrands

const param = {
  "accountaddress": "string"
}

return result = {
    true || false
}
```





**获取brand信息**

获取单个用户创建的所以brand 列表

```jsx
# POST
# /api/v2/main/auth/getaccountbrands

const params = {
    accountaddress : account
}

return result = {
    [brandArray] // brand信息列表
}
```



单个查询：根据ID获取创建的brand

```jsx
# POST
# /api/v2/main/auth/getbrandbyid

const params = {
    accountaddress : account, 
    id: 1 // brandID
}

return result = {
    返回对应id 的brand详细信息 
}
```

![image-20210403195321417](http://yitian-2020.oss-cn-shenzhen.aliyuncs.com/img/image-20210403195321417.png)



批量查询：根据IDs 获取创建的brands

```jsx
# POST
# /api/v2/main/auth/getbrandsbyfilter

const params = {
    accountaddress : account, 
    "brandcontractaddressess": [
        "0x1...", "0x2..."
     ],
    Category: String,	// 选填
    channel: String	// 选填
}

return result = {
    返回对应id列表 的brands 详细信息列表
}
```

**其他**

> 获取首页 popular brands 信息，这个接口返回6个brands, 需要筛选调brandid === 10 和brandid === 11两种bounce平台自身的NFT，这两种brand不参与排序

```jsx
# POST
# /api/v2/main/auth/getpopularbrands

const params = {
    accountaddress: account
}

return result = Array(4){
    // brand 信息列表
}
```



#### 2.6 用户Liked Item

> 用户在浏览市场挂单的是时候，可以收藏感兴趣的挂单，或取消之前添加过liked的挂单，已收藏的挂单可以在my Liked中查看

**添加挂单**

```jsx
# POST
# /api/v2/main/auth/dealaccountlike

const params = {
  "accountaddress": "string",	// 根据用户账号作为依据索引
  "auctiontype": 0,		// 挂单的类型，0：fixed-swap 1：english-auction
  "brandid": 0,		// item 对应brand 的id
  "iflike": 0,	// 	是否收藏 0: 取消收藏 1：收藏
  "itemid": 0,	//  item id
  "poolid": 0	// 池子ID
}


return result = {
    code === 1: success
    code !== 0: error
}
```

**获取收藏列表**

```jsx
# POST
# /api/v2/main/auth/getaccountlike


const params = {
  "accountaddress": "string"
}

const result = Array( lenght ){
    // like 的item信息列表
}
```

#### 2.7 *new 模糊搜索

> 在头部有个搜索功能，可以全局模糊搜索所有在售的NFT、Brand 和Account ，只用输入模糊查询的关键词即可，返回关键词对应的三个词条的数据，可以根据词条的信息进行数据拼接再查询，得出所有完整的数据条目

```jsx
# POST
# /api/v2/main/getbylikestr


const params = {
  "likestr": "string"
}

const result = data(Object){
    account: Array(),
    brands: Array(),
    items: Array()
}
```

#### 2.8  *new 关注艺术家

**根据accountaddress获取follows信息**

> 查询某个地址关注了哪些艺术家

```jsx
# POST
# /api/v2/main/auth/getaccountlike

const params = {
    "accountaddress": "string"
}

const result = [0x..., 0x..., ...]
```

**添加follow 艺术家**

> 可以对艺术家的账号进行关注

```jsx
# POST
# /api/v2/main/auth/dealaccountfollow


const params = {
  "accountaddress": "string",	// 用户地址
  "followaddress": "string",	// 所关注的艺术家的地址
  "iffollow": 0					// 是否关注 0：取消关注 1：关注
}

const result = {
    success || error
}
```

注：做这个功能前，需要先请求关注列表，获取到关注的艺术家，然后判断当前艺术家是否在列表中，如果不在，则设置`iffollow = 1`表示新增关注，如果不在，则设置`iffollow = 0`表示取消关注

#### 2.9 查询Banner 信息

> 后台可以选择展示一位艺术家展示在banner 上，并给艺术家在售卖状态中的Pool 添加权重，首页根据权重展示艺术家的权重排名前四的pool

```jsx
# GET
# /api/v2/main/allbanners


const result = {
	"code": 1,
	"data": [
		{
			"id": 2,	// 艺术家ID
			"title": "t2",	// 展示在banner 的主标题
			"subhead": "sx2",	// 展示在banner 的副标题
			"artistaddress": "0x891aab34cc082c0c7325c1349a2f9b815a4ad4a6",	// 艺术家地址
			"created_at": "2021-04-15T08:16:39Z",	// 创建时间
			"updated_at": "2021-04-15T09:54:24Z"	// 最后更新时间
		}
	],
	"limit": 15,
	"offset": 0,
	"total": 1
}
```

注：完成这块功能，首先需要根据艺术家地址作为筛选条件，请求出艺术家池子的权重，然后 根据权重排序，前四个pool根据UI 进行展示渲染

**查询pool 的权重**

```jsx
# POST
# /api/v2/main/auth/getpoolsinfo


const params = {
  "poolids": "Array", // [0,1,3,...]
  "standards": "Array" // [2,2,1,1...]	ERC-721:1 ERC-1155:2
}

const result = data(Object){
    data: [{
        poolid: 0,
        poolweight: 100,
        standard: 1		// ERC-721:1 ERC-1155:2
    },...]
}
```

### 三、合约操作

#### 3.1 创建ERC-721

> 要铸造生成一个ERC-721 的NFT，需要进行多个步骤，需要后端及合约端的配合。这里适用于Genrate NFT和Add Brand Item NFT

要创建ERC-721要按格式调用后端2.2 生成matedata 数据

matedata 数据生成成功的同时，后端接口会返回三个必要字段

- expiredtime：一个时间戳，反映的时间是10分钟后	
- id: NFT Token ID
- signaturestr: 后端经过管理员账号签名的加密字符串

```jsx
const BounceERC721WithSign_CT = getContract(library, BounceERC721WithSign.abi, getBounceERC721WithSign(chainId))

try {
	BounceERC721WithSign_CT.methods.mintUser(_nftId, _sign, _expiredtime).send({ from: account })
        .on('transactionHash', hash => {
            setOpen(false)
            // setBidStatus(pendingStatus)
            showTransferByStatus('pendingStatus')
        })
        .on('receipt', async (_, receipt) => {
            // console.log('bid fixed swap receipt:', receipt)
            // setBidStatus(successStatus)
            showTransferByStatus('successStatus')
            history.push("/MyBrands")
        })
        .on('error', (err, receipt) => {
            // setBidStatus(errorStatus)
            showTransferByStatus('errorStatus')
        })
} catch (error) {
    console.log('BounceERC721_CT.methods.mintUser', error)
}

```

#### 3.2 创建ERC-1155

> 创建ERC-1155的要比ERC-721多几个参数，用户反映ERC-1155几个特殊的属性，这里也同样适用于Genrate NFT和Add Brand Item NFT
>
> 要创建ERC-1155要按格式调用后端2.2 生成matedata 数据

- expiredtime：一个时间戳，反映的时间是10分钟后	
- id: NFT Token ID
- signaturestr: 后端经过管理员账号签名的加密字符串
- _data：NFT 数据，可默认传 0
- _amount：1155相对于721是有数量的概念，这里传铸造的数量

```jsx
const BounceERC1155WithSign_CT = getContract(library, BounceERC1155WithSign.abi, getBounceERC1155WithSign(chainId))
const _amount = formData.Supply
const _data = 0 

try {
    BounceERC1155WithSign_CT.methods.mintUser(_nftId, _amount, _data, _sign,_expiredtime).send({ from: account })
        .on('transactionHash', hash => {
            setOpen(false)
            // setBidStatus(pendingStatus)
            showTransferByStatus('pendingStatus')
        })
        .on('receipt', async (_, receipt) => {
            // console.log('bid fixed swap receipt:', receipt)
            // setBidStatus(successStatus)
            showTransferByStatus('successStatus')
            history.push("/MyBrands")
        })
        .on('error', (err, receipt) => {
            // setBidStatus(errorStatus)
            showTransferByStatus('errorStatus')
        })
} catch (error) {
    console.log('BounceERC1155_CT.methods.mintUser', error)
}
```

#### 3.3 Factory 创建子合约

> Factory 可以给每个brand 生成出子合约，这些子合约有着跟bounce NFT合约同样的功能，可进行铸造，转账，出售等...

**创建ERC-721子合约**

```jsx
const Factory_CT = getContract(library, BounceNFTFactory.abi, getNFTFactory(chainId))

Factory_CT.methods.createBrand721(_name, _symbol).send({ from: account })
```

- _name: 所铸造的NFT 统一名称
- _symbol: 所铸造的NFT 统一符号

**创建ERC-1155子合约**

> ERC-1155的合约没有name和symbol的概念，所以只需要传一个baseUri 即可

```jsx
const Factory_CT = getContract(library, BounceNFTFactory.abi, getNFTFactory(chainId))

Factory_CT.methods.createBrand1155(_uri).send({ from: account })
```



#### 3.4 Fixed-swap

##### a ) 挂单 ERC-721

> 挂单操作的本质是需要将账户内的NFT 托管到合约中的，这个时候需要先进行approve 操作

**approve**

```jsx
BounceERC721WithSign_CT.methods.approve(
    getFixedSwapNFT(chainId),
    parseInt(_tokenId)
).send({ from: account });
```

**send**

```jsx
const BounceFixedSwapNFT_CT = getContract(library, BounceFixedSwapNFT.abi, getFixedSwapNFT(chainId))

BounceFixedSwapNFT_CT.methods.createErc721(_name, _token0, _token1, _tokenId, _amountTotal1, _onlyBot).send({ from: account })
```

- _name: NFT名称
- _token0:   售卖的NFT的合约地址
- _token1:  收款标的物的合约地址（ETH, BNB 均为0x000...000）

- _tokenId: 售卖的NFT ID
- _amountTotla1: 售价，单位是token1的symbol
- _onlyBot: 参与者是否是BOT（AUCTION）持有者

##### b ) 挂单 ERC-1155

**approve**

```jsx
BounceERC1155WithSign_CT.methods.setApprovalForAll(
    getFixedSwapNFT(chainId),
    true
).send({ from: account });
```

**send**

```jsx
const BounceFixedSwapNFT_CT = getContract(library, BounceFixedSwapNFT.abi, getFixedSwapNFT(chainId))

BounceFixedSwapNFT_CT.methods.createErc1155(_name, _token0, _token1, _tokenId, _amountTotal0,_amountTotal1, _onlyBot)
.send({ from: account })
```

- _name: NFT名称
- _token0:   售卖的NFT的合约地址
- _token1:  收款标的物的合约地址（ETH, BNB 均为0x000...000）

- _tokenId: 售卖的NFT ID
- _amountTotal0: 要售卖的NFT 数量
- _amountTotla1: 售价总额，单位是token1的symbol
- _onlyBot: 参与者是否是BOT（AUCTION）持有者

##### c ) 购买通用方法

> 这里有个poolID的概念，poolID从0开始索引，fixed-swap池子没增加一个挂单，poolID递增，poolID类似于订单号

```jsx
const BounceFixedSwapNFT_CT = getContract(library, BounceFixedSwapNFT.abi, getFixedSwapNFT(chainId))


BounceFixedSwapNFT_CT.methods.swap(poolId, _amountTotal0)
.send(sendParams)
```

- poolId：对应交易的池子Id
- _amountTotal0: 要购买的NFT数量（ERC-721数量只能是1,ERC-1155可以分多次购买）

##### d ) 取消通用方法

> fixed-swap 方式支持卖家中途取消售卖

```jsx
const BounceFixedSwapNFT_CT = getContract(library, BounceFixedSwapNFT.abi, getFixedSwapNFT(chainId))


BounceFixedSwapNFT_CT.methods.cancel(poolId)
.send(sendParams)
```

- poolId：对应交易的池子Id





#### 3.5 English-Auction

##### a ) 挂单通用方法

**approve**

> 如果是非ETH, BNB的基础货币作为支付货币，消费前需要先approve，本平台采用一次性授权方式

```jsx
 const BounceERC20_CT = getContract(library, BounceERC20.abi, poolInfo.token1.contract)

BounceERC20_CT.methods.approve(getFixedSwapNFT(chainId), '0xffffffffffffffff')
.send({ from: account })
```



**send**

```jsx
const BounceEnglishAuctionNFT_CT = getContract(library, BounceEnglishAuctionNFT.abi, getEnglishAuctionNFT(chainId))

BounceEnglishAuctionNFT_CT.methods.createErc721(_name, _token0, _token1, _tokenId,
						_amountMax1, _amountMin1, _amountMinIncr1, _amountReserve1, _duration, _onlyBot).send({ from: account })
```

- name: NFT名称
- _token0:   售卖的NFT的合约地址
- _token1:  收款标的物的合约地址（ETH, BNB 均为0x000...000）

- _amountMax1: 一口价，买家可以跳过竞拍直接以一口价买下
- _amountMin1: 拍品的起拍价格
- _amountMinIncr1: 每次加价的最低区间
- _amountReserve1：卖家心理价位，最终价格低于此价格流派
- _duration：拍卖持续时间
- _onlyBot: 参与者是否是BOT（AUCTION）持有者



##### b ) 竞价通用方法

**approve**

> 如果是非ETH, BNB的基础货币作为支付货币，消费前需要先approve，本平台采用一次性授权方式

```jsx
 const BounceERC20_CT = getContract(library, BounceERC20.abi, poolInfo.token1.contract)

BounceERC20_CT.methods.approve(getFixedSwapNFT(chainId), '0xffffffffffffffff')
.send({ from: account })
```

**send**

> 用户出价在池子持续时间内，出价高于上一位出价（第一次高于起拍价）最低加价区间，并且价格小于一口价情况下，属于正常竞价动作。当池子结束时，如果最高出价高于心理预期价，则竞拍成功。如果低于心理预期价，则属于流拍。
>
> 当然用户也可以直接以一口价跳过竞拍阶段直接买下，池子对应结束。
>
> 本拍卖方式ERC-1155不支持按数量竞拍，只能打包购买

```jsx
const BounceEnglishAuctionNFT_CT = getContract(library, BounceEnglishAuctionNFT.abi, getEnglishAuctionNFT(chainId))

BounceEnglishAuctionNFT_CT.methods.bid(poolId, _amount1)
.send(sendParams)
```

- poolId：对应交易的池子Id
- _amountTotal1: 出价的价格

##### c ) 卖家领取

> 物品成功拍卖，卖家可取回买家支付的ERC-20代币
>
> 物品流拍：卖家取回售卖的 NFT

```jsx
const BounceFixedSwapNFT_CT = getContract(library, BounceFixedSwapNFT.abi, getFixedSwapNFT(chainId))


BounceFixedSwapNFT_CT.methods.bidderClaim(poolId)
.send(sendParams)
```

- poolId：对应交易的池子Id

##### d ) 买家领取

> 成功竞拍：买家领取竞拍到的NFT
>
> 竞拍失败：比如出价未达到卖家心理预期价，结束后可以领回自己的ERC-20代币

```jsx
const BounceFixedSwapNFT_CT = getContract(library, BounceFixedSwapNFT.abi, getFixedSwapNFT(chainId))

BounceFixedSwapNFT_CT.methods.creatorClaim(poolId)
.send(sendParams)
```



### 四、The Graph

> 详细看 DEMO



### 五、页面API实例

#### 5.1 Home

![image-20210408105353954](http://oss.yitian2019.cn/img/image-20210408105353954.png)

**Home-1**

1. 先用the Graph请求到所有在售列表数据（tradePools, tradeAuctions）
2. 请求后端接口`/api/v2/main/getitemsbyfilter`，获取对应Item 信息
3. 截取所取按`item.popular`  排序的前8条数据渲染

**Home-2**

1. 请求后端接口`/api/v2/main/getpopularbrands`，查出6个最受欢迎的 brand

注：brandId = 10 代表Bounce office 721 brand，brandId = 11  代表Bounce office 1155 brand，两者不参与排名

#### 5.2 MarketPlace

![image-20210408115242563](http://oss.yitian2019.cn/img/image-20210408115242563.png)

**Show Item**

1. 先用the Graph请求到所有在售列表数据（tradePools, tradeAuctions）
2. 请求后端接口`/api/v2/main/getitemsbyfilter`，获取对应Item 信息

注：请求后端接口可以根据传参category和channel类型去筛选查询，详见 2.2 创建使用NFT

#### 5.3 Brand List

![image-20210408120527223](http://oss.yitian2019.cn/img/image-20210408120527223.png)

**Show Item**

1. 先用the Graph请求到所有Brand列表（bounce721Brands, bounce1155Brands）
2. 请求后端接口`/api/v2/main/getbrandsbyfilter`，获取对应Brand Item 信息

#### 5.4 My Inventory

![image-20210408121315678](http://oss.yitian2019.cn/img/image-20210408121315678.png)

**Account-1**

1. 请求后端接口`/api/v2/main/auth/getaccount`
2. 修改信息调用接口`/api/v2/main/auth/updateaccount`
3. 更新brand 背景图片调用接口`/api/v2/main/auth/updateaccountbandimg`

**My Inventory**

> My Inventory 由以下几个数据源组成
>
> 1. 账户中拥有的由Bounce 平台铸造出的NFT 列表
> 2. 账户中正在售卖的的NFT 列表
> 3. 第三方平台导入进 Bounce 的NFT（未实现）

- Inventory-1	（数据源1）

1. 根据筛选条件account地址请求theGraph 取到数据源1的数据（nft721Items，nft1155Items）
2. 请求后端接口`/api/v2/main/getitemsbyfilter`，获取对应Item 信息

- Inventory-2	（数据源2）

1. 根据account地址请求theGraph 取到数据源2的数据（tradePools, tradeAuctions），取到本账号正在市场售卖的NFT 列表
2. 请求后端接口`/api/v2/main/getitemsbyfilter`，获取对应Item 信息

注：The Graph可以传入account地址，及state作为筛选条件，取到想要的数据

#### 5.5 My Brand

![image-20210413161145442](http://oss.yitian2019.cn/img/image-20210413161145442.png)

**My Brand List**

- 请求合约`Factory_CT.methods.brands(account).call()` 得到当前账户创建的Brand 地址
- 请求后端接口`/api/v2/main/auth/getaccountbrands` 查询brand的基本信息参数
- 两者可以通过`contractaddress` 做联系匹配

**Change Brand Background** 

1. 拿到`/api/v2/main/auth/getaccount`接口中的bandimgurl作为图片设置
2. 请求后端接口`/api/v2/main/auth/updateaccountbandimg` 替换图片

**Create Brand**

![image-20210413164217214](http://oss.yitian2019.cn/img/image-20210413164217214.png) 

1. 第一步通过`/api/v2/main/auth/fileupload` 上传图片生成在线图片链接
2. 调用工厂合约`createBrand721`/`createBrand1155`，生成brand 子合约
3. 包装JSON数据之后，请求`/api/v2/main/auth/addbrand` 存储brand 信息

**Brand Item List**

![image-20210413171548074](http://oss.yitian2019.cn/img/image-20210413171548074.png)

> My Brand Item List由以下几个数据源组成
>
> 1. 账户中拥有的由本Brand平台铸造出的NFT 列表
> 2. 账户中正在售卖的的本Brand创建的NFT

- My Brand Item List（数据源1）

1. 根据筛选条件user和contract 请求theGraph 取到数据源1的数据（nft721Items，nft1155Items）
2. 请求后端接口`/api/v2/main/getitemsbyfilter`，获取对应Item 信息

- My Brand Item List （数据源2）

1. 根据user和token0请求theGraph 取到数据源2的数据（tradePools, tradeAuctions），取到本账号正在市场售卖的本Brand创建的NFT 列表
2. 请求后端接口`/api/v2/main/getitemsbyfilter`，获取对应Item 信息

注：The Graph可以传入account、token0 地址，及state作为筛选条件，取到想要的数据

#### 5.6 My Activited

![image-20210413172851994](http://oss.yitian2019.cn/img/image-20210413172851994.png)

1. 先用the Graph请求到所有在售列表数据（activities）
2. 请求后端接口`/api/v2/main/getitemsbyfilter`，获取对应Item 信息
3. 将信息匹配整合后放到页面进行展示

#### 5.7 My Liked

![image-20210413181951863](http://oss.yitian2019.cn/img/image-20210413181951863.png)

1. 请求接口`/api/v2/main/auth/getaccountlike` 获取到liked 列表
2. 根据poolID 查询合约`BounceNFT.methods.pools.call(poolId)` 得到池子的价格等信息

#### 5.8 Sell Page

![image-20210415174919707](http://oss.yitian2019.cn/img/image-20210415174919707.png)

>  数据源分析（本页面组成的数据源）

#### 5.9 Buy Page

![image-20210413182556314](http://oss.yitian2019.cn/img/image-20210413182556314.png)

> 数据源分析（本页面组成的数据源）

#### 5.10 *new 模糊全局搜索

![image-20210415180320307](http://oss.yitian2019.cn/img/image-20210415180320307.png)

>  在头部有个搜索功能，可以全局模糊搜索所有在售的NFT、Brand 和Account ，只用输入模糊查询的关键词即可，返回关键词对应的三个词条的数据，可以根据词条的信息进行数据拼接再查询，得出所有完整的数据条目

1. 请求接口`/api/v2/main/getbylikestr` 传入搜索关键词（详情请看 2.7）
2. account 和brands 数据处理较为简单，仅需要将后端传回的数据条目展示渲染即可
3. item 数据需要通过the graph 查找出池子的详细信息拼接成完整数据条目展示