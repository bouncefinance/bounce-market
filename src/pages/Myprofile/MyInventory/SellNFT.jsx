import React, { useEffect, useState } from "react";
import styled from "styled-components";

import InstructionsDropdown from "./components/InstructionsDropdown";
import InputAmount from "./components/InputAmount";
import SelectDuration from "./components/SelectDuration";
import Summary from "./components/Summary";
import pic_NFT1 from "./assets/pic_NFT1.svg";
import useNftInfo from "@/utils/useToken";
import { useParams } from "react-router-dom";
import { useActiveWeb3React } from "@/web3";

export default function SellNFT() {
	const unitOptions = [
		{
			value: "ETH",
		},
		{
			value: "USDT",
		},
		{
			value: "USDC",
		},
		{
			value: "BNB",
		},
	];

	const duration_Options = [
		{
			value: 5,
		},
		{
			value: 15,
		},
		{
			value: 30,
		},
		{
			value: 90,
		},
	];

	const fees = "0.5";

	const { exportNftInfo } = useNftInfo()
	const { nftId } = useParams()
	const { active } = useActiveWeb3React()
	const [auctionType, setauctionType] = useState("setPrice");
	const [price, setPrice] = useState(0);
	const [priceUnit, set_PriceUnit] = useState("ETH");
	const [minimumBid, set_MinimumBid] = useState(0);
	const [minimumBid_Unit, set_MinimumBid_Unit] = useState("ETH");
	const [directPurchasePrice, set_DirectPurchasePrice] = useState(0);
	const [directPurchasePrice_Unit, set_directPurchasePrice_Unit] = useState("ETH");
	const [reservePrice, set_ReservePrice] = useState(0);
	const [reservePrice_Unit, set_ReservePrice_Unit] = useState("ETH");
	const [duration, setDuration] = useState(0);

	const [nftInfo, setNftId] = useState()

	useEffect(() => {
		if (!active) return
		setInitNftInfo(nftId)
		// eslint-disable-next-line
	}, [active])

	const setInitNftInfo = async (nftId) => {
		const info = await exportNftInfo(nftId)
		setNftId(info)
	}

	const render_LeftItems = (auctionType) => {
		switch (auctionType) {
			case "setPrice":
				return (
					<LeftItemsOnSetPrice>
						<InputAmount
							className="InputAmount Price"
							title="Unit Price"
							price={price}
							setPrice={setPrice}
							unit={priceUnit}
							setUnit={set_PriceUnit}
							notice="The price bidding starts at.It'll be publicly visible.You can manually accept bids above this value but below your reserve price if you want."
							gridArea="Price"
							options={unitOptions}
						/>


						<InstructionsDropdown
							className="Instructions"
							width="740px"
							layDownItems={[
								{
									value:
										"Bounce is decentralized,so it will never host your items...",
								},
								{
									value:
										"Bounce is decentralized,so it will never host your items...",
								},
								{
									value:
										"Bounce is decentralized,so it will never host your items...",
								},
							]}
						/>
					</LeftItemsOnSetPrice>
				);
			case "EnglishAuction":
				return (
					<LeftItemsOnEnglishAuction>
						<InputAmount
							className="InputAmount Minimum_bid"
							title="Minimum bid"
							price={minimumBid}
							setPrice={set_MinimumBid}
							unit={minimumBid_Unit}
							setUnit={set_MinimumBid_Unit}
							notice="The price bidding starts at.It'll be publicly visible.You can manually accept bids above this value but below your reserve price if you want."
							gridArea="Minimum_bid"
							options={unitOptions}
						/>
						<InputAmount
							className="InputAmount Direct_purchase_price"
							title="Direct purchase price"
							price={directPurchasePrice}
							setPrice={set_DirectPurchasePrice}
							unit={directPurchasePrice_Unit}
							setUnit={set_directPurchasePrice_Unit}
							notice="A direct transaction price can be set,that is,users can skip the bidding process and buy directly at this price.The direct transaction price must be greater than the Minimum Bid minimum starting price."
							gridArea="Direct_purchase_price"
							options={unitOptions}
						/>
						<InputAmount
							className="InputAmount Reserve_price"
							title="Reserve price"
							price={reservePrice}
							setPrice={set_ReservePrice}
							unit={reservePrice_Unit}
							setUnit={set_ReservePrice_Unit}
							notice="Setting a reserve price creates a hidden limit,If you receive no bids equal to or greater than your reserve,your auction will end with end without selling the item."
							gridArea="Reserve_price"
							options={unitOptions}
						/>
						<SelectDuration
							className="Expriration_Date"
							title="Expriration Date"
							notice="Your auction will automatically end at this time and the highest bidder will win.No need to cancel it!"
							setDuration={setDuration}
							gridArea="Expriration_Date"
							options={duration_Options}
						/>
						<InstructionsDropdown
							className="Instructions"
							width="740px"
							layDownItems={[
								{
									value:
										"Bounce is decentralized,so it will never host your items...",
								},
								{
									value:
										"Bounce is decentralized,so it will never host your items...",
								},
								{
									value:
										"Bounce is decentralized,so it will never host your items...",
								},
							]}
						/>
					</LeftItemsOnEnglishAuction>
				);
			default:
				return;
		}
	};

	const render_Summary = (auctionType) => {
		switch (auctionType) {
			case "setPrice":
				return (
					<Summary
						nftInfo={nftInfo}
						auctionType="setPrice"
						price={price}
						unit={priceUnit}
						fees={fees}
					/>
				);
			case "EnglishAuction":
				return (
					<Summary
						nftInfo={nftInfo}
						auctionType="EnglishAuction"
						price={reservePrice}
						unit={reservePrice_Unit}
						duration={duration}
						fees={fees}
					/>
				);
			default:
				return;
		}
	};

	return (
		<Page>
			<BreadcrumbNav>
				My Inventory / Digital Image Name /&nbsp;
				<span>
					Sell
					{/* {NFTName} */}
				</span>
			</BreadcrumbNav>
			<PageBody>
				<PageBodyLeft>
					<span className="str_SelectSellMethod">
						Select your sell method
					</span>

					<ButtonGroup>
						<button
							className={
								auctionType === "setPrice"
									? "setPrice active"
									: "setPrice"
							}
							onClick={() => {
								setauctionType("setPrice");
							}}
						>
							<span className="auctionType">Set Price</span>
							<span className="saleFeature">
								Sell at a fixed price
							</span>
						</button>

						<button
							className={
								auctionType === "EnglishAuction"
									? "EnglishAuction active"
									: "EnglishAuction"
							}
							onClick={() => {
								setauctionType("EnglishAuction");
							}}
						>
							<span className="auctionType">English Auction</span>
							<span className="saleFeature">
								Auction to the highest bidder
							</span>
						</button>
					</ButtonGroup>

					{render_LeftItems(auctionType)}
				</PageBodyLeft>

				<PageBodyRight>
					<img className="NFTImg" src={nftInfo && (nftInfo.fileurl || pic_NFT1)} alt="" />
					{render_Summary(auctionType)}
				</PageBodyRight>
			</PageBody>
		</Page>
	);
}





