import React, { useEffect, useState } from "react";
import styled from "styled-components";

import InstructionsDropdown from "./components/InstructionsDropdown";
import InputPrice from "./components/InputPrice";
import SelectDuration from "./components/SelectDuration";
import Summary from "./components/Summary";
import BreadcrumbNav from '@/components/UI-kit/NavBar/BreadcrumbNav'

import pic_NFT1 from "./assets/pic_NFT1.svg";
import useNftInfo from "@/utils/useToken";
import { useParams } from "react-router-dom";
import { useActiveWeb3React } from "@/web3";
import { AutoStretchBaseWidthOrHeightImg } from "@/pages/component/Other/autoStretchBaseWidthOrHeightImg";
import { getUSDTAddress, getBUSDAddress, getUSDCAddress } from "@/web3/address_list/token";

import icon_BNB from '@assets/images/wallet/icon_BNB.svg'
import icon_BUSD from '@assets/images/wallet/icon_BUSD.png'
import icon_ETH_new from '@assets/images/wallet/icon_ETH_new.svg'
import icon_USDT from '@assets/images/wallet/icon_USDT.svg'
import icon_USDC from '@assets/images/wallet/icon_USDC.svg'

export default function SellNFT() {
	const { chainId } = useActiveWeb3React()

	const unitOptions = [
		{
			value: chainId === 56 ? 'BNB' : 'ETH',
			contract: '0x0000000000000000000000000000000000000000',
			icon: chainId === 56 ? icon_BNB : icon_ETH_new,
			isShow: true,
			decimals: 18
		}, {
			value: 'BUSD',
			contract: getBUSDAddress(chainId),
			icon: icon_BUSD,
			isShow: chainId === 56 ? true : false,
			decimals: 18
		},
		{
			value: "USDT",
			contract: getUSDTAddress(chainId),
			icon: icon_USDT,
			isShow: true,
			decimals: 6
		},
		{
			value: "USDC",
			contract: getUSDCAddress(chainId),
			icon: icon_USDC,
			isShow: true,
			decimals: 18
		}
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
	const { exportNftInfoV2 } = useNftInfo();
	const { nftId } = useParams();
	const { active } = useActiveWeb3React();
	const [auctionType, setauctionType] = useState("setPrice");

	const [amount, setAmount] = useState(0);
	const [price, setPrice] = useState(0);
	const [priceUnit, set_PriceUnit] = useState("ETH");
	const [minimumBid_Unit, set_MinimumBid_Unit] = useState("ETH");
	const [directPurchasePrice_Unit, set_directPurchasePrice_Unit] = useState("ETH");
	const [reservePrice_Unit, set_ReservePrice_Unit] = useState("ETH");


	const [fixedSwap_Unit, setFixedSwapUnit] = useState(unitOptions[0]);
	const [minimumBid, set_MinimumBid] = useState(0);
	const [directPurchasePrice, set_DirectPurchasePrice] = useState(0);
	const [reservePrice, set_ReservePrice] = useState(0);
	const [duration, setDuration] = useState(0);

	const [nftInfo, setNftId] = useState();

	const NavList = [
		{
			title: "My Inventory",
			route: "/MyInventory",
		},
		{
			title: ((nftInfo && nftInfo.itemname) || "Item name"),
			route: "/MyInventory/" + nftId,
		},
		{
			title: "Sell",
			route: "/MyInventory/" + nftId + "/Sell",
		},
	];

	useEffect(() => {
		if (!active) return;
		setInitNftInfo(nftId);
		// eslint-disable-next-line
	}, [active]);
	
	const setInitNftInfo = async (nftId) => {
		const info = await exportNftInfoV2(nftId);
		
		// console.log(info); 
		setNftId(info);
	};

	useEffect(() => {
		if ((directPurchasePrice && ((directPurchasePrice.charAt(directPurchasePrice.length - 1) === '.' ) || (parseInt(directPurchasePrice) === 0 && directPurchasePrice.charAt(directPurchasePrice.length - 1) === '0'))) ||
			(reservePrice && ((reservePrice.charAt(reservePrice.length - 1) === '.') || (parseInt(reservePrice) === 0 && reservePrice.charAt(reservePrice.length - 1) === '0'))) ||
			(minimumBid && ((minimumBid.charAt(minimumBid.length - 1) === '.' ) || (parseInt(minimumBid) === 0 && minimumBid.charAt(minimumBid.length - 1) === '0')))) {
			return false;
		}

		if (directPurchasePrice && reservePrice && parseFloat(reservePrice) > parseFloat(directPurchasePrice)) {
			set_ReservePrice(directPurchasePrice);
		}
		if (reservePrice && minimumBid && parseFloat(minimumBid) > parseFloat(reservePrice)) {
			set_MinimumBid(reservePrice);
		}
		if (directPurchasePrice && minimumBid && parseFloat(minimumBid) > parseFloat(directPurchasePrice)) {
			set_DirectPurchasePrice(reservePrice);
		}

	}, [directPurchasePrice, reservePrice, minimumBid]);

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
							setNewUnit={setFixedSwapUnit} // new 
							nftInfo={nftInfo}
							ifInputAmount={true}
							setAmount={setAmount}
							notice="The price bidding starts at.It'll be publicly visible.You can manually accept bids above this value but below your reserve price if you want."
							gridArea="Price"
							options={unitOptions}
							fixedSwapUnit={fixedSwap_Unit}
						/>

						<InstructionsDropdown
							className="Instructions"
							width="540px"
							layDownItems={[
								{
									value:
										"Bounce Collectible is decentralized, so we never escrow your items. As a result, if this is your first time selling a crypto collectible, you need to complete 2 free (plus gas) transactions:",
								},
								{
									value:
										"To initialize your account for making sell orders, which only needs to be done once for your account.",
								},
								{
									value:
										"To allow Bounce Collectible to access your item (or all items in the collection, if the collection supports it) when a sale occurs.",
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
							newUnit={fixedSwap_Unit}
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
								setNewUnit={setFixedSwapUnit}
								notice="The price bidding starts at. It'll be publicly visible. You can manually accept bids above this value but below your reserve price if you want."
								gridArea="Minimum_bid"
								options={unitOptions}
								fixedSwapUnit={fixedSwap_Unit}
							/>
							<InputPrice
								className="InputPrice Direct_purchase_price"
								title="Direct purchase price"
								price={directPurchasePrice}
								setPrice={set_DirectPurchasePrice}
								unit={directPurchasePrice_Unit}
								setNewUnit={setFixedSwapUnit}
								setUnit={set_directPurchasePrice_Unit}
								notice="A direct transaction price can be set, that is, users can skip the bidding process and buy directly at this price. The direct tranaction price must be greater than Minimum Bid minimum starting price."
								gridArea="Direct_purchase_price"
								options={unitOptions}
								fixedSwapUnit={fixedSwap_Unit}
							/>
							
							<InputPrice
								className="InputPrice Reserve_price"
								title="Reserve price"
								price={reservePrice}
								setPrice={set_ReservePrice}
								unit={reservePrice_Unit}
								setUnit={set_ReservePrice_Unit}
								notice="Setting a reserve price creates a hidden limit,If you receive no bids equal to or greater than your reserve,your auction will not be sold."
								gridArea="Reserve_price"
								ifInputAmount={true}
								options={unitOptions}
								setNewUnit={setFixedSwapUnit}
								nftInfo={nftInfo}
								setAmount={setAmount}
								fixedSwapUnit={fixedSwap_Unit}
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
										"Bounce Collectible is decentralized, so we never escrow your items. As a result, if this is your first time selling a crypto collectible, you need to complete 2 free (plus gas) transactions:",
								},
								{
									value:
										"To initialize your account for making sell orders, which only needs to be done once for your account.",
								},
								{
									value:
										"To allow Bounce Collectible to access your item (or all items in the collection, if the collection supports it) when a sale occurs.",
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
							minIncr={minimumBid * 0.05}
							amount={amount || 1}
							newUnit={fixedSwap_Unit}
						/>
					</>
				);
			default:
				return;
		}
	};
	
	return (
		<Page>
			<BreadcrumbNav marginTop={"24px"} NavList={NavList}/>

			<PageBody>
				<PageBodyLeft>
					<AutoStretchBaseWidthOrHeightImg width={500} height={500} src={nftInfo && (nftInfo.fileurl || pic_NFT1)} />
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
/* 
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
`; */

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
