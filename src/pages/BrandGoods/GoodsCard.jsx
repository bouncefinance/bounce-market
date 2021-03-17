import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { Button } from '@components/UI-kit'



const StyledGoodsCard = styled.div`
    height: 332px;

    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.2);

    display: grid;
    grid-template-rows: 262px 30px 1fr;

    img {
        width: 260px;
        grid-row: 1 / 2;
    }
    
    .goodsInfo {
        grid-row: 2 / 4;
        .row-1 {
            display: flex;
            justify-content: space-between;

            margin: 14px 16px 0 16px;

            .goodsName {
                font-family: IBM Plex Mono;
                font-style: normal;
                font-weight: 500;
                font-size: 12px;
                line-height: 16px;
                display: flex;
                align-items: center;
                color: #000000;
                opacity: 0.8;
            }

            .goodsId {
                font-family: IBM Plex Mono;
                font-style: normal;
                font-weight: normal;
                font-size: 12px;
                line-height: 16px;
                display: flex;
                align-items: center;
                text-align: right;
                color: #000000;
                opacity: 0.4;
            }
        }

        .price {
            margin: 8px 16px auto 16px;
            font-family: IBM Plex Mono;
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            line-height: 21px;
            display: flex;
            align-items: center;
            color: #000000;
        }

    }

    .button_showMore{
        display: none;
        width: 100%;
        box-sizing: border-box;

        grid-row: 2 / 4;
        justify-content: center;
        align-items: center;

        button{
            width: 110px;
            /* margin-top: 18px; */
        }
    }
    

    &:hover .goodsInfo {
        display: none;
    }

    &:hover .button_showMore {
        display: flex;
    }
`

function GoodsCard({ img, goodsName, goodsId, price }) {
    const { type } = useParams()

    return (
        <StyledGoodsCard className={`GoodsCard ${type}`}>
            <img src={img} alt={type} />
            <div className="goodsInfo">
                <div className="row-1">
                    <span className="goodsName">{goodsName}</span>
                    <span className="goodsId">#{goodsId}</span>
                </div>
                <span className="price">{price}</span>
            </div>
            <div className="button_showMore">
                <Button value='Show More' primary />
            </div>
        </StyledGoodsCard>
    )
}

export default GoodsCard
