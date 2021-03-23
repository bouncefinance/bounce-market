import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Button } from '../../../components/UI-kit'
import Search from './Search'
import InfoBox from './InfoBox'

import logo_bounce from '@assets/images/logo/bounce.svg'
import ConnectWalletModal from '@components/Modal/ConnectWallet'
import { useActiveWeb3React } from '@/web3'
import { useWalletConnect } from '@/web3/useWalletConnect'
import { useUserInfo } from '../../Myprofile/useUserInfo'

const HeaderStyled = styled.div`
    height: 76px;
    width: 100%;
    min-width: 1100px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(3,3,3,.1);
    user-select: none;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);

    .wrapper{
        width: 1100px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;

        >div{
            display: flex;
            align-items: center;

            &.left{

            }

            &.right{
                ul{
                    display: flex;
                    align-items: center;
                    margin-right: 4px;
                    li{
                        h5{
                            font-size: 16px;
                            margin-right: 28px;

                            color: rgba(0,0,0,.4);

                            &:hover{
                                color: rgba(0,0,0,.6);
                            }
                        }
                        
                        /* &:last-child {
                            h5 {
                                margin-right: 0;
                            }
                        } */

                       &.active h5{
                           color: rgba(0,0,0,1)
                       }
                    }
                }
            }
        }
    }

    .avatar_box{
        width: 32px;
        height: 76px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;

        &.open{
            border-bottom: 2px solid #124EEB;
        }

        img{
            width: 28px;
            height: 28px;
            border-radius: 50%;
            cursor: pointer;
        }

        .avatar{
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: linear-gradient(154.16deg, #306AFF 6.12%, #3E74FE 49.44%, #003BD3 89.29%);
            cursor: pointer;
        }
    } 
`

const Nav_list = [{
    name: 'Home',
    route: '/Home'
}, {
    name: 'Marketplace',
    route: '/Marketplace'
}, {
    name: 'Brands',
    route: '/Brands'
}, {
    name: 'P2P',
    route: '/P2P'
}, {
    name: 'Factory',
    route: '/Factory'
}]

export default function Index () {
    const [isConnectWallect, setIsConnectWallect] = useState(false)
    const { onConnect } = useWalletConnect()
    const [curNav, setCurNav] = useState('Home')
    const { account, chainId, active } = useActiveWeb3React()
    const [isShowInfo, setIsShowInfo] = useState(false)
    const { userInfo } = useUserInfo()

    useEffect(() => {
        const type = window.localStorage.getItem('BOUNCE_SELECT_WALLET')
        if (type) {
            onConnect(type)
        }

        const pathName = window.location.pathname
        Nav_list.forEach(element => {
            if (pathName.indexOf(element.route) !== -1) {
                setCurNav(element.name)
            }
        });
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (!active) return
        // console.log(userInfo)
    }, [account, chainId, active, userInfo])

    return (
        <>
            <HeaderStyled>
                <div className="wrapper">
                    <div className='left'>
                        <img src={logo_bounce} alt="" />

                        <Search
                            placeholder={'Search Items, Shops and Accounts'}
                        />
                    </div>
                    <div className='right'>
                        <ul>
                            {Nav_list.map(item => {
                                return <li
                                    key={item.name}
                                    className={item.name === curNav ? 'active' : ''}
                                    onClick={() => {
                                        window.localStorage.setItem('Herder_CurNav', item.name)
                                        setCurNav(item.name)
                                    }}
                                >
                                    <Link to={item.route}>
                                        <h5>/ {item.name}</h5>
                                    </Link>
                                </li>
                            })}
                        </ul>
                        {active ? <div className={`avatar_box ${isShowInfo ? 'open' : ''}`}>
                            {userInfo && userInfo.imgurl ? <img src={userInfo && userInfo.imgurl} alt="" onClick={() => {
                                setIsShowInfo(!isShowInfo)
                            }} /> : <div className='avatar' onClick={() => {
                                setIsShowInfo(!isShowInfo)
                            }}></div>}
                        </div> : <Button className='connect_btn' primary onClick={() => {
                            setIsConnectWallect(true)
                        }}>Connect Wallet</Button>}

                    </div>
                    {isShowInfo && <InfoBox setIsShowInfo={setIsShowInfo} username={userInfo && userInfo.username} />}
                </div>
            </HeaderStyled>
            <ConnectWalletModal open={isConnectWallect} setOpen={setIsConnectWallect} />
        </>
    )
}
