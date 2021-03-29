import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import SearchBar from "../component/Header/Search";
import { PullRadioBox as DropDownMenu } from "../../components/UI-kit";

import icon_viewAll from "./assets/icon_viewAll.svg";
import img_line from "./assets/img_line.svg";

import { useQuery } from "@apollo/client";
import { QueryBrands } from "@/utils/apollo";
import useAxios from "@/utils/useAxios";
import { useActiveWeb3React } from "@/web3";
import { Controller } from "@/utils/controller";

import img_test2 from "./assets/img_test2.svg";
import img_test3 from "./assets/img_test3.svg";

const StyledBrandPage = styled.div`
	width: 1120px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	margin: 40px auto 64px auto;

	.row-1 {
		display: flex;
		justify-content: space-between;

		input {
			width: 821px;
			height: 48px;
			font-family: Optima;
			font-style: normal;
			font-weight: bold;
			font-size: 16px;
			line-height: 19px;
			text-transform: capitalize;
			color: #000000;
			opacity: 0.4;

			margin-left: 0;
		}
	}

	.TitleRow {
		display: flex;
		justify-content: space-between;

		img {
			margin-right: 9px;
			cursor: pointer;
		}

		&.TitleRow_HotBrands {
			margin-top: 32px;
			margin-bottom: 16px;
		}

		&.TitleRow_PopBrands {
			margin-top: 60px;
			margin-bottom: 14px;
		}

		span.title {
			font-family: Optima;
			font-style: normal;
			font-weight: bold;
			font-size: 28px;
			line-height: 34px;
			color: #000000;
		}
	}

	.Brands {
		margin: 0 auto;

		display: grid;
		grid-template-columns: 268px 268px 268px 268px;
		grid-template-rows: 228px 228px;
		column-gap: 16px;
		row-gap: 32px;

		.BrandCard {
			box-sizing: border-box;
			border: 1px solid rgba(0, 0, 0, 0.2);
      cursor: pointer;

			display: grid;
			grid-template-rows: 166.74px 1px 1fr;

			img.BrandImg {
				width: 266px;
				align-self: center;
			}

			span.BrandName {
				font-family: Helvetica Neue;
				font-style: normal;
				font-weight: 500;
				font-size: 16px;
				line-height: 20px;
				display: flex;
				align-items: center;
				color: #000000;

				padding-top: 22px;
				padding-bottom: 20px;
				padding-left: 20px;
			}
		}
	}
`;

const BrandList = [
	{ BrandImg: img_test2, BrandName: "Alpaca City" },
	{ BrandImg: img_test3, BrandName: "Alpaca City" },
	{ BrandImg: img_test2, BrandName: "Alpaca City" },
	{ BrandImg: img_test3, BrandName: "Alpaca City" },
	{ BrandImg: img_test2, BrandName: "Alpaca City" },
	{ BrandImg: img_test3, BrandName: "Alpaca City" },
	{ BrandImg: img_test2, BrandName: "Alpaca City" },
	{ BrandImg: img_test3, BrandName: "Alpaca City" },
];

export default function Index() {
	const { data } = useQuery(QueryBrands);
	const { active } = useActiveWeb3React();
	const { sign_Axios } = useAxios();

	const [isSet, setIsSet] = useState(false);
	const [list, setList] = useState([]);

	const history = useHistory();

	useEffect(() => {
		if (!active) return;
		if (data && !isSet) {
			const bounce721Brands = data.bounce721Brands.map((item) => item.id);
			const bounce1155Brands = data.bounce1155Brands.map(
				(item) => item.id
			);
			const list = bounce721Brands.concat(bounce1155Brands);
			sign_Axios
				.post(Controller.brands.getbrandsbyfilter, {
					Brandcontractaddressess: list,
				})
				.then((res) => {
					if (res.status === 200 && res.data.code === 1) {
						setIsSet(true);
						const list = res.data.data.map((item) => ({
							img: item.imgurl,
							brandName: item.brandname,
							profile: item.description,
							avatar: item.imgurl,
							ownerName: item.ownername,
						}));
						setList(list);
					}
				});
		}
	}, [active, data, isSet, sign_Axios]);

	return (
		<StyledBrandPage>
			{/* 搜索栏 */}
			<div className="row-1">
				<SearchBar placeholder={"Search Brand Name or Brand Creator"} />
				<DropDownMenu
					width={"261px"}
					options={[
						{
							value: "New",
						},
					]}
					defaultValue={"New"}
					prefix={"Sort by:"}
					onChange={(item) => {
						// console.log(item)
					}}
				/>
			</div>

			{/* Hotest Brands     View All -->*/}
			<div className="TitleRow TitleRow_HotBrands">
				<span className="title str_HosttestBrands">Hotest Brands</span>

				<img
					src={icon_viewAll}
					onClick={() => {
						history.push("/#");
					}}
					alt=""
				/>
			</div>

			{/* Hotest Brands卡片画廊 */}
			<div className="Brands HosttestBrands">
				{BrandList.map((Brand) => {
					return (
						<div className="BrandCard" key={Brand.BrandName}>
							<img
								src={Brand.BrandImg}
								alt=""
								className="BrandImg"
							/>

							<img src={img_line} alt="" />

							<span className="BrandName">{Brand.BrandName}</span>
						</div>
					);
				})}
			</div>

			{/* Most Popular Brands         View All -->*/}
			<div className="TitleRow TitleRow_PopBrands">
				<span className="title str_PopBrands">Most Popular Brands</span>

				<img
					src={icon_viewAll}
					onClick={() => {
						history.push("/#");
					}}
					alt=""
				/>
			</div>

			{/* Most Popular Brands卡片画廊 */}
			<div className="Brands str_PopBrands">
				{BrandList.map((Brand) => {
					return (
						<div className="BrandCard" key={Brand.BrandName}>
							<img
								src={Brand.BrandImg}
								alt=""
								className="BrandImg"
							/>

							<img src={img_line} alt="" />

							<span className="BrandName">{Brand.BrandName}</span>
						</div>
					);
				})}
			</div>
		</StyledBrandPage>
	);
}
