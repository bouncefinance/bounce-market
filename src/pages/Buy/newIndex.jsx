import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import styled from 'styled-components'
import use_FS_Hook from './use_FS_Hook'
import use_EA_Hook from './use_EA_Hook'
import { OtherButton, Button } from '@components/UI-kit'
import { AutoStretchBaseWidthOrHeightImg } from "../component/Other/autoStretchBaseWidthOrHeightImg";
import BounceFixedSwapNFT from '@/web3/abi/BounceFixedSwapNFT.json'
import BounceEnglishAuctionNFT from '@/web3/abi/BounceEnglishAuctionNFT.json'
import { getContract, useActiveWeb3React } from "@/web3";
import useTransferModal from "@/web3/useTransferModal";
import { getFixedSwapNFT, getEnglishAuctionNFT } from "@/web3/address_list/contract";
import NewPullDown from './components/NewPullDown'
import { NumberInput } from '@components/UI-kit'

import icon_altAvatar from './assets/icon_altAvatar.svg'
import icon_time from './assets/icon_time.svg'
import { numToWei, weiDiv, weiMul, weiToNum } from '@/utils/useBigNumber';
import TradingHistory from './components/TradingHistory';


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
                flex-wrap:wrap;
                justify-content: space-between;
                margin-top: 21px;
            }


            .pullInfoBox{
                margin: 32px 0px;
            }
        }
        
    }

    .token-info{
        >div{
            margin-bottom: 12px;
            font-size: 12px;
            >p{
                :first-child{
                    color: #000;
                }
                :last-child{
                    color: rgba(31,25,27,0.5);
                }
            }
        }
    }
