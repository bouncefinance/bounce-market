import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard';

import icon_copy from '@assets/images/icon/copy.svg'
import { myContext } from '@/redux/index.js'
import gallery_white from './assets/Gallery_white.svg'
import gallery_black from './assets/Gallery_black.svg'
import brands_white from './assets/brands_white.svg'
import brands_black from './assets/brands_black.svg'
import activities_white from './assets/activities_white.svg'
import activities_black from './assets/activities_black.svg'
import icon_liked from '@assets/images/icon/liked.svg'
import icon_liked_black from '@assets/images/icon/liked_black.svg'
import setting_white from './assets/setting_white.svg'
import setting_black from './assets/setting_black.svg'
import logout_white from './assets/logout_white.svg'
import logout_black from './assets/logout_black.svg'
import { useActiveWeb3React } from '@/web3'
import SettingAccountModal from '../../Myprofile/SettingAccountModal'
import useWrapperIntl from '@/locales/useWrapperIntl';

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
        padding: 12px 18px 12px 24px;
        /* padding: 24px 12px 30px; */
        box-sizing: border-box;
        /* margin-bottom: 12px; */
        border-bottom: 1px solid rgba(3,3,3,0.1);

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
            position: relative;

            img{
                margin-right: 16px;
                width: 16px;
                height: 16px;
            }

            &:hover{
                background-color: #000;
                color: #fff;
            }

            &:last-child {
                border-top: 1px solid rgba(3,3,3,0.1);
            }
        }
    }
`



export default function InfoBox({ setIsShowInfo, username, onBodyHandle, offBodyHandle }) {
    const history = useHistory()
    const [curItem, setCurItem] = useState(-1)
    const { account, deactivate } = useActiveWeb3React()
    const [isSettingAccount, setIsSettingAccount] = useState(false)
    const { dispatch } = useContext(myContext);
    const { wrapperIntl } = useWrapperIntl()


    const InfoList = [{
        name: wrapperIntl('MyGallery'),
        img_white: gallery_white,
        img_black: gallery_black,
        route: '/MyGallery'
    }, {
        name: wrapperIntl('MyBrands'),
        img_white: brands_white,
        img_black: brands_black,
        route: '/MyBrands'
    }, {
        name: wrapperIntl('MyActivities'),
        img_white: activities_white,
        img_black: activities_black,
        route: '/MyActivities'
    }, {
        name: wrapperIntl('MyLiked'),
        img_white: icon_liked_black,
        img_black: icon_liked,
        route: '/MyLiked'
    }, {
        name: wrapperIntl('header.setting'),
        img_white: setting_white,
        img_black: setting_black,
        route: ''
    }, {
        name: wrapperIntl('header.logout'),
        img_white: logout_white,
        img_black: logout_black,
        route: ''
    }]


    return (
        <InfoBoxStyled>
            <div className="top_info">
                <span>{username || wrapperIntl("UnnamedUser")}</span>
                <div className='accout'>
                    <p>{account}</p>
                    <CopyToClipboard
                        text={account}
                        onCopy={() => {
                            dispatch({ type: 'Modal_Message', showMessageModal: true, modelType: 'success', modelMessage: wrapperIntl("CopySuccessful") });
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
                        onClick={(e) => {
                            window.event ? window.event.cancelBubble = true : e.stopPropagation()
                            if (item.name === wrapperIntl('header.setting') && item.name !== "loading"/* 'Account Settings' */) {
                                offBodyHandle()
                                setIsSettingAccount(true)
                                return
                            }
                            if (item.name === wrapperIntl("header.logout") && item.name !== "loading") {
                                deactivate()
                                setIsShowInfo(false)
                                return
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

            <SettingAccountModal open={isSettingAccount} setOpen={(v) => {
                if (v === false) {
                    // onBodyHandle()
                }
                setIsSettingAccount(v)
            }} />
        </InfoBoxStyled>
    )
}
