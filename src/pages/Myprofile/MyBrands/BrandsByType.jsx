import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import styled from 'styled-components'
import Modal from '@components/Modal/Modal'
import { TextInput, TextAreaInput, Button, Upload } from '@components/UI-kit'
import { myContext } from '@/redux'
import useAxios from '@utils/useAxios.js'
import { AddCardItem } from './CardItem'
import arrows_left from '@assets/images/icon/arrows-left.svg'
import edit_white from '@assets/images/icon/edit_white.svg'
import edit_black from '@assets/images/icon/edit_black.svg'

import nav_all from '@assets/images/icon/nav_all.svg'
// import nav_audio from '@assets/images/icon/nav_audio.svg'
// import nav_game from '@assets/images/icon/nav_game.svg'
import nav_image from '@assets/images/icon/nav_image.svg'
// import nav_other from '@assets/images/icon/nav_other.svg'
import nav_video from '@assets/images/icon/nav_video.svg'

import { useBrandInfo } from './useHook'
import Snackbar from '@material-ui/core/Snackbar';
import { useActiveWeb3React } from '@/web3'
import { Controller } from '@/utils/controller'
import { useLazyQuery } from '@apollo/client'
// import { QueryBrandTradeItemsByBrand, QueryMyNFTByBrand } from '@/utils/apollo'
import { QueryMyNFTByBrand } from '@/utils/apollo'
import UpdateTopBarImg from './updateTopBarImg'
import { ImgToUrl } from '@/utils/imgToUrl'
import { AutoStretchBaseWidthOrHeightImg } from '@/pages/component/Other/autoStretchBaseWidthOrHeightImg'
import { CardItem } from '../CardItem'
// import { AUCTION_TYPE } from '@/utils/const'
import { SkeletonNFTCard } from '@/pages/component/Skeleton/NFTCard'
// import { weiToNum } from '@/utils/useBigNumber'
import Category from '../Category'
import useWrapperIntl from '@/locales/useWrapperIntl'
import { AUCTION_TYPE } from '@/utils/const'

const BrandsByTypeStyled = styled.div`
    margin-bottom: 84px;
    .back_wrapper{
        width: 1100px;
        margin: 0 auto;

        button{
            display: flex;
            align-items: center;
            margin-top: 20px;
            cursor: pointer;

            img{
                margin-right: 9.56px;
            }
        }
    }

    .bg_wrapper{
        width: 100%;
        height: 180px;
        background: linear-gradient(154.16deg, #306AFF 6.12%, #3E74FE 49.44%, #003BD3 89.29%);
        position: relative;
        margin-top: 16px;
        background-size: 100%!important;
        button{
            background: none;
            /* width: 124px; */
            width: max-content;
            padding-left: 10px;
            padding-right: 10px;
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

    .info_wrapper{
        width: 1100px;
        margin: 0 auto;
        display: flex;
        margin-top: 44px;

        .left{
            margin-right: 40px;
            img{
                width: 270px;
                height: 180px;
            }
        }

        .right{
            height: 180px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            &>div{
                h2{
                    font-size: 40px;
                    margin-top: 6px;
                    margin-bottom: 6x;
                }

                p{
                    font-weight: 400;
                    font-size: 20px;
                    line-height: 24.8px;
                    color: rgba(31,25,27,.8);
                }
            }

            button{
                background: none;
                border: 1px solid rgba(0,0,0,.2);
                /* width: 124px; */
                width: max-content;
                padding-left: 10px;
                padding-right: 10px;
                height: 40px;
                box-sizing: border-box;
                font-weight: 700;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;

                img{
                    margin-right: 6.86px;
                }
            }
        }
    }

    .nav_wrapper{
        width: 1100px;
        margin: 0 auto;
        margin-top: 50px;
        display: flex;
        li{
            width: 110px;
            height: 32px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 24px;
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
    }
`

const EditBrandstModalStyled = styled.div`width: 1100px;
    box-sizing: border-box;
    padding: 32px 83px;
    box-sizing: border-box;

    .button_group{
        margin-top: 36px;
        button{
            margin-right: 16px;
        }
    }`

