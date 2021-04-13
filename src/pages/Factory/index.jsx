import React, { useState } from 'react'
import styled from 'styled-components'

import useWrapperIntl from '@/locales/useWrapperIntl'

import FactoryCard from './FactoryCard'
import GenerateNFTModal from '../Myprofile/MyGallery/GenerateNftModal'
import CreateBrandModal from '../Myprofile/MyBrands/AddNewBrandsModal'
import AddNewItemModal from './AddNewItemModal'
import ListNFTModal from './ListNFTModal'

import Button from '@/components/UI-kit/Button/Button'


import pic_Generate from './assets/pic_Generate.svg'
import pic_Build from './assets/pic_Build.svg'
import pic_List from './assets/pic_List.svg'

import img1 from './assets/img1.svg'
import { useWalletConnect } from '@/web3/useWalletConnect'

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

function Factory () {
    const { onConnect } = useWalletConnect()
    const [openGenerateNFTModal, setOpenGenerateNFTModal] = useState(false)
    const [openCreateBrandModal, setCreateBrandModal] = useState(false)
    const [openAddNewItemModal, setAddNewItemModal] = useState(false)
    const [Open, setOpen] = useState("0")
    const [Step, setStep] = useState("0")

    const { wrapperIntl } = useWrapperIntl()

    const GenerateButton = () => {
        return (
            <Button
                primary
                onClick={() => {
                    onConnect()
                    setOpenGenerateNFTModal(true)
                }}
            >
                {wrapperIntl("Factory.Generate")}
            </Button>
        )
    }

    const BuildButton = () => {
        return (
            <Button
                primary
                onClick={() => {
                    onConnect()
                    setCreateBrandModal(true)
                }}
            >
                {wrapperIntl("Factory.Build")}
            </Button>
        )
    }

    const ListButton = () => {
        return (
            <Button
                primary
                onClick={
                    () => {
                        onConnect()
                        setOpen(true)
                        setStep("1")
                    }
                }
            >
                {wrapperIntl("Factory.List")}
            </Button>
        )
    }

    return (
        <>
            <CardList>
                <FactoryCard
                    img={pic_Generate}
                    title={wrapperIntl("Factory.GenerateYourNFT")}
                    description={<p className="description">{wrapperIntl("Factory.GenerateDescription")}</p>}
                    button={<GenerateButton />}
                />
                <FactoryCard
                    img={pic_Build}
                    title={wrapperIntl("Factory.BuildYourBrand")}
                    description={<p className="description">{wrapperIntl("Factory.BuildDescription")}</p>}
                    button={<BuildButton />}
                />
                <FactoryCard
                    img={pic_List}
                    title={wrapperIntl("Factory.ListYourNFT")}
                    description={
                        <p className="description">
                            {wrapperIntl("Factory.ListDescription1")}
                            <br/>
                            {wrapperIntl("Factory.ListDescription2")}
                        </p>
                    }
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
