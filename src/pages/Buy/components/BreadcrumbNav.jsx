import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
	font-family: IBM Plex Mono;
	font-style: normal;
	font-weight: 500;
	font-size: 12px;
	line-height: 16px;
	display: flex;
	align-items: center;
	color: #1f191b;
	opacity: 0.8;

	box-sizing: border-box;
	margin: 0 auto 0 0;

	display: flex;
	align-items: center;

	span {
		opacity: 0.4;
	}
`;

function BreadcrumbNav({ NFTType, NFTName }) {
	return (
		<Wrapper className="breadcrumb_Nav">
			Marketplace / {NFTType} /&nbsp;
			<span className="NFTNameInNav">{NFTName}</span>
		</Wrapper>
	);
}

export default BreadcrumbNav;
