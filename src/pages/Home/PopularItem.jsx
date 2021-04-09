import { weiToNum } from '@/utils/useBigNumber'
import useToken from '@/utils/useToken'
import { useActiveWeb3React } from '@/web3'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import { AutoStretchBaseWidthOrHeightImg } from '../component/Other/autoStretchBaseWidthOrHeightImg'

const PopularItemStyled = styled.div`
    width: 262px;
    // height: 332px;
    box-sizing: border-box;
    margin-right: 17px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    overflow: hidden;
    margin-bottom: 32px;
    cursor: pointer;
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

export default function PopularItem({ style = {}, itemInfo }) {
    const history = useHistory()
    const { active } = useActiveWeb3React()
    const { exportErc20Info } = useToken()
    const [newPrice, setNewPrice] = useState('Loading Price ...')

    useEffect(() => {
        if(!active) return
        getPriceByToken1(itemInfo.price, itemInfo.token1)
        // eslint-disable-next-line
    }, [active, itemInfo])

    const getPriceByToken1 = async (price, token1) => {
        if (!price || !token1) return setNewPrice('--')
        const tokenInfo = await exportErc20Info(token1)
        const newPrice = weiToNum(price, tokenInfo.decimals)
        setNewPrice(`${newPrice} ${tokenInfo.symbol}`)
    }
    return (
        <PopularItemStyled style={style} onClick={() => {
            history.push(`/Marketplace/FineArts/${itemInfo.poolType}/${itemInfo.poolId}`)
        }}>
            <AutoStretchBaseWidthOrHeightImg src={itemInfo.fileurl} width={262} height={262} />
            {/* <div className='info_box'>
                <p>{name}</p>
                <span>{price}</span>
            </div> */}
            <div className="infobox">
                <h5 className="name">{itemInfo.itemname}</h5>
                <div className="line"></div>
                <div className="flex flex-space-x">
                    <p className="type">
                        {itemInfo.poolType && (itemInfo.poolType === "english-auction" ? "Top Bid" : "Price")}
                    </p>
                    <p className="tag">{itemInfo.poolId}</p>
                </div>
                <h4 className="price">{newPrice}</h4>
            </div>
        </PopularItemStyled>
    )
}
