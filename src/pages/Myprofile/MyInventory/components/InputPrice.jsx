import React, { useEffect, useState } from "react";
import styled from "styled-components";

import UnitDropdown from "./UnitDropdown";

import icon_ETH from "./assets/icon_ETH.svg";
import { useActiveWeb3React } from "@/web3";
import useToken from "@/utils/useToken";


function InputPrice({
	className,
	title,
	setPrice,
	setUnit,
	ifInputAmount = false,
	setAmount,
	notice,
	gridArea,
	options,
	nftInfo
}) {
	const [priceValue, setpriceValue] = useState("");
	const [balance, setBalance] = useState(0)
	const { active } = useActiveWeb3React()
	const { getBalance_ERC_1155 } = useToken()

	useEffect(() => {
		if (!active || !nftInfo || nftInfo.standard !== 2) return
		// console.log(nftInfo)
		const getBalance = async () => {
			const balance = await getBalance_ERC_1155(nftInfo.contractaddress, nftInfo.id)
			// console.log(balance)
			setBalance(balance)
		}

		getBalance()
		// eslint-disable-next-line
	}, [active, nftInfo])

	const checkInputPrice = (e) => {
		// console.log("key value: ", e.target.value);

		if (e.target.value.match("^$") != null) {
			setPrice(0);
			setpriceValue("");
		} else if (e.target.value.match("^0$") != null) {
			setPrice(0);
			setpriceValue("0");
		} else if (e.target.value.match("^\\d+$") != null) {
			setPrice(e.target.value);
			setpriceValue(e.target.value);
		} else if (e.target.value.match("^\\d+\\.$") != null) {
			setPrice(e.target.value.slice(0, -1));
			setpriceValue(e.target.value);
		} else if (e.target.value.match("^\\d+\\.[0-9]*0+$") != null) {
			setPrice(parseFloat(e.target.value));
			setpriceValue(e.target.value);
		} else if (e.target.value.match("^\\d+\\.[0-9]*[1-9]+$") != null) {
			setPrice(e.target.value);
			setpriceValue(e.target.value);
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
					className="InputPrice"
					type="text"
					placeholder="Price"
					maxLength={18}
					value={priceValue}
					onChange={checkInputPrice}
				/>

				{ifInputAmount && (
					<div className="Amount">
						<span className="str_Buy">Amount: </span>
						<input
							className="InputAmount"
							type="text"
							defaultValue={1}
							placeholder="Amount"
							maxLength={18}
							onChange={(e) => setAmount(e.target.value)}
						/>
						<span className="balance"> / Your Balance: {balance}</span>
					</div>
				)}
			</InputRow>

			<span className="notice">{notice}</span>
		</Wrapper>
	);
}


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
	grid-template-columns: 104px 146px auto;

	align-items: center;

	input {
		width: 146px;
		box-sizing: border-box;
		padding-top: 5px;
		padding-bottom: 5px;
		margin-left: 22px;
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

	.Amount {
		display: flex;
		align-items: center;
		box-sizing: border-box;
		
		margin-left: auto;

		input.InputAmount {
			margin-left: 10px;
		}
	}
`;

export default InputPrice;
