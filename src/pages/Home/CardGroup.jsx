import React from 'react'
import styled from 'styled-components'
import arrows_blue from '@assets/images/icon/arrows-blue.svg'
import { Link } from 'react-router-dom'

const CardGroupStyled = styled.div`
    width: 1100px;
    margin: 0px auto;
    margin-top: ${(marinTop) => {
        return marinTop && '72px'
    }};
    .top{
        height: 32px;
        display:flex;
        align-items: center;
        justify-content: space-between;
        h4{
            font-size: 28px;
        }

        a{
            color: rgba(18,78,235,1);
            font-size: 12px;
            img{
                margin-left: 12px;
            }
        }
    }

    .content{
        display: flex;
        flex-wrap: wrap;
        margin-top: 16px;
    }
`

export default function CardGroup ({ marinTop, title, link, children }) {
    return (
        <CardGroupStyled marinTop={marinTop}>
            <div className="top">
                <h4>{title}</h4>
                <Link to={link}>View All
                    <img src={arrows_blue} alt="" />
                </Link>
            </div>

            <div className='content'>
                {children}
            </div>
        </CardGroupStyled>
    )
}
