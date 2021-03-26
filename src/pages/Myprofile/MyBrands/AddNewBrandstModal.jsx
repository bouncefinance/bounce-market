import React, { useContext, useEffect, useState } from 'react'
import Modal from '@components/Modal/Modal'
import styled from 'styled-components'
import { getContract, useActiveWeb3React } from '@/web3'
import { TextInput, TextAreaInput, Button, Upload, Radio } from '@components/UI-kit'
import useAxios from '@utils/useAxios.js'
import { checkInput } from '@/utils/compareFun'
import { getNFTFactory } from '@/web3/address_list/contract'
import BounceNFTFactory from '@/web3/abi/BounceNFTFactory.json'
import useTransferModal from '@/web3/useTransferModal'
import { myContext } from '@/redux'
import CircularProgress from '@material-ui/core/CircularProgress';
import { useBrandList } from './useHook'

const AddNewBrandstModalStyled = styled.div`
    width: 1100px;
    box-sizing: border-box; 
    padding: 32px 83px;
    box-sizing: border-box;

    .button_group{
        margin-top: 36px;
        display:flex;
        button{
            margin-right: 16px;
        }
    }
    .wrap{
        position:relative
    }
    .buttonProgress{
        position: absolute;
        top:50%;
        left:50%;
        width:28px !important;
        height:28px !important;
        margin-top:-14px;
        margin-left:-22px;
    }

`

