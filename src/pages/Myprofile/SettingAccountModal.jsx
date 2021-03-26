import React, { useEffect, useContext } from 'react'
import Modal from '@components/Modal/Modal'
import styled from 'styled-components'
import { useActiveWeb3React } from '@/web3'
import { TextInput, Button, Upload } from '@components/UI-kit'
import { useUserInfo } from './useUserInfo'
import { useState } from 'react'
import { checkInput } from '@/utils/compareFun'
import useAxios from '@/utils/useAxios'
import { myContext } from '@/redux/index.js'

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

    .name_row{
        width: 620px;
        display: flex;
        justify-content: space-between;
    }
`

export default function SettingAccountModal({ open, setOpen }) {
    const { dispatch } = useContext(myContext);
    const { active, account } = useActiveWeb3React()
    const { sign_Axios } = useAxios()
    const { userInfo, updateUserInfo } = useUserInfo()
    const [fileData, setFileData] = useState(null)
    const [formData, setFormData] = useState({})
    const [inputDisable, setInputDisable] = useState(false)
    const [btnLock, setBtnLock] = useState(true)
    const [btnText, setBtnText] = useState('Save')

    useEffect(() => {
        if (!active) return
        // console.log(userInfo)
        setFormData({ ...userInfo })
        // eslint-disable-next-line
    }, [active, userInfo])

    useEffect(() => {
        // console.log(formData, fileData)
        if ((fileData || formData.imgurl) && formData) {
            const requireArr = ['username', 'fullname']
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

    const submitSave = async () => {
        setBtnLock(true)
        setInputDisable(true)

        try {
            let imgUrl = formData.imgurl
            if (fileData) {
                // 如果没上传图片则先上传图片
                setBtnText('Uploading File ...')
                const res = await sign_Axios.post('/api/v2/main/auth/fileupload', fileData, { appendAccount: false })
                if (res.data.code === 200) {
                    imgUrl = res.data.result.path
                } else {
                    throw new Error('File upload failed,' + res.data.msg)
                }
            }
            setBtnText('Uploading Data ...')
            const params = {
                accountaddress: account,
                username: formData.username,
                fullname: formData.fullname,
                imgurl: imgUrl,
                email: formData.email||"",
                bio: formData.bio||""
            }

            const updatedUer = await updateUserInfo(params)
            console.log(JSON.stringify(updatedUer));
            if(updatedUer.data.code === 0){
                dispatch({ type: 'Modal_Message', showMessageModal: true, modelType: 'error', modelMessage: updatedUer.data.msg });
                setBtnLock(false)
                setInputDisable(false)
            }else if (updatedUer.status === 200) {
                setOpen(false)
            }

            setBtnLock(false)
            setInputDisable(false)
            setBtnText('Save')
        } catch (error) {
            dispatch({ type: 'Modal_Message', showMessageModal: true, modelType: 'error', modelMessage: "Only supports JPG, PNG, JPEG2000" });
            setBtnLock(false)
            setInputDisable(false)
            setBtnText('Save')
        }
    }


    return (
        <Modal open={open} setOpen={setOpen} header={{ title: 'My Account Settings', isClose: true }}>
            <SettingAccountStyled>
                <div className='name_row'>
                    <TextInput
                        title='User Name'
                        width='300px'
                        defaultValue={userInfo.username}
                        required={true}
                        marginTop={0}
                        onValChange={(val) => {
                            setFormData({ ...formData, username: val })
                        }}
                        inputDisable={inputDisable}
                    />

                    <TextInput
                        title='Full Name'
                        width='300px'
                        defaultValue={userInfo.fullname}
                        required={true}
                        marginTop={0}
                        disabled={Boolean(userInfo.fullname)}
                        onValChange={(val) => {
                            setFormData({ ...formData, fullname: val })
                        }}
                        inputDisable={inputDisable}
                    />
                </div>

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
                    defaultValue={userInfo.email}
                    required={false}
                    marginTop={'24px'}
                    inputType={'email'}
                    onValChange={(val) => {
                        setFormData({ ...formData, email: val })
                    }}
                    inputDisable={inputDisable}
                />

                <TextInput
                    title='Short Bio (Optional)'
                    width='620px'
                    placeholder={'Describe your bio'}
                    defaultValue={userInfo.bio}
                    required={false}
                    marginTop={'24px'}
                    onValChange={(val) => {
                        setFormData({ ...formData, bio: val })
                    }}
                    inputDisable={inputDisable}
                />

                <Upload type='avatar' defaultValue={userInfo.imgurl} onFileChange={(file) => {
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