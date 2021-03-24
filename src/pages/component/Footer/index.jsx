import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import logo_bounce from '@assets/images/logo/bounce.svg'
import link_media from '@assets/images/icon/link_media.svg'
import link_telegram from '@assets/images/icon/link_telegram.svg'
import link_twitter from '@assets/images/icon/link_twitter.svg'

const FooterStyled = styled.div`
    width: 100%;
    height: 81px;
    border-top: 1px solid rgba(204,204,204,.8);

    &.lower{
        position: absolute;
        left: 0;
        bottom: 0px;
    }
    
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

export default function Index () {
    const history = useHistory()
    const [hasScroll, setHasScroll] = useState()

    function hasScrollbar () {
        return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight);
    }

    useEffect(() => {
        setTimeout(() => {
            setHasScroll(hasScrollbar())
        }, 100)
        history.listen(_route => {
            setTimeout(() => {
                setHasScroll(hasScrollbar())
            }, 100)
        })
        // eslint-disable-next-line
    }, [])




    return (
        <>
            {!hasScroll && <div style={{
                height: '81px'
            }}></div>}

            <FooterStyled className={!hasScroll ? 'lower' : ''}>
                <div className="footer_wapper">
                    <img src={logo_bounce} alt="" />
                    <ul>
                        <li>
                            <a target="_blank" rel="noreferrer" href={'https://bouncefinance.medium.com'}>
                                <img src={link_media} alt="" />
                            </a>
                        </li>
                        <li>
                            <a target="_blank" rel="noreferrer" href={'https://t.me/bounce_finance'}>
                                <img src={link_telegram} alt="" />
                            </a>
                        </li>
                        <li>
                            <a target="_blank" rel="noreferrer" href={'https://twitter.com/bounce_finance?s=21'}>
                                <img src={link_twitter} alt="" />
                            </a>
                        </li>
                    </ul>
                </div>
            </FooterStyled>
        </>
    )
}
