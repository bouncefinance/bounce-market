import React, { useEffect, useContext } from 'react'
import Modal from '@components/Modal/Modal'
import styled from 'styled-components'
import { useActiveWeb3React, getContract } from '@/web3'
import { TextInput, TextAreaInput, Button, PullRadioBox, Radio, Upload } from '@components/UI-kit'
import { useState } from 'react'
import { checkInput } from '@/utils/compareFun'
import BounceERC721 from '@/web3/abi/BounceERC721.json'
import BounceERC1155 from '@/web3/abi/BounceERC1155.json'
import useAxios from '@/utils/useAxios'
import useTransferModal from '@/web3/useTransferModal'
import { useThrottle } from '@/utils/useThrottle'
import { myContext } from '@/redux'
import { ErrorStatus } from '@/components/UI-kit/Input/error_config'
import useWrapperIntl from '@/locales/useWrapperIntl'

// import { numToWei } from '@/utils/useBigNumber'
const DEBOUNCE = 500;
const AddNewBrandsModalStyled = styled.div`
    width: 1100px;
    /* height: 690px; */
    box-sizing: border-box; 
    padding: 32px 83px;
    box-sizing: border-box;

    .button_group{
        margin-top: 36px;
        button{
            margin-right: 16px;
        }
    }

    .category_select{
        width: 620px;
        display: flex;
        justify-content: space-between;
    }

`

