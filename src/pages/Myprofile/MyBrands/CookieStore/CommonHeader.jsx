import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { OtherButton } from '@components/UI-kit'
import { useHistory } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useActiveWeb3React } from '@/web3'

import activities_black from '../../../component/Header/assets/activities_black.svg'
import brands_black from '../../../component/Header/assets/brands_black.svg'
import inventory_black from '../../../component/Header/assets/inventory_black.svg'
import p2p_black from '../../../component/Header/assets/p2p_black.svg'
import header_top from '../../../component/Header/assets/header_top.svg'
import cookies_img from '../../../component/Header/assets/cookies_img.svg'
import icon_copy from './../../../../assets/images/icon/copy.svg'

const CommonHeaderStyled = styled.div`
    .wrapper{
        width: 1100px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        .top{
            display: flex;
            justify-content: space-between;
            height: 185px;
            align-items: center;
            margin-top: 40px;
            .left{
                width: 520px;
                height: 60px;
                display: flex;
                align-items: center;

                .avater{
                  width: 270px;
                  height: 180px;
                }

                .account_box{
                  margin-left: 43px;
                    h4{
                      font-family: Optima;
                      font-style: normal;
                      font-weight: bold;
                      font-size: 40px;
                      line-height: 49px;
                      margin-bottom: 8px;
                    }
                  p{
                    width: 705px;
                    font-family: Helvetica Neue;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 20px;
                    line-height: 124%;
                    margin-bottom: 60px;
                    color: #1F191B;
                    opacity: 0.8;
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
}, {
    name: 'Point-2-Point',
    img_black: p2p_black,
    route: '/MyP2P'
}]

export default function CommonHeader() {
    const [curItem, setCurItem] = useState('/MyInventory')
    const history = useHistory()
    const { account } = useActiveWeb3React()

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
            <div><img src={header_top} style={{width: '100%'}}/></div>
            <div className="wrapper">
                <div className="top">
                    <div className="left">
                        <div className="avater">
                            <img src={cookies_img}/>
                        </div>
                        <div className='account_box'>
                            <h4>Cookie Store</h4>
                            <p>You can find your content here according to your taste</p>
                            <div className='account'>
                                    <OtherButton type='Edit' value={'Edit'} />
                            </div>
                        </div>
                    </div>
                    {/*<div className="right">*/}
                    {/*    <OtherButton type='setting' value={'Settings'} />*/}
                    {/*    <OtherButton type='share' value={'Share'} />*/}
                    {/*</div>*/}

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
        </CommonHeaderStyled>
    )
}
