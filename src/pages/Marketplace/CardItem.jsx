import React from 'react'
import styled from 'styled-components'
import { Button } from '@components/UI-kit'
import { useHistory } from 'react-router'
import { AutoStretchBaseWidthOrHeightImg } from '../component/Other/autoStretchBaseWidthOrHeightImg'

const CardItemStyled = styled.div`
    width: 262px;
    height: 408.6px;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    overflow: hidden;
    cursor: pointer;
    position: relative;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &:hover{
        box-shadow:0 0 16px rgba(48,69,114,0.2)
    }
    &:hover .info_wrapper{
        opacity: 0;
        transform:scale(1,0);
    }
    &:hover .item_wrapper .button_group{
        opacity: 1;
        transition-delay:250ms;
        z-index:1;
    }

    &:hover .item_wrapper .info_wrapper{
        display: flex;
    }
    &:hover .mask{
        display: flex;
    }

    img{
        width: 262px;
        height: 262px;
    }

    .item_wrapper{
        height: 140px;
        padding: 21px 19px 24px 20px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;

        /* border-top: 1px solid rgba(0,0,0,0.2); */

        .info_wrapper{
            /* display: flex;
            flex-direction: column; */
            transform-origin: center;
            transition-duration: 200ms;
            transition-property: transform, opacity;
            transition-timing-function: linear;
            
            
            display: grid;
            grid-template-rows: 42px 1fr;
            row-gap: 12px;
            grid-template-areas:
                "info_top"
                "info_bottom" ;

            .info_top {
                box-sizing: border-box;
                border-bottom: 1px solid rgba(0,0,0,0.1);

                grid-area: info_top;
                
                display: flex;
                justify-content: center;
                align-items: flex-start;

                span {
                    font-family: Helvetica Neue;
                    font-style: normal;
                    font-weight: 500;
                    font-size: 16px;
                    line-height: 130%;
                    color: #000000;

                    text-overflow: ellipsis;
                }
            }

            .info_bottom {
                grid-area: info_bottom;

                display: grid;
                grid-template-rows: 16px 22px;
                row-gap: 4px;
                justify-content: space-between;
                grid-template-areas: 
                    "type cardId"
                    "price .";
                
                .type {
                    font-family: Helvetica Neue;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 13px;
                    line-height: 16px;
                    color: #000000;
                    opacity: 0.5;

                    grid-area: type;
                }

                .cardId {
                    font-family: Helvetica Neue;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 13px;
                    line-height: 16px;
                    color: #000000;
                    opacity: 0.5;

                    grid-area: cardId;
                }

                .price {
                    font-family: Helvetica Neue;
                    font-style: normal;
                    font-weight: bold;
                    font-size: 18px;
                    line-height: 22px;
                    color: #000000;
                }
            }
        }
            
        .button_group{
            position: absolute;
            top: 15px;
            left: 0;
            width: 100%;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            opacity: 0;
            transition-duration: 200ms;
            transition-property: z-index, opacity;
            transition-timing-function: linear;
        } 
    }
`

export function CardItem ({ cover, name, price, cardId, poolType }) {
    const history = useHistory()
    
    return (
        <CardItemStyled>
            {/* <img src={cover} alt="" /> */}
            <AutoStretchBaseWidthOrHeightImg width={262} height={262} src={cover} />
            {/* <AutoStretchBaseWidthOrHeightImg src={'http://market-test.bounce.finance:11000/jpgfileget/%E6%B3%B0%E5%8B%923-1616501976.jpg'} width={216} height={216} /> */}
            <div className="item_wrapper">
                <div className='info_wrapper'>
                    {/* <div>
                        <p>{name}</p>
                        <span># {cardId}</span>
                    </div>
                    <p>{price}</p> */}
                    <div className="info_top">
                        <span className="itemName">
                            {name}
                        </span>
                    </div>
                    <div className="info_bottom">
                        <span className="type">Minimum bid</span>
                        <span className="cardId"># {cardId}</span>
                        <span className="price">{price}</span>
                    </div>
                </div>

                <div className="button_group">{cardId !== '--' &&
                    <Button
                        primary
                        width={'162px'}
                        onClick={() => {
                            const pathname = window.location.pathname
                            history.push(`${pathname}/${poolType}/${cardId}`)
                        }}
                        marginTop="34px"
                    >Show More</Button>}
                </div>
            </div>


        </CardItemStyled>
    )
}

const VideoCardItemStyled = styled(CardItemStyled)`
    width: 540px;
    height: 332px;

    img{
        width: 540px;
        height: 262px;
    }

    .item_wrapper{
        .button_group{
            button{
                margin-left: auto;
                margin-right: 16px;
            }
        }

        &:hover .info_wrapper{
            display: flex;
        }
    }
    
`

export function VideoCardItem ({ cover, name, price, cardId, poolType }) {

    return (
        <VideoCardItemStyled>
            <img src={cover} alt="" />
            <div className="item_wrapper">
                <div className='info_wrapper'>
                    <div>
                        <p>{name}</p>
                        <span># {cardId}</span>
                    </div>
                    <p>{price}</p>
                </div>

                <div className="button_group">
                    <Button primary width={'162px'}>Play Video</Button>
                </div>
            </div>


        </VideoCardItemStyled>
    )
}

const AudioCardItemStyled = styled(CardItemStyled)`
       .mask{
            position: absolute;
            width: 100%;
            height: 262px;
            top: 0;
            left: 0;
            background-color: rgba(0,0,0,.84);
            display: none;
            justify-content: center;
            align-items: center;
            p{
                width: 230px;
                color: #fff;
                line-height: 15.6px;
                font-size: 14px;
            }
        }

       .item_wrapper:hover+.mask{
           display: flex;
       }
`

export function AudioCardItem ({ cover, name, price, cardId, describe, poolType }) {
    return (
        <AudioCardItemStyled>
            <img src={cover} alt="" />

            <div className="item_wrapper">
                <div className='info_wrapper'>
                    <div>
                        <p>{name}</p>
                        <span># {cardId}</span>
                    </div>

                    <p>{price}</p>
                </div>

                <div className="button_group">
                    <Button primary width={'162px'}>Listen Audio</Button>
                </div>
            </div>

            <div className="mask">
                <p>{describe}</p>
            </div>


        </AudioCardItemStyled>
    )
}