const Page = styled.div`
	width: 1100px;
	margin: 0 auto 110px auto;
	display: grid;
	grid-template-rows: 86px 1fr;
`;

const BreadcrumbNav = styled.div`
	font-family: IBM Plex Mono;
	font-style: normal;
	font-weight: 500;
	font-size: 12px;
	line-height: 16px;
	display: flex;
	color: #1f191b;
	opacity: 0.8;

	padding-top: 24px;
	padding-bottom: 44px;

	box-sizing: border-box;

	span {
		opacity: 0.4;
	}
`;

const PageBody = styled.div`
	width: 1100px;
	display: grid;
	grid-template-columns: 1fr 296px;
	column-gap: 60px;
`;

const PageBodyLeft = styled.div`
	display: grid;
	grid-template-rows: 25px 126px 1fr;
	grid-template-areas:
		"str_SelectSellMethod"
		"ButtonGroup"
		"LeftItemsOnSetPrice";

	span.str_SelectSellMethod {
		font-family: Helvetica Neue;
		font-style: normal;
		font-weight: bold;
		font-size: 12px;
		line-height: 15px;
		text-transform: capitalize;
		color: #1f191b;

		grid-area: str_SelectSellMethod;
	}
`;

const ButtonGroup = styled.div`
	grid-area: ButtonGroup;

	display: grid;
	grid-template-columns: 360px 360px;
	column-gap: 20px;

	button {
		background: #ffffff;
		border: 1px solid rgba(0, 0, 0, 0.2);
		box-sizing: border-box;
		cursor: pointer;
		width: 360px;
		height: 88px;

		display: grid;
		grid-template-rows: 45px 25px 1fr;
		align-items: end;

		.auctionType {
			font-family: Optima;
			font-style: normal;
			font-weight: bold;
			font-size: 22px;
			line-height: 27px;
			color: #000000;
		}

		.saleFeature {
			font-family: Helvetica Neue;
			font-style: normal;
			font-weight: normal;
			font-size: 12px;
			line-height: 124%;
			color: #1f191b;
			opacity: 0.8;
		}
	}

	button.active {
		border: 1px solid #000000;
		box-sizing: border-box;
		box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
	}
`;

/* LeftItemsOnSetPrice */
const LeftItemsOnSetPrice = styled.div`
	display: grid;
	align-items: center;
	grid-template-rows: 147px 38px 1fr;
	grid-template-areas:
		"Price"
		"."
		"Instructions";

	.Instructions {
		grid-area: Instructions;
		align-self: start;
	}
`;

/* LeftItemsOnEnglishAuction */
const LeftItemsOnEnglishAuction = styled.div`
	display: grid;
	align-items: center;
	grid-template-rows: 147px 38px 147px 38px 147px 38px 147px 38px 1fr;
	grid-template-areas:
		"Minimum_bid"
		"."
		"Direct_purchase_price"
		"."
		"Reserve_price"
		"."
		"Expriration_Date"
		"."
		"Instructions";

	.Instructions {
		grid-area: Instructions;
		align-self: start;
	}

	/* 重设过期时间的样式 */
	.Expriration_Date {
		img.icon {
			display: none;
		}

		input {
			display: none;
		}

		li img {
			display: none;
		}

		li.option {
			padding-right: 0;
			padding-left: 0;
		}
	}
`;

/* Right */
const PageBodyRight = styled.div`
	display: grid;
	align-items: center;
	grid-template-rows: 296px 1fr;
	row-gap: 20px;
	grid-template-areas:
		"NFTImg"
		"Summary";

	img.NFTImg {
		width: 296px;
		height: 296px;
		grid-area: NFTImg;
	}
`;