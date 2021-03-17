import React from 'react'
import styled from 'styled-components'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import icon_transfer from './assets/transfer.svg'
import icon_create from './assets/create.svg'

import default_img from './assets/default_img.svg'

const TableItemStyled = styled(TableRow)`
    font-family: 'Helvetica Neue';
    font-weight: 400;
    font-size: 16px;
    width: 100%;
    display: flex;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(0,0,0,.1);
    
    .event{
        img{
            margin-right: 10px;
        }
    }

    .item{
        display: flex;
        align-items: center;
        img{
            width: 44px;
            height: 44px;
            box-sizing: border-box;
            margin-right: 12px;
        }
    }

    td{
        border: none;
        cursor: pointer;

        &:hover{
            color: rgba(26,87,243,1);
        }
    }
`

export default function TableItem({ row }) {
    // console.log(row)
    return (
        <TableItemStyled>
            <TableCell className='event'>
                {row.Event === 'Transfer' && <img src={icon_transfer} alt="" />}
                {row.Event === 'Created' && <img src={icon_create} alt="" />}
                {row.Event}
            </TableCell>
            <TableCell className='item'>
                {row.Cover ? <img src={row.Cover} alt="" /> : <img src={default_img} alt="" />}
                {row.Item}
            </TableCell>
            <TableCell>
                {row.Quantity}
            </TableCell>
            <TableCell>
                {row.Status}
            </TableCell>
            <TableCell>
                {row.From}
            </TableCell>
            <TableCell>
                {row.To}
            </TableCell>
            <TableCell>
                {row.Date}
            </TableCell>
        </TableItemStyled>

    )
}
