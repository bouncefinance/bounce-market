import React from 'react'
import styled from 'styled-components'

import SearchBar from '../component/Header/Search'
import { PullRadioBox as DropDownMenu } from '../../components/UI-kit'
import BrandCard from './BrandCard'
import PagingControls from '../component/Other/PagingControls'

import img_test1 from './assets/img_test1.svg'
import img_avatar1 from './assets/img_avatar1.svg'

const StyledBrandPage = styled.div`
    width: 1100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    margin: 40px auto 0 auto;

    .row-1 {
        display: flex;
        justify-content: space-between;

        input {
            width: 821px;
            height: 48px;
            font-family: Optima;
            font-style: normal;
            font-weight: bold;
            font-size: 16px;
            line-height: 19px;
            text-transform: capitalize;
            color: #000000;
            opacity: 0.4;
            
            margin-left: 0;
        }
    }

    .BrandCardList {
        margin-top: 32px;

        display: grid;
        grid-gap: 32px;
    }
`

const cardsInfoList = [
    {
        img: img_test1,
        brandName: "Cookie Store",
        profile: "You can find your content here according to your taste. All type of content: images, video, audio, games, etc.",
        avatar: img_avatar1,
        ownerName: "Mapache",
    },
    {
        img: img_test1,
        brandName: "Cookie Store",
        profile: "You can find your content here according to your taste. All type of content: images, video, audio, games, etc.",
        avatar: img_avatar1,
        ownerName: "Mapache",
    },
    {
        img: img_test1,
        brandName: "Cookie Store",
        profile: "You can find your content here according to your taste. All type of content: images, video, audio, games, etc.",
        avatar: img_avatar1,
        ownerName: "Mapache",
    },
    {
        img: img_test1,
        brandName: "Cookie Store",
        profile: "You can find your content here according to your taste. All type of content: images, video, audio, games, etc.",
        avatar: img_avatar1,
        ownerName: "Mapache",
    },
]

export default function Index() {
    return (
        <StyledBrandPage>
            <div className="row-1">
                <SearchBar placeholder={"Search Brand Name or Brand Creator"} />
                <DropDownMenu
                    width={"261px"}
                    options={[{
                        value: 'New'
                    },
                    ]}
                    defaultValue={'New'}
                    prefix={"Sort by:"}
                    onChange={(item) => {
                        // console.log(item)
                    }}
                />
            </div>
            <div className="BrandCardList">
                {
                    cardsInfoList.map(
                        (cardsInfo, index) => {
                            return (
                                <BrandCard
                                    key={index}
                                    img={cardsInfo.img}
                                    brandName={cardsInfo.brandName}
                                    profile={cardsInfo.profile}
                                    avatar={cardsInfo.avatar}
                                    ownerName={cardsInfo.ownerName}
                                />
                            )
                        }
                    )
                }
            </div>
            <PagingControls />
        </StyledBrandPage>
    )
}
