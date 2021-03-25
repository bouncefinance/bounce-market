import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { OtherButton } from '@components/UI-kit'
import { useHistory } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useActiveWeb3React } from '@/web3'

import activities_black from '../component/Header/assets/activities_black.svg'
import brands_black from '../component/Header/assets/brands_black.svg'
import inventory_black from '../component/Header/assets/inventory_black.svg'
import icon_copy from '@assets/images/icon/copy.svg'
import { myContext } from '@/redux/index.js'
import SettingAccountModal from './SettingAccountModal'


const CommonHeaderStyled = styled.div`
    .wrapper{
        width: 1100px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        .top{
            display: flex;
            justify-content: space-between;
            height: 48px;
            align-items: center;
            margin-top: 40px;
            .left{
                width: 520px;
                height: 60px;
                display: flex;
                align-items: center;

                .avater{
                    width: 60px;
                    height: 60px;
                    box-sizing: border-box;
                    border-radius: 50%;
                    margin-right: 24px;
                    background: linear-gradient(154.16deg, #306AFF 6.12%, #3E74FE 49.44%, #003BD3 89.29%);
                }
                .avaterImg{
                    width: 60px;
                    height: 60px;
                    box-sizing: border-box;
                    border-radius: 50%;
                    margin-right: 24px; 
                }

                .account_box{
                    h5{
                        font-size: 24px;
                        line-height: 29.14px;
                    }

                    .account{
                        display: flex;
                        align-items: center;
                        margin-top: 5px;

                        p{
                            font-size: 16px;
                            line-height: 20.88px;
                            color: rgba(0,0,0,.4)
                        }

                        img{
                            margin-left: 12px;
                            cursor: pointer;
                        }
                    }
                }
            }
            
            .right{
                button{
                    margin-left: 12px;
                }
            }
        }

        .bottom{
            margin-top: 48px;
            border-bottom: 1px solid rgba(0,0,0,.1);
            ul{
                display:flex;
                padding-bottom: 20px;
                li{
                    display: flex;
                    align-items: center;
                    height: 32px;
                    padding: 0 12px;
                    margin-right: 25px;
                    opacity: .4;
                    font-size: 14px;
                    cursor: pointer;

                    &.active{
                        background-color: rgba(0,0,0,.1);
                        opacity: 1;
                    }

                    &:hover{
                        background-color: rgba(0,0,0,.1);
                        opacity: 1;
                    }

                    img{
                        margin-right: 12px;
                    }
                }
            }
        }
    }
`

const ItemList = [{
    name: 'My Inventory',
    img_black: inventory_black,
    route: '/MyInventory'
}, {
    name: 'My Brands',
    img_black: brands_black,
    route: '/MyBrands'
}, {
    name: 'My Activities',
    img_black: activities_black,
    route: '/MyActivities'
},/*{
    name: 'Point-2-Point',
    img_black: p2p_black,
    route: '/MyP2P'
}*/]

export default function CommonHeader () {
    const [curItem, setCurItem] = useState('/MyInventory')
    const history = useHistory()
    const { account } = useActiveWeb3React()
    const [isSettingAccount, setIsSettingAccount] = useState(false)
    const {state} = useContext(myContext);

    useEffect(() => {
        const pathName = window.location.pathname
        ItemList.forEach(element => {
            if (pathName.indexOf(element.route) !== -1) {
                setCurItem(element.route)
            }
        });
    }, [])

    return (
        <CommonHeaderStyled>
            <div className="wrapper">
                <div className="top">
                    <div className="left">
                    {state.userInfo && state.userInfo.imgurl ? <img className="avaterImg" src={state.userInfo && state.userInfo.imgurl} alt=""/>:
                    <div className="avater"></div>}
                    <div className='account_box'>
                        <h5>{state.userInfo.username||'Unnamed User'}</h5>
                            <div className='account'>
                                <p>{account}</p>
                                <CopyToClipboard
                                    text={account}
                                    onCopy={() => {
                                    }}>
                                    <img src={icon_copy} alt="" />
                                </CopyToClipboard>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <OtherButton type='setting' value={'Settings'} onClick={() => {
                            setIsSettingAccount(true)
                        }} />
                        <OtherButton type='share' value={'Share'} />
                    </div>

                </div>

                <div className="bottom">
                    <ul>
                        {ItemList.map((item, index) => {
                            return <li key={index} className={item.route === curItem ? 'active' : ''} onClick={() => {
                                history.push(item.route)
                            }}>
                                <img src={item.img_black} alt="" />
                                <p>{item.name}</p>
                            </li>
                        })}
                    </ul>
                </div>
            </div>
            <SettingAccountModal open={isSettingAccount} setOpen={setIsSettingAccount} />
        </CommonHeaderStyled>
    )
}
