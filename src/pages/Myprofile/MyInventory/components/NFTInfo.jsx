import React from "react";
import styled from "styled-components";

const StyledDropdown = styled.div`
	width: 416px;
    height:40px;
`;

const Header = styled.div`
	width: 416px;
	display:flex;
    height:40px;
    line-height:40px;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    // &:last-child{
    //     border-bottom: none;
    // }
	.title {
		font-family: Helvetica Neue;
		font-style: normal;
		font-weight: 500;
		font-size: 12px;
		text-transform: capitalize;
		color: #1f191b;
		opacity: 0.5;
	}
`;

const Content = styled.span`
    color: #1f191b;
    opacity: 0.8;
    font-family: Helvetica Neue;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
`;


export default function NFTInfo({ title, content, className }) {

	return (
		<StyledDropdown className={className}>
			<Header className={`dropdownHeader`}>
				<span className="title">{title}</span>
				<Content className="layDownItems">{content}</Content>
			</Header>
		</StyledDropdown>
	);
}
