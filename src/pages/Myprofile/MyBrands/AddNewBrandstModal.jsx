import React, { useEffect, useState } from 'react'
import Modal from '@components/Modal/Modal'
import styled from 'styled-components'
import { useActiveWeb3React } from '@/web3'
import { TextInput, TextAreaInput, Button, Upload } from '@components/UI-kit'
import useAxios from '@utils/useAxios.js'

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

`

export default function AddNewBrandstModal({ open, setOpen }) {
    const { active } = useActiveWeb3React()
    const myAxios = useAxios()
    const [fileDate, setFileDate] = useState(null)
    const [fromDate, setFromDate] = useState({
        Brand_Name: '',
        Symbol: '',
        Description: '',
        Brand_img: ''
    })
    const [btnLock, setBtnLock] = useState(true)
    const [inputDisable, setInputDisable] = useState(false)
    const [btnText, setBtnText] = useState('Save')

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
        myAxios
            .post('/api/v1/fileupload', fileDate)
            .then(function (response) {
                console.log(response);
                setBtnText('Uploading Date ...')
                if (response.data.code === 200) {
                    return response.data.result.path
                } else {
                    throw new Error('File upload failed,' + response.data.msg)
                }
            }).then((path) => {
                setFromDate({ ...fromDate, Brand_img: path })
                setBtnLock(true)


            }).catch(function (error) {
                console.log(error);
                setBtnText('Upload Error')
            })
    }

    return (
        <Modal open={open} setOpen={setOpen} header={{ title: 'Create your Brand', isClose: true }}>
            <AddNewBrandstModalStyled>
                <TextInput
                    title='Brand Name'
                    width='620px'
                    required={true}
                    marginTop={0}
                    disabled={inputDisable}
                    onValChange={(val) => {
                        setFromDate({ ...fromDate, Brand_Name: val })
                    }}
                />

                <TextInput
                    title='Symbol'
                    width='620px'
                    required={true}
                    marginTop={'24px'}
                    disabled={inputDisable}
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
                    disabled={inputDisable}
                    onValChange={(val) => {
                        setFromDate({ ...fromDate, Description: val })
                    }}
                />

                <Upload type='image' 
                    disabled={inputDisable} infoTitle='browse Brand Photo' onFileChange={(formData, file) => {
                    setFileDate(formData)
                    setFromDate({ ...fromDate, Brand_img: file.name })
                    // setBtnLock(false)
                    // console.log(file)
                }} />

                <div className="button_group">
                    <Button height='48px' width='302px' onClick={() => {
                        setOpen(false)
                    }}>Cancel</Button>
                    <Button disabled={btnLock} height='48px' width='302px' primary onClick={handelSubmit}>{btnText}</Button>
                </div>
            </AddNewBrandstModalStyled>
        </Modal >
    )
}