`

export default function NewIndex() {
    const { library, account, chainId, active } = useActiveWeb3React()
    const { poolId, aucType } = useParams()
    const { showTransferByStatus } = useTransferModal()
    const { nftInfo, poolInfo } = aucType === 'fixed-swap' ? use_FS_Hook(poolId) : use_EA_Hook(poolId)
    const [isLoading, setIsLoading] = useState(false)
    const [btnText, setBtnText] = useState('Place a bid')
    const [amount, setAmount] = useState(1)
    const [bidPrice, setBidPrice] = useState()
    const [minPrice, setMinPrice] = useState(0)

    useEffect(() => {

        // console.log(nftInfo, poolInfo)
        if (!active || !nftInfo.contractaddress || !poolInfo.poolType) {
            setIsLoading(true)
            setBtnText('loading ...')
            return
        }

        if (poolInfo.status === 'Live') {
            setIsLoading(false)
            setBtnText('Place a bid')
        } else {
            setBtnText('Sold Out')
        }
        // eslint-disable-next-line
    }, [active, nftInfo, poolInfo])

    useEffect(() => {
        console.log(poolInfo)
        if (poolInfo.poolType === 'EA' && poolInfo.status === 'Live') {
            if (poolInfo.bidCountP === '0') {
                setMinPrice(weiToNum(poolInfo.amountMin1))
            } else {
                const price = weiMul(weiToNum(poolInfo.amountMin1), 1.05)
                setMinPrice(price)
            }
        }
        // eslint-disable-next-line
    }, [poolInfo])


    const handelBid = async () => {
        setIsLoading(true)
        if (poolInfo.nftType === '0') {
            const BounceFixedSwapNFT_CT = getContract(library, BounceFixedSwapNFT.abi, getFixedSwapNFT(chainId))

            BounceFixedSwapNFT_CT.methods.swap(poolId, poolInfo.amountTotal0)
                .send({ from: account, value: poolInfo.amountTotal1 })
                .on('transactionHash', hash => {
                    // setBidStatus(pendingStatus)
                    showTransferByStatus('pendingStatus')
                })
                .on('receipt', async (_, receipt) => {
                    // console.log('bid fixed swap receipt:', receipt)
                    // setBidStatus(successStatus)
                    showTransferByStatus('successStatus')
                })
                .on('error', (err, receipt) => {
                    // setBidStatus(errorStatus)
                    showTransferByStatus('errorStatus')
                })
        } else {
            const BounceFixedSwapNFT_CT = getContract(library, BounceFixedSwapNFT.abi, getFixedSwapNFT(chainId))

            const _amount0 = amount
            const _amount1 = numToWei(weiMul(weiDiv(weiToNum(poolInfo.amountTotal1, poolInfo.token1.decimals), poolInfo.amountTotal0), amount))

            // console.log(_amount0, _amount1)

            BounceFixedSwapNFT_CT.methods.swap(poolId, _amount0)
                .send({ from: account, value: _amount1 })
                .on('transactionHash', hash => {
                    // setBidStatus(pendingStatus)
                    showTransferByStatus('pendingStatus')
                })
                .on('receipt', async (_, receipt) => {
                    // console.log('bid fixed swap receipt:', receipt)
                    // setBidStatus(successStatus)
                    showTransferByStatus('successStatus')
                })
                .on('error', (err, receipt) => {
                    // setBidStatus(errorStatus)
                    showTransferByStatus('errorStatus')
                })
        }
    }


    const handelEnglishAuctionBid = async (amountMax1) => {
        setIsLoading(true)
        const BounceEnglishAuctionNFT_CT = getContract(library, BounceEnglishAuctionNFT.abi, getEnglishAuctionNFT(chainId))

        const _amount1 = amountMax1 || numToWei(bidPrice)
        console.log(_amount1)

        BounceEnglishAuctionNFT_CT.methods.bid(poolId, _amount1)
            .send({ from: account, value: _amount1 })
            .on('transactionHash', hash => {
                // setBidStatus(pendingStatus)
                showTransferByStatus('pendingStatus')
            })
            .on('receipt', async (_, receipt) => {
                // console.log('bid fixed swap receipt:', receipt)
                // setBidStatus(successStatus)
                showTransferByStatus('successStatus')
            })
            .on('error', (err, receipt) => {
                // setBidStatus(errorStatus)
                showTransferByStatus('errorStatus')
            })
    }

    const handelFixedSwapCancel = async () => {
        const BounceFixedSwapNFT_CT = getContract(library, BounceFixedSwapNFT.abi, getFixedSwapNFT(chainId))

        BounceFixedSwapNFT_CT.methods.cancel(poolId)
            .send({ from: account })
            .on('transactionHash', hash => {
                // setBidStatus(pendingStatus)
                showTransferByStatus('pendingStatus')
            })
            .on('receipt', async (_, receipt) => {
                // console.log('bid fixed swap receipt:', receipt)
                // setBidStatus(successStatus)
                showTransferByStatus('successStatus')
            })
            .on('error', (err, receipt) => {
                // setBidStatus(errorStatus)
                showTransferByStatus('errorStatus')
            })
    }

    const bidderClaim = async () => {
        const BounceEnglishAuctionNFT_CT = getContract(library, BounceEnglishAuctionNFT.abi, getEnglishAuctionNFT(chainId))
        BounceEnglishAuctionNFT_CT.methods.bidderClaim(poolId)
            .send({ from: account })
            .on('transactionHash', hash => {
                // setBidStatus(pendingStatus)
                showTransferByStatus('pendingStatus')
            })
            .on('receipt', async (_, receipt) => {
                // console.log('bid fixed swap receipt:', receipt)
                // setBidStatus(successStatus)
                showTransferByStatus('successStatus')
            })
            .on('error', (err, receipt) => {
                // setBidStatus(errorStatus)
                showTransferByStatus('errorStatus')
            })
    }

    const renderByAucType = () => {
        if (aucType === 'fixed-swap') {
            return <>
                <NumberInput
                    className='input_amount'
                    title='Buy Amount'
                    width='100%'
                    isInteger={true}
                    maxVal={parseInt(poolInfo.amountTotal0) - parseInt(poolInfo.swappedAmount0P)}
                    minVal={1}
                    defaultValue={1}
                    onValChange={(val) => {
                        setAmount(val)
                    }}
                    disabled={poolInfo.nftType === '1' && false}
                />

                <div className="bidInfo">
                    <div>
                        <h5>Top Bid</h5>
                        <h3>{poolInfo.token1 && weiMul(weiDiv(weiToNum(poolInfo.amountTotal1, poolInfo.token1.decimals), poolInfo.amountTotal0), amount)} {poolInfo.token1 && poolInfo.token1.symbol}
                            <span>{poolInfo.token1 && ` ( $ ${weiMul(poolInfo.token1.price, weiMul(weiDiv(weiToNum(poolInfo.amountTotal1, poolInfo.token1.decimals), poolInfo.amountTotal0), amount))} ) `}</span></h3>
                    </div>

                    <div>
                        <h5>Amount</h5>
                        <h3>{(poolInfo.amountTotal0 && poolInfo.swappedAmount0P) ?
                            `${parseInt(poolInfo.amountTotal0) - parseInt(poolInfo.swappedAmount0P)} / ${poolInfo.amountTotal0}` : '0 / 0'}</h3>
                    </div>
                </div>
                <div className="btn_group">
                    <Button primary width='262px' height='48px' disabled={isLoading || poolInfo.status !== 'Live'}
                        onClick={handelBid}
                    >{btnText}</Button>
                </div>

                {poolInfo.status === 'Live' && poolInfo.creator === account && !poolInfo.creatorCanceledP &&
                    < Button onClick={() => {
                        handelFixedSwapCancel()
                    }} width='100%' height='48px' marginTop={'12px'} >
                        Cancel The Deity
                    </Button>}

                {poolInfo.status === 'Live' && poolInfo.creator === account && poolInfo.creatorCanceledP &&
                    < Button width='100%' height='48px' disabled marginTop={'12px'} >
                        This transaction has been cancelled
                    </Button>}
            </>
        } else if (aucType === 'english-auction') {
            return <>


                <div className="bidInfo">
                    <div>
                        <h5>Asking price</h5>
                        <h3>{poolInfo.token1 && weiToNum(poolInfo.amountMin1, poolInfo.token1.decimals)} {poolInfo.token1 && poolInfo.token1.symbol}
                            <span>{poolInfo.token1 && ` ( $ ${weiMul(poolInfo.token1.price, weiToNum(poolInfo.amountMin1, poolInfo.token1.decimals))} ) `}</span></h3>
                    </div>

                    <div>
                        <h5>Total Amount</h5>
                        <h3>{poolInfo.tokenAmount0 && `${poolInfo.tokenAmount0}`}</h3>
                    </div>
                </div>

                <div className="bidInfo">
                    <div>
                        <h5>Current Price</h5>
                        <h3>{poolInfo.currentBidderAmount && weiToNum(poolInfo.currentBidderAmount, poolInfo.token1.decimals)} {poolInfo.token1 && poolInfo.token1.symbol}
                            <span>{poolInfo.token1 && ` ( $ ${weiMul(poolInfo.token1.price, weiToNum(poolInfo.currentBidderAmount, poolInfo.token1.decimals))} ) `}</span></h3>
                    </div>

                    <div>
                        <h5>Current Round</h5>
                        <h3>{poolInfo.bidCountP && `${poolInfo.bidCountP}`}</h3>
                    </div>
                </div>

                <NumberInput
                    className='input_amount'
                    title={`I'll make an offer`}
                    width='100%'
                    maxVal={poolInfo.token1 && poolInfo.token1.balance}
                    // minVal={minPrice}
                    defaultValue={minPrice}
                    onValChange={(val) => {
                        setBidPrice(val)
                    }}
                    afterFix={poolInfo.token1 && `Balance: ${poolInfo.token1.balance} ${poolInfo.token1.symbol}`}
                    disabled={isLoading || poolInfo.status !== 'Live'}
                />

                <div className="btn_group">
                    <Button primary width='262px' height='48px' disabled={isLoading || poolInfo.status !== 'Live'}
                        onClick={() => { handelEnglishAuctionBid() }}
                    >{btnText}</Button>
                    {poolInfo.amountMax1 && <Button width='262px' disabled={isLoading || poolInfo.status !== 'Live'} height='48px' onClick={() => {
                        handelEnglishAuctionBid(poolInfo.amountMax1)
                    }}>Buy now for {weiToNum(poolInfo.amountMax1)} ETH</Button>}
                    {poolInfo.status === 'Close' && poolInfo.currentBidderP === account && !poolInfo.myClaimedP &&
                        < Button onClick={() => {
                            bidderClaim()
                        }} width='100%' height='48px' primary marginTop={'12px'}>
                            Claim Bid NFT
                    </Button>}

                    {poolInfo.status === 'Close' && poolInfo.currentBidderP === account && poolInfo.myClaimedP &&
                        < Button onClick={() => {
                            bidderClaim()
                        }} width='100%' height='48px' primary marginTop={'12px'} disabled>
                            You have successfully bid and claimed
                    </Button>}

                    {poolInfo.status === 'Close' && poolInfo.creator === account && !poolInfo.creatorClaimedP &&
                        < Button onClick={() => {
                            bidderClaim()
                        }} width='100%' height='48px' primary marginTop={'12px'}>
                            Claim {poolInfo.currentBidderAmount && weiToNum(poolInfo.currentBidderAmount, poolInfo.token1.decimals)} {poolInfo.token1 && poolInfo.token1.symbol}
                        </Button>}

                    {poolInfo.status === 'Close' && poolInfo.creator === account && poolInfo.creatorClaimedP &&
                        < Button onClick={() => {
                            bidderClaim()
                        }} width='100%' height='48px' primary marginTop={'12px'} disabled>
                            You have successfully received {poolInfo.currentBidderAmount && weiToNum(poolInfo.currentBidderAmount, poolInfo.token1.decimals)} {poolInfo.token1 && poolInfo.token1.symbol}
                        </Button>}
                </div>
            </>
        }
    }

    return (
        <NewIndexStyled>
            <ul className='crumbs'>
                <li><span>Marketplace</span></li>
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
                        <h3>{nftInfo.itemname || 'Name Is Loading ...'}</h3>
                        <div className="seller">
                            <div className='info'>
                                <img src={icon_altAvatar} alt="" />
                                <p>Owned by <a href="http://">{nftInfo.ownername || 'Anonymity'}</a></p>

                                {aucType === 'english-auction' && <div className="close_time">
                                    <img src={icon_time} alt="" />
                                    <span>{poolInfo.showTime}</span>
                                </div>}
                            </div>
                            <div className="desc">
                                <p>{nftInfo.description || 'description Is Loading ...'}</p>
                                <span>Read more</span>

                            </div>
                        </div>

                        {renderByAucType()}
                        <div className="pullInfoBox">

                            <NewPullDown open={true} title='Offers'>
                                <OffersStyled>
                                    <div className="Offers flex flex-space-x">
                                        <div className="flex Offers-info">
                                            <p className="name">@Scarlett_vfx0</p>
                                            <p className="time">March 18, 2021 at 4:14am</p>
                                        </div>
                                        <div className="Offers-price"><span>1.0 ETH</span><span>($909.98)</span></div>
                                    </div>
                                    <div className="Offers flex flex-space-x">
                                        <div className="flex Offers-info">
                                            <p className="name">@Scarlett_vfx0</p>
                                            <p className="time">March 18, 2021 at 4:14am</p>
                                        </div>
                                        <div className="Offers-price"><span>1.0 ETH</span><span>($909.98)</span></div>
                                    </div>
                                </OffersStyled>
                            </NewPullDown>
                            <NewPullDown open={false} title='Token Info'>
                                <div className="token-info">
                                    <div className="flex flex-space-x">
                                        <p>Token Contact Address</p>
                                        <p style={{ color: '#124EEB' }}>0x33a9b7ed8c71c...2976</p>
                                    </div>
                                    <div className="flex flex-space-x">
                                        <p>Token Symbol</p>
                                        <p>CKIE</p>
                                    </div>
                                    <div className="flex flex-space-x">
                                        <p>Token ID</p>
                                        <p>#123456</p>
                                    </div>
                                </div>
                            </NewPullDown>
                            <NewPullDown open={false} title='External link'>
                                <div>--</div>
                            </NewPullDown>
                            <NewPullDown open={false} title='Trading History'>
                                <TradingHistory rows={[
                                    { Event: 'Buy', Quantity: 159, Price: [`1.0 ETH`, `($909.98)`], From: `@Scarlett_vfaaa`, To: `@Scarlett_vfaaaaa`, Date: `1 days ago` },
                                    { Event: 'Bid', Quantity: 159, Price: [`1.0 ETH`, `($909.98)`], From: `@Scarlett_vfaaa`, To: `@Scarlett_vf`, Date: `1 days ago` },
                                    { Event: 'Transfer', Quantity: 159, Price: [`1.0 ETH`, `($909.98)`], From: `@Scarlett_vf`, To: `@Scarlett_vf`, Date: `1 days ago` },
                                    { Event: 'Created', Quantity: 159, Price: [`1.0 ETH`, `($909.98)`], From: `@Scarlett_vf`, To: `@Scarlett_vf`, Date: `1 days ago` },
                                ]} />
                            </NewPullDown>
                        </div>
                    </div>
                </div>
            </div>
        </NewIndexStyled>
    )
}


const OffersStyled = styled.div`
font-family: Helvetica Neue;
line-height: 15px;
.Offers{
    margin-top: 12px;
    :first-child{
        margin-top: 0px;
    }
    .Offers-info{
        font-size: 12px;
        .name{
            font-weight: 550;
            color: #1F191B;
        }
        .time{
            margin-left: 27px;
            color: rgba(0,0,0,.5);
        }
    }
    .Offers-price{
        color: rgba(0,0,0,.5);
        :nth-child(1){
            color: #1F191B;
        }
    }
}
`