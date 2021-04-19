import React from 'react'
import styled from 'styled-components'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
// import { Button } from '@components/UI-kit'

import icon_transfer from './assets/transfer.svg'
import icon_create from './assets/create.svg'

import default_img from './assets/default_img.svg'
import { getEllipsisAddress } from '@/utils/utils';
import useWrapperIntl from '@/locales/useWrapperIntl'
import { VideoItem } from '../../component/Other/videoItem'
import { AutoStretchBaseWidthOrHeightImg } from '../../component/Other/autoStretchBaseWidthOrHeightImg'

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

        width: 260px;

        img{
            width: 44px;
            height: 44px;
            box-sizing: border-box;
            margin-right: 12px;
        }

        .itemName {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
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

const ModifyDate = (date) => {
    const { wrapperIntl } = useWrapperIntl()

    /* about */
    date = (
        date.search("about") !== -1
        ?
        date.replace("about", wrapperIntl("MyProfile.MyActivities.TableItem.about"))
        :
        date
    )

        /* minute */
    date = (
        date.search("minutes") !== -1
        ?
        date.replace("minutes", wrapperIntl("MyProfile.MyActivities.TableItem.minutes"))
        :
        date.search("minute") !== -1
        ?
        date.replace("minute", wrapperIntl("MyProfile.MyActivities.TableItem.minute"))
        :
        date
    )

    /* hour */
    date = (
        date.search("hours") !== -1
        ?
        date.replace("hours", wrapperIntl("MyProfile.MyActivities.TableItem.hours"))
        :
        date.search("hour") !== -1
        ?
        date.replace("hour", wrapperIntl("MyProfile.MyActivities.TableItem.hour"))
        :
        date
    )

        /* day */
    date = (
        date.search("days") !== -1
        ?
        date.replace("days", wrapperIntl("MyProfile.MyActivities.TableItem.days"))
        :
        date.search("day") !== -1
        ?
        date.replace("day", wrapperIntl("MyProfile.MyActivities.TableItem.day"))
        :
        date
    )

    return date
}

export default function TableItem({ row }) {
    const { wrapperIntl } = useWrapperIntl()
    // console.log(row)
    return (
        <TableItemStyled>
            <TableCell className='event'>
                {row.event === 'Transfer' && <img src={icon_transfer} alt="" />}
                {row.event === 'Created' && <img src={icon_create} alt="" />}
                {
                    row.event === 'Transfer'
                    ?
                    wrapperIntl("MyProfile.MyActivities.TableItem.Transfer")
                    :
                    wrapperIntl("MyProfile.MyActivities.TableItem.Created")
                }
            </TableCell>
            <TableCell className='item'>

                <div style={{display: 'inline-block', marginRight: '12px'}}>
                    {row.category && row.category === 'video' ?
                        <VideoItem width={44} height={44} src={row.cover} /> :
                        <AutoStretchBaseWidthOrHeightImg width={44} height={44} src={row.cover} />}
                </div>
                <span className="itemName">{row.item}</span>
            </TableCell>
            <TableCell>
                {row.quantity}
            </TableCell>
            {/* <TableCell>
                {row.status}
            </TableCell> */}
            <TableCell>
                {getEllipsisAddress(row.from)}
            </TableCell>
            <TableCell>
                {getEllipsisAddress(row.to)}
            </TableCell>
            <TableCell>
                {/* {row.date} */}
                {
                    ModifyDate(row.date)
                }
            </TableCell>
            {/* <TableCell>
                {row.event === 'Transfer' && <Button>Detail</Button>}
            </TableCell> */}
        </TableItemStyled>

    )
}
