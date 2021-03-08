import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableItem from './TableItem'

import alpaca_1 from './assets/alpaca_1.svg'

const useStyles = makeStyles({
    table: {
        width: '1100px',
        margin: '0 auto',
        marginTop: '32px',
        marginBottom: '83px'
    },
    TableHead: {
        height: '36px',
        backgroundColor: 'rgba(0,0,0,.06)',
        boxSizing: 'border-box',
    },
    TableCell: {
        padding: '10px 20px',
        color: 'rgba(31,25,27,.5)',
        fontFamily: 'Helvetica Neue',
        fontWeight: '500',
        fontSize: '14px',
        borderBottom: 'none'
    },
    TableRow: {
        height: '68px'
    }
});

function createData(Event, Item, Quantity, Status, From, To, Date, Cover = alpaca_1) {
    return { Event, Item, Quantity, Status, From, To, Date, Cover };
}

const rows = [
    createData('Transfer', 'Cindy Yi', 1, 'Listed', 'You', '64F804', '19 hours ago'),
    createData('Created', 'Cindy Yi', 1, 'Listed', 'You', '64F804', '19 hours ago'),
    createData('Transfer', 'Cindy Yi', 1, 'Listed', 'You', '64F804', '19 hours ago'),
    createData('Created', 'Cindy Yi', 1, 'Listed', 'You', '64F804', '19 hours ago'),
    createData('Transfer', 'Cindy Yi', 1, 'Listed', 'You', '64F804', '19 hours ago'),
    createData('Created', 'Cindy Yi', 1, 'Listed', 'You', '64F804', '19 hours ago'),
    createData('Transfer', 'Cindy Yi', 1, 'Listed', 'You', '64F804', '19 hours ago'),
];

export default function BasicTable() {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead className={classes.TableHead}>
                    <TableRow>
                        <TableCell className={classes.TableCell} >Event</TableCell>
                        <TableCell className={classes.TableCell} >Item</TableCell>
                        <TableCell className={classes.TableCell} >Quantity</TableCell>
                        <TableCell className={classes.TableCell} >Status</TableCell>
                        <TableCell className={classes.TableCell} >From</TableCell>
                        <TableCell className={classes.TableCell} >To</TableCell>
                        <TableCell className={classes.TableCell} >Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableItem key={index} row={row}></TableItem>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
