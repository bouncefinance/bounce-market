import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from '@components/UI-kit'
import AddNewItemModal from './AddNewItemModal'
import img_addItem from './assets/addItem.svg'
import { AutoStretchBaseWidthOrHeightImg } from '@/pages/component/Other/autoStretchBaseWidthOrHeightImg'
import useWrapperIntl from '@/locales/useWrapperIntl'

const CardItemStyled = styled.div`
    width: 262px;
    height: 397.32px;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    overflow: hidden;
    cursor: pointer;
    position: relative;
    padding: 0;

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

export function CardItem ({ type, cover, name, price, poolId }) {

    return (
        <CardItemStyled type={type}>
            <AutoStretchBaseWidthOrHeightImg src={cover} widgth={262} height={262} />
            <div className="item_wrapper">
                <p>{name}</p>
                {price && <span>{price}</span>}
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
            margin: 46px auto;
            cursor: pointer;
        }
    }
`

export function AddCardItem ({ type, brandInfo ,contract}) {
    const [showCreateModal, setShowCreateModal] = useState(false)
    const { wrapperIntl } = useWrapperIntl()

    return (
        <>
            <AddCardItemStyled>
                <img src={img_addItem} alt="" />
                <div className="create_wrapper">
                    <Button value={wrapperIntl("MyProfile.MyBrands.CardItem.Add")} width='162px' onClick={() => {
                        setShowCreateModal(true)
                    }} />
                </div>
            </AddCardItemStyled>
            <AddNewItemModal open={showCreateModal} setOpen={setShowCreateModal} defaultValue={type} brandInfo={brandInfo} contract={contract}/>
        </>
    )
}
