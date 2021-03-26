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
		height: 100%;
		display: grid;
		grid-template-columns: 20px auto;
		column-gap: 10px;
		grid-template-areas: "Avatar FromName";
		align-items: center;

		img.Avatar {
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


	/* .Price {
		display: grid;
		grid-template-columns: 18px auto;
		column-gap: 16px;
		grid-template-areas: "Icon PriceValue";
		align-items: center;

		img.Icon {
			grid-area: Icon;
		}

		span.PriceValue {
			font-family: Helvetica Neue;
			font-style: normal;
			font-weight: 500;
			font-size: 16px;
			line-height: 130.5%;
			color: #1f191b;

			grid-area: PriceValue;
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
