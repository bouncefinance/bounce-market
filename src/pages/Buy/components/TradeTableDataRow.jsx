import React from "react";
import styled from "styled-components";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

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
			<TableCell className="data">{row.Event}</TableCell>
			<TableCell className="data">{row.Price}</TableCell>
			<TableCell className="data">{row.From}</TableCell>
			<TableCell className="data">{row.To}</TableCell>
			<TableCell className="data">{row.Date}</TableCell>
		</OffersTableDataRowStyled>
	);
}
