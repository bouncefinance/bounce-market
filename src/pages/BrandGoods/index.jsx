import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router'

import BrandCard from './BrandCard'
import GoodsNavBar from './GoodsNavBar'
import GoodsCard from './GoodsCard'

import img_banner from './assets/img_banner.svg'
import img_goods1 from './assets/img_goods1.svg'
import img_goods2 from './assets/img_goods2.svg'
import img_test1 from './assets/img_test1.svg'
import img_avatar1 from './assets/img_avatar1.svg'
import useHook from './useHook'


const StyledBrandGoods = styled.div`
    display: flex;
    flex-direction: column;

    .breadcrumb_Nav {
        font-family: IBM Plex Mono;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 16px;
        display: flex;
        align-items: center;
        color: #1F191B;
        opacity: 0.8;

        width: 1100px;
        height: 46px;

        box-sizing: border-box;
        margin: 0 auto;

        display: flex;
        align-items: center;

        span {
            opacity: 0.4;
        }
    }

    .banner {
        width: 100%;
        height: 180px;
        background: #F3D6AF;

        display: flex;

        img {
            margin: 23px auto;
        }
    }

    .goodsList {
        width: 1102px;
        margin: 32px auto 84px auto;

        display: grid;
        justify-content: space-between;
        grid-template-columns: 262px 262px 262px 262px;
        column-gap: 18px;
        row-gap: 32px;
        
    }

`

const brandCardInfo = {
    img: img_test1,
    brandName: "Cookie Store",
    profile: "You can find your content here according to your taste. All type of content: images, video, audio, games, etc.",
    avatar: img_avatar1,
    ownerName: "Mapache",
}

const goodsInfoList = {
    "Images": [
        {
            img: img_goods1,
            goodsName: "Image Name",
            goodsId: "123456",
            price: "0.93512 ETH",
        },
        {
            img: img_goods1,
            goodsName: "Image Name",
            goodsId: "123456",
            price: "0.93512 ETH",
        },
    ],
    "Video": [
        {
            img: img_goods2,
            goodsName: "Image Name",
            goodsId: "123456",
            price: "0.93512 ETH",
        },
        {
            img: img_goods2,
            goodsName: "Image Name",
            goodsId: "123456",
            price: "0.93512 ETH",
        },
    ],
    "Audios": [
        {
            img: img_goods1,
            goodsName: "Image Name",
            goodsId: "123456",
            price: "0.93512 ETH",
        },
        {
            img: img_goods1,
            goodsName: "Image Name",
            goodsId: "123456",
            price: "0.93512 ETH",
        },
    ],
    "Game": [
        {
            img: img_goods2,
            goodsName: "Image Name",
            goodsId: "123456",
            price: "0.93512 ETH",
        },
        {
            img: img_goods2,
            goodsName: "Image Name",
            goodsId: "123456",
            price: "0.93512 ETH",
        },
    ],
    "Others": [
        {
            img: img_goods1,
            goodsName: "Image Name",
            goodsId: "123456",
            price: "0.93512 ETH",
        },
        {
            img: img_goods1,
            goodsName: "Image Name",
            goodsId: "123456",
            price: "0.93512 ETH",
        },
    ],
}

function BrandGoods() {
    // const { type } = useParams()
    const { brandId, type } = useParams()
    const { brand_info } = useHook(brandId, type)
    console.log(brand_info)

    return (
        <StyledBrandGoods>

            <div className="breadcrumb_Nav">
                Brands&nbsp;/&nbsp;<span className="brandName"> Cookie Store</span>
            </div>

            <div className="banner">
                <img src={img_banner} alt="" className="bannerImg" />
            </div>

            <BrandCard className="BrandCard"
                img={brandCardInfo.img}
                brandName={brandCardInfo.brandName}
                profile={brandCardInfo.profile}
                avatar={brandCardInfo.avatar}
                ownerName={brandCardInfo.ownerName}
            />

            <GoodsNavBar className="GoodsNavBar" />

            <div className="goodsList">
                {
                    goodsInfoList[type].map((goodsInfo, index) => {
                        return (
                            <GoodsCard
                                key={index}
                                img={goodsInfo.img}
                                goodsName={goodsInfo.goodsName}
                                goodsId={goodsInfo.goodsId}
                                price={goodsInfo.price}
                            />
                        )
                    })
                }
            </div>

        </StyledBrandGoods>
    )
}

export default BrandGoods
