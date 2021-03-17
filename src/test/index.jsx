import React, {useState} from 'react'
import styled from 'styled-components'

import GenerateNFTModal from '../pages/Factory/GenerateNFTModal'
import CreateBrandModal from '../pages/Factory/CreateBrandModal'
import AddNewItemModal from '../pages/Factory/AddNewItemModal'
import ListNFTModalStep1 from '../pages/ListNFT/ListNFTModalStep1'
import ListNFTModalStep2 from '../pages/ListNFT/ListNFTModalStep2'

import img1 from '../pages/ListNFT/assets/img1.svg'

const Button = styled.button`
    border: 1px solid gray;
    margin-right: 10px;
`

export default function Index() {
    const [openModal1, setOpenModal1] = useState(false)
    const [openModal2, setOpenModal2] = useState(false)
    const [openModal3, setOpenModal3] = useState(false)
    const [openModal4, setOpenModal4] = useState(false)
    const [openModal5, setOpenModal5] = useState(false)

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
    return (
        <div>
            <h1>Test Page</h1>

            <Button onClick={() => {setOpenModal1(true)}}>GenerateNFTModal</Button>
            <Button onClick={() => {setOpenModal2(true)}}>CreateBrandModal</Button>
            <Button onClick={() => {setOpenModal3(true)}}>AddNewItemModal</Button>
            <Button onClick={() => {setOpenModal4(true)}}>ListNFTModalStep1</Button>
            <Button onClick={() => {setOpenModal5(true)}}>ListNFTModalStep2</Button>

            <GenerateNFTModal open={openModal1} setOpen={setOpenModal1} />
            <CreateBrandModal open={openModal2} setOpen={setOpenModal2} />
            <AddNewItemModal open={openModal3} setOpen={setOpenModal3} />
            <ListNFTModalStep1 open={openModal4} setOpen={setOpenModal4} />
            <ListNFTModalStep2
                open={openModal5}
                setOpen={setOpenModal5}
                dataList={dataList}
            />
        </div>
    )
}
