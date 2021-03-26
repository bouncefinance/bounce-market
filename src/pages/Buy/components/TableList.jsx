import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableItem from './TableItem'

const useStyles = makeStyles({
    TableHead: {
        height: '25px',
        backgroundColor: 'rgba(0,0,0,.06)',
        boxSizing: 'border-box',
    },
    TableHead: {
        width: 'max-content',
    },
});

function createData(From, Price, Expiration) {
    return { From, Price, Expiration };
}

const rows = [
    createData('Cindy Yi', 1, '19 hours ago'),
    createData('Cindy Yi', 1, '19 hours ago'),
    createData('Cindy Yi', 1, '19 hours ago'),
    createData('Cindy Yi', 1, '19 hours ago'),
];

export default function BasicTable() {
    const classes = useStyles();

    return (
        <TableContainer>
            <Table className={classes.table} aria-label="simple table">
                <TableHead className={classes.TableHead}>
                    <TableRow>
                        <TableCell className={classes.TableCell} style={{ width: 256 }} >From</TableCell>
                        <TableCell className={classes.TableCell} style={{ width: 266 }} >Price</TableCell>
                        <TableCell className={classes.TableCell} style={{ width: 108 }} >Expiration</TableCell>
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