export default function BrandsByType() {
    const { brandId, category } = useParams()
    const history = useHistory()
    const [listData, setListData] = useState([])
    const [statusList, setStatusList] = useState([]);
    const { brandInfo, run } = useBrandInfo(brandId)
    const { state } = useContext(myContext)
    const { sign_Axios, axios } = useAxios()
    const [fileData, setFileData] = useState(null)
    const { account } = useActiveWeb3React();

    const [openUpdateTopBarImg, setOpenUpdateTopBarImg] = useState(false)
    // ----edit----
    const [isEdit, setIsEdit] = useState(false)
    const [editFormData, setEditFormData] = useState({
        brandname: brandInfo.brandname,
        description: brandInfo.description,
        ownername: state.userInfo.username,
        id: brandId | 0,
        imgurl: '',
    })
    const [editBtnText, setEditBtnText] = useState('Save')
    const [inputDisable, setInputDisable] = useState(false)
    const [contract, setContract] = useState(null);
    const [currentAccount, setCurrentAccount] = useState("");
    const [btnLock, setBtnLock] = useState(false)
    // { open: Boolean, type: 'error' | 'success' }
    const [editSnackbar, setEditSnackbar] = useState({
        open: false,
        type: 'error',
    })

    const { wrapperIntl } = useWrapperIntl()
    const nav_list = [{
        name: wrapperIntl('Category.All'),
        icon: nav_all,
        route: 'All'
    }, {
        name: wrapperIntl('Category.Image'),
        icon: nav_image,
        route: 'Image'
    }, {
        name: wrapperIntl('Category.Video'),
        icon: nav_video,
        route: 'Video'
    }]

    useEffect(() => {
        if (!account) return
        console.log(account)
        if (currentAccount && account !== currentAccount) {
            history.push("/MyBrands")
        } else {
            setCurrentAccount(account);
            sign_Axios.post('/api/v2/main/getbrandbyid', { id: parseInt(brandId) })
                .then(res => {
                    // console.log(res)
                    if (res.status === 200 && res.data.code === 1) {
                        setContract(res.data.data.contractaddress)
                    }
                })
        }
        // eslint-disable-next-line
    }, [account])

    const handelEditSubmit = async () => {
        if (!editFormData.brandname || !editFormData.description) {
            return
        }
        const imgurl = await ImgToUrl(sign_Axios, fileData)
        // await ImgToUrl(sign_Axios, fileData)
        setBtnLock(true)
        setInputDisable(true)
        setEditBtnText('Submitting ...')

        const response = await sign_Axios.post(Controller.brands.updatebrandbyid, { ...editFormData, imgurl })
        setBtnLock(false)
        setInputDisable(false)
        setEditBtnText('Save')
        try {
            const data = response.data
            //console.log('response: ', data)
            if (data.code === 200 || data.code === 1) {
                setEditSnackbar({
                    open: true,
                    type: 'success',
                })
                setIsEdit(false)
                // update data of page
                run()
            } else {
                throw new Error('')
            }
        } catch {
            setEditSnackbar({
                open: true,
                type: 'error',
            })
        }
        setTimeout(() => {
            setEditSnackbar({ open: false, ...editSnackbar })
        }, 1000)
    }

    const [loading, setLoading] = useState(true);
    const [tokenList, setTokenList] = useState();
    const [tokenList_2, setTokenList_2] = useState();

    useEffect(() => {
        // console.log("category:", category)
        if (!account || !tokenList || !tokenList_2 || !brandInfo.contractaddress) return
        // console.log(tokenList, tokenList_2)
        const brand_erc721 = tokenList_2.brandserc721.filter(item => String(item.contract_addr).toLowerCase() === String(brandInfo.contractaddress).toLowerCase())
        const brand_erc1155 = tokenList_2.brandserc1155.filter(item => String(item.contract_addr).toLowerCase() === String(brandInfo.contractaddress).toLowerCase())
        const brandTradeList_fs = tokenList_2.tradePools.filter(item =>
            String(item.token0).toLowerCase() === String(brandInfo.contractaddress).toLowerCase() && item.state !== 1
        )
        const brandTradeList_ea = tokenList_2.tradeAuctions.filter(item =>
            String(item.token0).toLowerCase() === String(brandInfo.contractaddress).toLowerCase() && item.state !== 1
        )
        const brandErcList = brand_erc721.concat(brand_erc1155)
        const brandTradeList = brandTradeList_fs.concat(brandTradeList_ea)

        const pools = brandErcList.concat(brandTradeList)

        // console.log("pools: ", pools)
        pools && handleBrandTradeItems(pools)
        // eslint-disable-next-line
    }, [account, tokenList, tokenList_2, brandInfo, category])

    const handleBrandTradeItems = (pools) => {
        const ids = pools.map(item => (item.tokenId || parseInt(item.token_id)))
        const cts = pools.map(item => item.token0 || item.contract_addr)

        let categoryParam

        switch (category) {
            case "All":
                categoryParam = ''
                break;

            case "Image":
                categoryParam = 'image'
                break;

            case "Video":
                categoryParam = 'video'
                break;

            default:
                categoryParam = ''
                break;
        }

        sign_Axios.post(Controller.items.getitemsbyfilter, {
            ids: ids,
            cts: cts,
            category: categoryParam,
            channel: ''
        })
            .then(res => {
                if (res.status === 200 && res.data.code === 1) {
                    console.log(pools)
                    const list = pools.map(item => {
                        const poolInfo = res.data.data.find(pool => {
                            return (parseInt(item.token_id) === pool.id || item.tokenId === pool.id) && (
                                String(item.contract_addr).toLowerCase() === String(pool.contractaddress).toLowerCase() ||
                                String(item.contract_addr).toLowerCase() === String(pool.token0).toLowerCase()
                            )
                        });

                        // console.log(poolInfo)
                        if (poolInfo) {
                            return {
                                ...poolInfo,
                                poolType: item && item.amount_total0 ? AUCTION_TYPE.FixedSwap : AUCTION_TYPE.EnglishAuction,
                                poolId: item && item.poolId,
                                price: item && (item.lastestBidAmount || item.amountMin1),
                                token1: item && item.token1,
                                createTime: item && item.createTime
                            }
                        } else {
                            return null
                        }
                    }).filter(item => item)

                    // console.log(list)
                    const result = list.sort((a, b) => b.createTime - a.createTime);
                    setListData(result);
                    setStatusList(result);
                    setLoading(false);
                }
            })
    }
    // 16806 正在售卖
    // const [getBrandTradeItems, brandTradeItems] = useLazyQuery(QueryBrandTradeItemsByBrand, {
    //     variables: { creator: account, token0: contract },
    //     fetchPolicy: "network-only",
    //     onCompleted: async () => {
    //         const tradePools = brandTradeItems.data.tradePools.map(item => ({
    //             ...item,
    //             poolType: AUCTION_TYPE.FixedSwap
    //         })).filter(item => item.state !== 1)
    //         const tradeAuctions = brandTradeItems.data.tradeAuctions.map(item => ({
    //             ...item,
    //             price: item.lastestBidAmount !== '0' ? item.lastestBidAmount : item.amountMin1,
    //             poolType: AUCTION_TYPE.EnglishAuction
    //         })).filter(item => item.state !== 1)

    //         // console.log(tradePools.concat(tradeAuctions))
    //         // handleBrandTradeItems(tradePools.concat(tradeAuctions));
    //         setTokenList_2(tradePools.concat(tradeAuctions));
    //     }
    // })

    useEffect(() => {
        console.log("statusList: ", statusList)
    }, [statusList])

    const getBrandTradeItems = async () => {
        let brandData = {
            tradePools: [],
            tradeAuctions: [],
            brandserc721: [],
            brandserc1155: [],
        }

        try {
            const ErcParams = {
                user_address: account,
                contract_address: brandInfo.contractaddress
            }

            const TradeParams = {
                offset: 0,
                count: 100,
                user_address: account
            }

            const res = await axios.get('[V2]/erc721', { params: ErcParams })
            if (res.status === 200 && res.data.code === 200) {
                const erc721Data = res.data.data
                brandData.brandserc721 = erc721Data.tokens

            }

            const res_1155 = await axios.get('[V2]/erc1155', { params: ErcParams })
            if (res.status === 200 && res.data.code === 200) {
                const erc1155Data = res_1155.data.data
                brandData.brandserc1155 = erc1155Data.tokens
            }

            const res_trade = await axios.get('pools', { params: TradeParams })
            if (res.status === 200 && res.data.code === 200) {
                const tradeDate = res_trade.data.data
                brandData.tradePools = tradeDate.tradePools
                brandData.tradeAuctions = tradeDate.tradeAuctions
            }


        } catch (error) {

        }
        console.log(brandData)
        setTokenList_2(brandData)
    }

    // const [getBrandItems_2, { data: brandItems_2 }] = useLazyQuery(QueryOwnerBrandItems, {
    //     variables: { owner: account ? account.toLowerCase() : account },
    //     fetchPolicy: "network-only",
    //     onCompleted: () => {
    //         const brands = brandInfo.standard === 1
    //             ? brandItems_2.bounce721Brands[0]
    //             : brandItems_2.bounce1155Brands[0];
    //         if (!brands) {
    //             handleBrandTradeItems([]);
    //         } else {
    //             const tokenList = brands.tokenList.map(item => item.tokenId);
    //             console.log(tokenList)
    //             setTokenList_2(tokenList);
    //         }
    //     }
    // })

    // 16806 正在列表
    const [getBrandItems, { data: brandItems }] = useLazyQuery(QueryMyNFTByBrand, {
        variables: { user: account && account.toLowerCase(), contract: contract && contract.toLowerCase() },
        fetchPolicy: "network-only",
        onCompleted: () => {
            // const brands = brandInfo.standard === 1
            //     ? brandItems.nft721Items
            //     : brandItems.nft1155Items;
            // console.log(brandItems.nft721Items, brandItems.nft1155Items)
            const brands = [...brandItems.nft721Items, ...brandItems.nft1155Items]
            if (!brands) {
                // handleBrandTradeItems([]);
                setTokenList([]);
            } else {
                // const tokenList = brands.map(item => item.tokenId);
                // console.log(brands)
                setTokenList(brands);
            }
        }
    })

    useEffect(() => {
        if (!account || !contract) return;
        if (!!brandInfo.standard) {
            getBrandItems()

            getBrandTradeItems()
            // getBrandItems_2()
        }
        // eslint-disable-next-line
    }, [account, contract, brandInfo.standard, getBrandItems]);

    return (
        <BrandsByTypeStyled>
            <div className="back_wrapper">
                <button onClick={() => {
                    history.push('/MyBrands')
                }}>
                    <img src={arrows_left} alt="" />
                    <p>{wrapperIntl('MyProfile.MyBrands.BrandsByType.BackToBrands')}</p>
                </button>
            </div>

            <div className='bg_wrapper' style={brandInfo.bandimgurl ? { backgroundSize: '100%!important', background: `url(${brandInfo.bandimgurl}) center center no-repeat` } : {}}>
                {/* <div className='bg_wrapper' style={{ backgroundSize: '100%', background: `url(https://market-test.bounce.finance/pngfileget/blob-1616642351.png) center center no-repeat` }}> */}
                <button onClick={() => setOpenUpdateTopBarImg(true)}>
                    <img src={edit_white} alt="" />
                    <p>{wrapperIntl('MyProfile.MyBrands.BrandsByType.Change')}</p>
                </button>
            </div>

            <div className="info_wrapper">
                <div className="left">
                    <AutoStretchBaseWidthOrHeightImg src={brandInfo.imgurl} width={270} height={180} />
                </div>
                <div className="right">
                    <div className="div">
                        <h2>{brandInfo.brandname}</h2>
                        <p>{brandInfo.description}</p>
                    </div>
                    <button onClick={() => {
                        setEditFormData({
                            ...editFormData,
                            brandname: brandInfo.brandname,
                            description: brandInfo.description,
                            imgurl: brandInfo.imgurl
                        })
                        setIsEdit(true)
                    }}>
                        <img src={edit_black} alt="" />
                        {wrapperIntl('MyProfile.MyBrands.BrandsByType.Edit')}
                    </button>
                </div>
            </div>

            <div className="nav_wrapper flex flex-space-x">
                <div className="flex">
                    {nav_list.map((item) => {
                        return <li key={item.name} className={category === item.route ? 'active' : ''} onClick={() => {
                            history.push(`/MyBrands/${brandId}/${item.route}`)
                        }}>
                            <img src={item.icon} alt="" />
                            <p>{item.name}</p>
                        </li>
                    })}</div>
                <Category onStatusChange={setStatusList} itemList={listData} />
            </div>
            <ul className="list_wrapper">
                <li>
                    <AddCardItem type={category} nftType={brandInfo.standard} brandInfo={brandInfo} />
                </li>
                {statusList.map((item, index) => {
                    /* debugger */
                    return <li key={index}>
                        <CardItem
                            nftId={item.id}
                            cover={item.fileurl}
                            itemname={item.itemname}
                            user={item.ownername}
                            status={item.poolId && wrapperIntl("Listed")}
                            poolInfo={item}
                            poolType={item.poolType}
                            category={item.category}
                        />
                    </li>
                })}
                <li>{loading && <SkeletonNFTCard n={1}></SkeletonNFTCard>}</li>
            </ul>

            {/* EDIT */}
            <Modal open={isEdit} setOpen={setIsEdit} header={{ title: wrapperIntl('MyProfile.MyBrands.BrandsByType.EditYourBrand'), isClose: true }}>
                <EditBrandstModalStyled>
                    <TextInput
                        title={wrapperIntl('MyProfile.MyBrands.BrandsByType.BrandName')}
                        width='620px'
                        required={true}
                        marginTop={0}
                        maxLength={32}
                        lockInput={inputDisable}
                        defaultValue={editFormData.brandname}
                        onValChange={(brandname) => {
                            setEditFormData({ ...editFormData, brandname })
                        }}
                    />
                    <TextAreaInput
                        title={wrapperIntl('MyProfile.MyBrands.BrandsByType.Description')}
                        width='620px'
                        placeholder={wrapperIntl('MyProfile.MyBrands.BrandsByType.DescribeYourBrand')}
                        required={true}
                        marginTop={'24px'}
                        lockInput={inputDisable}
                        defaultValue={editFormData.description}
                        onValChange={(description) => {
                            setEditFormData({ ...editFormData, description })
                        }}
                    />
                    <Upload type='image'
                        width='200px'
                        height='200px'
                        defaultValue={editFormData.imgurl}
                        lockInput={inputDisable} infoTitle='browse Brand Photo' onFileChange={(formData) => {
                            setFileData(formData)
                        }} />
                    <div className="button_group">
                        <Button height='48px' width='302px' onClick={() => setIsEdit(false)}>{wrapperIntl('MyProfile.MyBrands.BrandsByType.Cancel')}</Button>
                        <Button disabled={btnLock} height='48px' width='302px' primary onClick={handelEditSubmit}>{editBtnText}</Button>
                    </div>
                </EditBrandstModalStyled>
            </Modal>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={editSnackbar.open}
                onClose={() => { }}
                message={editSnackbar.type === 'error' ? "system error" : 'success'}
                autoHideDuration={2000}
            >
            </Snackbar>
            {<UpdateTopBarImg open={openUpdateTopBarImg} setOpen={setOpenUpdateTopBarImg} run={run} />}
        </BrandsByTypeStyled>
    )
}
