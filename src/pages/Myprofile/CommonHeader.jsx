import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { OtherButton } from '@components/UI-kit'
import { useHistory } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useActiveWeb3React } from '@/web3'

import activities_black from '../component/Header/assets/activities_black.svg'
import brands_black from '../component/Header/assets/brands_black.svg'
import gallery_black from '../component/Header/assets/Gallery_black.svg'
import icon_copy from '@assets/images/icon/copy.svg'
import icon_liked from '@assets/images/icon/liked.svg'
import { myContext } from '@/redux/index.js'
import SettingAccountModal from './SettingAccountModal'
import UpdateTopBarImg from './MyBrands/updateTopBarImg'
import edit_white from '@assets/images/icon/edit_white.svg'
import themeBgImg from '@assets/images/big/d84d87b4548a138b206be2bae58a0362.png'

import useWrapperIntl from '@/locales/useWrapperIntl'


const CommonHeaderStyled = styled.div`
    .top-bg{
        background: url(${themeBgImg}) center center no-repeat;
        height: 180px;
        background-size: 100%!important;
        position: relative;
         button{
            background: none;
            width: 124px;
            height: 40px;
            box-sizing: border-box;
            border: 1px solid #fff;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 28px;
            right: 40px;
            cursor: pointer;
            img{
                margin-right: 6.8px;
            }
        }
    }
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

    


export default function CommonHeader() {
    const [curItem, setCurItem] = useState('/MyGallery')
    const history = useHistory()
    const { account } = useActiveWeb3React()
    const [isSettingAccount, setIsSettingAccount] = useState(false)
    const { state, dispatch } = useContext(myContext);
    const [openUpdateTopBarImg, setOpenUpdateTopBarImg] = useState(false)

    
    const { wrapperIntl } = useWrapperIntl()
    
    const ItemList = [{
        name: wrapperIntl('MyProfile.CommonHeader.MyGallery'),
        img_black: gallery_black,
        route: '/MyGallery'
    }, {
        name: wrapperIntl('MyProfile.CommonHeader.MyBrands'),
        img_black: brands_black,
        route: '/MyBrands'
    }, {
        name: wrapperIntl('MyProfile.CommonHeader.MyLiked'),
        img_black: icon_liked,
        route: '/MyLiked'
    }, {
        name: wrapperIntl('MyProfile.CommonHeader.MyActivities'),
        img_black: activities_black,
        route: '/MyActivities'
    },/*{
        name: 'Point-2-Point',
        img_black: p2p_black,
        route: '/MyP2P'
    }*/]

    useEffect(() => {
        const pathName = window.location.pathname
        ItemList.forEach(element => {
            if (pathName.indexOf(element.route) !== -1) {
                setCurItem(element.route)
            }
        });
        // eslint-disable-next-line
    }, [])


    return (
        <CommonHeaderStyled>
            {<UpdateTopBarImg open={openUpdateTopBarImg} useType="my" setOpen={setOpenUpdateTopBarImg} run={({ bandimgurl }) => {
                dispatch({
                    type: 'UserInfo',
                    userInfo: { ...state.userInfo, bandimgurl }
                })
            }} />}
            <div className="top-bg" style={state.userInfo.bandimgurl ? { background: `url(${state.userInfo.bandimgurl}) center center no-repeat` } : {}}>
                <button onClick={() => setOpenUpdateTopBarImg(true)}>
                    <img src={edit_white} alt="" />
                    <p>Change</p>
                </button>
            </div>
            <div className="wrapper">
                <div className="top">
                    <div className="left">
                        {state.userInfo && state.userInfo.imgurl ? <img className="avaterImg" src={state.userInfo && state.userInfo.imgurl} alt="" /> :
                            <div className="avater"></div>}
                        <div className='account_box'>
                            <h5>{state.userInfo.username || 'Unnamed User'}</h5>
                            <div className='account'>
                                <p>{account}</p>
                                <CopyToClipboard
                                    text={account}
                                    onCopy={() => {
                                        dispatch({ type: 'Modal_Message', showMessageModal: true, modelType: 'success', modelMessage: "Copy Successful" });
                                    }}>
                                    <img src={icon_copy} alt="" />
                                </CopyToClipboard>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <OtherButton type='setting' value={wrapperIntl('MyProfile.CommonHeader.Settings')} onClick={() => {
                            setIsSettingAccount(true)
                        }} />
                        {false && <OtherButton type='share' value={'Share'} />}
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
