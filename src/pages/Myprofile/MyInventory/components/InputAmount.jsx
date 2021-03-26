import React, { useState } from "react";
import styled from "styled-components";

import UnitDropdown from "./UnitDropdown";

import icon_ETH from "./assets/icon_ETH.svg";

const Wrapper = styled.div`
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

	input {
		box-sizing: border-box;
		padding-top: 5px;
		padding-bottom: 5px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.3);

		&::-webkit-input-placeholder {
			font-family: Helvetica Neue;
			font-style: normal;
			font-weight: 500;
			font-size: 16px;
			line-height: 20px;
			text-transform: capitalize;
			color: #1f191b;
			opacity: 0.3;
		}

		&::-moz-placeholder {
			/* Mozilla Firefox 19+ */
			font-family: Helvetica Neue;
			font-style: normal;
			font-weight: 500;
			font-size: 16px;
			line-height: 20px;
			text-transform: capitalize;
			color: #1f191b;
			opacity: 0.3;
		}

		&:-ms-input-placeholder {
			/* Internet Explorer 10+ */
			font-family: Helvetica Neue;
			font-style: normal;
			font-weight: 500;
			font-size: 16px;
			line-height: 20px;
			text-transform: capitalize;
			color: #1f191b;
			opacity: 0.3;
		}
	}
`;

function InputAmount({
	className,
	title,
	price,
	setPrice,
	setUnit,
	notice,
	gridArea,
	options,
}) {
	const [inputValue, setInputValue] = useState("");

	const checkInput = (e) => {
		// console.log("key value: ", e.target.value);

		if (e.target.value.match("^$") != null) {
			setPrice(0);
			setInputValue("");
		} else if (e.target.value.match("^0$") != null) {
			setPrice(0);
			setInputValue("0");
		} else if (e.target.value.match("^\\d+$") != null) {
			setPrice(e.target.value);
			setInputValue(e.target.value);
		} else if (e.target.value.match("^\\d+\\.$") != null) {
			setPrice(e.target.value.slice(0, -1));
			setInputValue(e.target.value);
		} else if (e.target.value.match("^\\d+\\.[0-9]*0+$") != null) {
			setPrice(parseFloat(e.target.value));
			setInputValue(e.target.value);
		} else if (e.target.value.match("^\\d+\\.[0-9]*[1-9]+$") != null) {
			setPrice(e.target.value);
			setInputValue(e.target.value);
		}
	};

	return (
		<Wrapper className={className} gridArea={gridArea}>
			<span className="title">{title}</span>

			<InputRow>
				<UnitDropdown
					className={className + "Unit"}
					width="104px"
					options={options}
					icon={icon_ETH}
					defaultValue="ETH"
					onChange={(item) => {
						setUnit && setUnit(item.value);
					}}
				/>

				<input
					type="text"
					placeholder="Amount"
					maxLength={18}
					value={inputValue}
					onChange={checkInput}
				/>
			</InputRow>

			<span className="notice">{notice}</span>
		</Wrapper>
	);
}

export default InputAmount;
