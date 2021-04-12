import React, { useState } from "react";
import styled from "styled-components";

import icon_pull from "./assets/pull.svg";
import icon_instructions from "./assets/icon_instructions.svg";

import useWrapperIntl from '@/locales/useWrapperIntl'

const StyledDropdown = styled.div`
	cursor: pointer;
	box-sizing: border-box;
	

	.dropdownHeader {
		width: 540px;
		border: 1px solid rgba(0, 0, 0, 0.3);
		height:50px;
		line-height:50px;
		display: grid;
		grid-template-columns: 20px  20px 10px 69px 400px 12px;
		grid-template-areas: ". icon_instructions . str_Instructions . icon_arrow";
		align-items: center;

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
		padding: 12px 24px 19px 24px;
		box-sizing: border-box;
		border-left: 1px solid rgba(0, 0, 0, 0.2);
		border-right: 1px solid rgba(0, 0, 0, 0.2);
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);
		
		li {
			font-family: Helvetica Neue;
			font-style: normal;
			font-weight: normal;
			font-size: 13px;
			line-height: 17px;
			color: #111111;
			opacity: 0.5;

			margin-bottom: 7px;

			&:last-child {
				margin-bottom: 0;
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
	const [open, setOpen] = useState(true);
	
	const { wrapperIntl } = useWrapperIntl()

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
				<span className="str_Instructions">{wrapperIntl('MyProfile.MyGallery.InstructionsDropdown.Instructions')}</span>
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
