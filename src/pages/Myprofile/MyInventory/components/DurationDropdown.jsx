import React, { useState, useEffect } from "react";
import styled from "styled-components";

import icon_pull from "./assets/pull.svg";

const PullRadioBoxStyled = styled.div`
	cursor: pointer;
	position: relative;

	.select {
		width: ${({ width }) => {
			return width || "262px";
		}};
		height: ${({ height }) => {
			return height || "20px";
		}};
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		user-select: none;
		/* margin-top: 20px; */

		p.value {
			font-family: Helvetica Neue;
			font-style: normal;
			font-weight: 500;
			font-size: 14px;
			line-height: 17px;
			/* identical to box height */

			text-transform: capitalize;

			/* type/primary */

			color: #1f191b;
		}

		& > div {
			display: flex;
			font-size: 16px;
			color: rgba(0, 0, 0, 0.8);
			align-items: center;

			.prefix {
				margin-right: 6px;
				opacity: 0.4;
			}
		}

		& > img {
			transition: all 0.3s;
			&.up {
				transform: rotate(180deg);
			}

			&.down {
				transform: rotate(0deg);
			}
		}

		&.disabled {
			border: 1px solid rgba(0, 0, 0, 0.5);
			color: #000;
			opacity: 0.4;
			&:hover {
				border: 1px solid rgba(0, 0, 0, 0.6);
			}
		}
	}

	ul.options {
		position: absolute;
		width: ${({ width }) => {
			return width || "262px";
		}};
		max-height: 220px;
		box-sizing: border-box;
		overflow-x: hidden;
		background: #ffffff;
		border: 1px solid #eaeaea;
		box-sizing: border-box;
		box-shadow: 0px 1px 14px rgba(0, 0, 0, 0.1);
		margin-top: 5px;
		z-index: 1;

		li {
			width: 100%;
			height: 42px;
			line-height: 42px;
			font-family: Helvetica Neue;
			font-style: normal;
			font-weight: 500;
			font-size: 14px;
			color: #1f191b;
			padding: 0 42px;
			box-sizing: border-box;

			&:hover {
				background-color: #000;
				color: #ffffff;
			}

			&.check {
				background-size: 13px;
				background-position: 16px center;

				&:hover {
					color: #ffffff;
					background-color: #000;
					background-size: 13px;
					background-position: 16px center;
				}
			}
		}
	}
`;

export default function PullRadioBox({
	options,
	defaultValue,
	defaultItem,
	onChange,
	onValChange,
	disabled,
	prefix,
	style,
	width,
	height,
	marginTop,
	icon,
}) {
	// 这个组件的option 一定要传value属性
	const [open, setOpen] = useState(false);
	const [checkVal, setCheckVal] = useState(defaultValue || options[0].value);
	const [checkItem, setCheckItem] = useState(defaultItem || options[0]);

	useEffect(() => {
		onChange && onChange(checkItem);
		onValChange && onValChange(checkVal);
		// eslint-disable-next-line
	}, [checkVal]);

	return (
		<PullRadioBoxStyled
			style={style}
			width={width}
			height={height}
			marginTop={marginTop}
		>
			<div
				className={`select ${!disabled && open && "open"} ${
					disabled && "disabled"
				}`}
				onClick={() => {
					if (disabled) return;
					setOpen(!open);
				}}
			>
				<div>
					{prefix && <span className="prefix">{prefix}</span>}
					<p className="value">in {checkVal} days</p>
				</div>
				<img src={icon_pull} className={open ? "up" : "down"} alt="" />
			</div>

			{!disabled && open && (
				<ul className="options">
					{options.map((item, index) => {
						return (
							<li
								key={item.value + "_" + index}
								className={`${
									item.value === checkVal
										? "option check"
										: "option"
								}`}
								onClick={() => {
									setCheckVal(item.value);
									setCheckItem(item);
									setOpen(false);
								}}
							>
								In {item.value} days
							</li>
						);
					})}
				</ul>
			)}
		</PullRadioBoxStyled>
	);
}
