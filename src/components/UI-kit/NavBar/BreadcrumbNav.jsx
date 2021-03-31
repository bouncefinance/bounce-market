import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
// import { Link } from "react-router-dom";

const StyledLink = styled.p`
	font-family: Helvetica Neue;
	font-style: normal;
	font-weight: normal;
	font-size: 12px;
	line-height: 14px;
	display: flex;
	align-items: center;
	color: #1f191b;
	opacity: 0.8;
	cursor: pointer;

	/* &:last-child {
		opacity: 0.4;
	} */
`;

const LastLink = styled.span`
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
	const history = useHistory()


	return (
		<NavBar marginTop={marginTop} marginBottom={marginBottom}>
			{NavList.slice(0, -1).map((nav, index) => {
				return (
					<StyledLink key={index} onClick={()=>{
						history.push(nav.rout)
					}}>{nav.title} /&nbsp;</StyledLink>
				);
			})}

			<LastLink>{NavList[NavList.length - 1].title}</LastLink>
		</NavBar>
	);
}

export default BreadcrumbNav;
