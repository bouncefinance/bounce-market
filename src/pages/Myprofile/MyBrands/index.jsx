import React from 'react'
import CommonHeader from '../CommonHeader'
import styled from 'styled-components'
import { CardItem, AddCardItem } from './ListCardItem'
import ygift_img from './assets/ygift_img.svg'
import { useHistory } from 'react-router'

const BrandsStyled = styled.div`
    width: 1100px;
    margin: 0 auto;

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

export default function Index() {
    const history = useHistory()

    return (
        <div>
            <CommonHeader />

            <BrandsStyled>

                <ul className="list_wrapper">
                    <li>
                        <AddCardItem />
                    </li>
                    {[...new Array(1)].map((item, index) => {
                        return <li key={index} onClick={() => {
                            history.push('/MyBrands/0/All')
                        }}>
                            <CardItem
                                cover={ygift_img}
                                name={'yGift Store'}
                                count={15}
                            />
                        </li>
                    })}
                </ul>

            </BrandsStyled>
        </div>
    )
}
