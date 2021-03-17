import React from 'react'
import styled from 'styled-components'
import { Button } from '@components/UI-kit'

const CardItemStyled = styled.div`
    width: 262px;
    height: 332px;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    overflow: hidden;
    cursor: pointer;
    position: relative;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    img{
        width: 262px;
        height: 262px;
    }

    .item_wrapper{
        height: 67px;
        padding: 14px 16px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;

        .info_wrapper{
            display: flex;
            flex-direction: column;
            div{
                font-size: 12px;
                display: flex;
                justify-content: space-between;
                margin-bottom: 8px;

                span{
                    color: rgba(0,0,0,.4);
                }
            }

            &>p{
                font-size: 16px;
                font-weight: 600;
            }
        }
            
        .button_group{
            position: absolute;
            top: 15px;
            left: 0;
            width: 100%;
            box-sizing: border-box;
            display: none;
            /* display: flex; */
            justify-content: center;
        }
        
        &:hover .button_group{
            display: flex;
        }

        &:hover .info_wrapper{
            display: none;
        }
    }
`

export function CardItem({ cover, name, price, cardId }) {

    return (
        <CardItemStyled>
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
                    <Button primary width={'162px'}>Show More</Button>
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

export function VideoCardItem({ cover, name, price, cardId }) {

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

export function AudioCardItem({ cover, name, price, cardId, describe }) {

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