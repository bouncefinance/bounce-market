import React, { useState } from "react";
import styled from "styled-components";

import icon_pull from "./assets/pull.svg";

const StyledDropdown = styled.div`
	width: 416px;

	cursor: pointer;

	display: grid;
	grid-template-rows: 20px 16px 1fr 22px;
	grid-template-areas:
		"top"
		"header"
		"content"
		"bottom";
`;

const Top = styled.div`
	border-top: 1px solid rgba(0, 0, 0, 0.1);

	grid-area: top;
`;

const Header = styled.div`
	width: 416px;
	display: grid;
	grid-template-columns: 1fr 12px;
	grid-template-areas: "title icon_arrow";
	justify-content: start;
	align-items: center;

	grid-area: header;

	.title {
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
`;


const Bottom = styled.div`
	grid-area: bottom;
`;

export default function NFTInfoDropdown({ title, content, className }) {
	// 这个组件的option 一定要传value属性
	const [open, setOpen] = useState(false);

	function renderContent(open, content) {
		if (open) return content;
	}

	return (
		<StyledDropdown className={className}>
			<Top />

			<Header
				className={`dropdownHeader ${open && "open"}`}
				onClick={() => {
					setOpen(!open);
				}}
			>
				<span className="title">{title}</span>
				<img
					className={`icon_arrow ${open ? "up" : "down"}`}
					src={icon_pull}
					alt=""
				/>
			</Header>

			{renderContent(open, content)}

			<Bottom />
		</StyledDropdown>
	);
}
