import React from 'react'
import Modal from '@components/Modal/Modal'
import styled from 'styled-components'
import { TextInput, TextAreaInput, Button } from '@components/UI-kit'

import pic_uploadBrandPhoto from './assets/pic_uploadBrandPhoto.svg'

const Wrapper = styled.div`
    width: 1100px;
    box-sizing: border-box; 
    padding: 32px 397px 44px 83px;

    .textarea, input {
        &:focus {
            opacity: 0.8;
            border: 1px solid #124CE3;
            box-sizing: border-box;
        }
    }

    .upload {
        margin-top: 24px;

        display: grid;
        grid-template-columns: 240px 280px;
        column-gap: 40px;

        .title {
            font-family: Helvetica Neue;
            font-style: normal;
            font-weight: bold;
            font-size: 16px;
            line-height: 20px;
            display: flex;
            align-items: center;
            text-transform: capitalize;
            color: #000000;
            opacity: 0.7;      

            margin-top: 50px;      
        }

        .requirement {
            font-family: Helvetica Neue;
            font-style: normal;
            font-weight: normal;
            font-size: 13px;
            line-height: 16px;display: flex;
            align-items: center;
            text-transform: capitalize;
            color: #1F191B;
            opacity: 0.4;

            margin-top: 12px;
        }
    }

    .button_group {
        margin-top: 36px;

        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 16px;
    }
`

function CreateBrandModal({ open, setOpen }) {

    return (
        <Modal open={open} setOpen={setOpen} header={{ title: 'Create your Brand', isClose: true }}>
            <Wrapper>
                <TextInput
                    title='Brand Name'
                    width='620px'
                    required={true}
                    marginTop={0}
                />

                <TextInput
                    title='Symbol'
                    width='620px'
                    required={true}
                    marginTop="24px"
                />
            
                <TextAreaInput
                    title='Description'
                    width='620px'
                    height='80px'
                    required={true}
                />
                
                <div className="upload">
                    <img src={pic_uploadBrandPhoto} alt=""/>
                    <div className="text">
                        <span className="title">browse Brand Photo</span>
                        <div className="requirement">
                            Supports JPG, PNG, JPEG2000
                            <br/>
                            no more than 100MB, 360*240 Reccomended
                        </div>
                    </div>
                </div>
            
                <div className="button_group">
                    <Button
                        width="302px"
                        height="48px"
                        value="Cancel"
                        onClick={
                            () => {
                                setOpen(false)
                            }
                        }
                    />
                    <Button
                        width="302px"
                        height="48px"
                        primary="primary"
                        value="Save"
                    />
                </div>
            </Wrapper>
        </Modal>
    )
}

export default CreateBrandModal
