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

import useWrapperIntl from '@/locales/useWrapperIntl'
import { ZERO_ADDRESS } from '@/web3/address_list/token'


const AddNewBrandsModalStyled = styled.div`
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

export default function AddNewBrandsModal({ run, hasAddressButNotBrand, brandAddress, open, setOpen }) {
    const { active, library, chainId, account } = useActiveWeb3React()
    const { wrapperIntl } = useWrapperIntl()
    const { state, dispatch } = useContext(myContext);
    const { sign_Axios, axios } = useAxios()
    const [fileData, setFileData] = useState(null)
    const [formData, setFormData] = useState({})
    const [btnLock, setBtnLock] = useState(true)
    const [inputDisable, setInputDisable] = useState(false)
    const [btnText, setBtnText] = useState(wrapperIntl('MyProfile.MyBrands.AddNewBrandsModal.Save'))
    const [nftType, setNftType] = useState('ERC-721')
    const { showTransferByStatus } = useTransferModal()
    const { getBrandList } = useBrandList()
    // const [brandAddress, setBrandAddress] = useState(false)


    useEffect(() => {
        // getCreatedBrand()
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
        /* setBtnText('Uploading File ...') */
        setBtnText(wrapperIntl('MyProfile.MyBrands.AddNewBrandsModal.UploadingFile'))

        // 第一步：上传图片
        sign_Axios
            .post('/api/v2/main/auth/fileupload', fileData, { appendAccount: false })
            .then(function (response) {
                /* setBtnText('Uploading Data ...') */
                setBtnText(wrapperIntl('MyProfile.MyBrands.AddNewBrandsModal.UploadingData'))
                if (response.data.code === 200) {
                    return response.data.result.path
                } else {
                    dispatch({ type: 'Modal_Message', showMessageModal: true, modelType: 'error', modelMessage: wrapperIntl("TryAgain") });
                    setBtnLock(false)
                    setInputDisable(false)
                    /* setBtnText('Save'); */
                    setBtnText(wrapperIntl('MyProfile.MyBrands.AddNewBrandsModal.Save'))
                    // throw new Error('File upload failed,' + response.data.msg)
                }
            }).then(async (imgUrl) => {
                setBtnLock(true)
                // 第二步：调用工厂合约创建一个子合约
                const brandAddress = await getCreatedBrand()
                console.log(brandAddress)
                if (brandAddress !== ZERO_ADDRESS) {
                    uploadData(imgUrl, brandAddress)
                    dispatch({ type: 'TransferModal', TransferModal: "" });
                    dispatch({ type: 'Modal_Message', showMessageModal: true, modelType: 'success', modelMessage: wrapperIntl("MyProfile.MyBrands.AddNewBrandsModal.SuccessfullyBuild") });
                    return
                } else {
                    // console.log(nftType)
                    const Factory_CT = getContract(library, BounceNFTFactory.abi, getNFTFactory(chainId))
                    const _name = formData.Brand_Name
                    const _symbol = formData.Symbol
                    const _uri = require('@/config.json').ERC_1155_BaseRui
                    const _mode = 0
                    const bytecode_721 = require('@/web3/abi/BounceERC721.json').bytecode
                    const bytecode_1155 = require('@/web3/abi/BounceERC1155.json').bytecode

                    if (nftType === 'ERC-721') {
                        Factory_CT.methods.createBrand721(bytecode_721, _name, _symbol, _mode).send({ from: account })
                            .on('transactionHash', hash => {
                                setOpen(false)
                                // setBidStatus(pendingStatus)
                                showTransferByStatus('pendingStatus')
                            })
                            .on('receipt', async (_, receipt) => {
                                // console.log('bid fixed swap receipt:', receipt)
                                dispatch({ type: 'TransferModal', TransferModal: "" });
                                dispatch({ type: 'Modal_Message', showMessageModal: true, modelType: 'success', modelMessage: wrapperIntl("MyProfile.MyBrands.AddNewBrandsModal.SuccessfullyBuild") });
                                const brandAddress = await getCreatedBrand()
                                uploadData(imgUrl, brandAddress)
                            })
                            .on('error', (err, receipt) => {
                                // setBidStatus(errorStatus)
                                setBtnLock(false);
                                /* setBtnText("Try Again"); */
                                setBtnText(wrapperIntl('MyProfile.MyBrands.AddNewBrandsModal.TryAgain'));
                                setInputDisable(false);
                                // showTransferByStatus('errorStatus')
                            })
                    } else if (nftType === 'ERC-1155') {
                        Factory_CT.methods.createBrand1155(bytecode_1155, _uri, _mode).send({ from: account })
                            .on('transactionHash', hash => {
                                setOpen(false)
                                // setBidStatus(pendingStatus)
                                showTransferByStatus('pendingStatus')
                            })
                            .on('receipt', async (_, receipt) => {
                                // console.log('bid fixed swap receipt:', receipt)
                                const brandAddress = await getCreatedBrand()
                                uploadData(imgUrl, brandAddress)
                                dispatch({ type: 'TransferModal', TransferModal: "" });
                                dispatch({ type: 'Modal_Message', showMessageModal: true, modelType: 'success', modelMessage: wrapperIntl("MyProfile.MyBrands.AddNewBrandsModal.SuccessfullyBuild") });
                            })
                            .on('error', (err, receipt) => {
                                // setBidStatus(errorStatus)
                                // showTransferByStatus('errorStatus');
                                setBtnLock(false);
                                /* setBtnText("Try Again"); */
                                setBtnText(wrapperIntl('MyProfile.MyBrands.AddNewBrandsModal.TryAgain'));
                                setInputDisable(false);
                            })
                    }
                }
            }).catch(function (error) {
                dispatch({ type: 'Modal_Message', showMessageModal: true, modelType: 'error', modelMessage: wrapperIntl("MyProfile.MyBrands.AddNewBrandsModal.DataUpdateFailed") });
                setBtnLock(false)
                setInputDisable(false)
                /* setBtnText('Try Again') */
                setBtnText(wrapperIntl('MyProfile.MyBrands.AddNewBrandsModal.TryAgain'));
            })
    }
    const getCreatedBrand = async () => {
        const params = {
            offset: 0,
            count: 100,
            user_address: account
        }
        const res = await axios.get('/brands', { params })
        if (res.status === 200) {
            const data = res.data.data
            const erc721 = data.erc721 || []
            const erc1155 = data.erc1155 || []
            const brandList = (erc721 || []).concat(erc1155 || [])
            const filterBrandList = brandList.filter(item => String((item.creator || item.Creator)).toLowerCase() === String(account).toLowerCase())
            console.log('filterBrandList', filterBrandList)
            return filterBrandList[0]?.contract_address || filterBrandList[0]?.Token || ZERO_ADDRESS
        } else {
            return ZERO_ADDRESS
        }
        // const Factory_CT = getContract(library, BounceNFTFactory.abi, getNFTFactory(chainId))
        // // console.log(account)
        // const brand_address = await Factory_CT.methods.brands(account).call()


        // return brand_address
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
            /* setBtnText("Try Again"); */
            setBtnText(wrapperIntl('MyProfile.MyBrands.AddNewBrandsModal.TryAgain'));
            // alert('Brand 创建失败')
        })
    }

    return (
        <>
            <Modal open={open} setOpen={setOpen} header={{ title: wrapperIntl('MyProfile.MyBrands.AddNewBrandsModal.BuildYourBrand')/* 'Build Your Brand' */, isClose: true }}>
                <AddNewBrandsModalStyled>
                    <TextInput
                        /* title='Brand Name' */
                        title={wrapperIntl('MyProfile.MyBrands.AddNewBrandsModal.BrandName')}
                        width='620px'
                        required={true}
                        marginTop={0}
                        lockInput={inputDisable}
                        maxLength={32}
                        onValChange={(val) => {
                            setFormData({ ...formData, Brand_Name: val })
                        }}
                    />

                    <Radio title={'Standard'} description={wrapperIntl('MyProfile.MyBrands.AddNewBrandsModal.StandardNotice')}
                        marginTop={'0'}
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
                        title={wrapperIntl('MyProfile.MyBrands.AddNewBrandsModal.Symbol')}
                        width='620px'
                        required={true}
                        /* marginTop={'16px'} */
                        marginTop={'5px'}
                        lockInput={inputDisable}
                        onValChange={(val) => {
                            setFormData({ ...formData, Symbol: val })
                        }}
                    />

                    <TextAreaInput
                        title={wrapperIntl('MyProfile.MyBrands.AddNewBrandsModal.Description')}
                        width='620px'
                        /* placeholder={`Describe your brand`} */
                        placeholder={wrapperIntl('MyProfile.MyBrands.AddNewBrandsModal.DescriptionPlaceHolder')}
                        required={true}
                        /* marginTop={'16px'} */
                        marginTop={'5px'}
                        lockInput={inputDisable}
                        onValChange={(val) => {
                            setFormData({ ...formData, Description: val })
                        }}
                    />

                    <Upload type='image'
                        width='200px'
                        /* height='200px' */
                        height="100%"
                        lockInput={inputDisable} infoTitle={wrapperIntl('MyProfile.MyBrands.AddNewBrandsModal.browseBrandPhoto')} onFileChange={(formData) => {
                            setFileData(formData)
                        }} />

                    <div className="button_group">
                        <Button height='48px' width='302px' onClick={() => {
                            setOpen(false)
                            // setModalStatus(approveStatus)
                        }}>{wrapperIntl('MyProfile.MyBrands.AddNewBrandsModal.Cancel')}</Button>
                        <div className="wrap">
                            <Button disabled={btnLock} height='48px' width='302px' primary onClick={handelSubmit}>{btnText}</Button>
                            {inputDisable && <CircularProgress className="buttonProgress" />}
                        </div>
                    </div>
                </AddNewBrandsModalStyled>
            </Modal >
        </>
    )
}