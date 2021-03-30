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
// import nav_video from '@assets/images/icon/nav_video.svg'

import { useBrandInfo } from './useHook'
import Snackbar from '@material-ui/core/Snackbar';
import { useActiveWeb3React } from '@/web3'
import { Controller } from '@/utils/controller'
import { useLazyQuery } from '@apollo/client'
import { QueryOwnerBrandItems, QueryBrandTradeItems } from '@/utils/apollo'
import UpdateTopBarImg from './updateTopBarImg'
import { ImgToUrl } from '@/utils/imgToUrl'
import { AutoStretchBaseWidthOrHeightImg } from '@/pages/component/Other/autoStretchBaseWidthOrHeightImg'
import { CardItem } from '../CardItem'
import { AUCTION_TYPE } from '@/utils/const'
import { SkeletonNFTCard } from '@/pages/component/Skeleton/NFTCard'
import { weiToNum } from '@/utils/useBigNumber'
import Category from '../Category'

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
                width: 124px;
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

const nav_list = [{
    name: 'All Items',
    icon: nav_all,
    route: 'All'
}, {
    name: 'Image',
    icon: nav_image,
    route: 'Image'
}/*, {
    name: 'Video',
    icon: nav_video,
    route: 'Video'
}, {
    name: 'Audios',
    icon: nav_audio,
    route: 'Audio'
}, {
    name: 'Game',
    icon: nav_game,
    route: 'Games'
}, {
    name: 'Others',
    icon: nav_other,
    route: 'Others'
}*/]


export default function BrandsByType () {
    const { brandId, type } = useParams()
    const history = useHistory()
    const [listData, setListData] = useState([])
    const [statusList, setStatusList] = useState([]);
    const { brandInfo, run } = useBrandInfo(brandId)
    const { state } = useContext(myContext)
    const { sign_Axios } = useAxios()
    const [fileData, setFileData] = useState(null)

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
    const [btnLock, setBtnLock] = useState(false)
    // { open: Boolean, type: 'error' | 'success' }
    const [editSnackbar, setEditSnackbar] = useState({
        open: false,
        type: 'error',
    })
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

    const { active, account } = useActiveWeb3React();
    const [loading, setLoading] =  useState(true);
    const [tokenList, setTokenList] = useState([]);

    const handleBrandTradeItems = (pools) => {
        sign_Axios.post(Controller.items.getitemsbyfilter, {
          ids: tokenList,
          category: type.toLowerCase() === 'all' ? '' : type,
          channel: ''
        })
        .then(res => {
          if (res.status === 200 && res.data.code === 1) {
            const list = res.data.data.map(item => {
              const poolInfo = pools.find(pool => pool.tokenId === item.id);
              return {
                  ...item,
                  poolType: poolInfo && poolInfo.poolType,
                  poolId: poolInfo && poolInfo.poolId,
                  price: poolInfo && poolInfo.price && weiToNum(poolInfo.price),
                  createTime: poolInfo && poolInfo.createTime
              }
            })
            const result = list.sort((a, b) => b.createTime - a.createTime);
            setListData(result);
            setStatusList(result);
            setLoading(false);
          }
        })
      }

    const [getBrandTradeItems, brandTradeItems ] = useLazyQuery(QueryBrandTradeItems, {
        variables: {tokenList:  tokenList},
        fetchPolicy:"network-only",
        onCompleted: () => {
            const tradePools = brandTradeItems.data.tradePools.map(item => ({
                ...item,
                poolType: AUCTION_TYPE.FixedSwap
            }));
            const tradeAuctions = brandTradeItems.data.tradeAuctions.map(item => ({
                ...item,
                price: item.lastestBidAmount !== '0' ? item.lastestBidAmount : item.amountMin1,
                poolType: AUCTION_TYPE.EnglishAuction
            }));
            handleBrandTradeItems(tradePools.concat(tradeAuctions));
        }
      })

    const [getBrandItems, {data: brandItems}] = useLazyQuery(QueryOwnerBrandItems, {
        variables: {owner: account ? account.toLowerCase() : account },
        fetchPolicy:"network-only",
        onCompleted: () => {
            const brands = brandInfo.standard === 1 
                ? brandItems.bounce721Brands[0] 
                : brandItems.bounce1155Brands[0];
            if (!brands) {
                handleBrandTradeItems([]);
            } else {
                const tokenList = brands.tokenList.map(item => item.tokenId);
                setTokenList(tokenList);
            }
        }
      })

    useEffect(() => {
        if (!active) return;
        if (!!brandInfo.standard) {
            getBrandItems();
        }
        if (tokenList.length > 0) {
            getBrandTradeItems()
        }
    }, [active, brandInfo.standard, getBrandItems, tokenList.length, getBrandTradeItems]);

    return (
        <BrandsByTypeStyled>
            <div className="back_wrapper">
                <button onClick={() => {
                    history.push('/MyBrands')
                }}>
                    <img src={arrows_left} alt="" />
                    <p>Back to Brands</p>
                </button>
            </div>

            <div className='bg_wrapper' style={brandInfo.bandimgurl ? { backgroundSize: '100%!important', background: `url(${brandInfo.bandimgurl}) center center no-repeat` } : {}}>
                {/* <div className='bg_wrapper' style={{ backgroundSize: '100%', background: `url(https://market-test.bounce.finance/pngfileget/blob-1616642351.png) center center no-repeat` }}> */}
                <button onClick={() => setOpenUpdateTopBarImg(true)}>
                    <img src={edit_white} alt="" />
                    <p>Change</p>
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
                        Edit
                    </button>
                </div>
            </div>

            <div className="nav_wrapper flex flex-space-x">
                <div className="flex">
                {nav_list.map((item) => {
                    return <li key={item.name} className={type === item.route ? 'active' : ''} onClick={() => {
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
                    <AddCardItem type={type} nftType={brandInfo.standard} brandInfo={brandInfo} />
                </li>
                {statusList.map((item, index) => {
                    return <li key={index}>
                        <CardItem 
                            nftId={item.id} 
                            cover={item.fileurl} 
                            itemname={item.itemname} 
                            user={item.ownername}
                            status={item.poolId && 'Listed'}
                            poolInfo={item}
                        />
                    </li>
                })}
                <li>{loading && <SkeletonNFTCard n={1}></SkeletonNFTCard>}</li>
            </ul>

            {/* EDIT */}
            <Modal open={isEdit} setOpen={setIsEdit} header={{ title: 'Edit your Brand', isClose: true }}>
                <EditBrandstModalStyled>
                    <TextInput
                        title='Brand Name'
                        width='620px'
                        required={true}
                        marginTop={0}
                        lockInput={inputDisable}
                        defaultValue={editFormData.brandname}
                        onValChange={(brandname) => {
                            setEditFormData({ ...editFormData, brandname })
                        }}
                    />
                    <TextAreaInput
                        title='Description'
                        width='620px'
                        placeholder={`Describe your brand`}
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
                        <Button height='48px' width='302px' onClick={() => setIsEdit(false)}>Cancel</Button>
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
