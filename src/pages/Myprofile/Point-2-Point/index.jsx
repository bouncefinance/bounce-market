import React from 'react'
import CommonHeader from '../CommonHeader'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { CardItem, AddCardItem } from './CardItem'

const P2PStyled = styled.div`
    width: 1100px;
    margin: 0 auto;

    ul.menu{
        height: 32px;
        display: flex;
        margin-top: 32px;
        li{
            width: 86px;
            height: 32px;
            box-sizing: border-box;
            border: 1px solid rgba(0,0,0,.2);
            font-weight: 500;
            font-size: 14px;
            color: rgba(0,0,0,.4);
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            margin-right: 16px;


            &.active{
                color: rgba(0,0,0,1);
                border-color: #000;
            }
        }
    }

    ul.list_wrapper{
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 82px;
        li{
            margin-top: 20px;
            margin-right: 17px;

            &:nth-child(4n){
                margin-right: 0px;
            }
        }
    }
`

const menuList = [{
    name: 'Requests',
    route: '/MyP2P/Requests'
}, {
    name: 'Offers',
    route: '/MyP2P/Offers'
}]

export default function Index() {
    const { type } = useParams()
    const history = useHistory()
    
    return (
        <>
            <CommonHeader />
            <P2PStyled>
                <ul className="menu">
                    {menuList.map((item) => {
                        return <li key={item.name} className={item.name === type ? 'active' : ''} onClick={() => {
                            history.push(item.route)
                        }}>{item.name}</li>
                    })}
                </ul>

                {type === 'Requests' && <ul className="Requests list_wrapper">
                    <li>
                        <AddCardItem />
                    </li>
                    {[...new Array(8)].map((item, index) => {
                        return <li key={index}>
                            <CardItem
                                title='Mobile Game'
                                status={'Live'}
                                context={'I want to a custom video for my birthday. It shouldn’t be longer then ~20-30 sec. I want to a custom video for my birthday.'}
                                price={'85 USDT'}
                            />
                        </li>
                    })}
                </ul>}


                {type === 'Offers' && <ul className="Offers list_wrapper">
                    <li>
                        <AddCardItem />
                    </li>
                    {[...new Array(4)].map((item, index) => {
                        return <li key={index}>
                            <CardItem
                                title='Mobile Game'
                                status={'Live'}
                                context={'I want to a custom video for my birthday. It shouldn’t be longer then ~20-30 sec. I want to a custom video for my birthday.'}
                                price={'85 USDT'}
                            />
                        </li>
                    })}
                </ul>}

            </P2PStyled>
        </>
    )
}
