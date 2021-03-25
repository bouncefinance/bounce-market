import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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

export { DetailsContent, TokenInfoContent };
