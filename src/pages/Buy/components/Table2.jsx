import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import styled from "styled-components";

import icon_altAvatar from "./assets/icon_altAvatar.svg";
import icon_ETH from "./assets/icon_ETH.svg";

const StyledTableContainer = styled(TableContainer)`
	grid-area: OffersTable;
	max-height: 270px;

	.TableHeaderRow {
		height: 36px;
		background-color: rgba(0, 0, 0, 0.06);
	}

	.TableHeaderCell {
		font-family: Helvetica Neue;
		font-style: normal;
		font-weight: 500;
		font-size: 14px;
		line-height: 130.5%;
		color: #1f191b;
	}

	.TableBodyRow {
		height: 52px;
		box-sizing: border-box;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}

	img {
		width: 20px;
		height: 20px;
		display: inline-block;
		vertical-align: top;
	}

	span {
		display: inline-block;
		vertical-align: top;
		font-family: Helvetica Neue;
		font-style: normal;
		font-weight: normal;
		font-size: 16px;
		line-height: 130.5%;
		color: #1f191b;
	}

	span.AccountName {
		margin-left: 10px;
	}

	span.PriceText {
		margin-left: 16px;
	}
`;

function createData(Event, Price, From, To, Date) {
	return { Event, Price, From, To, Date };
}

const rows = [
	createData("Transfer", "1ETH", "You", "64F804", "19 hours ago"),
	createData("Transfer", "1ETH", "You", "64F804", "19 hours ago"),
	createData("Transfer", "1ETH", "You", "64F804", "19 hours ago"),
	createData("Transfer", "1ETH", "You", "64F804", "19 hours ago"),
	createData("Transfer", "1ETH", "You", "64F804", "19 hours ago"),
	createData("Transfer", "1ETH", "You", "64F804", "19 hours ago"),
	createData("Transfer", "1ETH", "You", "64F804", "19 hours ago"),
	createData("Transfer", "1ETH", "You", "64F804", "19 hours ago"),
	createData("Transfer", "1ETH", "You", "64F804", "19 hours ago"),
];

export default function DenseTable() {
	return (
		<StyledTableContainer>
			<Table stickyHeader aria-label="sticky table">
				<TableHead>
					<TableRow className="TableHeaderRow">
						<TableCell className="TableHeaderCell">Event</TableCell>
						<TableCell className="TableHeaderCell">Price</TableCell>
						<TableCell className="TableHeaderCell">From</TableCell>
						<TableCell className="TableHeaderCell">To</TableCell>
						<TableCell className="TableHeaderCell">Date</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row, index) => (
						<TableRow key={index} className="TableBodyRow">
							<TableCell>
								<img
									className="EventIcon"
									src={icon_Plus}
									alt=""
								/>
								<span className="EventName">{row.Event}</span>
							</TableCell>

							<TableCell>
								<img
									className="icon_ETH"
									src={icon_ETH}
									alt=""
								/>
								<span className="PriceText">{row.Price}</span>
							</TableCell>

							<TableCell>
								<img
									className="icon_Avatar"
									src={icon_altAvatar}
									alt=""
								/>
								<span className="AccountName">{row.From}</span>
							</TableCell>

                            <TableCell>
								<img
									className="icon_Avatar"
									src={icon_altAvatar}
									alt=""
								/>
								<span className="AccountName">{row.To}</span>
							</TableCell>

							<TableCell>
								<span>{row.Date}</span>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</StyledTableContainer>
	);
}
