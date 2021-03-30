import React from "react";
import styled from "styled-components";

import { Button } from "@components/UI-kit";

import pic_404 from "./pic_404.svg";

const Page = styled.div`
	width: 1100px;
	margin: 183px auto 183px auto;

	.PageBody {
		display: grid;
		grid-template-rows: repeat(3, max-content);
		justify-items: center;

		span.notice {
			font-family: Optima;
			font-style: normal;
			font-weight: bold;
			font-size: 20px;
			line-height: 24px;
			text-align: center;
			letter-spacing: 0.01em;
			color: #000000;
            
			padding-bottom: 8px;
		}

		img.img_ErrorCode {
			padding-bottom: 16.11px;
		}
	}
`;

function index() {
	return (
		<Page>
			<div className="PageBody">
				<span className="notice">Oops... Page not found</span>

				<img className="img_ErrorCode" src={pic_404} alt="" />

				<Button Primary value="Go Back" width="240px" height="48px" />
			</div>
		</Page>
	);
}

export default index;
