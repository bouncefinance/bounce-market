import { weiToNum } from '@/utils/useBigNumber'
import useToken from '@/utils/useToken'
// import { useActiveWeb3React } from '@/web3'
import React, { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import { AutoStretchBaseWidthOrHeightImg } from '../component/Other/autoStretchBaseWidthOrHeightImg'
import { VideoItem } from '../component/Other/videoItem'
import useWrapperIntl from '@/locales/useWrapperIntl'
import { useActiveWeb3React } from '@/web3'
import { myContext } from '@/redux'

const PopularItemStyled = styled.div`
    width: 262px;
    // height: 332px;
    box-sizing: border-box;
    margin-right: 17px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    overflow: hidden;
    margin-bottom: 32px;
    cursor: ${({active})=>{
        return active ? 'pointer' : 'default'
    }};
    transition: all 200ms;
    :hover{
        transform: translateY(-10px);
        box-shadow: 5px 5px 10px #ccc;
    }

    &:nth-child(4n){
        margin-right: 0px;
    }



    .info_box{
        padding-left: 16px;
        p{
            font-size: 12px;
            color: rgba(0,0,0,.4);
            line-height: 15.6px;
            margin-top: 14px;
            margin-bottom: 8px;
        }

        span{
            font-weight: 600;
            color: rgba(0,0,0,1);
        }

    }

    .infobox{
        padding: 20px;
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
        .tag{
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

export default function PopularItem({ style = {}, itemInfo, setIsConnectWallect }) {
    const history = useHistory()
    const {active} = useActiveWeb3React()
    const { dispatch } = useContext(myContext)
    const { wrapperIntl } = useWrapperIntl()

    const { exportErc20Info } = useToken()
    /* const [newPrice, setNewPrice] = useState('Loading Price ...') */
    const [newPrice, setNewPrice] = useState(wrapperIntl("home.PopularItem.LoadingPrice"))

    useEffect(() => {
        console.log("itemInfo: ", itemInfo)
        getPriceByToken1(itemInfo.price, itemInfo.token1)
        // eslint-disable-next-line
    }, [itemInfo])

    const getPriceByToken1 = async (price, token1) => {
        if (!price || !token1) return setNewPrice('--')
        const tokenInfo = await exportErc20Info(token1)
        const newPrice = weiToNum(price, tokenInfo.decimals)
        setNewPrice(`${newPrice} ${tokenInfo.symbol}`)
    }
    return (
        <PopularItemStyled active={active} style={style} onClick={() => {
            if (active) {
                history.push(`/Marketplace/FineArts/${itemInfo.poolType}/${itemInfo.poolId}`,
                {
                    category: itemInfo.category,
                    fileurl: itemInfo.fileurl,
                    name: itemInfo.itemname,
                    price: itemInfo.price,
                    description: itemInfo.description,
                    owneraddress: itemInfo.owneraddress,
                    token1: itemInfo.token1,
                    poolType: itemInfo.poolType,
                })
            }
            else {
                dispatch({
                    type: 'Modal_Message',
                    showMessageModal: true,
                    modelType: 'error',
                    modelMessage: wrapperIntl("ConnectWallet"),
                    modelTimer: 24 * 60 * 60 * 1000,
                    subsequentActionType: "connectWallet",
                    modelUrlMessage: wrapperIntl("header.ConnectWallet"),
                    subsequentActionFunc: setIsConnectWallect,
                });

                // back to the top
                (function smoothToTop(){
                    var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
                    if (currentScroll > 0) {
                         window.requestAnimationFrame(smoothToTop);
                         window.scrollTo (0,currentScroll - (currentScroll/5));
                    }
                })();
            }
        }}>
            {   itemInfo.category && itemInfo.category === 'video'
                ? <VideoItem width={262} height={262} src={itemInfo.fileurl} />
                : <AutoStretchBaseWidthOrHeightImg src={itemInfo.litimgurl || itemInfo.fileurl} width={262} height={262} />
            }
            {/* <div className='info_box'>
                <p>{name}</p>
                <span>{price}</span>
            </div> */}
            <div className="infobox">
                <h5 className="name">{itemInfo.itemname}</h5>
                <div className="line"></div>
                <div className="flex flex-space-x">
                    <p className="type">
                        {itemInfo.poolType && (itemInfo.poolType === "english-auction" ? wrapperIntl("home.PopularItem.TopBid") : wrapperIntl("home.PopularItem.Price"))}
                    </p>
                    <p className="tag">{`# ${itemInfo.id}`}</p>
                    {/* <p>{itemInfo.poolweight}</p> */}
                </div>
                <h4 className="price">{newPrice}</h4>
            </div>
        </PopularItemStyled>
    )
}
