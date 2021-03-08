import React from 'react'
import styled from 'styled-components'
import img_example_3 from '@assets/images/example_3.svg'
import { Button } from '@components/UI-kit'

const CardItemStyled = styled.div`
    width: 262px;
    height: 332px;
    overflow: hidden;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.2);

    img{
        width: 262px;
        height: 262px;
    }

    .content{
        position: relative;
        .info{
            position: absolute;
            top: 0px;
            left: 0px;
            padding: 13px 16px;
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
            display: none;
            position: absolute;
            width: 100%;
            box-sizing: border-box;
            top: 0px;
            left: 0px;
            z-index: 1;

            padding: 0 16px;
            display: flex;
            justify-content: space-between;
            margin-top: 16px;
        }
    }
    
`

export default function CardItem() {
    return (
        <CardItemStyled>
            <img src={img_example_3} alt="" />
            <div className="content">
                <div className="info">
                    <p>Digital Image Name</p>
                    <span>Cindy Yi</span>
                </div>
                <div className='button_group'>
                    <Button value={'Sell'} primary />
                    <Button value={'Make Listed'} />
                </div>
            </div>
        </CardItemStyled>
    )
}
