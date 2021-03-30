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
import icon_Plus from "./assets/icon_Plus.svg";

function createData(Event, Price, From, To, Date) {
	return { Event, Price, From, To, Date };
}

const rows = [
	createData(
		"Transfer",
		1,
		"1ETH",
		"@Scarlett_vf...",
		"@Scarlett_vf...",
		"19 hours ago"
	),
	createData(
		"Transfer",
		1,
		"1ETH",
		"@Scarlett_vf...",
		"@Scarlett_vf...",
		"19 hours ago"
	),
	createData(
		"Transfer",
		1,
		"1ETH",
		"@Scarlett_vf...",
		"@Scarlett_vf...",
		"19 hours ago"
	),
];

export default function DenseTable() {
	return (
		<StyledTableContainer>
			<Table stickyHeader aria-label="sticky table">
				<TableHead>
					<TableRow className="TableHeaderRow">
						<TableCell className="TableHeaderCell">Event</TableCell>
						<TableCell className="TableHeaderCell">
							Quantity
						</TableCell>
						<TableCell className="TableHeaderCell">Price</TableCell>
						<TableCell className="TableHeaderCell">From</TableCell>
						<TableCell className="TableHeaderCell">To</TableCell>
						<TableCell className="TableHeaderCell">Date</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row, index) => (
						<TableRow key={index} className="TableBodyRow">
							<TableCell className="TableCell">
								<div className="CellWrapper">
									<img
										className="EventIcon"
										src={icon_Plus}
										alt=""
									/>
									<span className="EventType">
										{row.Event}
									</span>
								</div>
							</TableCell>

							<TableCell className="TableCell">
								<div className="CellWrapper">
									<span className="QuantityAmount">
										{row.Quantity}
									</span>
								</div>
							</TableCell>

							<TableCell className="TableCell">
								<div className="CellWrapper">
									<img
										className="UnitIcon"
										src={icon_ETH}
										alt=""
									/>
									<span className="PriceText">
										{row.Price}
									</span>
								</div>
							</TableCell>

							<TableCell className="TableCell">
								<div className="CellWrapper">
									<img
										className="Avatar"
										src={icon_altAvatar}
										alt=""
									/>
									<span className="AccountName">
										{row.From}
									</span>
								</div>
							</TableCell>

							<TableCell className="TableCell">
								<div className="CellWrapper">
									<img
										className="Avatar"
										src={icon_altAvatar}
										alt=""
									/>
									<span className="AccountName">
										{row.To}
									</span>
								</div>
							</TableCell>

							<TableCell>
								<div className="CellWrapper">
									<span>{row.Date}</span>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</StyledTableContainer>
	);
}

const StyledTableContainer = styled(TableContainer)`
	grid-area: TradeTable;

	.TableHeaderRow {
		height: 36px;
		background-color: rgba(0, 0, 0, 0.06);

		.TableHeaderCell {
			font-family: Helvetica Neue;
			font-style: normal;
			font-weight: 500;
			font-size: 14px;
			line-height: 130.5%;
			color: #1f191b;
		}
	}

	.TableBodyRow {
		height: 52px;
		box-sizing: border-box;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);

		.CellWrapper {
			display: flex;
			align-items: center;

			span {
				font-family: Helvetica Neue;
				font-style: normal;
				font-weight: normal;
				font-size: 16px;
				line-height: 130.5%;
				color: #1f191b;

				display: inline-block;
				vertical-align: top;
			}

			span.AccountName {
				margin-left: 10px;
			}

			span.PriceText {
				margin-left: 16px;
			}

			span.EventType {
				margin-left: 10px;
			}
		}
	}

	::-webkit-scrollbar {
		/*隐藏滚轮*/
		display: none;
	}
`;
