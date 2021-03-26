import React from "react";
import styled from "styled-components";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import icon_altAvatar from "./assets/icon_altAvatar.svg";
import icon_ETH from "./assets/icon_ETH.svg";

const OffersTableDataRowStyled = styled(TableRow)`
	width: 100%;
	display: flex;
	box-sizing: border-box;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);

	/* .From {
		display: flex;
		align-items: center;

		img {
			width: 20px;
			height: 20px;
		}
	} */

	/* .Price {
		display: flex;
		align-items: center;

		img {
			width: 18px;
			height: 18px;
		}
	} */

	/* .From {
		display: grid;
		grid-template-columns: 20px auto;
		grid-template-rows: 1fr;
		column-gap: 10px;
		grid-template-areas: "Avatar FromName";
		align-items: center;

		img.Avatar {
			width: 20px;
			height: 20px;
			grid-area: Avatar;
		}

		span.FromName {
			font-family: Helvetica Neue;
			font-style: normal;
			font-weight: 500;
			font-size: 16px;
			line-height: 130.5%;
			color: #1f191b;

			grid-area: FromName;
		}
	} */
`;

export default function OffersTableDataRow({ row }) {
	// console.log(row)
	return (
		<OffersTableDataRowStyled>
			<TableCell className="From">
				<img className="Avatar" src={icon_altAvatar} alt="" />
				<span className="FromName">{row.From}</span>
			</TableCell>

			<TableCell className="Price">
				<img className="Icon" src={icon_ETH} alt="" />
				<span className="PriceValue">{row.Price}</span>
			</TableCell>

			<TableCell className="Expiration">{row.Expiration}</TableCell>
		</OffersTableDataRowStyled>
	);
}
