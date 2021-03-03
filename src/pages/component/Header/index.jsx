import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Button } from '../../../components/UI-kit'
import Search from './Search'

import logo_bounce from '../../../assets/images/logo/bounce.svg'

const HeaderStyled = styled.div`
    height: 76px;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(3,3,3,.1);
    user-select: none;

    .wrapper{
        width: 1100px;
        display: flex;
        align-items: center;
        justify-content: space-between;

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

                       &.active h5{
                           color: rgba(0,0,0,1)
                       }
                    }
                }
            }
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
}]

export default function Index() {
    const [curNav, setCurNav] = useState(window.localStorage.getItem('Herder_CurNav') || 'Home')

    return (
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
                                    setCurNav(item.name)
                                }}
                            >
                                <Link to={item.route}>
                                    <h5>/ {item.name}</h5>
                                </Link>
                            </li>
                        })}
                    </ul>
                    <Button className='connect_btn' primary>Connect Wallet</Button>
                </div>
            </div>
        </HeaderStyled>
    )
}
