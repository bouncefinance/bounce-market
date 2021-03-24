import React, { useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard';

import icon_copy from '@assets/images/icon/copy.svg'

import inventory_white from './assets/inventory_white.svg'
import inventory_black from './assets/inventory_black.svg'
import brands_white from './assets/brands_white.svg'
import brands_black from './assets/brands_black.svg'
import activities_white from './assets/activities_white.svg'
import activities_black from './assets/activities_black.svg'
import setting_white from './assets/setting_white.svg'
import setting_black from './assets/setting_black.svg'
import { useActiveWeb3React } from '@/web3'
import SettingAccountModal from '../../Myprofile/SettingAccountModal'

const InfoBoxStyled = styled.div`
    width: 218px;
    background-color: #fff;
    position: absolute;
    top: 76px;
    right: 0px;
    border: 1px solid #EAEAEA;
    box-shadow: 0px 1px 14px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    z-index: 2;
    .top_info{

        height: 70px;
        padding: 24px 12px 18px;
        box-sizing: border-box;
        margin-bottom: 12px;

        span{
            font-size: 16px;
            line-height: 20.88px;
            font-weight: 700;
        }

        .accout{
            width: 178px;
            overflow: hidden;
            display: flex;
            justify-content: space-between;
            margin-top: 9px;
            box-sizing: border-box;

            p{
                width: 150px;
                font-size: 14px;
                line-height: 18.27px;
                color: rgba(31,25,27,.4);
                text-overflow: ellipsis;
                overflow: hidden;
            }

            img{
                cursor: pointer;
            }
        }
    }

    ul{
        width: 100%;
        li{
            height: 42px;
            padding: 0 24px;
            display: flex;
            align-items: center;
            font-size: 14px;
            cursor: pointer;
            img{
                margin-right: 16px;
            }

            &:hover{
                background-color: #000;
                color: #fff;
            }
        }
    }
`

const InfoList = [{
    name: 'My Inventory',
    img_white: inventory_white,
    img_black: inventory_black,
    route: '/MyInventory'
}, {
    name: 'My Brands',
    img_white: brands_white,
    img_black: brands_black,
    route: '/MyBrands'
}, {
    name: 'My Activities',
    img_white: activities_white,
    img_black: activities_black,
    route: '/MyActivities'
}, /*{
    name: 'Point-2-Point',
    img_white: p2p_white,
    img_black: p2p_black,
    route: '/MyP2P'
},*/  {
    name: 'Account Settings',
    img_white: setting_white,
    img_black: setting_black,
    route: ''
}]

export default function InfoBox ({ setIsShowInfo, username }) {
    const history = useHistory()
    const [curItem, setCurItem] = useState(-1)
    const { account } = useActiveWeb3React()
    const [isSettingAccount, setIsSettingAccount] = useState(false)

    return (
        <InfoBoxStyled>
            <div className="top_info">
                <span>{username || 'Undefined'}</span>
                <div className='accout'>
                    <p>{account}</p>
                    <CopyToClipboard
                        text={account}
                        onCopy={() => {
                        }}>
                        <img src={icon_copy} alt="" />
                    </CopyToClipboard>
                </div>
            </div>
            <ul>
                {InfoList.map((item, index) => {
                    return <li key={item.name}
                        onMouseEnter={() => {
                            setCurItem(index)
                        }}
                        onMouseLeave={() => {
                            setCurItem(-1)
                        }}
                        onClick={() => {
                            if (item.name === 'Account Settings') {
                                return setIsSettingAccount(true)
                            }
                            if (item.route === '') return
                            history.push(item.route)
                            setIsShowInfo(false)
                        }}
                    >
                        <img src={index === curItem ? item.img_white : item.img_black} alt="" />
                        <p>{item.name}</p>
                    </li>
                })}

            </ul>

            <SettingAccountModal open={isSettingAccount} setOpen={setIsSettingAccount} />
        </InfoBoxStyled>
    )
}
