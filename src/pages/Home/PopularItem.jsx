import React from 'react'
import styled from 'styled-components'
import { AutoStretchBaseWidthOrHeightImg } from '../component/Other/autoStretchBaseWidthOrHeightImg'

const PopularItemStyled = styled.div`
    width: 262px;
    // height: 332px;
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

    .infobox{
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

export default function PopularItem ({ style = {}, src, name, type = "Minimum bid", tag = "#12345", price }) {
    return (
        <PopularItemStyled style={style}>
            <AutoStretchBaseWidthOrHeightImg src={src} width={262} height={262} />
            {/* <div className='info_box'>
                <p>{name}</p>
                <span>{price}</span>
            </div> */}
            <div className="infobox">
                <h5 className="name">{name}</h5>
                <div className="line"></div>
                <div className="flex flex-space-x">
                    <p className="type">{type}</p>
                    <p className="tag">{tag}</p>
                </div>
                <h4 className="price">{price}</h4>
            </div>
        </PopularItemStyled>
    )
}
