import React, {useState} from 'react'
import styled from 'styled-components'

import ListNFTModal from './ListNFTModal'

import img1 from './assets/img1.svg'

const StyledButton = styled.button`
    width: 354px;
    height: 220px;
    border: 1px solid #000000;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    &:hover {
        cursor:pointer;
        border: 1px solid #000000;
        box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
    }

    padding-right: 28px;
    padding-left: 28px;


    .content {
        height: 100%; /* !!!!! */

        display: flex;
        flex-direction: column;
        align-items: flex-start;

        .title {
            font-family: Optima;
            font-style: normal;
            font-weight: bold;
            font-size: 28px;
            line-height: 34px;
            color: #000000;

            margin-top: 70px;
        }

        .description {
            font-family: Helvetica Neue;
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            line-height: 124%;
            color: #1F191B;
            opacity: 0.8;

            margin-top: 8px;
            text-align: left;
        }
    }
`

const CardList = styled.div`
    width: 1100px;
    margin: 60px auto auto auto;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
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

function ListNFT() {
    /* const [OpenStep1, setOpenStep1] = useState(false) */

    const [Open, setOpen] = useState("0")
    const [Step, setStep] = useState("0")

    // console.log("Step: ", Step)
    
    return (
        <>
            <CardList>
                <StyledButton 
                    className="Mainnet"
                    onClick={
                        () => {
                            setOpen(true)
                            setStep("1")
                        }
                    }
                >
                    <div className="content">
                        <span className="title">Live on mainnet</span>
                        <p className="description">We have something and it's ready to roll</p>
                    </div>
                </StyledButton>
                <StyledButton 
                    className="Rinkeby"
                    onClick={
                        () => {
                            setOpen(true)
                            setStep("1")
                        }
                    }
                >
                    <div className="content">
                        <span className="title">Live on Rinkeby</span>
                        <p className="description">It's on Rinkeby and ready to migrate over to mainnet</p>
                    </div>
                </StyledButton>
                <StyledButton 
                    className="Prototyp"
                    onClick={
                        () => {
                            setOpen(true)
                            setStep("1")
                        }
                    }
                >
                    <div className="content">
                        <span className="title">Not developed</span>
                        <p className="description">We have an idea and a prototype</p>
                    </div>
                </StyledButton>
            </CardList>

            {/* <ListNFTStep1Modal open={OpenStep1} setOpenStep1={setOpenStep1} dataList={dataList} /> */}
            <ListNFTModal open={Open} Step={Step} setOpen={setOpen} setStep={setStep} dataList={dataList} />
        </>
    )
}

export default ListNFT
