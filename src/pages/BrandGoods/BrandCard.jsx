import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const StyledCard = styled.div`
    box-sizing: border-box;
    margin: 44px auto 50px auto;
    width: 1100px;

    
    display: grid;

    grid-template-columns: 270px 1fr;

    .right {
        padding-top: 12px;
        padding-right: 469px;
        padding-left: 40px;

        display: flex;
        flex-direction: column;

        .brandName {
            font-family: Optima;
            font-style: normal;
            font-weight: bold;
            font-size: 40px;
            line-height: 49px;

        }

        .profile {
            font-family: Helvetica Neue;
            font-style: normal;
            font-weight: normal;
            font-size: 20px;
            line-height: 25px;
            color: #1F191B;
            opacity: 0.8;            
            
            width: 491px;
            margin-top: 16px;
        }

        .owner {
            margin-top: 30px;

            display: flex;
            align-items: center;

            span.text {
                margin-left: 8px;

                font-family: IBM Plex Mono;
                font-style: normal;
                font-weight: 500;
                font-size: 12px;
                line-height: 16px;
                display: flex;
                align-items: center;
                color: #1F191B;
                opacity: 0.4;
            }

            a {
                font-family: IBM Plex Mono;
                font-style: normal;
                font-weight: 500;
                font-size: 12px;
                line-height: 16px;
                display: flex;
                align-items: center;
                color: #124EEB;
                opacity: 0.8;

                margin-left: 6px;
                       
            }
        }
    }
        

`

function BrandCard({img, brandName, profile, avatar, ownerName}) {
    return (
        <StyledCard>
            <img src={img} alt=""/>
            <div className="right">
                <span className="brandName">{brandName}</span>
                <p className="profile">{profile}</p>
                <div className="owner">
                    <img src={avatar} alt=""/>
                    <span className="text">Owned by</span>
                    <Link to={"/"}>{ownerName}</Link>
                </div>
            </div>
        </StyledCard>
    )
}

export default BrandCard
