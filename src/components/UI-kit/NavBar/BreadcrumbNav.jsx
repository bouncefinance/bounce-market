import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
	font-family: Helvetica Neue;
	font-style: normal;
	font-weight: normal;
	font-size: 12px;
	line-height: 14px;
	display: flex;
	align-items: center;
	color: #1f191b;
	opacity: 0.8;

	/* &:last-child {
		opacity: 0.4;
	} */
`;

const LastLink = styled(Link)`
	font-family: Helvetica Neue;
	font-style: normal;
	font-weight: normal;
	font-size: 12px;
	line-height: 14px;
	display: flex;
	align-items: center;
	color: #1f191b;
	opacity: 0.4;
`;

const NavBar = styled.div`
	height: 18px;
	margin-top: ${({ marginTop }) => {
		return marginTop || 0;
	}};
	margin-bottom: ${({ marginBottom }) => {
		return marginBottom || 0;
	}};
	display: flex;
`;

function BreadcrumbNav({ marginTop, marginBottom, NavList }) {
	return (
		<NavBar marginTop={marginTop} marginBottom={marginBottom}>
			{NavList.slice(0, -1).map((nav) => {
				return (
					<StyledLink to={nav.route}>{nav.title} /&nbsp;</StyledLink>
				);
			})}

			<LastLink>{NavList[NavList.length-1].title}</LastLink>
		</NavBar>
	);
}

export default BreadcrumbNav;
