import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import styled from 'styled-components'
import { TextInput, Button } from '@components/UI-kit'
import useWrapperIntl from '@/locales/useWrapperIntl'
import BounceERC20 from '@/web3/abi/BounceERC20.json'
import BounceERC165 from '@/web3/abi/ERC165.json'
import BounceERC721 from '@/web3/abi/BounceERC721.json'
// import BounceERC1155 from '@/web3/abi/BounceERC1155.json'

import TableList from './TableList'
import { useActiveWeb3React, getContract } from '@/web3'
import useAxios from '@/utils/useAxios'

const Wrapper = styled.div`
    width: 1100px;
    box-sizing: border-box; 
    padding: 32px 397px 44px 83px;

    .description {
        font-family: Helvetica Neue;
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 24px;
        display: flex;
        align-items: center;
        text-transform: capitalize;

        color: #000000;
    }

    input {
        &:focus {
            opacity: 0.8;
            border: 1px solid #124CE3;
            box-sizing: border-box;
        }
    }

    .imgList {
        margin-top: 32px;

        display: grid;
        grid-template-columns: repeat(4, 140px);
        column-gap: 20px;

        .leftImg {
            opacity: 0.3;
            border: 1px dashed #000000;
            box-sizing: border-box;

            display: flex;
            justify-content: center;
            align-items: center;

            span {
                font-family: Helvetica Neue;
                font-style: normal;
                font-weight: 500;
                font-size: 16px;
                line-height: 130.5%;
                text-align: center;
                color: #1F191B;
                opacity: 0.5;
            }
        }
    }

    .button_group {
        margin-top: 64px;

        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 16px;
    }
`

