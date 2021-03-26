import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { Button } from '@components/UI-kit'

const StyledCard = styled.div`
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    display: grid;
    overflow: hidden;
    grid-template-columns: 542px 1fr;
    &:hover{
        box-shadow:0 0 16px rgba(48,69,114,0.2)
    }
    .right {
        padding-top: 88px;
        padding-right: 35px;
        padding-left: 36px;

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
            
            margin-top: 16px;
        }

        .avatar {
            width: 20px;
            height: 20px;
            border-radius: 50%;
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

        .button_visit{
            // margin-top: 38px;
            position: relative;
            top: 70px;
            opacity: 0;
        }
        
        &:hover .button_visit{
            transition-duration: 600ms;
            transform: translate(0, -38px);
            opacity: 1;
        }
        &:hover{
            transition-duration: 600ms;
            transform: translate(0, -40px);
        }
    }
        

`

function BrandCard({img, brandName, profile, avatar, ownerName}) {
    return (
        <StyledCard>
            <img src={img} width={540} height={332} alt=""/>
            <div className="right">
                <span className="brandName">{brandName}</span>
                <p className="profile">{profile}</p>
                <div className="owner">
                    <img src={avatar} className='avatar' alt=""/>
                    <span className="text">Owned by</span>
                    <Link to={"/"}>{ownerName}</Link>
                </div>
                <div className="button_visit">
                    <Button primary width={'162px'}>Visit Store</Button>
                </div>
            </div>
        </StyledCard>
    )
}

export default BrandCard
