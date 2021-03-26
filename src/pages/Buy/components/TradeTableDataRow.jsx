import React from "react";
import styled from "styled-components";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";


import icon_altAvatar from "./assets/icon_altAvatar.svg";
import icon_ETH from "./assets/icon_ETH.svg";
import icon_Transfer from "./assets/icon_Transfer.svg";
import icon_Plus from "./assets/icon_Plus.svg";

const OffersTableDataRowStyled = styled(TableRow)`
	width: 100%;
	display: flex;
	box-sizing: border-box;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);

	.data {
		font-family: Helvetica Neue;
		font-style: normal;
		font-weight: 500;
		font-size: 16px;
		line-height: 130.5%;
		color: #1f191b;

		display: flex;
		align-items: center;
	}

	/* td{
        border: none;
        cursor: pointer;

        &:hover{
            color: rgba(26,87,243,1);
        }
    } */
`;

export default function OffersTableDataRow({ row }) {
	// console.log(row)
	return (
		<OffersTableDataRowStyled>
			<TableCell className="data">
				<img src={icon_Transfer} alt="" />
				{row.Event}
			</TableCell>
			<TableCell className="data">
				<img src={icon_ETH} alt="" />
				{row.Price}
			</TableCell>
			<TableCell className="data">
				<img src={icon_altAvatar} alt="" />
				{row.From}
			</TableCell>
			<TableCell >{row.To}</TableCell>
			<TableCell >{row.Date}</TableCell>
		</OffersTableDataRowStyled>
	);
}
