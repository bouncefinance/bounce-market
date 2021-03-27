import React from "react";
import styled from "styled-components";

import DurationDropdown from "./DurationDropdown";

import icon_ETH from "./assets/icon_ETH.svg";

const StyledInputBlock = styled.div`
	/* 传方法 */
	grid-area: ${({ gridArea }) => {
		return gridArea;
	}};
	margin-bottom:20px;
	display: grid;
	align-items: center;
	grid-template-rows: 15px 10px 70 10px 32px;
	grid-template-areas:
		"title"
		"."
		"notice"
		"."
		"InputRow";

	span.title {
		font-family: Helvetica Neue;
		font-style: normal;
		font-weight: bold;
		font-size: 12px;
		line-height: 15px;
		text-transform: capitalize;
		color: #1f191b;
		opacity: 0.7;

		grid-area: title;
	}

	span.notice {
		font-family: Helvetica Neue;
		font-style: normal;
		font-weight: 500;
		font-size: 14px;
		line-height: 17px;
		color: #1f191b;
		opacity: 0.3;
		box-sizing: border-box;
		grid-area: notice;
		padding-top: 10px;
		padding-bottom: 20px;
		align-self: start;
	}
`;

const InputRow = styled.div`
	grid-area: InputRow;
	height:50px;
	line-height:50px;
	align-items: center;
	border:1px solid rgba(0,0,0,0.3);
	text-indent:20px;
`;

function SelectDuration({
	className,
	title,
	setDuration,
	notice,
	gridArea,
	options,
}) {

	return (
		<StyledInputBlock className={className} gridArea={gridArea}>
			<span className="title">{title}</span>
			<span className="notice">{notice}</span>
			<InputRow>
				<DurationDropdown
					/* title='Category' */
					width="98%"
					height = "50px"
					options={options}
					icon={icon_ETH}
					defaultValue={5}
					onChange={(item) => {
						/* console.log("typeof(item): ", typeof item);
						console.log(item); */
						setDuration && setDuration(item.value);
						/* setFileType(item.value) */
					}}
				/>
			</InputRow>
		</StyledInputBlock>
	);
}

export default SelectDuration;
