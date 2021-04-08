import React from 'react'
import styled from 'styled-components'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const TableItemStyled = styled(TableRow)`
    width: 100%;
    display: flex;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(0,0,0,.1);

    .event {
        font-family: 'Helvetica Neue';
        font-weight: 'normal';
        font-size: 16px;
        line-height: 130.5%;
        color: rgba(31,25,27,0.8);
    }

    .data {
        font-family: Helvetica Neue;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 130.5%;
        color: #1F191B;
    }

    /* td{
        border: none;
        cursor: pointer;

        &:hover{
            color: rgba(26,87,243,1);
        }
    } */
`

export default function TableItem({ row }) {
    // console.log(row)
    return (
        <TableItemStyled>
            <TableCell className='event'>
                {row.Event}
            </TableCell>
            <TableCell className='data'>
                {row.Data}
            </TableCell>
        </TableItemStyled>

    )
}
