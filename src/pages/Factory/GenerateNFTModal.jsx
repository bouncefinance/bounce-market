import React, {useState} from 'react'
import Modal from '@components/Modal/Modal'
import styled from 'styled-components'
import { TextInput, PullRadioBox as DropDownMenu, TextAreaInput, Button } from '@components/UI-kit'

import pic_uploadImage from './assets/pic_uploadImage.svg'
import pic_uploadVideo from './assets/pic_uploadVideo.svg'

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

const uploadResourceList = {
    "Image": {
        img: pic_uploadImage,
        requirement1: "Supports JPG, PNG, JPEG2000, GIF",
        requirement2: "no more than 100MB, 262*262 Reccomended",
    },
    "Video": {
        img: pic_uploadVideo,
        requirement1: "Supports MP4, AVI, WMV, MOV",
        requirement2: "no more than 100MB, 360*240 Reccomended",
    },
}

function GenerateNFTModal({ open, setOpen }) {
    const [fileType, setFileType] = useState("Image")

    return (
        <Modal open={open} setOpen={setOpen} header={{ title: 'Generate New NFT', isClose: true }}>
            <Wrapper>
                <TextInput
                    title='Name'
                    width='620px'
                    required={true}
                    marginTop={0}
                />
            
                <DropDownMenu
                    title='Category'
                    width='620px'
                    options={[{
                        value: 'Image'
                    }, {
                        value: 'Video'
                    }, {
                        value: 'Audio'
                    }, {
                        value: 'Game'
                    }, {
                        value: 'Other'
                    }]}
                    defaultValue='Image'
                    onChange={(item) => {
                        /* console.log("typeof(item): ", typeof(item))
                        console.log(item) */
                        setFileType(item.value)
                    }}
                />
            
                <TextAreaInput
                    title='Description'
                    width='620px'
                    height='80px'
                    required={true}
                    marginTop="24px"
                />
                
                <div className="upload">
                    <img src={uploadResourceList[fileType].img} alt=""/>
                    <div className="text">
                        <span className="title">upload {fileType} </span>
                        <div className="requirement">
                            {uploadResourceList[fileType].requirement1}
                            <br/>
                            {uploadResourceList[fileType].requirement2}
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
                        value="Submit"
                    />
                </div>
            </Wrapper>
        </Modal>
    )
}

export default GenerateNFTModal
