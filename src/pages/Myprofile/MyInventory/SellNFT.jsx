import React, { useEffect, useState } from "react";
import styled from "styled-components";

import InstructionsDropdown from "./components/InstructionsDropdown";
import InputPrice from "./components/InputPrice";
import SelectDuration from "./components/SelectDuration";
import Summary from "./components/Summary";
import pic_NFT1 from "./assets/pic_NFT1.svg";
import useNftInfo from "@/utils/useToken";
import { useParams } from "react-router-dom";
import { useActiveWeb3React } from "@/web3";
import { AutoStretchBaseWidthOrHeightImg } from "@/pages/component/Other/autoStretchBaseWidthOrHeightImg";

export default function SellNFT () {
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

	const fees = "1";
	const { exportNftInfo } = useNftInfo();
	const { nftId } = useParams();
	const { active } = useActiveWeb3React();
	const [auctionType, setauctionType] = useState("setPrice");

	const [amount, setAmount] = useState(0);
	const [price, setPrice] = useState(0);
	const [priceUnit, set_PriceUnit] = useState("ETH");
	const [minimumBid, set_MinimumBid] = useState(0);
	// const [maxmumBid_Unit, set_MaxmumBid_Unit] = useState("ETH");
	// const [maximumBid, set_MaximumBid] = useState(0);
	// const [maximumBid_Unit, set_MaximumBid_Unit] = useState("ETH");
	const [minimumBid_Unit, set_MinimumBid_Unit] = useState("ETH");
	const [directPurchasePrice, set_DirectPurchasePrice] = useState(0);
	const [directPurchasePrice_Unit, set_directPurchasePrice_Unit] = useState("ETH");
	const [reservePrice, set_ReservePrice] = useState(0);
	const [reservePrice_Unit, set_ReservePrice_Unit] = useState("ETH");
	const [duration, setDuration] = useState(0);

	const [nftInfo, setNftId] = useState();

	useEffect(() => {
		if (!active) return;
		setInitNftInfo(nftId);
		// eslint-disable-next-line
	}, [active]);

	const setInitNftInfo = async (nftId) => {
		const info = await exportNftInfo(nftId);
		// console.log(info); 
		setNftId(info);
	};

	useEffect(() => {
		if((directPurchasePrice && (directPurchasePrice.charAt(directPurchasePrice.length - 1) === '.'))  || 
		(reservePrice && (reservePrice.charAt(reservePrice.length - 1) === '.')) || 
		(minimumBid && (minimumBid.charAt(minimumBid.length - 1) === '.')) ){
			return false;
		}
		
		if(directPurchasePrice && reservePrice && parseFloat(reservePrice) > parseFloat(directPurchasePrice) ){
			set_ReservePrice(directPurchasePrice);
		}
		if(reservePrice && minimumBid && parseFloat(minimumBid) > parseFloat(reservePrice)){
			set_MinimumBid(reservePrice);
		}
		if(directPurchasePrice && minimumBid && parseFloat(minimumBid) > parseFloat(directPurchasePrice)){
			set_DirectPurchasePrice(reservePrice);
		}

	}, [directPurchasePrice,reservePrice,minimumBid]);

	const render_LeftItems = (auctionType) => {
		switch (auctionType) {
			case "setPrice":
				return (
					<><RightItemsOnSetPrice>
						<InputPrice
							className="InputPrice Price"
							title="Price"
							setPrice={setPrice}
							setUnit={set_PriceUnit}
							nftInfo={nftInfo}
							ifInputAmount={true}
							setAmount={setAmount}
							notice="The price bidding starts at.It'll be publicly visible.You can manually accept bids above this value but below your reserve price if you want."
							gridArea="Price"
							options={unitOptions}
						/>

						<InstructionsDropdown
							className="Instructions"
							width="540px"
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
					</RightItemsOnSetPrice>
					<Summary
						nftInfo={nftInfo}
						auctionType="setPrice"
						price={price}
						amount={amount || 1}
						unit={priceUnit}
						fees={fees}
					/>
					</>
				);
			case "EnglishAuction":
				return (
					<>
					<RightItemsOnEnglishAuction>
						<InputPrice
							className="InputPrice Minimum_bid"
							title="Minimum bid"
							price={minimumBid}
							setPrice={set_MinimumBid}
							unit={minimumBid_Unit}
							setUnit={set_MinimumBid_Unit}
							notice="The price bidding starts at. It'll be publicly visible. You can manually accept bids above this value but below your reserve price if you want."
							gridArea="Minimum_bid"
							options={unitOptions}
						/>
						{/*<InputPrice
							className="InputPrice Maximum_bid"
							title="Minimum Increasing"
							price={maximumBid}
							setPrice={set_MaximumBid}
							unit={maximumBid_Unit}
							setUnit={set_MaximumBid_Unit}
							notice="The Price Bidding Ends at. It'll Be Publicly Visible. You Can Manually Accept Bids Below This Value But Above Your Reserve Price If You Want."
							gridArea="Maximum_bid"
							options={unitOptions}
						/> */}
						<InputPrice
							className="InputPrice Direct_purchase_price"
							title="Direct purchase price"
							price={directPurchasePrice}
							setPrice={set_DirectPurchasePrice}
							unit={directPurchasePrice_Unit}
							setUnit={set_directPurchasePrice_Unit}
							notice="A direct transaction price can be set, that is, users can skip the bidding process and buy directly at this price. The direct tranaction price must be greater than Minimum Bid minimum starting price."
							gridArea="Direct_purchase_price"
							options={unitOptions}
						/>
						<InputPrice
							className="InputPrice Reserve_price"
							title="Reserve price"
							price={reservePrice}
							setPrice={set_ReservePrice}
							unit={reservePrice_Unit}
							setUnit={set_ReservePrice_Unit}
							notice="Setting a reserve price creates a hidden limit,If you receive no bids equal to or greater than your reserve,your auction will end with end without selling the item."
							gridArea="Reserve_price"
							ifInputAmount={true}
							options={unitOptions}
							nftInfo={nftInfo}
							setAmount={setAmount}
						/>
						<SelectDuration
							className="Expriration_Date"
							title="Expriration Date"
							notice="Setting a reserve price creates a hidden limit. If you receive no bids equal to or greater than your reserve, your auction will end without selling the item."
							setDuration={setDuration}
							gridArea="Expriration_Date"
							options={duration_Options}
						/>
						<InstructionsDropdown
							className="Instructions"
							width="540px"
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
					</RightItemsOnEnglishAuction>
					<Summary
						nftInfo={nftInfo}
						auctionType="EnglishAuction"
						price={reservePrice}
						unit={reservePrice_Unit}
						duration={duration}
						fees={fees}
						minPrice={minimumBid}
						maxPrice={directPurchasePrice}
						minIncr={minimumBid*0.05}
						amount={amount || 1}
					/>
					</>
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
					<AutoStretchBaseWidthOrHeightImg  width={500} height={500} src={nftInfo && (nftInfo.fileurl || pic_NFT1)} />
				</PageBodyLeft>
				<PageBodyRight>
					<span className="str_SelectSellMethod">
						{nftInfo && (nftInfo.itemname || 'Select your sell method')}
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
							Enter the price for which the item will be instantly sold
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
								Sell at a highest bid at an auction for the selected time period
							</span>
						</button>
					</ButtonGroup>

					{render_LeftItems(auctionType)}

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
	grid-template-columns: 500px 1fr;
	column-gap: 80px;
`;

const PageBodyRight = styled.div`
	display: grid;
	grid-template-rows: 60px 90px 1fr;
	grid-template-areas:
		"str_SelectSellMethod"
		"ButtonGroup"
		"RightItemsOnSetPrice"
		"Summary"
		;

	span.str_SelectSellMethod {
		font-family: Helvetica Neue;
		font-style: normal;
		font-weight: 700;
		font-size: 34px;
		text-transform: capitalize;
		color: #1f191b;

		grid-area: str_SelectSellMethod;
	}
`;

const ButtonGroup = styled.div`
	grid-area: ButtonGroup;

	display: grid;
	grid-template-columns: 260px 260px;
	column-gap: 20px;

	button {
		background: #ffffff;
		border: 1px solid rgba(0, 0, 0, 0.2);
		box-sizing: border-box;
		cursor: pointer;
		width: 260px;
		height: 88px;
		display: grid;
		text-align: left;
		padding:16px 24px;

		.auctionType {
			font-family: Optima;
			font-style: normal;
			font-weight: bold;
			font-size: 14px;
			line-height: 27px;
			color: #000000;
		}

		.saleFeature {
			font-family: Helvetica Neue;
			font-style: normal;
			font-weight: normal;
			font-size: 14px;
			line-height: 124%;
			color: #1f191b;
			opacity: 0.5;
		}
	}

	button.active {
		border: 1px solid #000000;
		box-sizing: border-box;
		box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
	}
`;

/* RightItemsOnSetPrice */
const RightItemsOnSetPrice = styled.div`
	display: grid;
	align-items: center;
	grid-template-rows: 210px 1fr;
	padding-top:28px;
	grid-template-areas:
		"Price"
		"Instructions";

	.Instructions {
		grid-area: Instructions;
		align-self: start;
		margin-top:20px;
	}
`;

/* RightItemsOnEnglishAuction */
const RightItemsOnEnglishAuction = styled.div`
	padding-top:28px;

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

/* Left */
const PageBodyLeft = styled.div`
	display: grid;
	align-items: top;
	row-gap: 20px;
	grid-template-areas:
		"NFTImg";

	img.NFTImg {
		width: 500px;
		height: 500px;
		grid-area: NFTImg;
	}
`;
