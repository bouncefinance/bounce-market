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
    table: {
        width: '620px',
        margin: '24px auto 0 auto',
    },
    TableHead: {
        height: '36px',
        backgroundColor: 'rgba(0,0,0,.06)',
        boxSizing: 'border-box',
    },
    TableCell: {
        padding: '10px 20px',
        borderBottom: 'none',
        color: 'rgba(31,25,27,0.5)',
        fontFamily: 'Helvetica Neue',
        fontWeight: '500',
        fontSize: '14px',
    },
    TableRow: {
        height: '68px'
    }
});



export default function BasicTable({tableInfoList}) {
    const classes = useStyles();

    function createData(Event,Data) {
        return { Event, Data };
    }
    
    const rows = [
        createData('Contract address', tableInfoList.contractAddress),
        createData('Contract Name', tableInfoList.contractName),
        createData('Contact Symbol', tableInfoList.contactSymbol),
        createData('Total Supply', tableInfoList.totalSupply),
    ];

    return (
        <TableContainer>
            <Table className={classes.table} aria-label="simple table">
                <TableHead className={classes.TableHead}>
                    <TableRow>
                        <TableCell className={classes.TableCell} >Your information</TableCell>
                        <TableCell className={classes.TableCell} ></TableCell>
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
