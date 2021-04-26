import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableItem from './TableItem'

// import { QueryFromActivities } from '@/utils/apollo';
// import { useLazyQuery } from '@apollo/client';
import { useActiveWeb3React } from '@/web3';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import useAxios from '@/utils/useAxios';
import { Controller } from '@/utils/controller';
import useWrapperIntl from '@/locales/useWrapperIntl'
import axios from 'axios';
import to from 'await-to-js'

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
        // console.log('data', data)
        const activities = data.map(item => ({
            ...item,
            date: formatDistanceToNow((item.Timestamp || item.timestamp) * 1000),
            status: item.event === 'Cancel' || item.event === 'Claim' ? wrapperIntl("Unlisted") : wrapperIntl("Listed"),
        })).filter(item => parseInt(item.tokenId) <= 99999999999)
        const tokenList = activities.map(item => +item.tokenId);
        sign_Axios.post(Controller.items.getitemsbyids, {
            ids: tokenList
        })
            .then(res => {
                if (res.status === 200 && res.data.code === 1) {
                    const items = res.data.data;
                    console.log(activities, items)
                    const list = items.map(item => {
                        const activity = activities.find(issue => {
                            return (issue.tokenId | 0 === item.id) && (String(issue.contract).toLowerCase() === String(item.contractaddress).toLowerCase())
                        });
                        return {
                            ...activity,
                            cover: item.fileurl,
                            item: item.itemname,
                            category: item.category,
                        }
                    }).filter(item=>item.contract)
                    console.log(list)
                    setList(list.sort((a, b) => {
                        const time_a = a.Timestamp || a.timestamp
                        const time_b = b.Timestamp || b.timestamp
                        return time_b - time_a
                    }));
                }
            })
    }
    // eslint-disable-next-line
    // const [fromData, setFromData] = useState([]);

    // const [getToActivities, toData] = useLazyQuery(QueryToActivities, {
    //     variables: { user: String(account).toLowerCase() },
    //     fetchPolicy: "network-only",
    //     onCompleted: () => {
    //         const data = fromData.activities.concat(toData.data.activities);
    //         handleActivities(data);
    //     }
    // });


    const getToActivities = async (fromData) => {
        const [resErr, res] = await to(axios.get('activities', { params: { user_address: String(account).toLowerCase() } }))
        if(resErr){
            return
        }
        if (res?.data?.code === 200) {
            const data = res.data.data
            handleActivities(data);
        }
    }

    const handleFromActivities = (fromData) => {
        getToActivities(fromData)
    }


    useEffect(() => {
        if (!active) return;
        handleFromActivities();
        // eslint-disable-next-line
    }, [active]);

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
