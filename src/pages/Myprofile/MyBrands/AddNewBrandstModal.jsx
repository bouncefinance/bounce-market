import React, { useEffect, useState } from 'react'
import Modal from '@components/Modal/Modal'
import styled from 'styled-components'
import { useActiveWeb3React } from '@/web3'
import { TextInput, TextAreaInput, Button, Upload } from '@components/UI-kit'
import useAxios from '@utils/useAxios.js'
import TransferStatusModal, { approveStatus, initStatus } from '@components/Modal/TransferStatusModal'
// import { FreeFocusInside } from 'react-focus-lock';

const AddNewBrandstModalStyled = styled.div`
    width: 1100px;
    box-sizing: border-box; 
    padding: 32px 83px;
    box-sizing: border-box;

    .button_group{
        margin-top: 36px;
        button{
            margin-right: 16px;
        }
    }

`

export default function AddNewBrandstModal({ open, setOpen }) {
    const { active, account } = useActiveWeb3React()
    const { sign_Axios } = useAxios()
    const [fileDate, setFileDate] = useState(null)
    const [fromDate, setFromDate] = useState({
        Brand_Name: '',
        Symbol: '',
        Description: ''
    })
    const [btnLock, setBtnLock] = useState(true)
    const [inputDisable, setInputDisable] = useState(false)
    const [btnText, setBtnText] = useState('Save')

    const [modalStatus, setModalStatus] = useState(initStatus);

    useEffect(() => {
        if (!active) return
    }, [active])

    useEffect(() => {
        let empt_len = 0
        for (const key in fromDate) {
            if (fromDate.hasOwnProperty.call(fromDate, key)) {
                const element = fromDate[key];
                if (String(element).trim().length === 0 || !element) {
                    empt_len++
                }
            }
        }
        if (empt_len === 0) {
            setBtnLock(false)
        } else {
            setBtnLock(true)
        }
    }, [fromDate])

    const handelSubmit = () => {
        setBtnLock(true)
        setInputDisable(true)
        setBtnText('Uploading File ...')

        // 第一步：上传图片
        sign_Axios
            .post('/api/v2/main/auth/fileupload', fileDate)
            .then(function (response) {
                setBtnText('Uploading Date ...')
                if (response.data.code === 200) {
                    return response.data.result.path
                } else {
                    throw new Error('File upload failed,' + response.data.msg)
                }
            }).then((imgUrl) => {
                setBtnLock(true)

                //TODO 第二步：调用工厂合约创建一个子合约

                // 第三步 传入将信息后端
                const params = {
                    brandname: fromDate.Brand_Name,
                    contractaddress: '0x' + new Date().getTime(),
                    description: fromDate.Description,
                    imgurl: imgUrl,
                    owneraddress: account,
                    ownername: 'homie@xu'
                }
                sign_Axios.post('/api/v2/main/auth/addbrand', params).then(res => {
                    if (res.status === 200 && res.data.code === 1) {
                        alert('Brand 创建成功')
                    } else {
                        alert('服务器端 创建失败')
                    }
                }).catch(err => {
                    alert('Brand 创建失败')
                })

            }).catch(function (error) {
                setBtnText('Upload Error')
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
                            setFromDate({ ...fromDate, Brand_Name: val })
                        }}
                    />

                    <TextInput
                        title='Symbol'
                        width='620px'
                        required={true}
                        marginTop={'24px'}
                        lockInput={inputDisable}
                        onValChange={(val) => {
                            setFromDate({ ...fromDate, Symbol: val })
                        }}
                    />

                    <TextAreaInput
                        title='Description'
                        width='620px'
                        placeholder={`Describe your brand`}
                        required={true}
                        marginTop={'24px'}
                        lockInput={inputDisable}
                        onValChange={(val) => {
                            setFromDate({ ...fromDate, Description: val })
                        }}
                    />

                    <Upload type='image'
                        lockInput={inputDisable} infoTitle='browse Brand Photo' onFileChange={(formData, file) => {
                            setFileDate(formData)
                            setFromDate({ ...fromDate, Brand_img: file.name })
                            // setBtnLock(false)
                            // console.log(file)
                        }} />

                    <div className="button_group">
                        <Button height='48px' width='302px' onClick={() => {
                            // setOpen(false)
                            setModalStatus(approveStatus)
                        }}>Cancel</Button>
                        <Button disabled={btnLock} height='48px' width='302px' primary onClick={handelSubmit}>{btnText}</Button>
                    </div>
                </AddNewBrandstModalStyled>
            </Modal >

            <TransferStatusModal modalStatus={modalStatus} onDismiss={() => {
                setModalStatus(initStatus)
            }} />
        </>
    )
}