export default function AddNewBrandsModal({ open, setOpen, defaultValue, brandInfo = {} }) {
    const { active, library, account } = useActiveWeb3React()
    const { wrapperIntl } = useWrapperIntl()
    const { sign_Axios } = useAxios()
    const { showTransferByStatus } = useTransferModal()
    const [btnText, setBtnText] = useState(wrapperIntl('MyProfile.MyBrands.AddNewItemModal.Submit'))
    const [inputDisable, setInputDisable] = useState(false)
    const [btnLock, setBtnLock] = useState(true)
    const [fileData, setFileData] = useState(null)
    const [formData, setFormData] = useState({
        Category: 'image',
        Channel: 'Fine Arts',
        Supply: 1
    })
    const { dispatch } = useContext(myContext);

    useEffect(() => {
        if (!active) return
    }, [active])

    useEffect(() => {
        if ((fileData || formData.imgurl) && formData) {
            const requireArr = ['Name', 'Description', 'Supply']
            let errorCount = 0
            requireArr.forEach(item => {
                if (!checkInput(formData[item]) || (item === 'Supply' && !ErrorStatus.intNum.reg.test(formData[item]))) {
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
    }, [formData, fileData])

    
    const handelSubmit = () => {
        // 第一步 上传图片
        setInputDisable(false);
        setBtnLock(true)
        sign_Axios
            .post('/api/v2/main/auth/fileupload', fileData, { appendAccount: false })
            .then(function (response) {
                setBtnText(wrapperIntl('MyProfile.MyBrands.AddNewItemModal.UploadingData'))
                if (response.data.code === 200) {
                    return response.data.result.path
                } else {
                    dispatch({ type: 'Modal_Message', showMessageModal: true, modelType: 'error', modelMessage: wrapperIntl('MyProfile.MyBrands.AddNewItemModal.OnlySupports') });
                    setBtnLock(false)
                    setInputDisable(false)
                    setBtnText(wrapperIntl('MyProfile.MyBrands.AddNewItemModal.Submit'));
                    // throw new Error('File upload failed,' + response.data.msg)
                }
            }).then((imgUrl) => {
                // 第二步 上传数据生成 json
                const params = {
                    brandid: brandInfo.id,
                    category: formData.Category,
                    channel: formData.Channel,
                    contractaddress: brandInfo.contractaddress,
                    description: formData.Description,
                    fileurl: imgUrl,
                    itemname: formData.Name,
                    itemsymbol: brandInfo.brandsymbol,
                    owneraddress: brandInfo.owneraddress,
                    ownername: brandInfo.ownername,
                    standard: parseInt(brandInfo.standard),
                    supply: parseInt(formData.Supply)
                }

                console.log(params)

                sign_Axios.post('/api/v2/main/auth/additem', params).then(res => {
                    const nftId = res.data.data.id
                    if (res.data.code === 1) {
                        // console.log(nftId, brandInfo.standard)
                        if (brandInfo.standard === 1) {
                            const BounceERC721_CT = getContract(library, BounceERC721.abi, brandInfo.contractaddress)
                            try {
                                BounceERC721_CT.methods.mint(account, nftId).send({ from: account })
                                    .on('transactionHash', hash => {
                                        setOpen(false)
                                        // setBidStatus(pendingStatus)
                                        showTransferByStatus('pendingStatus')
                                    })
                                    .on('receipt', async (_, receipt) => {
                                        // console.log('bid fixed swap receipt:', receipt)
                                        dispatch({ type: 'TransferModal', TransferModal: "" });
                                        dispatch({ type: 'Modal_Message', showMessageModal: true, modelType: 'success', modelMessage: wrapperIntl('MyProfile.MyBrands.AddNewItemModal.SuccessfullyGenerate') });
                                        setTimeout(function(){
                                            window.location.reload()
                                        },3000)
                                    })
                                    .on('error', (err, receipt) => {
                                        // setBidStatus(errorStatus)
                                        // showTransferByStatus('errorStatus')
                                        setBtnLock(false);
                                        setBtnText(wrapperIntl('MyProfile.MyBrands.AddNewItemModal.Submit'));
                                        setInputDisable(false);
                                    })
                            } catch (error) {
                                setBtnLock(false);
                                setBtnText(wrapperIntl('MyProfile.MyBrands.AddNewItemModal.Submit'));
                                console.log('BounceERC721_CT.methods.mint', error);
                            }

                        } else {
                            const BounceERC1155_CT = getContract(library, BounceERC1155.abi, brandInfo.contractaddress)
                            const _amount = formData.Supply
                            const _data = 0
                            try {
                                BounceERC1155_CT.methods.mint(account, nftId, _amount, _data).send({ from: account })
                                    .on('transactionHash', hash => {
                                        setOpen(false)
                                        // setBidStatus(pendingStatus)
                                        showTransferByStatus('pendingStatus')
                                    })
                                    .on('receipt', async (_, receipt) => {
                                        // console.log('bid fixed swap receipt:', receipt)
                                        dispatch({ type: 'TransferModal', TransferModal: "" });
                                        dispatch({ type: 'Modal_Message', showMessageModal: true, modelType: 'success', modelMessage: wrapperIntl('MyProfile.MyBrands.AddNewItemModal.SuccessfullyGenerate') });
                                        setTimeout(function(){
                                            window.location.reload()
                                        },3000)
                                    })
                                    .on('error', (err, receipt) => {
                                        setBtnLock(false);
                                        setBtnText(wrapperIntl('MyProfile.MyBrands.AddNewItemModal.Submit'));
                                        setInputDisable(false);
                                        // setBidStatus(errorStatus)
                                        // showTransferByStatus('errorStatus')
                                    })
                            } catch (error) {
                                setBtnLock(false);
                                setBtnText(wrapperIntl('MyProfile.MyBrands.AddNewItemModal.Submit'));
                                console.log('BounceERC1155_CT.methods.mint', error)
                            }
                        }
                    }else{
                        dispatch({ type: 'Modal_Message', showMessageModal: true, modelType: 'error', modelMessage: wrapperIntl('MyProfile.MyBrands.AddNewItemModal.TryAgainNotice') });
                    }

                }).catch(err => {
                    dispatch({ type: 'Modal_Message', showMessageModal: true, modelType: 'error', modelMessage: wrapperIntl('MyProfile.MyBrands.AddNewItemModal.TryAgainNotice') });
                    setBtnLock(false)
                    setInputDisable(false)
                    setBtnText(wrapperIntl('MyProfile.MyBrands.AddNewItemModal.Submit'))
                })
            })
        // 第三步 调用合约生成 NFT
    }

    const debounce = useThrottle(() => {
        handelSubmit && handelSubmit();
    }, DEBOUNCE);

    return (
        <Modal open={open} setOpen={setOpen} header={{ title: wrapperIntl('MyProfile.MyBrands.AddNewItemModal.AddNewItem'), isClose: true }}>
            <AddNewBrandsModalStyled>
                <TextInput
                    title={wrapperIntl('MyProfile.MyBrands.AddNewItemModal.Name')}
                    width='620px'
                    // defaultValue={'Cookie N1'}
                    required={true}
                    marginTop={0}
                    inputDisable={inputDisable}
                    onValChange={(val) => {
                        setFormData({ ...formData, Name: val })
                    }}
                />

                <div className="category_select">
                    {/* <PullRadioBox title={wrapperIntl('MyProfile.MyBrands.AddNewItemModal.Category')}
                    marginTop='24px' width='150px' options={[{
                        value: 'Images'
                    }]} defaultValue={defaultValue === 'All' ? 'Images' : defaultValue || 'Images'}
                        inputDisable={inputDisable}
                        onChange={(item) => {
                            setFormData({ ...formData, Category: item.value })
                        }} /> */}
                    <PullRadioBox
                        title={wrapperIntl('Category.Category')}
                        marginTop='24px'
                        width='150px'
                        options={[
                            { value: wrapperIntl('Category.Image') },
                            { value: wrapperIntl('Category.Video') },
                        ]}
                        /* defaultValue={defaultValue === 'All' ? 'Images' : defaultValue || 'Images'} */
                        defaultValue={wrapperIntl('Category.Image')}
                        inputDisable={inputDisable}
                        onChange={(option) => {
                            /* const cate = item.value === 'Videos' ? 'video' : 'image' */
                            console.log("option.value: ", option.value)
                            let categoryParam
                            switch (option.value) {
                                case wrapperIntl('Category.Image'):
                                    categoryParam = 'image'
                                    break;
                            
                                case wrapperIntl('Category.Video'):
                                    categoryParam = 'video'
                                    break;

                                default:
                                    categoryParam = 'image'
                                    break;
                            }
                            /* setFormData({ ...formData, Category: cate }) */
                            console.log("categoryParam2: ", categoryParam)
                            setFormData({ ...formData, Category: categoryParam })
                        }}
                    />

                    <PullRadioBox title={wrapperIntl('MyProfile.MyBrands.AddNewItemModal.Channel')} marginTop='24px' width='150px' options={[{
                        value: 'Fine Arts'
                    }, {
                        value: 'Sports'
                    }, {
                        value: 'Conicbooks'
                    }]} defaultValue={defaultValue === 'Fine Arts'} inputDisable={inputDisable} onChange={(item) => {
                        setFormData({ ...formData, Channel: item.value })
                    }} />

                    <Radio title={wrapperIntl('MyProfile.MyBrands.AddNewItemModal.Standard')} options={[{
                        name: 'ERC-721',
                        value: '721'
                    }, {
                        name: 'ERC-1155',
                        value: '1155'
                    }]} defaultValue={brandInfo.standard === 1 ? '721' : '1155'} disabled />
                </div>

                {brandInfo.standard === 2 && <TextInput
                    title={wrapperIntl('MyProfile.MyBrands.AddNewItemModal.Supply')}
                    width='620px'
                    defaultValue={1}
                    required={true}
                    marginTop={'24px'}
                    inputDisable={inputDisable}
                    inputType={'intNum'}
                    onValChange={(val) => {
                        setFormData({ ...formData, Supply: val })
                    }}
                />}

                <TextAreaInput
                    title={wrapperIntl('MyProfile.MyBrands.AddNewItemModal.Description')}
                    width='620px'
                    // defaultValue={`I’m keepi`}
                    required={true}
                    marginTop={'24px'}
                    inputDisable={inputDisable}
                    onValChange={(val) => {
                        setFormData({ ...formData, Description: val })
                    }}
                />

                <Upload
                    type={formData.Category}
                    inputDisable={inputDisable}
                    width='200px'
                    height='200px'
                    lockInput={inputDisable} infoTitle={wrapperIntl('MyProfile.MyBrands.AddNewItemModal.browseBrandPhoto')} onFileChange={(formData) => {
                        setFileData(formData)
                    }} />

                <div className="button_group">
                    <Button height='48px' width='302px' onClick={() => {
                        setOpen(false)
                    }}>{wrapperIntl('MyProfile.MyBrands.AddNewItemModal.Cancel')}</Button>
                    <Button disabled={btnLock} height='48px' width='302px' primary onClick={debounce}>{btnText}</Button>
                </div>
            </AddNewBrandsModalStyled>
        </Modal >
    )
}