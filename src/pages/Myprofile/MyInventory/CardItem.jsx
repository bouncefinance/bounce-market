import React, { useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

// import img_addItem from './assets/addItem.svg'
import { Button } from '@components/UI-kit'
import GenerateNftModal from './GenerateNftModal'
import { AutoStretchBaseWidthOrHeightImg } from '@/pages/component/Other/autoStretchBaseWidthOrHeightImg'

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
        .name{
            font-size: 16px;
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

export function CardItem ({ cover, status, nftId, itemname, user }) {
    const history = useHistory()

    return (
        <CardItemStyled>
            <div className="img_wrapper">
                <AutoStretchBaseWidthOrHeightImg src={cover} width={262} height={262} />
            </div>
            <div className="content">
                {/* <div className="info">
                    <p>{itemname}</p>
                    <span>{user}</span>
                </div> */}
                <div className="info-box">
                    <h5 className="name">{itemname}</h5>
                    <div className="line"></div>
                    <div className="flex flex-space-x">
                        <p className="type">{'Top bid'}</p>
                        <p className="_tag">{'#12345'}</p>
                    </div>
                    <h4 className="price">{'Not on sale'}</h4>
                </div>
               {
                    status === 'Listed' ? <div className='button_group'>
                        <Button value={'Check Status'} primary onClick={() => {
                            history.push(`/MyInventory/${nftId}`)
                        }} />
                        <Button value={'Make Unlisted'} />
                    </div> : <div className='button_group'>
                        <Button
                            value={'Sell'}
                            primary
                            onClick={() => { history.push(`/MyInventory/${nftId}/Sell`) }}
                        />
                        <Button value={'Make Listed'} />
                    </div>
                }
            </div>
            { status === 'Listed' && <div className="tag">
                {status}
            </div>}
        </CardItemStyled>
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

export function AddCardItem () {
    const [showGenrateModal, setShowGenrateModal] = useState(false)

    return (
        <>
            <AddCardItemStyle>
                {/* <div className="img_wrapper">
                    <img src={img_addItem} alt="" />
                </div> */}
                <div className="content">
                    <Button value={'+ Add new NFT'} onClick={() => {
                        setShowGenrateModal(true)
                    }} />
                </div>
            </AddCardItemStyle>
            <GenerateNftModal open={showGenrateModal} setOpen={setShowGenrateModal} />
        </>
    )
}
