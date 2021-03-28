import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import styled from 'styled-components'
import use_FS_Hook from './use_FS_Hook'
import { OtherButton, Button } from '@components/UI-kit'
import { AutoStretchBaseWidthOrHeightImg } from "../component/Other/autoStretchBaseWidthOrHeightImg";
import BounceFixedSwapNFT from '@/web3/abi/BounceFixedSwapNFT.json'
import { getContract, useActiveWeb3React } from "@/web3";
import useTransferModal from "@/web3/useTransferModal";
import { getFixedSwapNFT } from "@/web3/address_list/contract";
import NewPullDown from './components/NewPullDown'
import { NumberInput } from '@components/UI-kit'

import icon_altAvatar from './assets/icon_altAvatar.svg'
import icon_time from './assets/icon_time.svg'
import { numToWei, weiDiv, weiMul, weiToNum } from '@/utils/useBigNumber';


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


            .pullInfoBox{
                margin-top: 32px;
            }
        }
        
    }
`

export default function NewIndex() {
    const { library, account, chainId, active } = useActiveWeb3React()
    const { poolId } = useParams()
    const { showTransferByStatus } = useTransferModal()
    const { nftInfo, poolInfo } = use_FS_Hook(poolId)
    const [isLoading, setIsLoading] = useState(false)
    const [btnText, setBtnText] = useState('Place a bid')
    const [amount, setAmount] = useState(1)

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
                    // setBidStatus(successVotedStatus)
                    showTransferByStatus('successVotedStatus')
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
                    // setBidStatus(successVotedStatus)
                    showTransferByStatus('successVotedStatus')
                })
                .on('error', (err, receipt) => {
                    // setBidStatus(errorStatus)
                    showTransferByStatus('errorStatus')
                })
        }
    }

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
                        <h3>{nftInfo.itemname || 'Name Is Loading ...'}</h3>
                        <div className="seller">
                            <div className='info'>
                                <img src={icon_altAvatar} alt="" />
                                <p>Owned by <a href="http://">{nftInfo.ownername || 'Anonymity'}</a></p>

                                {poolInfo.poolType === 'EA' && <div className="close_time">
                                    <img src={icon_time} alt="" />
                                    <span> Sale ends in 2 days</span>
                                </div>}
                            </div>
                            <div className="desc">
                                <p>{nftInfo.description || 'description Is Loading ...'}</p>
                                <span>Read more</span>

                            </div>
                        </div>

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
                            {poolInfo.poolType === 'English-Auction' && <Button width='262px' height='48px'>Buy now for 1 ETH</Button>}
                        </div>
                        <div className="pullInfoBox">

                            <NewPullDown title='Offers'>

                            </NewPullDown>
                        </div>
                    </div>
                </div>
            </div>
        </NewIndexStyled>
    )
}
