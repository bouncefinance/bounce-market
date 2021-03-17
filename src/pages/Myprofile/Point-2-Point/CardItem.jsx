import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from '@components/UI-kit'
import AddNewRequestModal from './AddNewRequestModal'

import img_addItem from './assets/addItem.svg'

const CardItemStyled = styled.div`
    width: 262px;
    height: 228px;
    box-sizing: border-box;
    padding: 16px 20px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    overflow: hidden;
    cursor: pointer;
    position: relative;

    .top{
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 2px solid #000;
        padding-bottom: 16px;

        p{
            font-size: 15px;
            color: #000;
        }

        div.Live{
            display: flex;
            align-items: center;
            div{
                width: 8px;
                height: 8px;
                background-color: rgba(45,171,80,1);
                margin-right: 6px;
                border-radius: 50%;
            }
            span{
                font-size: 12px;
                color: rgba(45,171,80,1);
            }
        }
    }

    .main{
        height: 143px;
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

export function CardItem({ title, status, context, price }) {

    return (
        <CardItemStyled>
            <div className="top">
                <p>{title}</p>
                <div className={status}>
                    <div></div>
                    <span>{status}</span>
                </div>
            </div>

            <div className="main">
                <p>{context}</p>

                <h5 className='price'>{price}</h5>
            </div>

            <div className="button_group">
                <Button value='Check' primary />
                <Button value='Delete' />
            </div>
        </CardItemStyled>
    )
}

const AddCardItemStyled = styled(CardItemStyled)`
    padding: 0;
    img{
        width: 262px;
        height: 158px;
    }
    .create_wrapper{
        width: 100%;
        text-align: center;
        button{
            margin: 15px auto;
        }
    }
`

export function AddCardItem() {
    const [showCreateModal, setShowCreateModal] = useState(false)

    return (
        <>
            <AddCardItemStyled>
                <img src={img_addItem} alt="" />
                <div className="create_wrapper">
                    <Button value='Create' onClick={() => {
                        setShowCreateModal(true)
                    }} />
                </div>
            </AddCardItemStyled>
            <AddNewRequestModal open={showCreateModal} setOpen={setShowCreateModal} />
        </>
    )
}
