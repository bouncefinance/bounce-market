import React from "react";
import styled from "styled-components";

import DurationDropdown from "./DurationDropdown";

import icon_ETH from "./assets/icon_ETH.svg";

const StyledInputBlock = styled.div`
	/* 传方法 */
	grid-area: ${({ gridArea }) => {
		return gridArea;
	}};

	display: grid;
	align-items: center;
	grid-template-rows: 15px 16px 32px 19px 1fr;
	grid-template-areas:
		"title"
		"."
		"InputRow"
		"."
		"notice";

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
		/* border-bottom: 1px solid rgba(0, 0, 0, 0.3); */
		border-bottom: 1px solid #000000;

		grid-area: notice;

		padding-top: 10px;
		padding-bottom: 20px;

		align-self: start;
	}
`;

const InputRow = styled.div`
	grid-area: InputRow;
	display: grid;
	grid-template-columns: 104px 146px;
	column-gap: 22px;
	align-items: center;

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

			<InputRow>
				<DurationDropdown
					/* title='Category' */
					width="104px"
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

			<span className="notice">{notice}</span>
		</StyledInputBlock>
	);
}

export default SelectDuration;
