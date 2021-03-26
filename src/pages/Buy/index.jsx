import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";

import BreadcrumbNav from "./components/BreadcrumbNav";
import { Button } from "@components/UI-kit";
import NFTInfoDropdown from "./components/NFTInfoDropdown";
import { DetailsContent, TokenInfoContent } from "./components/DropdownContent";
import OffersTable from "./components/OffersTable";
import TradeTable from "./components/TradeTable";
import BounceFixedSwapNFT from '@/web3/abi/BounceFixedSwapNFT.json'

import icon_altAvatar from "./assets/icon_altAvatar.svg";
import useNftInfo from "@/utils/useToken";
import { getContract, useActiveWeb3React } from "@/web3";
import { getFixedSwapNFT } from "@/web3/address_list/contract";
import useTransferModal from "@/web3/useTransferModal";
import useHook from "./useHook";
import { weiMul, weiToNum } from "@/utils/useBigNumber";

const NFTType = "Images";
const NFTName = "Digital Image Name";



function Buy() {
	// const history = useHistory();
	const { poolId } = useParams()
	const { exportNftInfo } = useNftInfo()
	const { showTransferByStatus } = useTransferModal()
	const { active, library, account, chainId } = useActiveWeb3React()
	const [nftInfo, setNftInfo] = useState({})
	const { poolsInfo } = useHook(poolId)

	useEffect(() => {
		if (!active || poolsInfo === {}) return
		initShowNftInfo()
		// eslint-disable-next-line
	}, [active, poolsInfo])

	const initShowNftInfo = async () => {
		const info = await exportNftInfo(poolsInfo.tokenId)
		setNftInfo(info)
	}


	const handelBid = async () => {
		console.log(poolId, poolsInfo.amountTotal0)
		if (nftInfo.standard === 1) {
			const BounceFixedSwapNFT_CT = getContract(library, BounceFixedSwapNFT.abi, getFixedSwapNFT(chainId))

			BounceFixedSwapNFT_CT.methods.swap(poolId, poolsInfo.amountTotal0)
				.send({ from: account, value: poolsInfo.amountTotal1 })
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
		} else if (nftInfo.standard === 2) {
			alert('bid 1155')
		}
	}

	return (
		<Page>
			<BreadcrumbNav NFTType={NFTType} NFTName={NFTName} />

			<PageMiddle>
				<PageMiddleLeft>
					<img className="NFTImg" src={nftInfo.fileurl} alt="" />

					<Description>
						<span className="description">Description</span>

						<span className="descriptionContent">
							{/* {descriptionContent} */}
							{nftInfo.description}
						</span>
					</Description>

					<Dropdowns>
						<NFTInfoDropdown
							title="Details"
							content={<DetailsContent generatorName={nftInfo.ownername || 'Anonymity'} />}
						/>

						<NFTInfoDropdown
							title="Token Info"
							content={
								<TokenInfoContent
									TokenID={nftInfo.id}
									Total={nftInfo.supply}
								/>
							}
						/>
					</Dropdowns>
				</PageMiddleLeft>

				<PageMiddleRight>
					<span className="NFTName">{nftInfo.itemname}</span>

					<div className="ShowOwner">
						<img src={icon_altAvatar} alt="" />
						<span className="str_Ownedby">Owned by</span>
						<Link to={"/"}>{nftInfo.ownername || 'Anonymity'}{/* {ownerName} */}</Link>
					</div>

					<span className="SaleEndDay">
						Sale ends in 5 days(March 23,2021 at 11:59am CST)
					</span>

					<span className="BidStatus">
						Top bid--Reserve price not met.
					</span>

					<div className="TopBidStatus">
						<span className="ETHPrice">{poolsInfo.token1 && weiToNum(poolsInfo.amountTotal1, poolsInfo.token1.decimals)} {poolsInfo.token1 && poolsInfo.token1.symbol}</span>
						<span className="USDPrice">{poolsInfo.token1 && `$ ${weiMul(poolsInfo.token1.price, weiToNum(poolsInfo.amountTotal1, poolsInfo.token1.decimals))}`}</span>
					</div>

					<span className="BorderBottomGap"></span>

					<div className="ButtonGroup">
						<Button
							primary
							value={poolsInfo.status && poolsInfo.status === 'Live' ? 'Place Bid' : poolsInfo.status === 'Filled' ? 'Sold Out' : 'Loading Status ...'}
							disabled={poolsInfo.status !== 'Live'}
							onClick={handelBid}
						/>
						{/* 英式拍 一口价 */}
						{poolsInfo.poolType === 'English-Auction' && <Button value="Buy New For 1 ETH ransfer" />}
					</div>

					<span className="str_Offers">Offers</span>

					<OffersTable />
				</PageMiddleRight>
			</PageMiddle>

			<TradingHistory>
				<span className="str_TradingHistory">Trading History</span>
				<TradeTable />
			</TradingHistory>
		</Page>
	);
}

export default Buy;


const Page = styled.div`
	width: 1096px;
	margin: 0 auto 55px auto;

	display: grid;
	grid-template-rows: 93px min-content 382px;
	grid-template-areas:
		"BreadcrumbNav"
		"PageMiddle"
		"TradingHistory";
`;

