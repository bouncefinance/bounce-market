import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from '@components/UI-kit'
import AddNewBrandstModal from './AddNewBrandstModal'
// import img_addItem from './assets/addItem_img.png'
import { AutoStretchBaseWidthOrHeightImg } from '@/pages/component/Other/autoStretchBaseWidthOrHeightImg'
import { useLazyQuery } from '@apollo/client'
import { QueryItemsIn1155Brand, QueryItemsIn721Brand } from '@/utils/apollo'
import { useInitEffect } from '@/utils/useInitEffect'
import { useActiveWeb3React } from '@/web3'

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

export function CardItem ({ cover, name, standard }) {
    const [count, setCount] = useState(0);
    const { account } = useActiveWeb3React();

    const [query721BrandItems, brand721Items] = useLazyQuery(QueryItemsIn721Brand, {
        variables: { owner: String(account).toLowerCase() },
        fetchPolicy:"network-only",
        onCompleted: () => {
            setCount(brand721Items.data.bounce721Brands[0].tokenList?.length);
        }
    })

    const [query1155BrandItems, brand1155Items] = useLazyQuery(QueryItemsIn1155Brand, {
        variables: { owner: String(account).toLowerCase() },
        fetchPolicy:"network-only",
        onCompleted: () => {
            setCount(brand1155Items.data.bounce1155Brands[0].tokenLiist?.length)
        }
    })

    useInitEffect(() => {
        if (standard === 1) {
            query721BrandItems();
        } else if (standard  === 2) {
            query1155BrandItems();
        }
    })

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

const AddCardItemStyled = styled.div`
    cursor: default;
    width: 224px;
    .create_wrapper{
        width: 100%;
        text-align: center;
        button{
            width: 224px;
            height: 46px;
            color:#fff;
            background-color: #000;
            margin-top: 32px;
        }
    }
`

export function AddCardItem ({ run, hasAddressButNotBrand, brandAddress, isCreate }) {
    const [showCreateModal, setShowCreateModal] = useState(false)

    return (
        <>
            <AddCardItemStyled>
                {/* <AutoStretchBaseWidthOrHeightImg src={img_addItem} widgth={262} height={180} /> */}
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
