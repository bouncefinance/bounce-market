import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import TradeTable from "./TradeTable";

const DetailsContentWrapper = styled.div`
	grid-area: content;

	display: flex;

	padding-top: 12px;

	span.str_GenerateBy {
		font-family: Helvetica Neue;
		font-style: normal;
		font-weight: normal;
		font-size: 16px;
		line-height: 19px;
		display: flex;
		align-items: center;
		color: #1f191b;
	}

	.linkToGenerator {
		font-family: Helvetica Neue;
		font-style: normal;
		font-weight: normal;
		font-size: 16px;
		line-height: 19px;
		display: flex;
		align-items: center;
		color: #003bd3;
	}
`;

const TokenInfoContentWrapper = styled.div`
	grid-area: content;

	display: grid;
	grid-template-rows: 38px 38px;
	grid-template-columns: 1fr;
	grid-template-areas:
		"TokenID"
		"Total";
	justify-content: space-between;
	align-items: end;

	span {
		font-family: Helvetica Neue;
		font-style: normal;
		font-weight: normal;
		font-size: 16px;
		line-height: 19px;
		display: flex;
		align-items: center;
		color: #1f191b;
	}

	div.TokenID {
		grid-area: TokenID;
		display: flex;
		justify-content: space-between;
	}

	div.Total {
		grid-area: Total;
		display: flex;
		justify-content: space-between;
	}
`;

const OffersContentWrapper = styled.div`
	padding-top: 5px;
	grid-area: content;
	width: 540px;
	.Offer {
		padding-top: 12px;
		display: grid;
		grid-template-columns: auto max-content 1fr max-content max-content;
		grid-template-areas: "OfferName OfferTime . ETHPrice USDPrice";
		align-items: center;

		span.OfferName {
			font-family: Helvetica Neue;
			font-style: normal;
			font-weight: 500;
			font-size: 12px;
			line-height: 15px;
			display: flex;
			align-items: center;
			color: #1f191b;

			grid-area: OfferName;
		}
		span.OfferTime {
			font-family: Helvetica Neue;
			font-style: normal;
			font-weight: normal;
			font-size: 12px;
			line-height: 14px;
			color: #000000;
			opacity: 0.5;

			grid-area: OfferTime;
			padding-left: 20px;
		}
		span.ETHPrice {
			font-family: Helvetica Neue;
			font-style: normal;
			font-weight: 500;
			font-size: 12px;
			line-height: 15px;

			grid-area: ETHPrice;

			padding-right: 4px;
			justify-self: end;
		}

		span.USDPrice {
			font-family: Helvetica Neue;
			font-style: normal;
			font-weight: normal;
			font-size: 12px;
			line-height: 14px;
			display: flex;
			align-items: center;
			text-align: right;
			color: #1f191b;
			opacity: 0.5;

			grid-area: USDPrice;
			justify-self: end;
		}
	}
`;

function OffersContent({ OfferName, OfferTime, ETHPrice, USDPrice }) {
	return (
		<OffersContentWrapper>
			<div className="Offer">
				<span className="OfferName">@Scarlett_vfx0</span>
				<span className="OfferTime">March 18, 2021 at 4:14am</span>
				<span className="ETHPrice">1.0 ETH</span>
				<span className="USDPrice">($909.98)</span>
			</div>
			<div className="Offer">
				<span className="OfferName">@Scarlett123</span>
				<span className="OfferTime">March 18, 2021 at 4:14am</span>
				<span className="ETHPrice">0.08 ETH</span>
				<span className="USDPrice">($709.98)</span>
			</div>
			<div className="Offer">
				<span className="OfferName">@Scarlett_vfx0</span>
				<span className="OfferTime">March 18, 2021 at 4:14am</span>
				<span className="ETHPrice">1.0 ETH</span>
				<span className="USDPrice">($909.98)</span>
			</div>
			<div className="Offer">
				<span className="OfferName">@Scarlett123</span>
				<span className="OfferTime">March 18, 2021 at 4:14am</span>
				<span className="ETHPrice">0.08 ETH</span>
				<span className="USDPrice">($709.98)</span>
			</div>
		</OffersContentWrapper>
	);
}

function DetailsContent({ generatorName }) {
	return (
		<DetailsContentWrapper className="DetailsContent">
			<span className="str_GenerateBy">Generate by&nbsp;</span>
			<Link className="linkToGenerator" to="#">
				{generatorName}
				{/* zhuzaoren */}
			</Link>
		</DetailsContentWrapper>
	);
}

function TokenInfoContent({ TokenID, Total }) {
	return (
		<TokenInfoContentWrapper className="TokenInfoContent">
			<div className="TokenID">
				<span className="str_TokenID">TokenID</span>
				<span className="TokenIDValue">{TokenID}</span>
			</div>
			<div className="Total">
				<span className="str_Total">Total</span>
				<span className="TotalValue">{Total}</span>
			</div>
		</TokenInfoContentWrapper>
	);
}

function TradingHistoryContent({ TradingHistoryList }) {
	return (
		<TokenInfoContentWrapper className="TokenInfoContent">
			<TradeTable/>
		</TokenInfoContentWrapper>
	);
}

export { DetailsContent, TokenInfoContent, OffersContent, TradingHistoryContent };
