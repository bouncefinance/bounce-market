import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from '@components/UI-kit'
import AddNewBrandstModal from './AddNewBrandstModal'
import img_addItem from './assets/addItem_img.png'

const CardItemStyled = styled.div`
    width: 262px;
    height: 250px;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    overflow: hidden;
    cursor: pointer;
    position: relative;
    padding: 0;

    img{
        width: 262px;
        height: 180px;
    }

    .item_wrapper{
        height: 67px;
        padding: 14px 16px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        span{
            font-weight: 600;
            font-size: 16px;
        }

        p{
            font-size: 12px;
            color: rgba(0,0,0,.4);
        }
    }
`

export function CardItem({ cover, name, count }) {

    return (
        <CardItemStyled>
            <img src={cover} alt="" />
            <div className="item_wrapper">
                <span>{name}</span>
                <p>{count} items</p>
            </div>
        </CardItemStyled>
    )
}

const AddCardItemStyled = styled(CardItemStyled)`
    cursor: default;
    .create_wrapper{
        width: 100%;
        text-align: center;
        button{
            margin: 15px auto;
            cursor: pointer;
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
            <AddNewBrandstModal open={showCreateModal} setOpen={setShowCreateModal} />
        </>
    )
}
