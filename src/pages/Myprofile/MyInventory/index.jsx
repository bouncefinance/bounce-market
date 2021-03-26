import React from 'react'
import CommonHeader from '../CommonHeader'
import styled from 'styled-components'
import Search from './Search'
import { PullRadioBox } from '@components/UI-kit'
import { CardItem, AddCardItem } from './CardItem'
import img_example_3 from '@assets/images/example_3.svg'
import { useQuery } from '@apollo/client';
import { QueryBrand721 } from '@/utils/apollo'

const MyInventoryStyled = styled.div`
    width: 1100px;
    margin: 0 auto;
    .filterBox{
        margin-top: 32px;
        /* margin-bottom: 50px; */
        display: flex;
        justify-content: space-between;
    }

    ul.list{
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 84px;

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
    const { data } = useQuery(QueryBrand721);
    console.log(data);


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
                        // console.log(item)
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
                        // console.log(item)
                    }} />
                </div>

                <ul className="list">
                    <li>
                        <AddCardItem />
                    </li>

                    {[...new Array(6)].map((item, index) => {
                        return <li key={index}>
                            <CardItem nftId={16856} cover={img_example_3} status={index % 2 === 0 ? 'Listed' : ''} />
                        </li>
                    })}
                </ul>
            </MyInventoryStyled>
        </>
    )
}
