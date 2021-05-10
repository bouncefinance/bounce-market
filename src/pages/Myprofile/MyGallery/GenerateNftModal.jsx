import React, { useContext, useEffect } from 'react'
import Modal from '@components/Modal/Modal'
import styled from 'styled-components'
import { useActiveWeb3React, getContract } from '@/web3'
import { TextInput, TextAreaInput, Button, PullRadioBox, Radio, UploadAll } from '@components/UI-kit'
import { useState } from 'react'
import { checkInput } from '@/utils/compareFun'
import BounceERC721WithSign from '@/web3/abi/BounceERC721WithSign.json'
import BounceERC1155WithSign from '@/web3/abi/BounceERC1155WithSign.json'
import useAxios from '@/utils/useAxios'
import useTransferModal from '@/web3/useTransferModal'
import { myContext } from '@/redux'
import { getBounceERC721WithSign, getBounceERC1155WithSign } from '@/web3/address_list/contract'
import { NFT_CATEGORY } from '@/utils/const';
import { ErrorStatus } from '@/components/UI-kit/Input/error_config'
import { useHistory } from 'react-router-dom'
import useWrapperIntl from '@/locales/useWrapperIntl'
import to from 'await-to-js'
import { ImgToUrl } from '@/utils/imgToUrl'
import { ImgCompressorCreate } from '@utils/img-compressor'

// import { numToWei } from '@/utils/useBigNumber'

