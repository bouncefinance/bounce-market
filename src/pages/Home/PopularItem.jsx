import React from 'react'
import styled from 'styled-components'
import { AutoStretchBaseWidthOrHeightImg } from '../component/Other/autoStretchBaseWidthOrHeightImg'

const PopularItemStyled = styled.div`
    width: 262px;
    height: 332px;
    box-sizing: border-box;
    margin-right: 17px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    overflow: hidden;
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
    
`

export default function PopularItem ({ src, name, price }) {
    return (
        <PopularItemStyled>
            <AutoStretchBaseWidthOrHeightImg src={src} width={262} height={262} />
            <div className='info_box'>
                <p>{name}</p>
                <span>{price}</span>
            </div>
        </PopularItemStyled>
    )
}
