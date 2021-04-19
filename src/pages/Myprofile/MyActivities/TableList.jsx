import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableItem from './TableItem'

import { QueryFromActivities, QueryToActivities } from '@/utils/apollo';
import { useLazyQuery } from '@apollo/client';
import { useActiveWeb3React } from '@/web3';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import useAxios from '@/utils/useAxios';
import { Controller } from '@/utils/controller';
import useWrapperIntl from '@/locales/useWrapperIntl'

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
    const { sign_Axios } = useAxios();

    const handleActivities = (data) => {
        const activities = data.map(item => ({
            ...item,
            date: formatDistanceToNow(item.timestamp * 1000),
            status: item.event === 'Cancel' || item.event === 'Claim' ? wrapperIntl("Unlisted") : wrapperIntl("Listed"),
        }));
        const tokenList = activities.map(item => item.tokenId);
        sign_Axios.post(Controller.items.getitemsbyids, {
            ids: tokenList
        })
        .then(res => {
            if (res.status === 200 && res.data.code === 1) {
                const items = res.data.data;
                const list = items.map(item => {
                    const activity = activities.find(issue => issue.tokenId === item.id);
                    console.log(item)
                    return {
                        ...activity,
                        cover: item.fileurl,
                        item: item.itemname,
                        category: item.category,
                    }
                })
                console.log(list)
                setList(list.sort((a, b) => b.timestamp - a.timestamp));
            }
        })
    }

    const [fromData, setFromData] = useState([]);

    const [getToActivities, toData] = useLazyQuery(QueryToActivities, {
        variables: { user: String(account).toLowerCase()},
        fetchPolicy:"network-only",
        onCompleted: () => {
            const data = fromData.activities.concat(toData.data.activities);
            handleActivities(data);
        }
    });

    const handleFromActivities = (fromData) => {
        getToActivities(fromData)
    }

    const [getFromActivities, { data }] = useLazyQuery(QueryFromActivities, {
        variables: { user: String(account).toLowerCase()},
        fetchPolicy:"network-only",
        onCompleted: () => {
            setFromData(data);
            handleFromActivities();
        }
    });

    useEffect(() => {
        if (!active) return;
        getFromActivities();
    }, [active, getFromActivities]);

    const { wrapperIntl } = useWrapperIntl()

    return (
        <TableContainer>
            <Table className={classes.table} aria-label="simple table">
                <TableHead className={classes.TableHead}>
                    <TableRow>
                        <TableCell className={classes.TableCell} >{wrapperIntl("MyProfile.MyActivities.TableList.Event")}</TableCell>
                        <TableCell className={classes.TableCell} >{wrapperIntl("MyProfile.MyActivities.TableList.Item")}</TableCell>
                        <TableCell className={classes.TableCell} >{wrapperIntl("MyProfile.MyActivities.TableList.Quantity")}</TableCell>
                        {/* <TableCell className={classes.TableCell} >Status</TableCell> */}
                        <TableCell className={classes.TableCell} >{wrapperIntl("MyProfile.MyActivities.TableList.From")}</TableCell>
                        <TableCell className={classes.TableCell} >{wrapperIntl("MyProfile.MyActivities.TableList.To")}</TableCell>
                        <TableCell className={classes.TableCell} >{wrapperIntl("MyProfile.MyActivities.TableList.Date")}</TableCell>
                        {/* <TableCell className={classes.TableCell} >operation</TableCell> */}
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
