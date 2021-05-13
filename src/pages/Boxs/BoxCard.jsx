import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import { AutoStretchBaseWidthOrHeightImg } from "@/pages/component/Other/autoStretchBaseWidthOrHeightImg";
import LinearProgress from "@material-ui/core/LinearProgress";

import img_test1 from "./assets/img_test1.jpg";
import img_test2 from "./assets/img_test2.png";
import icon_Twitter from "./assets/icon_Twitter.svg";
import icon_share from "./assets/icon_share.svg";

const BorderLinearProgress = withStyles((theme) => ({
	root: {
		height: 10,
		borderRadius: 5,
	},
	colorPrimary: {
		backgroundColor:
			theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
	},
	bar: {
		borderRadius: 5,
		backgroundColor: "#000000",
	},
}))(LinearProgress);

function BoxCard() {
	const history = useHistory();

	return (
		<StyledCard>
			<AutoStretchBaseWidthOrHeightImg
				src={img_test1}
				width={542}
				height={491}
			/>

			<div className="cardContent">
				<div className="row1">
					<span className="NFTName">NFT Packs Name</span>
					<div className="icon_Button_Group">
						<a
							href="http://www.twitter.com"
							referrerPolicy="no-referrer"
						>
							<img src={icon_Twitter} alt="" />
						</a>
						<a
							href="http://www.baidu.com"
							referrerPolicy="no-referrer"
						>
							<img src={icon_share} alt="" />
						</a>
					</div>
				</div>

				<div className="row2">
					<span className="introduction">
						Project introduction Project introduction Project
						introductionProject introduction
					</span>
				</div>

				<BorderLinearProgress variant="determinate" value={50} />

				<div className="row4">
					<span className="endTime">1d,21h,55m end</span>
				</div>

				<div className="row5">
					<div className="totalSupplyBlock1">
						<span className="title">Total supply:</span>
						<span className="amount">50</span>
					</div>
					<div className="totalSupplyBlock2">
						<span className="title">Total supply:</span>
						<div className="amountBlock">
							<span className="number">250000</span>
							<span className="unit">AUCTION</span>
						</div>
					</div>
				</div>
			</div>
		</StyledCard>
	);
}

const StyledCard = styled.div`
	width: 1100px;
	height: 491px;
	display: flex;
	align-items: center;
	box-shadow: 0px 0px 14px 0px rgba(209, 209, 209, 0.5);

	.cardContent {
		width: 558px;
		height: 491px;
		box-sizing: border-box;
		padding: 9px 28px 48px 30px;
		display: flex;
		flex-direction: column;
		/* align-items: center; */

		.row1 {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;

			span.NFTName {
				font-size: 26px;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #333333;
				line-height: 37px;
			}

			.icon_Button_Group {
				display: flex;
				column-gap: 16px;
			}
		}

		.row2 {
			width: 504px;
			height: 57px;

			span.introduction {
				font-size: 14px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #333333;
				line-height: 20px;
                opacity: 0.5;
			}
		}

		.row4 {
			display: flex;
			span.endTime {
				font-size: 18px;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #333333;
				line-height: 25px;
				margin: 20px auto 25px auto;
			}
		}

		.row5 {
			display: flex;
			justify-content: space-between;

			.totalSupplyBlock1 {
				display: flex;
				flex-direction: column;

				span.title {
					font-size: 14px;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #333333;
					line-height: 20px;
				}

				span.amount {
					font-size: 28px;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #333333;
					line-height: 40px;
				}
			}

			.totalSupplyBlock2 {
				display: flex;
				flex-direction: column;

				.amountBlock {
					span.number {
						font-size: 28px;
						font-family: PingFangSC-Semibold, PingFang SC;
						font-weight: 600;
						color: #333333;
						line-height: 40px;
					}

					span.unit {
						font-size: 16px;
						font-family: PingFangSC-Semibold, PingFang SC;
						font-weight: 600;
						color: #333333;
						line-height: 22px;
                        opacity: 0.19;
					}
				}
			}
		}
	}
`;

export default BoxCard;
