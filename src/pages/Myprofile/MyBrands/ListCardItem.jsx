import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from '@components/UI-kit'
import AddNewBrandstModal from './AddNewBrandstModal'
import img_addItem from './assets/addItem_img.png'
import { AutoStretchBaseWidthOrHeightImg } from '@/pages/component/Other/autoStretchBaseWidthOrHeightImg'

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

export function CardItem ({ cover, name, count }) {

    return (
        <CardItemStyled>
            <AutoStretchBaseWidthOrHeightImg src={cover} widgth={262} height={180} />
            <div className="item_wrapper">
                <span>{name}</span>
                <p>{count} {count > 1 ? 'items' : 'item'}</p>
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

export function AddCardItem ({ run, hasAddressButNotBrand, brandAddress, isCreate }) {
    const [showCreateModal, setShowCreateModal] = useState(false)

    return (
        <>
            <AddCardItemStyled>
                <AutoStretchBaseWidthOrHeightImg src={img_addItem} widgth={262} height={180} />
                <div className="create_wrapper">
                    {isCreate ? <Button value='Create' onClick={() => {
                        setShowCreateModal(true)
                    }} /> : <div style={{ opacity: 0.5 }}>
                        <Button value='Create' />
                    </div>}
                </div>
            </AddCardItemStyled>
            <AddNewBrandstModal run={run} hasAddressButNotBrand={hasAddressButNotBrand} brandAddress={brandAddress} open={showCreateModal} setOpen={setShowCreateModal} />
        </>
    )
}
