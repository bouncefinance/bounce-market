import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { PullRadioBox } from "../../../components/UI-kit";
import Link from '@material-ui/core/Link';

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
    
    .footer_wrapper{
        width: 1100px;
        height: 100%;
        display: flex;
        margin: 0 auto;
        align-items: center;
        justify-content:space-between;

        img.logo{
            width: 101px;
        }

        .right {
            display: flex;
            position: relative;
            .ranking {
                position: absolute;
                left: -150px;
            }

            .language_menu {
                position: absolute;
                left: -100px;
                bottom: -12px;
                
                .options {
                    margin-bottom: 5px;
                }
            }

            ul.external_link {
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
                <div className="footer_wrapper">
                    <img className='logo' src={logo_bounce} alt="" />

                    <div className='right'>
                        <Link
                            component="button"
                            variant="body2"
                            color="inherit"
                            className="ranking"
                            onClick={() => {
                                console.info("I'm a button.");
                                history.push('/Ranking')
                            }}
                            >
                            Ranking
                        </Link>
                        <PullRadioBox
                            className='language_menu'
                            width={"120px"}
                            borderHidden
                            popDirection='up'
                            options={[
                                {
                                    value: "English",
                                },
                                {
                                    value: "中文",
                                },
                            ]}
                            defaultValue={() => {
                                switch (window.localStorage.getItem("Language")) {
                                    case 'en-US':
                                        return('English')
                                    case 'zh-CN':
                                        return('中文')
                                    default:
                                        return('English')
                                }
                            }}
                            onValChange={(item) => {
                                console.log(item)
                                switch (item) {
                                    case 'English':
                                        if (window.localStorage.getItem("Language") === 'en-US') break
                                        window.localStorage.removeItem("Language")
                                        window.localStorage.setItem("Language", 'en-US')
                                        window.location.reload()
                                        break;
                                    case '中文':
                                        if (window.localStorage.getItem("Language") === 'zh-CN') break
                                        window.localStorage.removeItem("Language")
                                        window.localStorage.setItem("Language", 'zh-CN')
                                        window.location.reload()
                                        break;
                                
                                    default:
                                        break;
                                }
                            }}
                        />
                        <ul className='external_link'>
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
                </div>
            </FooterStyled>
        </>
    )
}
