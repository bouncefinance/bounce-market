import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import styled from 'styled-components'
import icon_matemask from '@assets/images/wallet/matemask.svg'
import icon_walletconnect from '@assets/images/wallet/walletconnect.svg'
import arrows_right from '@assets/images/icon/arrows-right.svg'
import loading_dots from '@assets/images/loading/four-dots.svg'

import { useWalletConnect } from '../../web3/useWalletConnect'
import { useActiveWeb3React } from '@/web3'

const WalletModalStyled = styled.div`
    width: 520px;
    box-sizing: border-box; 

    

    .content{
        padding: 24px 52px;
        p{
            font-size: 16px;
            font-weight: 400;
            color: rgba(31,25,27,.6);
            line-height: 20.8px;
        }

        ul{
            margin-top: 44px;
            li{
                height: 52px;
                border: 1px solid rgba(0, 0, 0, 0.2);
                box-sizing: border-box;
                display: flex;
                align-items: center;
                padding-left: 21.3px;
                cursor: pointer;
                margin-bottom: 16px;

                img{
                    user-select: none;
                    margin-right: 17px;
                }

                background: url(${arrows_right}) no-repeat;
                background-size: 7.4px 12px;
                background-position: 390px center;

                &:hover{
                    box-shadow: 2px 2px 5px #ccc;
                    background-color: rgba(0,0,0,.01)
                }
            }
        }
    }

    .loading{
        text-align: center;
        padding-bottom: 54px;
        img{
            margin: 75px auto 56px;
        }
        p{
            font-size: 17px;
            font-weight: 400;
            color: rgba(31,25,27,.6);
        }
    }
`

export default function ConnectWallet({ open, setOpen }) {
    const [isLoading, setIsLoading] = useState(false)
    const { onConnect } = useWalletConnect()
    const { active } = useActiveWeb3React()

    useEffect(() => {
        if (!active) return
        setOpen(false)
        // eslint-disable-next-line
    }, [active])

    return (
        <Modal open={open} setOpen={setOpen} header={{ title: 'Connect to a wallet', isClose: true }}>
            <WalletModalStyled>
                {isLoading ? <div className='loading'>
                    <img src={loading_dots} alt="" />
                    <p>Please wait a little...</p>
                </div> : <div className="content">
                    <p>To participate in Bounce you first need to connect a wallet. Please select an option below. You can also connect a Ledger via your Metamask.</p>
                    <ul>
                        <li onClick={() => {
                            onConnect('MetaMask', setIsLoading)
                        }}>
                            <img src={icon_matemask} alt="" />
                            <h5>MetaMask</h5>
                        </li>
                        <li onClick={() => {
                            onConnect('WalletConnect', setIsLoading)
                        }}>
                            <img src={icon_walletconnect} alt="" />
                            <h5>WalletConnect</h5>
                        </li>
                    </ul>
                </div>}
            </WalletModalStyled>
        </Modal >
    )
}