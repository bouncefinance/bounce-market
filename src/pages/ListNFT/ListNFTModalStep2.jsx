import React, {useState} from 'react'
import Modal from '@components/Modal/Modal'
import styled from 'styled-components'
import { TextInput, Button } from '@components/UI-kit'

import TableList from './TableList'

import img1 from './assets/img1.svg'

const Wrapper = styled.div`
    width: 1100px;
    box-sizing: border-box; 
    padding: 32px 397px 44px 83px;

    .discription {
        font-family: Helvetica Neue;
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 24px;
        display: flex;
        align-items: center;
        text-transform: capitalize;

        color: #000000;
    }

    .imgList {
        margin-top: 32px;

        display: grid;
        grid-template-columns: repeat(4, 140px);
        column-gap: 20px;

        .leftImg {
            opacity: 0.3;
            border: 1px dashed #000000;
            box-sizing: border-box;

            display: flex;
            justify-content: center;
            align-items: center;

            span {
                font-family: Helvetica Neue;
                font-style: normal;
                font-weight: 500;
                font-size: 16px;
                line-height: 130.5%;
                text-align: center;
                color: #1F191B;
                opacity: 0.5;
            }
        }
    }

    .button_group {
        margin-top: 64px;

        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 16px;
    }
`

function ListNFTModalStep2({ open, setOpen, dataList }) {

    return (
        <Modal open={open} setOpen={setOpen} header={{ title: 'List Your NFT', isClose: true }}>
            <Wrapper>
                <p className="discription">2/2 List your Items</p>

                <TableList tableInfoList={dataList.tableInfoList} />

                <div className="imgList">
                    <img src={dataList.img1} alt=""/>
                    <img src={dataList.img2} alt=""/>
                    <img src={dataList.img3} alt=""/>
                    <div className="leftImg">
                        <span className="leftImgAmount">+ {dataList.leftImgAmount}</span>
                    </div>
                </div>
            
                <div className="button_group">
                    <Button
                        width="302px"
                        height="48px"
                        value="Cancel"
                    />
                    <Button
                        width="302px"
                        height="48px"
                        primary="primary"
                        value="Load Items"
                    />
                </div>
            </Wrapper>
        </Modal>
    )
}

export default ListNFTModalStep2
