import React from 'react'
import styled from 'styled-components'
/* import { useParams } from 'react-router' */
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useActiveWeb3React } from '@/web3'
import {useHistory} from 'react-router-dom'

import { Button } from '@components/UI-kit'

import icon_copy from '@assets/images/icon/copy.svg'
import pic_NFT1 from './assets/pic_NFT1.svg'

const StyledMyNFT = styled.div`
    display: flex;
    flex-direction: column;
    width: 1100px;
    margin: 0 auto;

    .breadcrumb_Nav {
        font-family: IBM Plex Mono;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 16px;
        display: flex;
        align-items: center;
        color: #1F191B;
        opacity: 0.8;

        box-sizing: border-box;
        margin: 24px auto 0 0;

        display: flex;
        align-items: center;

        span {
            opacity: 0.4;
        }
    }

    .sellNFT {
        margin-top: 50px;
        display: grid;
        grid-template-columns: 400px 416px;
        column-gap: 52px;

        img.NFTImg {
            width: 400px;
        }

        .right {
            display: grid;
            grid-template-rows: 44px 56px 100px 28px 37px 1fr;
            align-items: start;

            .NFTName {
                font-family: Optima;
                font-style: normal;
                font-weight: bold;
                font-size: 34px;
                line-height: 41px;
                color: #000000;
            }

            .account {
                display: flex;
                align-items: center;
                margin-top: 5px;

                p {
                    font-size: 16px;
                    line-height: 20.88px;
                    color: rgba(0,0,0,.4)
                }

                img.icon_copy {
                    margin-left: 12px;
                    cursor: pointer;
                }
            }

            .buttonGroup {
                display: grid;
                grid-template-columns: 1fr 1fr;
                column-gap: 16px;
            }

            span.description {
                font-family: IBM Plex Mono;
                font-style: normal;
                font-weight: 500;
                font-size: 12px;
                line-height: 16px;
                display: flex;
                align-items: center;
                color: #1F191B;
                opacity: 0.5;                
            }

            span.descriptionContent {
                font-family: Helvetica Neue;
                font-style: normal;
                font-weight: normal;
                font-size: 16px;
                line-height: 19px;
                display: flex;
                align-items: center;
                color: #1F191B;                
            }
        }
    }
`

function MyNFT() {
    const { account } = useActiveWeb3React()
    const history = useHistory()
    /* const { NFTId } = useParams() */

    return (
        <StyledMyNFT>
            <div className="breadcrumb_Nav">
                My Inventory&nbsp;/&nbsp;
                <span className="NFTNameInNav">
                    Image Name
                    {/* {NFTName} */}
                </span>
            </div>
            <div className="sellNFT">
                <img className="NFTImg" src={pic_NFT1} alt="" />

                <div className="right">
                    <span className="NFTName">
                        {/* {NFTName} */}
                        Digital Image Name
                    </span>

                    <div className='account'>
                        <p>{account}</p>
                        <CopyToClipboard
                            text={account}
                            onCopy={() => {
                            }}>
                            <img className="icon_copy" src={icon_copy} alt="" />
                        </CopyToClipboard>
                    </div>

                    <div className="buttonGroup">
                        <Button
                            primary
                            width="200px"
                            value="Sell"
                            onClick={
                                () => {
                                    /* history.push("/MyInventory/:NFTId/Sell") */
                                    history.push("/MyInventory/Sell")
                                }
                            }
                        />
                        <Button
                            width="200px"
                            value="Transfer"
                        />
                    </div>

                    <span className="description">Description</span>

                    <span className="descriptionContent">
                        {/* {descriptionContent} */}
                        An irreplaceable girl
                    </span>
                </div>
            </div>
        </StyledMyNFT>
    )
}

export default MyNFT
