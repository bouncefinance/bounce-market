import React from 'react'
import styled from 'styled-components'
import { useHistory, useParams } from 'react-router-dom'
import icon_question from './assets/icon_question.svg'
import icon_plaint from './assets/icon_plaint.svg'
import Search from './Search'
import { PullRadioBox } from '@components/UI-kit'
import CardItem from './CardItem'
import PagingControls from './PagingControls'

const P2PStyled = styled.div`
    width: 1100px;
    margin: 0 auto;
    .header_nav{
        display: flex;
        margin-top: 40px;
        border-bottom: 2px solid rgba(0,0,0,.1);
        padding-bottom: 16px;

        li{
            width: 140px;
            height: 48px;
            margin-right: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            opacity: .4;

            img{
                margin-right: 10px;
            }

            p{
                font-size: 16px;
            }

            &.active{
                background-color: rgba(0,0,0,.1);
                opacity: 1;
            }
        }
    }

    .filter{
        margin-top: 32px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    ul.list{
        display: flex;
        flex-wrap: wrap;
        margin-top: 8px;
        li{
            margin-top: 32px;
            margin-right: 17px;

            &:nth-child(4n){
                margin-right: 0;
            }
        }
    }
`

const menuList = [{
    name: 'Requests',
    icon: icon_question,
    route: '/P2P/Requests'
}, {
    name: 'Offers',
    icon: icon_plaint,
    route: '/P2P/Offers'
}]

export default function Index() {
    const { type } = useParams()
    const history = useHistory()

    return (
        <P2PStyled>
            <ul className="header_nav">
                {menuList.map((item) => {
                    return <li className={type === item.name ? 'active' : ''} key={item.name} onClick={() => {
                        history.push(item.route)
                    }}>
                        <img src={item.icon} alt="" />
                        <p>{item.name}</p>
                    </li>
                })}
            </ul>

            <div className="filter">
                <Search placeholder={'Search request Name or request Creator'} />
                <PullRadioBox prefix={'Categories:'} width='206px' options={[{
                    value: 'Images'
                }, {
                    value: 'Video'
                }, {
                    value: 'Audio'
                }, {
                    value: 'Games'
                }, {
                    value: 'Others'
                }]} defaultValue='Images' onChange={(item) => {
                    console.log(item)
                }} />

                <PullRadioBox prefix={'Status:'} width='206px' options={[{
                    value: 'All'
                }, {
                    value: 'Listed'
                }, {
                    value: 'Unlisted'
                }]} defaultValue='All' onChange={(item) => {
                    console.log(item)
                }} />
            </div>

            {type === 'Requests' && <ul className='list'>
                {[...new Array(16)].map((item, index) => {
                    return <li key={index}>
                        <CardItem
                            title={'B-day Video'}
                            context={'I want to a custom video for my birthday. It shouldn’t be longer then ~20-30 sec.'}
                            status={'Live'}
                            price={'100 USDT'}
                        />
                    </li>
                })}
            </ul>}



            {type === 'Offers' && <ul className='list'>
                {[...new Array(5)].map((item, index) => {
                    return <li key={index}>
                        <CardItem
                            title={'B-day Video'}
                            context={'I want to a custom video for my birthday. It shouldn’t be longer then ~20-30 sec.'}
                            status={'Live'}
                            price={'100 USDT'}
                        />
                    </li>
                })}
            </ul>}


            <PagingControls />
        </P2PStyled>
    )
}
