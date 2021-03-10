import React, { useEffect } from 'react'
import Modal from '@components/Modal/Modal'
import styled from 'styled-components'
import { useActiveWeb3React } from '@/web3'
import { TextInput, TextAreaInput, Button, PullRadioBox } from '@components/UI-kit'

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

export default function AddNewBrandstModal({ open, setOpen, defaultValue }) {
    const { active } = useActiveWeb3React()

    useEffect(() => {
        if (!active) return
    }, [active])

    return (
        <Modal open={open} setOpen={setOpen} header={{ title: 'Add New Item', isClose: true }}>
            <AddNewBrandstModalStyled>
                <TextInput
                    title='Name'
                    width='620px'
                    defaultValue={'Cookie N1'}
                    required={true}
                    marginTop={0}
                />

                <PullRadioBox title={'Category'} marginTop='24px' width='620px' options={[{
                    value: 'Images'
                }, {
                    value: 'Video'
                }, {
                    value: 'Audio'
                }, {
                    value: 'Games'
                }, {
                    value: 'Others'
                }]} defaultValue={defaultValue === 'All' ? 'Images' : defaultValue || 'Images'} onChange={(item) => {
                    console.log(item)
                }} />

                <TextInput
                    title='External Link'
                    width='620px'
                    placeholder={'Enter external link'}
                    required={true}
                    marginTop={'24px'}
                />

                <TextAreaInput
                    title='Description'
                    width='620px'
                    defaultValue={`I’m keepi`}
                    required={true}
                    marginTop={'24px'}
                />

                <div className="button_group">
                    <Button height='48px' width='302px' onClick={() => {
                        setOpen(false)
                    }}>Cancel</Button>
                    <Button height='48px' width='302px' primary>Submit</Button>
                </div>
            </AddNewBrandstModalStyled>
        </Modal >
    )
}