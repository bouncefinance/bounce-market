import React, { useState } from 'react'
import styled from 'styled-components'

import FactoryCard from './FactoryCard'
import GenerateNFTModal from '../Myprofile/MyInventory/GenerateNftModal'
import CreateBrandModal from '../Myprofile/MyBrands/AddNewBrandstModal'
import AddNewItemModal from './AddNewItemModal'
import LinkButton from '@/components/UI-kit/Button/LinkButton'
import Button from '@/components/UI-kit/Button/Button'


import pic_Generate from './assets/pic_Generate.svg'
import pic_Build from './assets/pic_Build.svg'
import pic_List from './assets/pic_List.svg'

const CardList = styled.div`
    width: 1100px;
    margin: 0 auto;
    margin-bottom: 40px;
    margin-top: 40px;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 18px;
    row-gap: 25px;
`

function Factory() {
    const [openGenerateNFTModal, setOpenGenerateNFTModal] = useState(false)
    const [openCreateBrandModal, setCreateBrandModal] = useState(false)
    const [openAddNewItemModal, setAddNewItemModal] = useState(false)

    const GenerateButton = () => {
        return (
            <Button
                primary
                onClick={() => setOpenGenerateNFTModal(true)}
            >
                Generate
            </Button>
        )
    }

    const BuildButton = () => {
        return (
            <Button
                primary
                onClick={() => setCreateBrandModal(true)}
            >
                Build
            </Button>
        )
    }

    const ListButton = () => {
        return (
            <LinkButton to="/ListNFT" primary>
                List
            </LinkButton>
        )
    }

    return (
        <>
            <CardList>
                <FactoryCard
                    img={pic_Generate}
                    title="Generate your NFT"
                    description="You can turn contents in to NFTs without creating your own store or brand"
                    button={<GenerateButton />}
                />
                <FactoryCard
                    img={pic_Build}
                    title="Build your brand"
                    description="You can create a contract and produce unlimited amount of NFTs under your own contract"
                    button={<BuildButton />}
                />
                <FactoryCard
                    img={pic_List}
                    title="List your NFT"
                    description="If you already have a token contract set up and you just want to set up a space to sell them, use our get-listed flow instead"
                    button={<ListButton />}
                />
            </CardList>

            <GenerateNFTModal open={openGenerateNFTModal} setOpen={setOpenGenerateNFTModal} />
            <CreateBrandModal open={openCreateBrandModal} setOpen={setCreateBrandModal} />
            <AddNewItemModal open={openAddNewItemModal} setOpen={setAddNewItemModal} />
        </>
    )
}

export default Factory
