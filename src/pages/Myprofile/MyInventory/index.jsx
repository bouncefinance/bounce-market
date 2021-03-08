import React from 'react'
import CommonHeader from '../CommonHeader'
import styled from 'styled-components'
import Search from './Search'
import { PullRadioBox } from '@components/UI-kit'
import CardItem from './CardItem'

const MyInventoryStyled = styled.div`
    width: 1100px;
    margin: 0 auto;
    .filterBox{
        margin-top: 32px;
        margin-bottom: 50px;
        display: flex;
        justify-content: space-between;
    }

    ul.list{
        display: flex;
        flex-wrap: wrap;

        li{
            margin-top: 32px;
            margin-right: 17px;

            &:nth-child(4n){
                margin-right: 0px;
            }
        }
    }
`

export default function Index() {
    return (
        <>
            <CommonHeader />
            <MyInventoryStyled>
                <div className="filterBox">
                    <Search placeholder={'Search Items, Shops and Accounts'} />

                    <PullRadioBox prefix={'Status:'} options={[{
                        value: 'All'
                    }, {
                        value: 'Listed'
                    }, {
                        value: 'Unlisted'
                    }]} defaultValue='All' onChange={(item) => {
                        console.log(item)
                    }} />

                    <PullRadioBox prefix={'Categories:'} options={[{
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
                </div>

                <ul className="list">
                    {[...new Array(6)].map((item, index) => {
                        return <li key={index}>
                            <CardItem />
                        </li>
                    })}
                </ul>
            </MyInventoryStyled>
        </>
    )
}
