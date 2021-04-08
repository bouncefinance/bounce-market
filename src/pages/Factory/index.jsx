import React, { useState } from 'react'
import styled from 'styled-components'

import FactoryCard from './FactoryCard'
import GenerateNFTModal from '../Myprofile/MyGallery/GenerateNftModal'
import CreateBrandModal from '../Myprofile/MyBrands/AddNewBrandstModal'
import AddNewItemModal from './AddNewItemModal'
import ListNFTModal from './ListNFTModal'

import Button from '@/components/UI-kit/Button/Button'


import pic_Generate from './assets/pic_Generate.svg'
import pic_Build from './assets/pic_Build.svg'
import pic_List from './assets/pic_List.svg'

import img1 from './assets/img1.svg'

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

const dataList = {
    img1: img1,
    img2: img1,
    img3: img1,
    leftImgAmount: 12,
    tableInfoList: {
        contractAddress: '0x33a9b7ed8c71c6910fb4a9bc41de...74c2976',
        contractName: 'Cindy Yi',
        contactSymbol: 'CKIE',
        totalSupply: '10',
    },
}

function Factory() {
    const [openGenerateNFTModal, setOpenGenerateNFTModal] = useState(false)
    const [openCreateBrandModal, setCreateBrandModal] = useState(false)
    const [openAddNewItemModal, setAddNewItemModal] = useState(false)
    const [Open, setOpen] = useState("0")
    const [Step, setStep] = useState("0")

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
            <Button
                primary
                onClick={
                    () => {
                        setOpen(true)
                        setStep("1")
                    }
                }
            >
                List
            </Button>
        )
    }

    return (
        <>
            <CardList>
                <FactoryCard
                    img={pic_Generate}
                    title="Generate your NFT"
                    description={<p className="description">You don’t need a store or brand to get started. Generate NFTs and go from there.</p>}
                    button={<GenerateButton />}
                />
                <FactoryCard
                    img={pic_Build}
                    title="Build your brand"
                    description={<p className="description">You can create a contract and produce unlimited amount of NFTs under your own contract</p>}
                    button={<BuildButton />}
                />
                <FactoryCard
                    img={pic_List}
                    title="List your NFT"
                    description={<p className="description">If you already have a token contract set up and you just want to set up a space to sell them, use our get-listed flow instead.
                    <br/>Only for live on mainnet.</p>}
                    button={<ListButton />}
                />
            </CardList>

            <GenerateNFTModal open={openGenerateNFTModal} setOpen={setOpenGenerateNFTModal} />
            <CreateBrandModal open={openCreateBrandModal} setOpen={setCreateBrandModal} />
            <AddNewItemModal open={openAddNewItemModal} setOpen={setAddNewItemModal} />
            <ListNFTModal open={Open} Step={Step} setOpen={setOpen} setStep={setStep} dataList={dataList} />
        </>
    )
}

export default Factory
