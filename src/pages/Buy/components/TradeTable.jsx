import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TradeTableDataRow from "./TradeTableDataRow";

const useStyles = makeStyles({
    TableContainer: {
        gridArea: "TradeTable",
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

	return (
		<TableContainer className={classes.TableContainer}>
			<Table className={classes.Table} stickyHeader aria-label="simple table">
				<TableHead className={classes.TableHead}>
					<TableRow>
						<TableCell className={classes.TableCell}>
							Event
						</TableCell>
						<TableCell className={classes.TableCell}>
							Price
						</TableCell>
						<TableCell className={classes.TableCell}>
							From
						</TableCell>
						<TableCell className={classes.TableCell}>
							To
						</TableCell>
						<TableCell className={classes.TableCell}>
							Date
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row, index) => (
						<TradeTableDataRow key={index} row={row}></TradeTableDataRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
