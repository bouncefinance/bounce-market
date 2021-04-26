import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

// import img_addItem from './assets/addItem.svg'
import { Button } from '@components/UI-kit'
import { AutoStretchBaseWidthOrHeightImg } from '@/pages/component/Other/autoStretchBaseWidthOrHeightImg'
import ConfirmCancelModal from '../Buy/components/ConfirmCancelModal'
import useToken from '@/utils/useToken'

import { weiToNum } from '@/utils/useBigNumber'
import GenerateNftModal from './MyGallery/GenerateNftModal'
import { AUCTION_TYPE } from '@/utils/const'
import { VideoItem } from '../component/Other/videoItem'

import useWrapperIntl from '@/locales/useWrapperIntl'

const CardItemStyled = styled.div`
    width: 262px;
    /* height: 332px; */
    overflow: hidden;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    position: relative;
    

    .img_wrapper{
        width: 262px;
        height: 262px;
        cursor: pointer;
        img{
            width: 100%;
            height: 100%;
        }
    }

    .content{
        position: relative;
        .info{
            position: absolute;
            top: 0px;
            left: 0px;
            padding: 13px 16px;
            width: 100%;
            box-sizing: border-box;
            p{
                font-size: 12px;
                color: rgba(0, 0, 0, 0.4);
                line-height: 15.6px;
                margin-bottom: 5px;
            }

            span{
                font-size: 16px;
                font-weight: 600;
                line-height: 20.88px;
            }
        }
        

        .button_group{
            position: absolute;
            width: 100%;
            box-sizing: border-box;
            /* top: 0px; */
            left: 0px;
            z-index: 1;

            padding: 0 16px;
            display: none;
            justify-content: space-between;
            margin-top: 16px;

            bottom: 0px;
            padding-bottom: 10px;
            padding-top: 14px;
            background: #fff;

            button{
                font-size: 13px;
            }

            &.btn_one{
                justify-content: center;
                button{
                    width: 200px;
                    font-size: 13px;
                }
            }
        }

        &:hover .info{
            display: none;
        }

    }

    &:hover .button_group{
        display: flex;
    }

    .tag{
        position: absolute;
        top: 0px;
        right: 0px;
        padding: 8px 12px;
        background-color: #1A57F3;
        color: #fff;
        font-size: 12px;
        font-weight: 700;
    }
    .info-box{
        padding: 20px;
        cursor: pointer;
        .name{
            font-size: 16px;
            
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .line{
            margin-top: 20px;
            margin-bottom: 12px;
            height: 0px;
            opacity: 0.1;
            border-bottom: 1px solid #000000;
        }
        .type{
            font-size: 13px;
            color: rgba(0, 0, 0, 0.5)
        }
        ._tag{
            font-size: 13px;
            color: rgba(0, 0, 0, 0.3)
        }
        .price{
            font-family: Helvetica Neue;
            font-weight: bold;
            font-size: 18px;
            margin-top: 4px;
        }
    }
`

