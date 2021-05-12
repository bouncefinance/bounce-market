import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "@components/UI-kit";
import AddNewBrandsModal from "./AddNewBrandsModal";
// import img_addItem from './assets/addItem_img.png'
import { AutoStretchBaseWidthOrHeightImg } from "@/pages/component/Other/autoStretchBaseWidthOrHeightImg";
// import { useLazyQuery } from "@apollo/client";
// import { QueryItemsIn1155Brand, QueryItemsIn721Brand } from "@/utils/apollo";
import { useInitEffect } from "@/utils/useInitEffect";
import { useActiveWeb3React } from "@/web3";
import useWrapperIntl from "@/locales/useWrapperIntl";
import { VideoItem } from '../../component/Other/videoItem'
import useAxios from "@/utils/useAxios";

const CardItemStyled = styled.div`
	width: 262px;
	height: 250px;
	box-sizing: border-box;
	border: 1px solid rgba(0, 0, 0, 0.2);
	overflow: hidden;
	cursor: pointer;
	position: relative;
	padding: 0;

	img {
		width: 262px;
		height: 180px;
	}

	.item_wrapper {
		height: 67px;
		padding: 14px 16px;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		span {
			font-weight: 600;
			font-size: 16px;
		}

		p {
			font-size: 12px;
			color: rgba(0, 0, 0, 0.4);
		}
	}
`;

export function CardItem({ cover, name, contract, category }) {
	const [count, setCount] = useState(0);
	const { account } = useActiveWeb3React();
	const [tokenList, setTokenList] = useState({})
	const { axios } = useAxios()

	useInitEffect(() => {
		getBrandTradeItems()
	})
	const getBrandTradeItems = async () => {
		let brandData = {
			tradePools: [],
			tradeAuctions: [],
			brandserc721: [],
			brandserc1155: [],
		}

		try {
			const ErcParams = {
				user_address: account,
				contract_address: contract,
			}

			const TradeParams = {
				offset: 0,
				count: 100,
				user_address: account
			}

			const res_721 = await axios.get('[V2]/erc721', { params: ErcParams })
			if (res_721.status === 200 && res_721.data.code === 200) {
				const erc721Data = res_721.data.data
				brandData.brandserc721 = erc721Data.tokens

			}

			const res_1155 = await axios.get('[V2]/erc1155', { params: ErcParams })
			if (res_1155.status === 200 && res_1155.data.code === 200) {
				const erc1155Data = res_1155.data.data
				brandData.brandserc1155 = erc1155Data.tokens
			}

			const res_trade = await axios.get('pools', { params: TradeParams })
			if (res_trade.status === 200 && res_trade.data.code === 200) {
				const tradeDate = res_trade.data.data
				brandData.tradePools = (tradeDate.tradePools || []).filter((item) => String(item.token0).toLowerCase() === String(contract).toLowerCase())
				brandData.tradeAuctions = (tradeDate.tradeAuctions || []).filter((item) => String(item.token0).toLowerCase() === String(contract).toLowerCase())
			}


		} catch (error) {

		}

		setTokenList(brandData)
	}


	useEffect(() => {
		console.log(tokenList)
		let tempCount = 0
		for (const key in tokenList) {
			if (Object.hasOwnProperty.call(tokenList, key)) {
				const value = tokenList[key];
				tempCount += parseInt(value.length)
			}
		}
		setCount(tempCount)
	}, [tokenList]);

	return (
		<CardItemStyled>
			{
				category && (category === "Videos" || category === 'video')
					?
					<VideoItem width={262} height={262} src={cover} />
					:
					<AutoStretchBaseWidthOrHeightImg
						src={cover}
						widgth={262}
						height={180}
					/>
			}
			<div className="item_wrapper">
				<span>{name}</span>
				<p>
					{count} {count > 1 ? "items" : "item"}
				</p>
			</div>
		</CardItemStyled>
	);
}

const AddCardItemStyled = styled.div`
	cursor: default;
	width: 224px;
	.create_wrapper {
		width: 100%;

		text-align: center;
		button {
			width: 224px;
			height: 46px;
			color: #fff;
			background-color: #000;
			margin-top: 32px;
		}
	}
`;

export function AddCardItem({
	run,
	hasAddressButNotBrand,
	brandAddress,
	isCreate,
}) {
	const [showCreateModal, setShowCreateModal] = useState(false);

	const { wrapperIntl } = useWrapperIntl();

	return (
		<>
			<AddCardItemStyled>
				{/* <AutoStretchBaseWidthOrHeightImg src={img_addItem} widgth={262} height={180} /> */}
				<div className="create_wrapper">
					{isCreate ? (
						<Button
							value={wrapperIntl(
								"MyProfile.MyBrands.ListCardItem.Create"
							)}
							onClick={() => {
								setShowCreateModal(true);
							}}
						/>
					) : (
						<div style={{ opacity: 0.5 }}>
							<Button
								value={wrapperIntl(
									"MyProfile.MyBrands.ListCardItem.Create"
								)}
							/>
						</div>
					)}
				</div>
			</AddCardItemStyled>
			<AddNewBrandsModal
				run={run}
				hasAddressButNotBrand={hasAddressButNotBrand}
				brandAddress={brandAddress}
				open={showCreateModal}
				setOpen={setShowCreateModal}
			/>
		</>
	);
}
