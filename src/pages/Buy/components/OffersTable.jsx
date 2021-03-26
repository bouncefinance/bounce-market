import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import OffersTableDataRow from "./OffersTableDataRow";

const useStyles = makeStyles({
    TableContainer: {
		maxHeight: 270,
        gridArea: "OffersTable",
    },
	table: {
		width: "620px",
		margin: "24px auto 0 auto",
	},
	TableHead: {
		height: "36px",
		backgroundColor: "rgba(0,0,0,.06)",
		boxSizing: "border-box",
	},
	TableCell: {
		padding: "10px 20px",
		borderBottom: "none",
		color: "rgba(31,25,27,0.5)",
		fontFamily: "Helvetica Neue",
		fontWeight: "500",
		fontSize: "14px",
	},
	TableRow: {
		height: "68px",
	},
});

export default function BasicTable(/* { offerList } */) {
	const classes = useStyles();

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

	return (
		<TableContainer className={classes.TableContainer}>
			<Table className={classes.Table} stickyHeader aria-label="simple table">
				<TableHead className={classes.TableHead}>
					<TableRow>
						<TableCell className={classes.TableCell}>
							From
						</TableCell>
						<TableCell className={classes.TableCell}>
							Price
						</TableCell>
						<TableCell className={classes.TableCell}>
							Expiration
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row, index) => (
						<OffersTableDataRow key={index} row={row}></OffersTableDataRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
