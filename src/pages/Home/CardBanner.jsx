import React from 'react'
import styled from 'styled-components'
import arrows_blue from '@assets/images/icon/arrows-blue.svg'
import banner_1 from './assets/banner_1.svg'
import banner_2 from './assets/banner_2.svg'
// import banner_3 from './assets/banner_3.svg'
// import { Tooltip } from '@material-ui/core'
import { Link } from 'react-router-dom'

const CardBannerStyled = styled.ul`
    width: 1100px;
    height: 110px;
    margin: 0 auto;
    margin-top: 52px;
    display: flex;
    justify-content: space-between;
`


export default function CardBannerGroup () {
    return (
        <CardBannerStyled>
            <Link to="/Brands">
                <CardBannerItem
                    title='Marketplace'
                    context='You can find your content here according to your taste'
                    img={banner_1}
                />
            </Link>
            <Link to="/Brands">
                <CardBannerItem
                    title='Brands'
                    context='You can find your content here according to your taste'
                    img={banner_2}
                />
            </Link>
            {/* <Tooltip title="Coming soon">
                <div style={{ opacity: 0.5, cursor: 'pointer' }}>
                    <CardBannerItem
                        title='Point-2-Point'
                        context='You can find your content here according to your taste'
                        img={banner_3}
                    />
                </div>
            </Tooltip> */}
        </CardBannerStyled>
    )
}


const CardBannerItemStyled = styled.li`
    width: 540px;
    height: 110px;
    box-sizing: border-box;
    border: 2px solid #000000;
    display: flex;
    justify-content: space-between;
    
    .left{
        width: 171px;
        height: 30px;
        margin-left: 28px;
        margin-top: 24px;

        .top{
            display: flex;
            h5{
                font-size: 20px;
            }
            img{
                width: 20px;
                margin-left: 10px;
            }
        }
        .bottom{
            margin-top: 8px;
            font-size: 12px;
            line-height: 14.88px;
            color: rgba(31,25,27,.7)
        }
    }
`

function CardBannerItem ({ title, context, img }) {
    return (
        <CardBannerItemStyled>
            <div className="left">
                <div className="top">
                    <h5>{title}</h5>
                    <img src={arrows_blue} alt="" />
                </div>
                <div className="bottom">
                    <p>{context}</p>
                </div>
            </div>

            <div className="right">
                <img src={img} alt="" />
            </div>
        </CardBannerItemStyled>
    )
}

