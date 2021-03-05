import React from 'react'
import styled from 'styled-components'

import logo_bounce from '@assets/images/logo/bounce.svg'
import link_media from '@assets/images/icon/link_media.svg'
import link_telegram from '@assets/images/icon/link_telegram.svg'
import link_twitter from '@assets/images/icon/link_twitter.svg'

const FooterStyled = styled.div`
    width: 100%;
    height: 81px;
    border-top: 1px solid rgba(204,204,204,.8);
    
    .footer_wapper{
        width: 1100px;
        height: 100%;
        display: flex;
        margin: 0 auto;
        align-items: center;
        justify-content:space-between;

        img{
            width: 101px;
        }

        ul{
            display: flex;
            align-items: center;

            li{
                margin-left: 40px;
                img{
                    width: 18px;
                }
            }
        }
    }
`

export default function index() {
    return (
        <FooterStyled>
            <div className="footer_wapper">
                <img src={logo_bounce} alt="" />
                <ul>
                    <li>
                        <a href={'http://baidu.com'}>
                            <img src={link_media} alt="" />
                        </a>
                    </li>
                    <li>
                        <a href={'http://baidu.com'}>
                            <img src={link_telegram} alt="" />
                        </a>
                    </li>
                    <li>
                        <a href={'http://baidu.com'}>
                            <img src={link_twitter} alt="" />
                        </a>
                    </li>
                </ul>
            </div>
        </FooterStyled>
    )
}
