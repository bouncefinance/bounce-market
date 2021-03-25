import React, { useEffect } from 'react'
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
// import { numToWei } from '@/utils/useBigNumber'
const DEBOUNCE = 500;
const AddNewBrandstModalStyled = styled.div`
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

export default function AddNewBrandstModal({ open, setOpen, defaultValue, brandInfo = {} }) {
    const { active, library, account } = useActiveWeb3React()
    const { sign_Axios } = useAxios()
    const { showTransferByStatus } = useTransferModal()
    const [btnText, setBtnText] = useState('Submit')
    const [inputDisable, setInputDisable] = useState(false)
    const [btnLock, setBtnLock] = useState(true)
    const [fileData, setFileData] = useState(null)
    const [formData, setFormData] = useState({
        Category: 'image',
        Channel: 'Fine Arts',
        Supply: 1
    })

    useEffect(() => {
        if (!active) return
    }, [active])

    useEffect(() => {
        if ((fileData || formData.imgurl) && formData) {
            const requireArr = ['Name', 'Description']
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
    }, [formData, fileData])

    
    const handelSubmit = () => {
        // 第一步 上传图片
        setInputDisable(false);
        setBtnLock(true)
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
                    standard: brandInfo.standard,
                    supply: formData.Supply
                }
                console.log(params)
                sign_Axios.post('/api/v2/main/auth/additem', params).then(res => {
                    const nftId = res.data.data.id
                    if (res.data.code === 1) {
                        console.log(nftId, brandInfo.standard)
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
                                        // setBidStatus(successVotedStatus)
                                        showTransferByStatus('successVotedStatus')
                                    })
                                    .on('error', (err, receipt) => {
                                        // setBidStatus(errorStatus)
                                        // showTransferByStatus('errorStatus')
                                        setBtnLock(false);
                                        setBtnText("Try Again");
                                    })
                            } catch (error) {
                                setBtnLock(false);
                                setBtnText("Try Again");
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
                                        // setBidStatus(successVotedStatus)
                                        showTransferByStatus('successVotedStatus')
                                    })
                                    .on('error', (err, receipt) => {
                                        setBtnLock(false);
                                        setBtnText("Try Again");
                                        // setBidStatus(errorStatus)
                                        // showTransferByStatus('errorStatus')
                                    })
                            } catch (error) {
                                setBtnLock(false);
                                setBtnText("Try Again");
                                console.log('BounceERC1155_CT.methods.mint', error)
                            }
                        }
                    }

                }).catch(err => {
                    setBtnLock(false);
                    setBtnText("Try Again");
                    alert('请求服务器出错')
                })
            })
        // 第三步 调用合约生成 NFT
    }

    const debounce = useThrottle(() => {
        handelSubmit && handelSubmit();
    }, DEBOUNCE);

    return (
        <Modal open={open} setOpen={setOpen} header={{ title: 'Add New Item', isClose: true }}>
            <AddNewBrandstModalStyled>
                <TextInput
                    title='Name'
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
                    <PullRadioBox title={'Category'} marginTop='24px' width='150px' options={[{
                        value: 'Images'
                    }]} defaultValue={defaultValue === 'All' ? 'Images' : defaultValue || 'Images'}
                        inputDisable={inputDisable}
                        onChange={(item) => {
                            setFormData({ ...formData, Category: item.value })
                        }} />

                    <PullRadioBox title={'Channel'} marginTop='24px' width='150px' options={[{
                        value: 'Fine Arts'
                    }, {
                        value: 'Sports'
                    }, {
                        value: 'Conicbooks'
                    }]} defaultValue={defaultValue === 'Fine Arts'} inputDisable={inputDisable} onChange={(item) => {
                        setFormData({ ...formData, Channel: item.value })
                    }} />

                    <Radio title={'Standard'} options={[{
                        name: 'ERC-721',
                        value: '721'
                    }, {
                        name: 'ERC-1155',
                        value: '1155'
                    }]} defaultValue={brandInfo.standard === 1 ? '721' : '1155'} disabled />
                </div>

                {brandInfo.standard === 2 && <TextInput
                    title='Supply'
                    width='620px'
                    defaultValue={1}
                    required={true}
                    marginTop={'24px'}
                    inputDisable={inputDisable}
                    onValChange={(val) => {
                        setFormData({ ...formData, Supply: parseInt(val) })
                    }}
                />}

                <TextAreaInput
                    title='Description'
                    width='620px'
                    // defaultValue={`I’m keepi`}
                    required={true}
                    marginTop={'24px'}
                    inputDisable={inputDisable}
                    onValChange={(val) => {
                        setFormData({ ...formData, Description: val })
                    }}
                />

                <Upload type='image' inputDisable={inputDisable}
                    width='200px'
                    height='200px'
                    lockInput={inputDisable} infoTitle='browse Brand Photo' onFileChange={(formData) => {
                        setFileData(formData)
                    }} />

                <div className="button_group">
                    <Button height='48px' width='302px' onClick={() => {
                        setOpen(false)
                    }}>Cancel</Button>
                    <Button disabled={btnLock} height='48px' width='302px' primary onClick={debounce}>{btnText}</Button>
                </div>
            </AddNewBrandstModalStyled>
        </Modal >
    )
}