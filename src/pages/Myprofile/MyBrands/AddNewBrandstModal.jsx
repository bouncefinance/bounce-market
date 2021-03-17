import React, { useEffect } from 'react'
import Modal from '@components/Modal/Modal'
import styled from 'styled-components'
import { useActiveWeb3React } from '@/web3'
import { TextInput, TextAreaInput, Button } from '@components/UI-kit'

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

    useEffect(() => {
        if (!active) return
    }, [active])

    return (
        <Modal open={open} setOpen={setOpen} header={{ title: 'Create your Brand', isClose: true }}>
            <AddNewBrandstModalStyled>
                <TextInput
                    title='Brand Name'
                    width='620px'
                    defaultValue={'Cookie Store'}
                    required={true}
                    marginTop={0}
                />

                <TextInput
                    title='Symbol'
                    width='620px'
                    defaultValue={'CKIE'}
                    required={true}
                    marginTop={'24px'}
                />

                <TextAreaInput
                    title='Description'
                    width='620px'
                    placeholder={`Describe your brand`}
                    required={true}
                    marginTop={'24px'}
                />

                <div className="button_group">
                    <Button height='48px' width='302px' onClick={() => {
                        setOpen(false)
                    }}>Cancel</Button>
                    <Button height='48px' width='302px' primary>Save</Button>
                </div>
            </AddNewBrandstModalStyled>
        </Modal >
    )
}