const GenerateNFTModalStyled = styled.div`
    width: 1100px;
    /* height: 690px; */
    box-sizing: border-box; 
    /* padding: 32px 83px; */
    padding: 32px 83px 44px 83px;
    box-sizing: border-box;

    .button_group{
        margin-top: 32px;
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

export default function GenerateNftModal({ open, setOpen, defaultValue }) {
    const { wrapperIntl } = useWrapperIntl()
    const history = useHistory();
    const { active, library, account, chainId } = useActiveWeb3React()
    const { sign_Axios } = useAxios()
    const { state, dispatch } = useContext(myContext)
    const { showTransferByStatus } = useTransferModal()
    /* const [btnText, setBtnText] = useState('Submit') */
    const [btnText, setBtnText] = useState(wrapperIntl("MyProfile.MyGallery.GenerateNewNFTModal.Submit"))
    const [inputDisable, setInputDisable] = useState(false)
    const [btnLock, setBtnLock] = useState(true)
    const [fileData, setFileData] = useState(null)
    const [nftType, setNftType] = useState('ERC-721')
    const [formData, setFormData] = useState({
        Category: 'image',
        Channel: NFT_CATEGORY.FineArts,
        Supply: 1
    })

    useEffect(() => {
        // console.log("formData:", formData)
    }, [formData])

    useEffect(() => {
        if (!active) return
    }, [active])

    useEffect(() => {
        // console.log(fileData, formData)
        if ((fileData || formData.imgurl) && formData) {
            const requireArr = ['Name', 'Description', 'Supply']
            let errorCount = 0
            requireArr.forEach(item => {
                console.log('---item---', item, formData)
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


    const handelSubmit = async () => {
        // 第一步 上传图片
        setInputDisable(true)
        setBtnLock(true)
        const IMAGE = 'image/'
        const category = fileData.type.substring(0, IMAGE.length) === IMAGE ? "image" : "video"

        // Get image url
        const originImageFormData = new FormData()
        // TODO type
        originImageFormData.append('filename', new File([fileData.file], fileData.file?.name || `blob.${category === 'image' ? 'png' : 'mp4'}`, { type: fileData.type || 'image/png' }))
        const [imgUrlErr, imgUrl] = await to(ImgToUrl(sign_Axios, originImageFormData, (progress) => {
            // setImgUploadUrlProgress(progress)
            console.log(progress + '%')
            setBtnText(progress + '%')
        }))
        let reviewImageUrl = ''
        if (imgUrlErr) {
            setBtnText(wrapperIntl("MyProfile.MyGallery.GenerateNewNFTModal.Submit"));
            setBtnLock(false)
            setInputDisable(false)
        }
        if (fileData.type.substring(0, IMAGE.length) === IMAGE) {
            const previewImageFormData = new FormData()
            const [previewImageError, previewImage] = await to(new Promise((resolve, reject) => new ImgCompressorCreate({ mimeType: 'image/jpeg', quality: 0.4 }).compress(fileData.file, {
                success: resolve,
            })))
            if (previewImageError) {
                setBtnText(wrapperIntl("MyProfile.MyGallery.GenerateNewNFTModal.Submit"))
                setBtnLock(false)
                setInputDisable(false)
            }
            previewImageFormData.append('filename', new File([previewImage], 'blob.png', { type: 'image/png' }))
            const [reviewImageUrlError, _reviewImageUrl] = await to(ImgToUrl(sign_Axios, previewImageFormData, (progress) => {
                // setImgPreviewUploadUrlProgress(progress)
                console.log(progress + '%')
                setBtnText(progress + '%')
            }))
            reviewImageUrl = _reviewImageUrl
            if (reviewImageUrlError) {
                setBtnText(wrapperIntl("MyProfile.MyGallery.GenerateNewNFTModal.Submit"))
                setBtnLock(false)
                setInputDisable(false)
            }
        }
        // 第二步 上传数据生成 json
        const params = {
            brandid: nftType === 'ERC-721' ? 10 : 11,
            category,
            channel: formData.Channel,
            contractaddress: nftType === 'ERC-721' ? getBounceERC721WithSign(chainId) : getBounceERC1155WithSign(chainId),
            description: formData.Description,
            fileurl: imgUrl,
            litimgurl: reviewImageUrl,
            // metadata: JSON.stringify(reviewImageUrl ? {miniImg: reviewImageUrl} : {}),
            itemname: formData.Name,
            itemsymbol: 'BOUNCE',
            owneraddress: account,
            ownername: state.username,
            standard: nftType === 'ERC-721' ? 1 : 2,
            supply: nftType === 'ERC-721' ? 1 : parseInt(formData.Supply)
        }
        // console.log(params)
        sign_Axios.post('/api/v2/main/auth/additem', params).then(res => {
            const _nftId = res.data.data.id
            const _sign = res.data.data.signaturestr
            const _expiredtime = res.data.data.expiredtime
            if (res.data.code === 1) {
                if (nftType === 'ERC-721') {
                    const BounceERC721WithSign_CT = getContract(library, BounceERC721WithSign.abi, getBounceERC721WithSign(chainId))
                    console.log(_nftId, _sign, _expiredtime)
                    try {

                        BounceERC721WithSign_CT.methods.mintUser(_nftId, _sign, _expiredtime).send({ from: account })
                            .on('transactionHash', hash => {
                                setOpen(false)
                                // setBidStatus(pendingStatus)
                                showTransferByStatus('pendingStatus')
                            })
                            .on('receipt', async (_, receipt) => {
                                // console.log('bid fixed swap receipt:', receipt)
                                window.localStorage.setItem('PenddingItem', JSON.stringify({ account, tokenId: _nftId, contract: getBounceERC721WithSign(chainId) }))
                                showTransferByStatus('')
                                dispatch({ type: 'TransferModal', TransferModal: "" });
                                dispatch({ type: 'Modal_Message', showMessageModal: true, modelType: 'success', modelMessage: wrapperIntl("MyProfile.MyGallery.GenerateNewNFTModal.SuccessfullyGenerate") });
                                if (window.location.pathname === "/MyGallery") {
                                    setTimeout(function () {
                                        window.location.reload()
                                    }, 2000)
                                } else {
                                    history.push("/MyGallery")
                                }
                            })
                            .on('error', (err, receipt) => {
                                // setBidStatus(errorStatus)
                                setBtnLock(false);
                                /* setBtnText("Try Again"); */
                                setBtnText(wrapperIntl("MyProfile.MyGallery.GenerateNewNFTModal.TryAgain"));
                                setInputDisable(false);
                                dispatch({ type: 'Modal_Message', showMessageModal: true, modelType: 'error', modelMessage: wrapperIntl("MyProfile.MyGallery.GenerateNewNFTModal.TryAgainNotice") });
                            })
                    } catch (error) {
                        console.log('BounceERC721_CT.methods.mintUser', error)
                    }

                } else {
                    const BounceERC1155WithSign_CT = getContract(library, BounceERC1155WithSign.abi, getBounceERC1155WithSign(chainId))
                    const _amount = formData.Supply
                    const _data = 0
                    console.log(_nftId, _amount, _data, _sign,_expiredtime)
                    try {
                        BounceERC1155WithSign_CT.methods.mintUser(_nftId, _amount, _data, _sign, _expiredtime).send({ from: account })
                            .on('transactionHash', hash => {
                                setOpen(false)
                                // setBidStatus(pendingStatus)
                                showTransferByStatus('pendingStatus')
                            })
                            .on('receipt', async (_, receipt) => {
                                // console.log('bid fixed swap receipt:', receipt)
                                window.localStorage.setItem('PenddingItem', JSON.stringify({ account, tokenId: _nftId, contract: getBounceERC1155WithSign(chainId) }))
                                dispatch({
                                    type: 'TransferModal',
                                    TransferModal: ""
                                });
                                dispatch({
                                    type: 'Modal_Message',
                                    showMessageModal: true,
                                    modelType: 'success',
                                    modelMessage: wrapperIntl("MyProfile.MyGallery.GenerateNewNFTModal.SuccessfullyGenerate")
                                });
                                if (window.location.pathname === "/MyGallery") {
                                    setTimeout(function () {
                                        window.location.reload()
                                    }, 2000)
                                } else {
                                    history.push("/MyGallery")
                                }

                            })
                            .on('error', (err, receipt) => {
                                // setBidStatus(errorStatus)
                                // showTransferByStatus('errorStatus')
                                setBtnLock(false);
                                /* setBtnText("Try Again"); */
                                setBtnText(wrapperIntl("MyProfile.MyGallery.GenerateNewNFTModal.TryAgain"));
                                setInputDisable(false);
                                dispatch({ type: 'Modal_Message', showMessageModal: true, modelType: 'error', modelMessage: wrapperIntl("MyProfile.MyGallery.GenerateNewNFTModal.TryAgainNotice") });
                            })
                    } catch (error) {
                        console.log('BounceERC1155_CT.methods.mintUser', error)
                    }
                }
            } else {
                dispatch({ type: 'Modal_Message', showMessageModal: true, modelType: 'error', modelMessage: wrapperIntl("MyProfile.MyGallery.GenerateNewNFTModal.TryAgainNotice") });
            }

        }).catch(err => {
            dispatch({ type: 'Modal_Message', showMessageModal: true, modelType: 'error', modelMessage: wrapperIntl("MyProfile.MyGallery.GenerateNewNFTModal.TryAgainNotice") });
        })
        // 第三步 调用合约生成 NFT
        // const Factory_CT = getContract(library, BounceNFTFactory.abi, getNFTFactory(chainId))
    }

    return (
        <Modal open={open} setOpen={setOpen} header={{ title: wrapperIntl('MyProfile.MyGallery.GenerateNewNFTModal.GenerateNewNFT'), isClose: true }}>
            <GenerateNFTModalStyled>
                <TextInput
                    title={wrapperIntl('MyProfile.MyGallery.GenerateNewNFTModal.Name')}
                    width='620px'
                    // defaultValue={'Cookie N1'}
                    required={true}
                    marginTop={0}
                    inputDisable={inputDisable}
                    maxLength={32}
                    onValChange={(val) => {
                        setFormData({ ...formData, Name: val })
                    }}
                />

                <div className="category_select">
                    <PullRadioBox title={wrapperIntl('MyProfile.MyGallery.GenerateNewNFTModal.Channel')} marginTop='0px' width='150px' options={[{
                        value: NFT_CATEGORY.FineArts
                    }, {
                        value: NFT_CATEGORY.Sports
                    }, {
                        value: 'Conicbooks'
                    }]} defaultValue={defaultValue === NFT_CATEGORY.FineArts} inputDisable={inputDisable} onChange={(item) => {
                        setFormData({ ...formData, Channel: item.value })
                    }} />

                    <Radio
                        title={wrapperIntl('MyProfile.MyGallery.GenerateNewNFTModal.Standard')}
                        marginTop="0"
                        options={[{
                            name: 'ERC-721',
                            value: '721'
                        }, {
                            name: 'ERC-1155',
                            value: '1155'
                        }]}
                        defaultValue={'721'}
                        onValChange={(item) => {
                            setNftType(item.name)
                        }}
                    />
                </div>

                {nftType === 'ERC-1155' && <TextInput
                    title={wrapperIntl('MyProfile.MyGallery.GenerateNewNFTModal.Supply')}
                    width='620px'
                    defaultValue={1}
                    required={true}
                    marginTop={'24px'}
                    inputType={'intNum'}
                    inputDisable={inputDisable}
                    onValChange={(val) => {
                        setFormData({ ...formData, Supply: val })
                    }}
                />}

                <TextAreaInput
                    title={wrapperIntl('MyProfile.MyGallery.GenerateNewNFTModal.Description')}
                    width='620px'
                    // defaultValue={`I’m keepi`}
                    required={true}
                    marginTop={'17px'}
                    inputDisable={inputDisable}
                    onValChange={(val) => {
                        setFormData({ ...formData, Description: val })
                    }}
                />

                <UploadAll
                    // type={formData.Category}
                    inputDisable={inputDisable}
                    width='200px'
                    /* height='200px' */
                    height="100%"
                    lockInput={inputDisable}
                    infoTitle={wrapperIntl('MyProfile.MyGallery.GenerateNewNFTModal.browseBrandPhoto')}
                    onClick={() => {
                        // setFileData(null)
                    }}
                    onFileChange={(formData, file, filetype) => {
                        // console.log(filetype, file)
                        if (filetype === 'video/avi') {
                            dispatch({ type: 'Modal_Message', showMessageModal: true, modelType: 'error', modelMessage: wrapperIntl("UIKit.Input.Upload.infoTip.FormatIncorrect") })
                            setFileData(null)
                            return
                        }
                        if (filetype.substring(0, 'video'.length) === 'video') {
                            console.log('video')
                        }
                        setFileData({
                            formData,
                            file,
                            type: filetype
                        })
                    }}
                />

                <div className="button_group">
                    <Button height='48px' width='302px' onClick={() => {
                        setOpen(false)
                        // window.location.reload()
                    }}>{wrapperIntl('MyProfile.MyGallery.GenerateNewNFTModal.Cancel')}</Button>
                    <Button disabled={btnLock} height='48px' width='302px' primary onClick={handelSubmit}>{btnText}</Button>
                </div>
            </GenerateNFTModalStyled>
        </Modal >
    )
}