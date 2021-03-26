import React, { useState, useEffect,useContext } from 'react'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import { Button } from '../../../components/UI-kit'
import Search from './Search'
import InfoBox from './InfoBox'

import logo_bounce from '@assets/images/logo/bounce.svg'
import ConnectWalletModal from '@components/Modal/ConnectWallet'
import { useActiveWeb3React } from '@/web3'
import { useWalletConnect } from '@/web3/useWalletConnect'
import { useUserInfo } from '../../Myprofile/useUserInfo'
import { Tooltip } from '@material-ui/core'
import { myContext } from '@/redux/index.js';

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
    route: '/Home',
    enable: true,
}, {
    name: 'Marketplace',
    route: '/Marketplace',
    enable: true,
}, {
    name: 'Brands',
    route: '/Brands',
    enable: true,
},
//  {
//     name: 'P2P',
//     route: '/P2P',
//     enable: false,
// },
{
    name: 'Factory',
    route: '/Factory',
    enable: true,
}]

export default function Index() {
    const [isConnectWallect, setIsConnectWallect] = useState(false)
    const { onConnect } = useWalletConnect()
    const [curNav, setCurNav] = useState('Home')
    const { account, chainId, active } = useActiveWeb3React()
    const [isShowInfo, setIsShowInfo] = useState(false)
    const { getUserInfo } = useUserInfo()
    const history = useHistory()
    const {state} = useContext(myContext);
    const { dispatch} = useContext(myContext);

    const updateActive = () => {
        const pathName = window.location.pathname
        Nav_list.forEach(element => {
            if (pathName.indexOf(element.route) !== -1) {
                setCurNav(element.name)
            }
        })
    }
    useEffect(() => {
        const type = window.localStorage.getItem('BOUNCE_SELECT_WALLET')
        if (type) {
            onConnect(type)
        }

        updateActive()
        history.listen(historyLocation => updateActive())

        // eslint-disable-next-line
    }, [history])

    useEffect(() => {
        if (!active) return
        if(chainId && chainId !== 4){
            dispatch({type: 'Modal_Message', showMessageModal: true,modelType:'error',modelMessage:"请选择Rinkeby测试网络"});
        }
        getUserInfo();
        // eslint-disable-next-line
    }, [account, chainId, active])

    return (
        <>
            <HeaderStyled>
                <div className="wrapper">
                    <div className='left'>
                        <Link to="/">
                            <img src={logo_bounce} alt=""></img>
                        </Link>

                        <Search
                            placeholder={'Search Items, Shops and Accounts'}
                        />
                    </div>
                    <div className='right'>
                        <ul>
                            {Nav_list.map(item => {
                                return item.enable ? <li
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
                                </li> : <Tooltip key={item.name} title="Coming soon"><li
                                    style={{ opacity: 0.5 }}
                                >
                                    <h5>/ {item.name}</h5>
                                </li></Tooltip>
                            })}
                        </ul>
                        {active ? <div className={`avatar_box ${isShowInfo ? 'open' : ''}`}>
                            {state.userInfo && state.userInfo.imgurl ? <img src={state.userInfo && state.userInfo.imgurl} alt="" onClick={() => {
                                setIsShowInfo(!isShowInfo)
                            }} /> : <div className='avatar' onClick={() => {
                                setIsShowInfo(!isShowInfo)
                            }}></div>}
                        </div> : <Button className='connect_btn' primary onClick={() => {
                            setIsConnectWallect(true)
                        }}>Connect Wallet</Button>}

                    </div>
                    {isShowInfo && <InfoBox setIsShowInfo={setIsShowInfo} username={state.userInfo && state.userInfo.username} />}
                </div>
            </HeaderStyled>
            <ConnectWalletModal open={isConnectWallect} setOpen={setIsConnectWallect} />
        </>
    )
}