export function CardItem({ cover, status, nftId, itemname, poolType, poolInfo, category }) {
    const history = useHistory()
    const { exportErc20Info } = useToken()
    const [openCancel, setOpenCancel] = useState(false)

    const [newPrice, setNewPrice] = useState('--')
    // console.log(poolInfo)

    const { wrapperIntl } = useWrapperIntl()

    useEffect(() => {
        // console.log(poolInfo)
        getPriceByToken1(poolInfo.price, poolInfo.token1)
        // eslint-disable-next-line
    }, [])

    const getPriceByToken1 = async (price, token1) => {
        if (!price || !token1) return setNewPrice('--')
        const tokenInfo = await exportErc20Info(token1)
        const newPrice = weiToNum(price, tokenInfo.decimals)

        setNewPrice(`${newPrice} ${tokenInfo.symbol}`)
    }

    useEffect(() => {
		console.log("category: ", category)
	}, [category])

    useEffect(() => {
		console.log("cover: ", cover)
	}, [cover])

    return (
        <>
            <CardItemStyled>
                {poolInfo && <div className="img_wrapper" onClick={(e) => {
                    // console.log(poolInfo)
                    if (!poolInfo.contractaddress) return
                    history.push("/MyGallery/" + poolInfo.contractaddress + '-' + nftId)
                }}>
                    {category && (category === "Videos" || category === 'video') ?
                        <VideoItem width={262} height={262} src={cover} /> :
                        <AutoStretchBaseWidthOrHeightImg width={262} height={262} src={cover} />}
                </div>}
                <div className="content">
                    {/* <div className="info">
                    <p>{itemname}</p>
                    <span>{user}</span>
                </div> */}
                    <div className="info-box" onClick={() => {
                        if (!poolInfo.contractaddress) return
                        history.push("/MyGallery/" + poolInfo.contractaddress + '-' + nftId)
                    }}
                    >
                        <h5 className="name">{itemname}</h5>
                        <div className="line"></div>
                        <div className="flex flex-space-x">
                            <p className="type">{poolType && (poolType === "english-auction" ? wrapperIntl('MyProfile.CardItem.TopBid') : wrapperIntl('MyProfile.CardItem.TopBid'))}</p>
                            <p className="_tag">{`# ${poolInfo.id}`}</p>
                        </div>
                        <h4 className="price">{poolInfo.price ? newPrice : wrapperIntl('MyProfile.CardItem.NotOnSale')}</h4>
                    </div>
                    {
                        status !== wrapperIntl("Listed") ? <div className='button_group btn_one'>
                            <Button
                                value={wrapperIntl('MyProfile.CardItem.Sell')}
                                primary
                                onClick={() => {
                                    if (poolInfo.getType === "getMyApi") {
                                        return history.push(`/MyGallery/${poolInfo.contractaddress}-${nftId}/Sell`)
                                    }
                                    history.push(`/MyGallery/${poolInfo.contractaddress}-${nftId}/Sell`)
                                }}
                            />
                            {/* <Button value={'Make Listed'} /> */}
                        </div> : poolInfo.poolType === AUCTION_TYPE.FixedSwap ? <div className='button_group'>
                            <Button value={wrapperIntl('MyProfile.CardItem.CheckStatus')} primary onClick={() => {
                                history.push(`/Marketplace/FineArts/${poolType}/${poolInfo.poolId}`)
                            }} />
                            <Button value={wrapperIntl('MyProfile.CardItem.MakeUnlisted')} onClick={() => {
                                setOpenCancel(true)
                            }} />
                        </div> : <div className='button_group btn_one'>
                            <Button value={wrapperIntl('MyProfile.CardItem.CheckStatus')} primary onClick={() => {
                                history.push(`/Marketplace/FineArts/${poolType}/${poolInfo.poolId}`)
                            }} />
                        </div>
                    }
                </div>
                {status === wrapperIntl("Listed") && <div className="tag">
                    {status}
                </div>}
            </CardItemStyled>
            {parseInt(poolInfo.poolId) >= 0 && <ConfirmCancelModal open={openCancel} setOpen={setOpenCancel} poolId={poolInfo.poolId} />}
        </>
    )
}

const AddCardItemStyle = styled.div`
    .content{
        width: 100%;
        text-align: center;
        button{
            width: 224px;
            height: 46px;
            color:#fff;
            background-color: #000;
            /* margin: 18px auto; */
        }
    }
`

export function AddCardItem() {
    const [showGenrateModal, setShowGenrateModal] = useState(false)

    const { wrapperIntl } = useWrapperIntl()

    return (
        <>
            <AddCardItemStyle>
                {/* <div className="img_wrapper">
                    <img src={img_addItem} alt="" />
                </div> */}
                <div className="content">
                    <Button value={wrapperIntl('MyProfile.AddCardItem.AddNewNFT')} onClick={() => {
                        setShowGenrateModal(true)
                    }} />
                </div>
            </AddCardItemStyle >
            <GenerateNftModal open={showGenrateModal} setOpen={setShowGenrateModal} />
        </>
    )
}

const PenddingCardItemStyle = styled(CardItemStyled)`
    .content{
        width: 100%;
        text-align: center;
        button{
            width: 224px;
            height: 46px;
            color:#fff;
            background-color: #000;
            /* margin: 18px auto; */
        }
        .price{
            font-size: 13px;
            line-height: 23px;
        }
    }

   
`

export function PenddingCardItem({ pools, category }) {
    console.log('=====', pools.fileurl, pools)
    const { wrapperIntl } = useWrapperIntl()

    return <PenddingCardItemStyle>
        {/* <div className="img_wrapper">
            <AutoStretchBaseWidthOrHeightImg src={pools.fileurl} width={262} height={262} />
        </div> */}
        {category && category === (category === "Videos" || category === 'video') ?
            <VideoItem width={262} height={262} src={pools.fileurl} /> :
            <AutoStretchBaseWidthOrHeightImg width={262} height={262} src={pools.fileurl} />}

        <div className="content">
            <div className="info-box">
                <h5 className="name">{pools.itemname}</h5>
                <div className="line"></div>
                <div className="flex flex-space-x">
                    <p className="type">{wrapperIntl("MyProfile.CardItem.InProcessOfCreation")}</p>
                    <p className="_tag">{`# ${pools.id}`}</p>
                </div>
                <h4 className="price">{wrapperIntl("MyProfile.CardItem.WaitingBlock")}</h4>
            </div>
        </div>
    </PenddingCardItemStyle>
}
