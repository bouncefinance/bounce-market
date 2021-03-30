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


function createData(From, Price, Expiration) {
	return { From, Price, Expiration };
}

const rows = [
	createData("You", "1ETH", "19 hours ago"),
	createData("JohnDoe1234", "1ETH", "1 days ago"),
	createData("You", "1ETH", "6 days ago"),
	createData("You", "1ETH", "19 hours ago"),
	createData("JohnDoe1234", "1ETH", "1 days ago"),
	createData("You", "1ETH", "6 days ago"),
	createData("You", "1ETH", "19 hours ago"),
	createData("JohnDoe1234", "1ETH", "1 days ago"),
	createData("You", "1ETH", "6 days ago"),
];

export default function DenseTable() {
	return (
		<StyledTableContainer>
			<Table stickyHeader aria-label="sticky table">
				<TableHead>
					<TableRow className="TableHeaderRow">
						<TableCell className="TableHeaderCell">From</TableCell>
						<TableCell className="TableHeaderCell">Price</TableCell>
						<TableCell className="TableHeaderCell">
							Expiration
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row, index) => (
						<TableRow key={index} className="TableBodyRow">
							<TableCell>
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
							<TableCell>
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
							<TableCell>
								<div className="CellWrapper">
									<span>{row.Expiration}</span>
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
	grid-area: OffersTable;
	max-height: 270px;

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
		height: 43px;
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
			}

			span.AccountName {
				margin-left: 10px;
			}

			span.PriceText {
				margin-left: 16px;
			}
		}
	}

	::-webkit-scrollbar {
		/*隐藏滚轮*/
		display: none;
	}
`;
