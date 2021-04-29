import React, { useEffect, useState } from "react";
import styled from "styled-components";

import InstructionsDropdown from "./components/InstructionsDropdown";
import InputPrice from "./components/InputPrice";
import SelectDuration from "./components/SelectDuration";
import Summary from "./components/Summary";
import BreadcrumbNav from '@/components/UI-kit/NavBar/BreadcrumbNav'

// import pic_NFT1 from "./assets/pic_NFT1.svg";
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
import icon_HT from '@assets/images/wallet/icon_HT.svg'

import useWrapperIntl from '@/locales/useWrapperIntl'

export default function SellNFT () {
	const { chainId } = useActiveWeb3React()

	const { wrapperIntl } = useWrapperIntl()

	const unitOptions = [
		{
			value: chainId === 56 ? 'BNB' : chainId === 128 ? 'HT' : 'ETH',
			contract: '0x0000000000000000000000000000000000000000',
			icon: chainId === 56 ? icon_BNB : chainId === 128 ? icon_HT : icon_ETH_new,
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
			decimals: chainId === 56 ? 18 : 6,
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
			value: 3,
		},
		{
			value: 5,
		},
		{
			value: 7,
		},
		{
			value: 14,
		},
		{
			value: 30,
		}
	];

	const fees = "1";
	const { exportNftInfoV2 } = useNftInfo();
	const { nftId } = useParams();
	const { active } = useActiveWeb3React();
	const [auctionType, setauctionType] = useState("setPrice");

	const [amount, setAmount] = useState(0);
	const [price, setPrice] = useState(0);
	const [priceUnit, set_PriceUnit] = useState("BNB");
	const [minimumBid_Unit, set_MinimumBid_Unit] = useState("BNB");
	const [directPurchasePrice_Unit, set_directPurchasePrice_Unit] = useState("BNB");
	const [reservePrice_Unit, set_ReservePrice_Unit] = useState("BNB");


	const [fixedSwap_Unit, setFixedSwapUnit] = useState(unitOptions[0]);
	const [minimumBid, set_MinimumBid] = useState(0);
	const [directPurchasePrice, set_DirectPurchasePrice] = useState(0);
	const [reservePrice, set_ReservePrice] = useState(0);
	const [duration, setDuration] = useState(0);

	const [nftInfo, setNftId] = useState();

	const NavList = [
		{
			/* title: "My Gallery", */
			title: wrapperIntl("MyProfile.MyGallery.SellNFT.MyGallery"),
			route: "/MyGallery",
		},
		{
			title: ((nftInfo && nftInfo.itemname) || wrapperIntl('MyProfile.MyGallery.SellNFT.ItemName')),
			route: "/MyGallery/" + nftId,
		},
		{
			/* title: "Sell", */
			title: wrapperIntl("MyProfile.MyGallery.SellNFT.Sell"),
			route: "/MyGallery/" + nftId + "/Sell",
		},
	];

	useEffect(() => {
		if (!active) return;
		setInitNftInfo(nftId);
		// eslint-disable-next-line
	}, [active]);

	const setInitNftInfo = async (nftId) => {
		const info = await exportNftInfoV2(nftId);

		setNftId(info);
	};

	useEffect(() => {
		if ((directPurchasePrice && ((directPurchasePrice.charAt(directPurchasePrice.length - 1) === '.') || (parseInt(directPurchasePrice) === 0 && directPurchasePrice.charAt(directPurchasePrice.length - 1) === '0'))) ||
			(reservePrice && ((reservePrice.charAt(reservePrice.length - 1) === '.') || (parseInt(reservePrice) === 0 && reservePrice.charAt(reservePrice.length - 1) === '0'))) ||
			(minimumBid && ((minimumBid.charAt(minimumBid.length - 1) === '.') || (parseInt(minimumBid) === 0 && minimumBid.charAt(minimumBid.length - 1) === '0')))) {
			return false;
		}

		if (directPurchasePrice && reservePrice && parseFloat(reservePrice) > parseFloat(directPurchasePrice)) {
			set_ReservePrice(directPurchasePrice);
		}
		if (reservePrice && minimumBid && parseFloat(minimumBid) >= parseFloat(reservePrice)) {
			console.log("parseFloat(reservePrice) * 0.9: ", `${parseFloat(reservePrice) * 0.9}`)
			console.log("reservePrice2: ", `${parseFloat(reservePrice) * 0.9}`.slice(0,reservePrice.length+1))
			set_MinimumBid(`${parseFloat(reservePrice) * 0.9}`.slice(0,reservePrice.length+1));
		}
		if (directPurchasePrice && minimumBid && parseFloat(minimumBid) > parseFloat(directPurchasePrice)) {
			console.log("parseFloat(directPurchasePrice) * 0.9: ", `${parseFloat(directPurchasePrice) * 0.9}`)
			console.log("directPurchasePrice: ", `${parseFloat(directPurchasePrice) * 0.9}`.slice(0,directPurchasePrice.length+1))
			set_MinimumBid(`${parseFloat(directPurchasePrice) * 0.9}`.slice(0,directPurchasePrice.length+2));
		}

		console.log({directPurchasePrice: directPurchasePrice, reservePrice: reservePrice, minimumBid: minimumBid})
	}, [directPurchasePrice, reservePrice, minimumBid]);

	const render_LeftItems = (auctionType) => {
		switch (auctionType) {
			case "setPrice":
				return (
					<><RightItemsOnSetPrice>
						<InputPrice
							className="InputPrice Price"
							title={wrapperIntl('MyProfile.MyGallery.SellNFT.Price')}
							setPrice={setPrice}
							setUnit={set_PriceUnit}
							setNewUnit={setFixedSwapUnit} // new 
							nftInfo={nftInfo}
							ifInputAmount={true}
							setAmount={setAmount}
							notice={wrapperIntl('MyProfile.MyGallery.SellNFT.PriceNotice')}
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
										/* "Bounce Collectible is decentralized, so we never escrow your items. As a result, if this is your first time selling a crypto collectible, you need to complete 2 free (plus gas) transactions:", */
										wrapperIntl('MyProfile.MyGallery.SellNFT.Instructions1')
								},
								{
									value:
										/* "To initialize your account for making sell orders, which only needs to be done once for your account.", */
										wrapperIntl('MyProfile.MyGallery.SellNFT.Instructions2')
								},
								{
									value:
										/* "To allow Bounce Collectible to access your item (or all items in the collection, if the collection supports it) when a sale occurs.", */
										wrapperIntl('MyProfile.MyGallery.SellNFT.Instructions3')
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
								title={wrapperIntl('MyProfile.MyGallery.SellNFT.Minimumbid')}
								price={minimumBid}
								setPrice={set_MinimumBid}
								unit={minimumBid_Unit}
								setUnit={set_MinimumBid_Unit}
								setNewUnit={setFixedSwapUnit}
								notice={wrapperIntl('MyProfile.MyGallery.SellNFT.MinimumbidNotice')}
								gridArea="Minimum_bid"
								options={unitOptions}
								fixedSwapUnit={fixedSwap_Unit}
							/>
							<InputPrice
								className="InputPrice Direct_purchase_price"
								title={wrapperIntl('MyProfile.MyGallery.SellNFT.DirectPurchasePrice')}
								price={directPurchasePrice}
								setPrice={set_DirectPurchasePrice}
								unit={directPurchasePrice_Unit}
								setNewUnit={setFixedSwapUnit}
								setUnit={set_directPurchasePrice_Unit}
								notice={wrapperIntl('MyProfile.MyGallery.SellNFT.DirectPurchaseNotice')}
								gridArea="Direct_purchase_price"
								options={unitOptions}
								fixedSwapUnit={fixedSwap_Unit}
							/>

							<InputPrice
								className="InputPrice Reserve_price"
								title={wrapperIntl('MyProfile.MyGallery.SellNFT.ReservePrice')}
								price={reservePrice}
								setPrice={set_ReservePrice}
								unit={reservePrice_Unit}
								setUnit={set_ReservePrice_Unit}
								notice={wrapperIntl('MyProfile.MyGallery.SellNFT.ReservePriceNotice')}
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
								title={wrapperIntl("MyProfile.MyGallery.SellNFT.ExprirationDate")}
								notice={wrapperIntl('MyProfile.MyGallery.SellNFT.ExprirationDateNotice')}
								setDuration={setDuration}
								gridArea={wrapperIntl('MyProfile.MyGallery.SellNFT.ExprirationDate')}
								options={duration_Options}
							/>
							<InstructionsDropdown
								className="Instructions"
								width="540px"
								layDownItems={[
									{
										value:
											/* "Bounce Collectible is decentralized, so we never escrow your items. As a result, if this is your first time selling a crypto collectible, you need to complete 2 free (plus gas) transactions:", */
											wrapperIntl('MyProfile.MyGallery.SellNFT.Instructions1')
									},
									{
										value:
											/* "To initialize your account for making sell orders, which only needs to be done once for your account.", */
											wrapperIntl('MyProfile.MyGallery.SellNFT.Instructions2')
									},
									{
										value:
											/* "To allow Bounce Collectible to access your item (or all items in the collection, if the collection supports it) when a sale occurs.", */
											wrapperIntl('MyProfile.MyGallery.SellNFT.Instructions3')
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
			<BreadcrumbNav marginTop={"24px"} NavList={NavList} />

			<PageBody>
				<PageBodyLeft>
					{nftInfo && (nftInfo.category === "Videos" || nftInfo.category === "video") ?
						<video width='500px' height='500px' src={nftInfo && (nftInfo.fileurl)} controls='controls' autoPlay></video> :
						<AutoStretchBaseWidthOrHeightImg width={500} height={500} src={nftInfo && (nftInfo.fileurl)} />
					}
				</PageBodyLeft>
				<PageBodyRight>
					<span className="itemName">
						{nftInfo && (nftInfo.itemname || wrapperIntl('MyProfile.MyGallery.SellNFT.SelectMethod'))}
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
							<span className="auctionType">{wrapperIntl('MyProfile.MyGallery.SellNFT.InstantSale')}</span>
							<span className="saleFeature">
								{wrapperIntl('MyProfile.MyGallery.SellNFT.SetPriceFeature')}
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
							<span className="auctionType">{wrapperIntl('MyProfile.MyGallery.SellNFT.EnglishAuction')}</span>
							<span className="saleFeature">
								{wrapperIntl('MyProfile.MyGallery.SellNFT.EnglishAcutionFeature')}
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
	// grid-template-rows: 60px 90px 1fr;
	grid-template-areas:
		"itemName"
		"ButtonGroup"
		"RightItemsOnSetPrice"
		"Summary"
		;

	span.itemName {
		font-family: Helvetica Neue;
		font-style: normal;
		font-weight: 700;
		font-size: 34px;
		color: #1f191b;
		margin-bottom: 10px;
		grid-area: itemName;
		width: 500px;
		overflow: hidden;
		text-overflow: ellipsis;
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
