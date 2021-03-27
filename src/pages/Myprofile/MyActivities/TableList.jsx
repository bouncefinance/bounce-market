import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableItem from './TableItem'

import { QueryActivity } from '@/utils/apollo';
import { useLazyQuery } from '@apollo/client';
import { useActiveWeb3React } from '@/web3';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

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

export default function BasicTable() {
    const classes = useStyles();

    const { active, account } = useActiveWeb3React();
    const [list, setList] = useState([]);

    const handleActivities = (data) => {
        const createPool = data.poolCreates.map(item => ({
            Event: 'Created',
            timestamp: item.timestamp,
            Date: formatDistanceToNow(item.timestamp * 1000),
            Quantity: '1',
            Price: '--',
            From: '',
            To: '',
        }))
        const swapPool = data.poolSwaps.map(item => ({
            Event: 'Buy',
            timestamp: item.timestamp,
            Date: formatDistanceToNow(item.timestamp * 1000),
            Quantity: '1',
            Price: '--',
            From: '',
            To: '',
        }));
        const cancelPool = data.poolCancels.map(item => ({
            Event: 'Cancel',
            timestamp: item.timestamp,
            Date: formatDistanceToNow(item.timestamp * 1000),
            Quantity: '1',
            Price: '--',
            From: '',
            To: '',
        }));
        const auctionCreates = data.auctionCreates.map(item => ({
            Event: 'Created',
            timestamp: item.timestamp,
            Date: formatDistanceToNow(item.timestamp * 1000),
            Quantity: '1',
            Price: '--',
            From: '',
            To: '',
        }));
        const auctionBids = data.auctionBids.map(item => ({
            Event: 'Bid',
            timestamp: item.timestamp,
            Date: formatDistanceToNow(item.timestamp * 1000),
            Quantity: '1',
            Price: '--',
            From: '',
            To: '',
        }));
        const auctionClaims = data.auctionClaims.map(item => ({
            vent: 'Claim',
            timestamp: item.timestamp,
            Date: formatDistanceToNow(item.timestamp * 1000),
            Quantity: '1',
            Price: '--',
            From: '',
            To: '',
        }));
        const list = createPool.concat(swapPool)
            .concat(cancelPool)
            .concat(auctionCreates)
            .concat(auctionBids)
            .concat(auctionClaims)
            .sort((a, b) => {
            return b.timestamp - a.timestamp
        });
        setList(list);
    }

    const [getActivities, { data }] = useLazyQuery(QueryActivity, {
        variables: { user: account ? account.toLowerCase() : account},
        onCompleted: () => {
            handleActivities(data);
        }
    });

    useEffect(() => {
        if (!active) return;
        getActivities();
    }, [active, getActivities]);

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead className={classes.TableHead}>
                    <TableRow>
                        <TableCell className={classes.TableCell} >Event</TableCell>
                        <TableCell className={classes.TableCell} >Quantity</TableCell>
                        <TableCell className={classes.TableCell} >Price</TableCell>
                        <TableCell className={classes.TableCell} >Item</TableCell>
                        <TableCell className={classes.TableCell} >From</TableCell>
                        <TableCell className={classes.TableCell} >To</TableCell>
                        <TableCell className={classes.TableCell} >Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {list.map((row, index) => (
                        <TableItem key={index} row={row}></TableItem>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
