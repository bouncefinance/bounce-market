import React from 'react'
import styled from 'styled-components'
import { Button } from '@components/UI-kit'

const OffersCardItemStyled = styled.div`
    width: 262px;
    height: 300px;
    box-sizing: border-box;
    padding: 16px 20px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    overflow: hidden;
    cursor: pointer;
    position: relative;

    .top{
        height: 24px;
        display: flex;
        align-items: center;
        border-bottom: 2px solid #000;
        padding-bottom: 14px;

        img{
            margin-right: 12px;
        }

        p{
            font-size: 15px;
            color: #000;
        }
    }

    .main{
        height: 226px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        p{
            font-size: 13px;
            line-height: 16.13px;
            font-weight: 400;
            margin-top: 16px;
            color: rgba(0,0,0,.7);
        }

        h5{
            font-weight: 600;
            color: rgba(31,25,27,1);
        }
    }

    .button_group{
        display: none;
        position: absolute;
        bottom: 16px;
        left: 0;
        width: 100%;
        box-sizing: border-box;
        padding: 0 16px;
        justify-content: space-between;

        button{
            width: 110px;
        }
    }

    &:hover .button_group{
        display: flex;
    }

    &:hover .price{
        display: none;
    }
`

export default function OffersCardItem({ title, cover, context, price }) {

    return (
        <OffersCardItemStyled>
            <div className="top">
                <img src={cover} alt="" />
                <p>{title}</p>
            </div>

            <div className="main">
                <p>{context}</p>

                <h5 className='price'>{price}</h5>
            </div>

            <div className="button_group">
                <Button value='Contact' primary />
                <Button value='See Profile' />
            </div>
        </OffersCardItemStyled>
    )
}