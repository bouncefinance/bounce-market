import React, { useEffect } from 'react'
import { useParams } from 'react-router';
import styled from 'styled-components'
import use_FS_Hook from './use_FS_Hook'
import { OtherButton,Button } from '@components/UI-kit'
import { AutoStretchBaseWidthOrHeightImg } from "../component/Other/autoStretchBaseWidthOrHeightImg";
import icon_altAvatar from './assets/icon_altAvatar.svg'
import icon_time from './assets/icon_time.svg'


const NewIndexStyled = styled.div`
    width: 1100px;
    margin: 0 auto;
    .crumbs{
        display: flex;
        margin-top: 24px;
        li{
            font-size: 12px;
            line-height: 14.32px;
            color: rgba(31,25,27,1,.8);
            cursor: pointer;
            &::after{
                content: '/';
                margin:0px 5px;
            }

            &:last-child::after{
                content: ''
            }

            &:last-child{
                color: rgba(31,25,27,.4);
            }
        }
    }

    .container{
        display: flex;
        justify-content: space-between;
        margin-top: 24px;
        .container_left{
            .btn_group{
                margin-top: 16px;
                button{
                    margin-right: 12px;
                }
            }
        }

        .container_right{
            width: 540px;
            .seller{
                display: flex;
                flex-direction: column;
                .info{
                    display: flex;
                    align-items: center;
                    margin-top: 15px;
                    img{
                        margin-right: 8px;
                    }
                    p{
                        font-size: 14px;
                        color: rgba(31,25,27,.4);
                        a{
                            color: rgba(18,78,235,.8);
                        }
                    }

                    .close_time{
                        display: flex;
                        align-items: center;
                        height: 28px;
                        box-sizing: border-box;
                        border: 1px solid rgba(0,0,0,.2);
                        padding: 0 12px;
                        font-size: 14px;
                        font-weight: 400;
                        color: rgba(31,25,27,.5);
                        margin-left: 16px;
                    }
                }

                .desc{
                    margin-top: 20px;
                    p{
                        font-size: 14px;
                        line-height: 16.7px;
                        color: rgba(31,25,27,.7);
                        font-weight: 400;
                        margin-bottom: 10px;
                    }
                    span{
                        color: rgba(0,117,255,1);
                        font-weight: 500;
                        cursor: pointer;
                    }
                }
            }

            .bidInfo{
                display: flex;
                justify-content: space-between;
                margin-top: 32px;
                div{
                    h5{
                        font-size: 13px;
                        color: rgba(0,0,0,.6);
                        font-weight: 700;
                        margin-bottom: 8px;
                    }

                    h3{
                        font-size: 30px;
                        span{
                            font-size: 16px;
                            font-weight: 500;
                            color: rgba(31,25,27,.4);
                        }
                    }
                }
            }

            .btn_group{
                display: flex;
                justify-content: space-between;
                margin-top: 21px;
            }
        }
        
    }
`

export default function NewIndex() {
    const { poolId } = useParams()
    const { nftInfo, poolInfo } = use_FS_Hook(poolId)
    useEffect(() => {

        console.log(nftInfo, poolInfo)
    }, [nftInfo, poolInfo])

    return (
        <NewIndexStyled>
            <ul className='crumbs'>
                <li><span>Marketplase</span></li>
                <li><span>Fine Arts</span></li>
                <li><span>Digital Image Name</span></li>
            </ul>
            <div className="container">
                <div className="container_left">
                    <AutoStretchBaseWidthOrHeightImg src={nftInfo && nftInfo.fileurl} width={416} height={416} />
                    <div className="btn_group">
                        <OtherButton type='share' value='Share' />
                        <OtherButton type='like' value='Like' />
                    </div>
                </div>

                <div className="container_right">
                    <div className="sell_info">
                        <h3>Digital Image Name</h3>
                        <div className="seller">
                            <div className='info'>
                                <img src={icon_altAvatar} alt="" />
                                <p>Owned by <a href="http://">Mapache</a></p>

                                <div className="close_time">
                                    <img src={icon_time} alt="" />
                                    <span> Sale ends in 2 days</span>
                                </div>
                            </div>
                            <div className="desc">
                                <p>Hyper Geography is a website artwork created in 2011. The website features hundreds of found images collaged in a looping grid. The source images were collected from other blogs on Tumblr. Blogs that had a particularly strong...</p>
                                <span>Read more</span>

                            </div>
                        </div>
                        <div className="bidInfo">
                            <div>
                                <h5>Top Bid</h5>
                                <h3>0,0799 ETH <span>($36,52)</span></h3>
                            </div>

                            <div>
                                <h5>Amount</h5>
                                <h3>1 / 1</h3>
                            </div>
                        </div>
                        <div className="btn_group">
                            <Button primary width='262px' height='48px'>Place a bid</Button>
                            <Button width='262px' height='48px'>Buy now for 1 ETH</Button>
                        </div>
                    </div>
                </div>
            </div>
        </NewIndexStyled>
    )
}
