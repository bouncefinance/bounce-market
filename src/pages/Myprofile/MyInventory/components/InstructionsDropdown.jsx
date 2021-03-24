import React, { useState } from "react";
import styled from "styled-components";

import icon_pull from "./assets/pull.svg";
import icon_instructions from "./assets/icon_instructions.svg";

const StyledDropdown = styled.div`
	cursor: pointer;
	box-sizing: border-box;
	border-bottom: 1px solid rgba(0, 0, 0, 0.3);

	.dropdownHeader {
		width: 740px;
		height: 20px;
		display: grid;
		grid-template-columns: 20px 10px 69px 619px 12px;
		grid-template-areas: "icon_instructions . str_Instructions . icon_arrow";
		align-items: center;

		margin-bottom: 20px;

		img.icon_instructions {
			grid-area: icon_instructions;
		}

		.str_Instructions {
			font-family: Helvetica Neue;
			font-style: normal;
			font-weight: bold;
			font-size: 12px;
			line-height: 15px;
			text-transform: capitalize;
			color: #1f191b;
			opacity: 0.7;

			grid-area: str_Instructions;
		}

		img.icon_arrow {
			grid-area: icon_arrow;

			transition: all 0.3s;
			&.up {
				transform: rotate(180deg);
			}

			&.down {
				transform: rotate(0deg);
			}
		}
	}

	ul {
		li {
			font-family: Helvetica Neue;
			font-style: normal;
			font-weight: normal;
			font-size: 16px;
			line-height: 19px;
			display: flex;
			align-items: center;
			color: #1f191b;

			margin-bottom: 7px;

			&:last-child {
				margin-bottom: 20px;
			}
		}
	}
`;

export default function InstructionsDropdown({
	layDownItems,
	width,
	height,
	className,
}) {
	// 这个组件的option 一定要传value属性
	const [open, setOpen] = useState(false);

	return (
		<StyledDropdown width={width} height={height} className={className}>
			<div
				className={`dropdownHeader ${open && "open"}`}
				onClick={() => {
					setOpen(!open);
				}}
			>
				<img
					className="icon_instructions"
					src={icon_instructions}
					alt=""
				/>
				<span className="str_Instructions">Instructions</span>
				<img
					className={`icon_arrow ${open ? "up" : "down"}`}
					src={icon_pull}
					alt=""
				/>
			</div>

			{open && (
				<ul className="layDownItems">
					{layDownItems.map((item, index) => {
						return (
							<li key={item.value + "_" + index}>{item.value}</li>
						);
					})}
				</ul>
			)}
		</StyledDropdown>
	);
}