const PageMiddle = styled.div`
	grid-area: PageMiddle;

	box-sizing: border-box;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);

	display: grid;
	grid-template-columns: 416px 650px;
    grid-template-rows: min-content;
	column-gap: 30px;
	grid-template-areas: "PageMiddleLeft PageMiddleRight";
`;

const PageMiddleLeft = styled.div`
	grid-area: PageMiddleLeft;

    display: grid;
	grid-template-rows: 416px 89px min-content;
	grid-template-areas:
		"NFTImg"
		"Description"
		"Dropdowns";

	img.NFTImg {
		width: 416px;
		height: 416px;
	}
`;

const Description = styled.div`
	grid-area: Description;

	display: grid;
	grid-template-rows: 28px 37px;
	grid-template-areas:
		"DescriptionTitle"
		"DescriptionContent";

	span.description {
		font-family: IBM Plex Mono;
		font-style: normal;
		font-weight: 500;
		font-size: 12px;
		line-height: 16px;
		display: flex;
		align-items: center;
		color: #1f191b;
		opacity: 0.5;

		grid-area: DescriptionTitle;

        padding-top: 22px;
        padding-bottom: 14px;
	}

	/* DescriptionContent */
	span.descriptionContent {
		font-family: Helvetica Neue;
		font-style: normal;
		font-weight: normal;
		font-size: 16px;
		line-height: 19px;
		display: flex;
		align-items: center;
		color: #1f191b;

		grid-area: DescriptionContent;
	}
`;

const Dropdowns = styled.div`
    grid-area: Dropdowns;
`

const PageMiddleRight = styled.div`
	grid-area: PageMiddleRight;

	display: grid;
	grid-template-rows: 59px 20px 24px 17px 32px 64px 48px 70px 1fr;
	grid-template-areas:
		"NFTName"
		"ShowOwner"
		"SaleEndDay"
		"BorderBottomGap"
		"BidStatus"
		"TopBidPrice"
		"ButtonGroup"
		"str_Offers"
		"OffersTable";

	span.NFTName {
		font-family: Optima;
		font-style: normal;
		font-weight: bold;
		font-size: 34px;
		line-height: 41px;
		color: #000000;

		grid-area: NFTName;

        padding-top: 7px;
        padding-bottom: 10px;
	}

	.ShowOwner {
        grid-area: ShowOwner;

		display: flex;
		align-items: center;

		span.str_Ownedby {
			margin-left: 8px;

			font-family: IBM Plex Mono;
			font-style: normal;
			font-weight: 500;
			font-size: 12px;
			line-height: 16px;
			display: flex;
			align-items: center;
			color: #1f191b;
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
			color: #124eeb;
			opacity: 0.8;

			margin-left: 6px;
		}
	}

	span.SaleEndDay {
		font-family: IBM Plex Mono;
		font-style: normal;
		font-weight: 500;
		font-size: 12px;
		line-height: 16px;
		display: flex;
		align-items: center;
		color: #1f191b;
		opacity: 0.4;

        padding-top: 8px;

		grid-area: SaleEndDay;
	}

	span.BidStatus {
		font-family: IBM Plex Mono;
		font-style: normal;
		font-weight: 500;
		font-size: 12px;
		line-height: 16px;
		display: flex;
		align-items: center;
		color: #1f191b;
		opacity: 0.4;

		grid-area: BidStatus;

        padding-top: 16px;
        padding-bottom: 12px;
	}

	.TopBidStatus {
		grid-area: TopBidPrice;
		padding-top: 12px;
		padding-bottom: 20px;

		display: grid;
		grid-template-columns: auto auto;
		grid-template-areas: "ETHPrice USDPrice";
		justify-content: start;
		align-items: end;
		column-gap: 8px;

		span.ETHPrice {
			font-family: Optima;
			font-style: normal;
			font-weight: bold;
			font-size: 28px;
			line-height: 34px;
			color: #000000;

			grid-area: ETHPrice;
		}

		span.USDPrice {
			font-family: Helvetica Neue;
			font-style: normal;
			font-weight: 500;
			font-size: 16px;
			line-height: 130.5%;
			color: #1f191b;
			opacity: 0.4;

			grid-area: USDPrice;
		}
	}

	.BorderBottomGap {
		box-sizing: border-box;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);

		grid-area: BorderBottomGap;
	}

	.ButtonGroup {
		grid-area: ButtonGroup;

		display: grid;
		grid-template-columns: 1fr 1fr;
		column-gap: 20px;

		button {
			width: 315px;
			height: 48px;
		}
	}

	span.str_Offers {
		font-family: IBM Plex Mono;
		font-style: normal;
		font-weight: 500;
		font-size: 12px;
		line-height: 16px;
		display: flex;
		align-items: center;
		color: #000000;

		grid-area: str_Offers;

		padding-top: 30px;
		padding-bottom: 24px;
	}
`;

const TradingHistory = styled.div`
	grid-area: TradingHistory;

	display: grid;
	grid-template-rows: 70px 1fr;
	grid-template-areas:
		"str_TradingHistory"
		"TradeTable";

	span.str_TradingHistory {
		grid-area: str_TradingHistory;

		font-family: IBM Plex Mono;
		font-style: normal;
		font-weight: 500;
		font-size: 12px;
		line-height: 16px;
		display: flex;
		color: #000000;

		padding-top: 30px;
		padding-bottom: 24px;
	}
`;