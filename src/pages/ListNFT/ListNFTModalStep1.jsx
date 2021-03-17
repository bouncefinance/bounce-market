import React, {useState} from 'react'
import Modal from '@components/Modal/Modal'
import styled from 'styled-components'
import { TextInput, Button } from '@components/UI-kit'

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

    input {
        &:focus {
            opacity: 0.8;
            border: 1px solid #124CE3;
            box-sizing: border-box;
        }
    }

    .button_group {
        margin-top: 64px;

        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 16px;
    }
`

function ListNFTModalStep1({ open, setOpen }) {

    return (
        <Modal open={open} setOpen={setOpen} header={{ title: 'List Your NFT', isClose: true }}>
            <Wrapper>
                <p className="discription">1/2 Enter your contract address</p>

                <TextInput
                    title='What is the address of your ERC721 or ERC1155 contract on the Ethereum Network?'
                    placeholder="Enter your ERC721 or ERC1155  contract address"
                    width='620px'
                    required={true}
                    marginTop="32px"
                />
            
            
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
                        value="Submit"
                    />
                </div>
            </Wrapper>
        </Modal>
    )
}

export default ListNFTModalStep1
