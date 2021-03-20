import React, { useEffect } from 'react'
import Modal from '@components/Modal/Modal'
import styled from 'styled-components'
import { useActiveWeb3React } from '@/web3'
import { TextInput, Button, Upload } from '@components/UI-kit'
import { useUserInfo } from './useUserInfo'
import { useState } from 'react'
import { checkInput } from '@utils/compareFun'
import useAxios from '@/utils/useAxios'

const SettingAccountStyled = styled.div`
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
`

export default function SettingAccountModal({ open, setOpen }) {
    const { active, account } = useActiveWeb3React()
    const { sign_Axios } = useAxios()
    const { userInfo, updateUserInfo } = useUserInfo()
    const [fileData, setFileData] = useState(null)
    const [formData, setFormData] = useState({ account: 'Please connect your wallet account' })
    const [inputDisable, setInputDisable] = useState(false)
    const [btnLock, setBtnLock] = useState(true)
    const [btnText, setBtnText] = useState('Save')

    useEffect(() => {
        if (!active) return
        console.log(userInfo)
        // eslint-disable-next-line
    }, [active])

    useEffect(() => {
        // console.log(formData, fileData)
        if (fileData && formData) {
            const requireArr = ['name', 'email', 'bio']
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
    }, [fileData, formData])

    const submitSave = () => {
        setBtnLock(true)
        setInputDisable(true)
        setBtnText('Uploading File ...')

        // 第一步：上传图片
        sign_Axios
            .post('/api/v2/main/auth/fileupload', fileData)
            .then(function (response) {
                setBtnText('Uploading Date ...')
                if (response.data.code === 200) {
                    return response.data.result.path
                } else {
                    throw new Error('File upload failed,' + response.data.msg)
                }
            }).then(imgUrl => {
                setBtnText('Uploading Data ...')
                const params = {
                    accountaddress: account,
                    username: formData.name,
                    imgurl: imgUrl,
                    email: formData.email,
                    bio: formData.bio
                }

                updateUserInfo(params)
            }).catch(err => {
                alert('服务器故障，请稍后重试')
            }).finally(() => {
                setBtnLock(false)
                setInputDisable(false)
                setBtnText('Save')
            })
    }


    return (
        <Modal open={open} setOpen={setOpen} header={{ title: 'My Account Settings', isClose: true }}>
            <SettingAccountStyled>
                <TextInput
                    title='Name'
                    width='620px'
                    defaultValue={'Cookie Store'}
                    required={true}
                    marginTop={0}
                    onValChange={(val) => {
                        setFormData({ ...formData, name: val })
                    }}
                    inputDisable={inputDisable}
                />
                <TextInput
                    title='Bounce ID'
                    width='620px'
                    defaultValue={account}
                    required={true}
                    disabled={true}
                    marginTop={'24px'}
                    onValChange={(val) => {
                        setFormData({ ...formData, address: val })
                    }}
                    inputDisable={inputDisable}
                />

                <TextInput
                    title='Email (Optional)'
                    width='620px'
                    placeholder={'Enter your email'}
                    required={true}
                    marginTop={'24px'}
                    onValChange={(val) => {
                        setFormData({ ...formData, email: val })
                    }}
                    inputDisable={inputDisable}
                />

                <TextInput
                    title='Short Bio (Optional)'
                    width='620px'
                    placeholder={'Describe your bio'}
                    required={true}
                    marginTop={'24px'}
                    onValChange={(val) => {
                        setFormData({ ...formData, bio: val })
                    }}
                    inputDisable={inputDisable}
                />

                <Upload type='avatar' onFileChange={(file) => {
                    setFileData(file)
                }} inputDisable={inputDisable} />

                <div className="button_group">
                    <Button height='48px' width='302px' onClick={() => {
                        setOpen(false)
                    }}>Cancel</Button>
                    <Button onClick={submitSave} disabled={btnLock} height='48px' width='302px' primary>{btnText}</Button>
                </div>
            </SettingAccountStyled>
        </Modal >
    )
}