import React from "react";
import styled from "styled-components";
import moment from "moment";

import Button from "@components/UI-kit/Button/Button";

import icon_summary from "./assets/icon_summary.svg";
import icon_dotLine from "./assets/icon_dotLine.svg";

const SummaryWrapper = styled.div`
	grid-area: Summary;
	align-self: start;

	width: 296px;
	background: #f8f8fb;

	display: grid;
	grid-template-rows: 57px 1fr 92px;
	grid-template-areas:
		"summaryHeader"
		"listing"
		"fees";

	span.title {
		font-family: Helvetica Neue;
		font-style: normal;
		font-weight: bold;
		font-size: 12px;
		line-height: 15px;
		text-transform: capitalize;
		color: #1f191b;
		opacity: 0.7;
	}

	span.text {
		font-family: Helvetica Neue;
		font-style: normal;
		font-weight: normal;
		font-size: 16px;
		line-height: 19px;
		color: rgba(31, 25, 27, 0.3);
	}

	span.text2 {
		font-family: Helvetica Neue;
		font-style: normal;
		font-weight: 500;
		font-size: 14px;
		line-height: 17px;
		color: #1f191b;
		opacity: 0.3;
	}

	.summaryHeader {
		grid-area: summaryHeader;

		padding: 20.78px 195px 20px 20px;
		box-sizing: border-box;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);

		display: grid;
		grid-template-columns: 12.8px 1fr;
		column-gap: 11.6px;
	}

	.listing {
		grid-area: listing;

		box-sizing: border-box;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		padding: 20px;

		display: grid;
		grid-template-rows: 25px 1fr 30px 40px;
		grid-template-areas:
			"str_Listing"
			"text"
			"."
			"button";

		button {
			grid-area: button;
		}

		span.bold {
			color: rgba(31, 25, 27, 1);
		}
	}

	.fees {
		grid-area: fees;

		padding: 20px 20px 30px 20px;

		display: grid;
		grid-template-rows: 15px 17px;
		row-gap: 10px;
		grid-template-columns: 68px 134px 34px;
		column-gap: 10px;
		grid-template-areas:
			"fees . ."
			"toBounce dotLine percentage";

		.title {
			grid-area: fees;
		}
		.toBounce {
			grid-area: toBounce;
		}
		.dotLine {
			grid-area: dotLine;
			align-self: center;
		}
		.percentage {
			grid-area: percentage;
		}
	}
`;

const render_ListingText = (auctionType, price, unit, duration) => {
	switch (auctionType) {
		case "setPrice":
			return (
				<span className="text priceInfo">
					Your item will be listed for
					<span className="bold">
						{" "}
						{price || "0"} {unit}.
					</span>
				</span>
			);
		case "EnglishAuction":
			return (
				<span className="text priceInfo">
					Your item will be auctioned and the highest bidder will win
					it at
					<span className="bold">
						{" "}
						{moment()
							.add(duration, "days")
							.format("ha on MMMM DD,YYYY")}
					</span>
					,as long as his bid is higher than
					<span className="bold">
						{" "}
						{price || "0"} {unit}.
					</span>
				</span>
			);
		default:
			return;
	}
};

function Summary({ auctionType, price, unit, duration, fees }) {
	return (
		<SummaryWrapper>
			<div className="summaryHeader">
				<img src={icon_summary} alt="" />
				<span className="title">Summary</span>
			</div>
			<div className="listing">
				<span className="title">Listing</span>
				{render_ListingText(auctionType, price, unit, duration)}
				<Button primary>Post your Listing</Button>
			</div>
			<div className="fees">
				<span className="title">Fees</span>
				<span className="text2 toBounce">To bounce</span>
				<img className="dotLine" src={icon_dotLine} alt="" />
				<span className="text2 percentage">{fees}%</span>
			</div>
		</SummaryWrapper>
	);
}

export default Summary;
