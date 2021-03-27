import React from 'react'
import styled from 'styled-components'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import icon_altAvatar from './assets/icon_altAvatar.svg'
import icon_ETH from './assets/icon_ETH.svg'

const TableItemStyled = styled(TableRow)`
    /* box-sizing: border-box;
    border-bottom: 1px solid rgba(0,0,0,.1); */
    display: flex;

    .From {
        width: 256px;
        display: flex;
        align-items: center;
        img{
            width: 20px;
            height: 20px;
            box-sizing: border-box;
            margin-right: 10px;
        }
    }

    .Price {
        width: 266px;
        display: flex;
        align-items: center;
        img{
            width: 20px;
            height: 20px;
            box-sizing: border-box;
            margin-right: 10px;
        }
    }

    .Expiration {
        width: 108px;
        display: flex;
        align-items: center;
    }
`

export default function TableItem({ row }) {
    // console.log(row)
    return (
        <TableItemStyled>
            <TableCell className="From">
                <img src={icon_altAvatar} alt="" />
                {row.From}
            </TableCell>
            <TableCell className="Price">
                <img src={icon_ETH} alt="" />
                {row.Price}
            </TableCell>
            <TableCell className="Expiration">
                {row.Expiration}
            </TableCell>
        </TableItemStyled>

    )
}