function ListNFTModal({ open, Step, setOpen, setStep }) {
    const { wrapperIntl } = useWrapperIntl()
    const [ct_Addr, setCt_Addr] = useState('')
    const { library, account } = useActiveWeb3React()
    const [step1Lock, setStep1Lock] = useState(true)
    const [step2Lock, setStep2Lock] = useState(true)
    const [step2loading, setStep2loading] = useState(false)
    const [step2Date, setStep2Date] = useState({
        contractAddress: 'Loading ...',
        contractName: 'Loading ...',
        contactSymbol: 'Loading ...',
        totalSupply: 'Loading ...',
    })
    const { sign_Axios } = useAxios()

    useEffect(() => {
        const judgeIsAddress = (str) => {
            const reg = /^0x\S{40}$/
            return reg.test(str)
        }
        const bool = judgeIsAddress(ct_Addr)
        if (bool) {
            setStep2Date({
                ...step2Date,
                contractAddress: ct_Addr
            })
            getTokenBaseInfoByAddress(ct_Addr)
        }
        setStep1Lock(!bool)
        // eslint-disable-next-line
    }, [ct_Addr])

    const getTokenBaseInfoByAddress = async (ct_Addr) => {
        try {   
            const CT_20 = await getContract(library, BounceERC20.abi, ct_Addr)
            const decimals = await CT_20.methods.decimals().call()
            if (decimals) {
                const name = await CT_20.methods.name().call()
                const symbol = await CT_20.methods.symbol().call()
                const totalSupply = await CT_20.methods.totalSupply().call()
                setStep2Date({
                    ...step2Date,
                    contractAddress: ct_Addr,
                    contractName: name + ' (Importing ERC20 is not supported)',
                    contactSymbol: symbol + ' (Importing ERC20 is not supported)',
                    totalSupply: totalSupply + ' (Importing ERC20 is not supported)',
                })
            }
            setStep2Lock(true)
        } catch (error) {
            try {
                const CT_165 = await getContract(library, BounceERC165.abi, ct_Addr)
                const isERC721 = await CT_165.methods.supportsInterface('0x80ac58cd').call()
                const isERC1155 = await CT_165.methods.supportsInterface('0xd9b67a26').call()
                if (isERC721) {
                    const CT_721 = await getContract(library, BounceERC721.abi, ct_Addr)
                    const name = await CT_721.methods.name().call()
                    const symbol = await CT_721.methods.symbol().call()
                    const totalSupply = await CT_721.methods.totalSupply().call()
                    setStep2Date({
                        ...step2Date,
                        contractAddress: ct_Addr,
                        contractName: name,
                        contactSymbol: symbol,
                        totalSupply: totalSupply
                    })
                } else if (isERC1155) {
                    // const CT_1155 = await getContract(library, BounceERC1155.abi, ct_Addr)
                    setStep2Date({
                        ...step2Date,
                        contractAddress: ct_Addr,
                        contractName: 'ERC1155 - null',
                        contactSymbol: 'ERC1155 - null',
                        totalSupply: 'ERC1155 - null'
                    })
                }
                setStep2Lock(false)
            } catch (error) {
                console.log(error)
                setStep2Date({
                    ...step2Date,
                    contractAddress: ct_Addr,
                    contractName: 'This is a wrong address, please check it again',
                    contactSymbol: 'This is a wrong address, please check it again',
                    totalSupply: 'This is a wrong address, please check it again'
                })

                return setStep2Lock(true)
            }
        }
    }

    const handelSubmitList = async () => {
        setStep2loading(true)
        const params = {
            "accountaddress": account,
            "contractaddress": ct_Addr
        }
        sign_Axios.post('/api/v2/main/auth/addcontract', params).then(res => {
            // console.log(res)
            if (res.status === 200 && res.data.code === 1) {
                // setStep2loading(false)
                alert('Import success')
            }else{
                alert('Import error')
            }
            setStep2loading(false)
        })
    }

    return (
        <>
            {
                Step === "1" && (
                    <Modal
                        open={open}
                        setOpen={setOpen}
                        setStep={setStep}
                        header={{ title: wrapperIntl("ListNFTModal.ListYourNFT"), isClose: true }}
                    >
                        <Wrapper>

                            <div className="step1">
                                {/* <p className="description">1/2 Enter your contract address</p> */}
                                <p className="description">1/2 {wrapperIntl("ListNFTModal.step1")}</p>

                                <TextInput
                                    /* title='What is the address of your ERC721 or ERC1155 contract on the Ethereum Network?' */
                                    title={wrapperIntl("ListNFTModal.WhatAddress")}
                                    /* laceholder="Enter your ERC721 or ERC1155  contract address" */
                                    laceholder={wrapperIntl("ListNFTModal.placeholder")}
                                    width='620px'
                                    required={true}
                                    marginTop="32px"
                                    defaultValue={ct_Addr}
                                    onValChange={(val) => {
                                        setCt_Addr(val)
                                    }}
                                />


                                <div className="button_group">
                                    <Button
                                        width="302px"
                                        height="48px"
                                        /* value="Cancel" */
                                        value={wrapperIntl("ListNFTModal.Cancel")}
                                        onClick={
                                            () => {
                                                setOpen(false)
                                            }
                                        }
                                    />
                                    <Button
                                        width="302px"
                                        height="48px"
                                        primary="primary"
                                        disabled={step1Lock}
                                        /* value="Submit" */
                                        value={wrapperIntl("ListNFTModal.Submit")}
                                        onClick={
                                            () => {
                                                setStep("2")
                                            }
                                        }
                                    />
                                </div>
                            </div>
                        </Wrapper>
                    </Modal>
                )
            }


            {
                Step === "2" && (
                    <Modal
                        open={open}
                        setOpen={setOpen}
                        setStep={setStep}
                        header={{ title: wrapperIntl("ListNFTModal.ListYourNFT"), isClose: true }}
                    >
                        <Wrapper>

                            <div className="step2">
                                {/* <p className="description">2/2 List your Items</p> */}
                                <p className="description">2/2 {wrapperIntl("ListNFTModal.step2")}</p>

                                <TableList tableInfoList={step2Date} />

                                {/* <div className="imgList">
                                    <img src={dataList.img1} alt="" />
                                    <img src={dataList.img2} alt="" />
                                    <img src={dataList.img3} alt="" />
                                    <div className="leftImg">
                                        <span className="leftImgAmount">+ {dataList.leftImgAmount}</span>
                                    </div>
                                </div> */}

                                <div className="button_group">
                                    <Button
                                        width="302px"
                                        height="48px"
                                        /* value="Cancel" */
                                        value={wrapperIntl("ListNFTModal.Cancel")}
                                        onClick={
                                            () => {
                                                setStep('1')
                                            }
                                        }
                                    />
                                    <Button
                                        width="302px"
                                        height="48px"
                                        primary="primary"
                                        disabled={step2Lock || step2loading}
                                        /* value="Load Items" */
                                        value={step2loading ? 'loading ...' : wrapperIntl("ListNFTModal.LoadItems")}
                                        onClick={handelSubmitList}
                                    />
                                </div>
                            </div>
                        </Wrapper>
                    </Modal>
                )
            }
        </>
    )
}

export default ListNFTModal
