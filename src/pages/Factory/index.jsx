import React from 'react'
import styled from 'styled-components'

import FactoryCard from './FactoryCard'

import pic_Generate from './assets/pic_Generate.svg'
import pic_Build from './assets/pic_Build.svg'
import pic_List from './assets/pic_List.svg'

const CardInfoList = [
    {
        img: pic_Generate,
        title: "Generate your NFT",
        discription: "You can turn contents in to NFTs without creating your own store or brand",
        button_value: "Generate",
    },
    {
        img: pic_Build,
        title: "Build your brand",
        discription: "You can create a contract and produce unlimited amount of NFTs under your own contract",
        button_value: "Build",
    },
    {
        img: pic_List,
        title: "List your NFT",
        discription: "If you already have a token contract set up and you just want to set up a space to sell them, use our get-listed flow instead",
        button_value: "List",
    },
]

const CardList = styled.div`
    width: 1100px;
    margin: 0 auto;
    margin-bottom: 40px;
    display: flex;
    flex-wrap: wrap;

    li {
        margin-top: 40px;
        margin-right: 18px;
        &:nth-child(3n) {
            margin-right: 0;
        }
    }
`


function index() {
    return (
        <CardList>
            {
                CardInfoList.map((CardInfo, index) => {
                    return (
                        <li key={index}>
                            <FactoryCard
                                img={CardInfo.img}
                                title={CardInfo.title}
                                discription={CardInfo.discription}
                                button_value={CardInfo.button_value}
                            />
                        </li>
                    )
                })
            }
        </CardList>
    )
}

export default index