export default function AddNewBrandstModal({ run, hasAddressButNotBrand, brandAddress, open, setOpen }) {
    const { active, library, chainId, account } = useActiveWeb3React()
    const { state } = useContext(myContext)
    const { sign_Axios } = useAxios()
    const [fileData, setFileData] = useState(null)
    const [formData, setFormData] = useState({})
    const [btnLock, setBtnLock] = useState(true)
    const [inputDisable, setInputDisable] = useState(false)
    const [btnText, setBtnText] = useState('Save')
    const [nftType, setNftType] = useState('ERC-721')
    const { showTransferByStatus } = useTransferModal()
    const { getBrandList } = useBrandList()
    // const [brandAddress, setBrandAddress] = useState(false)

    useEffect(() => {
        if (!active) return
        // eslint-disable-next-line
    }, [active])

    useEffect(() => {

        if ((fileData || formData.imgurl) && formData) {
            const requireArr = ['Brand_Name', 'Description', 'Symbol']
            let errorCount = 0
            requireArr.forEach(item => {
                if (!checkInput(formData[item])) {
                    errorCount++
                }
            })
            if (errorCount === 0) {
                setBtnLock(false)
            } else {
                setBtnLock(true)
            }
        } else {
            setBtnLock(true)
        }
        // eslint-disable-next-line
    }, [formData, fileData])

    const handelSubmit = () => {
        setBtnLock(true)
        setInputDisable(true)
        setBtnText('Uploading File ...')

        // 第一步：上传图片
        sign_Axios
            .post('/api/v2/main/auth/fileupload', fileData, { appendAccount: false })
            .then(function (response) {
                setBtnText('Uploading Data ...')
                if (response.data.code === 200) {
                    return response.data.result.path
                } else {
                    throw new Error('File upload failed,' + response.data.msg)
                }
            }).then((imgUrl) => {
                setBtnLock(true)
                // 第二步：调用工厂合约创建一个子合约
                if (hasAddressButNotBrand) {
                    uploadData(imgUrl, brandAddress)
                    return
                }
                // console.log(nftType)
                const Factory_CT = getContract(library, BounceNFTFactory.abi, getNFTFactory(chainId))
                const _name = formData.Brand_Name
                const _symbol = formData.Symbol
                const _uri = require('@/config.json').ERC_1155_BaseRui

                if (nftType === 'ERC-721') {
                    Factory_CT.methods.createBrand721(_name, _symbol).send({ from: account })
                        .on('transactionHash', hash => {
                            setOpen(false)
                            // setBidStatus(pendingStatus)
                            showTransferByStatus('pendingStatus')
                        })
                        .on('receipt', async (_, receipt) => {
                            // console.log('bid fixed swap receipt:', receipt)
                            // setBidStatus(successVotedStatus)
                            showTransferByStatus('successVotedStatus')
                            const brandAddress = await getCreatedBrand()
                            uploadData(imgUrl, brandAddress)
                        })
                        .on('error', (err, receipt) => {
                            // setBidStatus(errorStatus)
                            setBtnLock(false);
                            setBtnText("Try Again");
                            setInputDisable(false);
                            // showTransferByStatus('errorStatus')
                        })
                } else if (nftType === 'ERC-1155') {
                    Factory_CT.methods.createBrand1155(_uri).send({ from: account })
                        .on('transactionHash', hash => {
                            setOpen(false)
                            // setBidStatus(pendingStatus)
                            showTransferByStatus('pendingStatus')
                        })
                        .on('receipt', async (_, receipt) => {
                            // console.log('bid fixed swap receipt:', receipt)
                            // setBidStatus(successVotedStatus)
                            showTransferByStatus('successVotedStatus')
                            const brandAddress = await getCreatedBrand()
                            uploadData(imgUrl, brandAddress)
                        })
                        .on('error', (err, receipt) => {
                            // setBidStatus(errorStatus)
                            // showTransferByStatus('errorStatus');
                            setBtnLock(false);
                            setBtnText("Try Again");
                            setInputDisable(false);
                        })
                }

            }).catch(function (error) {
                console.log(error)
                setBtnText('Upload Error')
            })
    }

    const getCreatedBrand = async () => {
        const Factory_CT = getContract(library, BounceNFTFactory.abi, getNFTFactory(chainId))
        // console.log(account)
        const brand_address = await Factory_CT.methods.brands(account).call()

        return brand_address
    }

    const uploadData = async (imgUrl, brandAddress) => {
        // 第三步 传入将信息后端
        const params = {
            brandname: formData.Brand_Name,
            contractaddress: brandAddress,
            standard: nftType === 'ERC-721' ? 1 : 2,
            description: formData.Description,
            imgurl: imgUrl,
            owneraddress: account,
            ownername: state.userInfo.username
        }

        sign_Axios.post('/api/v2/main/auth/addbrand', params).then(res => {
            if (res.status === 200 && res.data.code === 1) {
                getBrandList();
                setBtnLock(false);
                // alert('Brand 创建成功')
                setOpen(false)
                run && run()
            } else {
                setBtnLock(false);
                // alert('服务器端 创建失败')
            }
        }).catch(err => {
            setBtnLock(false);
            setBtnText("Try Again");
            // alert('Brand 创建失败')
        })
    }

    return (
        <>
            <Modal open={open} setOpen={setOpen} header={{ title: 'Create your Brand', isClose: true }}>
                <AddNewBrandstModalStyled>
                    <TextInput
                        title='Brand Name'
                        width='620px'
                        required={true}
                        marginTop={0}
                        lockInput={inputDisable}
                        onValChange={(val) => {
                            setFormData({ ...formData, Brand_Name: val })
                        }}
                    />

                    <Radio title={'Standard'} description={`Select a Standard for the created Brand,which is not changed,and the new Item under BRAN will also cast this SRANDARD.`}
                        options={[{
                            name: 'ERC-721',
                            value: 'ERC-721'
                        }, {
                            name: 'ERC-1155',
                            value: 'ERC-1155'
                        }]}
                        onValChange={(e) => {
                            setNftType(e.value)
                        }}
                    />

                    <TextInput
                        title='Symbol'
                        width='620px'
                        required={true}
                        marginTop={'16px'}
                        lockInput={inputDisable}
                        onValChange={(val) => {
                            setFormData({ ...formData, Symbol: val })
                        }}
                    />

                    <TextAreaInput
                        title='Description'
                        width='620px'
                        placeholder={`Describe your brand`}
                        required={true}
                        marginTop={'16px'}
                        lockInput={inputDisable}
                        onValChange={(val) => {
                            setFormData({ ...formData, Description: val })
                        }}
                    />

                    <Upload type='image'
                        width='200px'
                        height='200px'
                        lockInput={inputDisable} infoTitle='browse Brand Photo' onFileChange={(formData) => {
                            setFileData(formData)
                        }} />

                    <div className="button_group">
                        <Button height='48px' width='302px' onClick={() => {
                            setOpen(false)
                            // setModalStatus(approveStatus)
                        }}>Cancel</Button>
                        <div className="wrap">
                            <Button disabled={btnLock} height='48px' width='302px' primary onClick={handelSubmit}>{btnText}</Button>
                            {inputDisable && <CircularProgress className="buttonProgress" />}
                        </div>
                    </div>
                </AddNewBrandstModalStyled>
            </Modal >
        </>
    )
}