import React, { useEffect } from 'react'
import Modal from '../../components/Modal/Modal'
import styled from 'styled-components'
import { useActiveWeb3React } from '@/web3'
import { TextInput,Button } from '@components/UI-kit'

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
    const { active } = useActiveWeb3React()

    useEffect(() => {
        if (!active) return
    }, [active])

    return (
        <Modal open={open} setOpen={setOpen} header={{ title: 'My Account Settings', isClose: true }}>
            <SettingAccountStyled>
                <TextInput
                    title='Name'
                    width='620px'
                    defaultValue={'Cookie Store'}
                    required={true}
                    marginTop={0}
                />
                <TextInput
                    title='Bounce ID'
                    width='620px'
                    defaultValue={'0x33a9b7ed8c71c6910fb4a9bc41de2391b74c2976'}
                    required={true}
                    marginTop={'24px'}
                />

                <TextInput
                    title='Email (Optional)'
                    width='620px'
                    placeholder={'Enter your email'}
                    required={true}
                    marginTop={'24px'}
                />

                <TextInput
                    title='Short Bio (Optional)'
                    width='620px'
                    placeholder={'Describe your bio'}
                    required={true}
                    marginTop={'24px'}
                />

                <div className="button_group">
                    <Button height='48px' width='302px' onClick={()=>{
                        setOpen(false)
                    }}>Cancel</Button>
                    <Button height='48px' width='302px' primary>Save</Button>
                </div>
            </SettingAccountStyled>
        </Modal >
    )
}