import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, withStyles, Paper } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components';
import useWrapperIntl from '@/locales/useWrapperIntl'

import icon_buy from '@/assets/images/icon/event/buy.svg'
import icon_bid from '@/assets/images/icon/event/bid.svg'
import icon_transfer from '@/assets/images/icon/event/transfer.svg'
import icon_created from '@/assets/images/icon/event/created.svg'
import icon_list from '@/assets/images/icon/event/list.svg'

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

const StyledHeaderCell = withStyles((theme) => ({
  head: {
    backgroundColor: 'rgba(0,0,0,0.06)',
    color: '#1F191B',
    opacity: 0.5,
    borderBottom: 0,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)

const StyledTableCell = withStyles((theme) => ({
  head: {
    color: '#1F191B',
    opacity: 0.8,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    // '&:nth-of-type(odd)': {
    //   backgroundColor: theme.palette.action.hover,
    // },
  },
}))(TableRow)

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

export default function TradingHistory ({ rows = [] }) {
  const classes = useStyles()
  const { wrapperIntl } = useWrapperIntl()

  return <TradingHistoryStyled>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledHeaderCell>{wrapperIntl("pages.buy.TradeTable.Event")}</StyledHeaderCell>
            <StyledHeaderCell>{wrapperIntl("pages.buy.TradeTable.Quantity")}</StyledHeaderCell>
            <StyledHeaderCell>{wrapperIntl("pages.buy.TradeTable.Price")}</StyledHeaderCell>
            <StyledHeaderCell>{wrapperIntl("pages.buy.TradeTable.From")}</StyledHeaderCell>
            <StyledHeaderCell>{wrapperIntl("pages.buy.TradeTable.To")}</StyledHeaderCell>
            <StyledHeaderCell>{wrapperIntl("pages.buy.TradeTable.Date")}</StyledHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
              {/* {row.Event} */}
              {
                  row.Event === 'Buy' ? <img className="event_icon" src={icon_buy} alt="" /> :
                    row.Event === 'Bid' ? <img className="event_icon" src={icon_bid} alt="" /> :
                      row.Event === 'Transfer' ? <img className="event_icon" src={icon_transfer} alt="" /> :
                        row.Event === 'Created' ? <img className="event_icon" src={icon_created} alt="" /> :
                        row.Event === 'List' ? <img className="event_icon" src={icon_list} alt="" /> :
                          <></>
                }
                {
                  row.Event === 'Buy' ? wrapperIntl("pages.buy.TradeTable.Buy") :
                    row.Event === 'Bid' ? wrapperIntl("pages.buy.TradeTable.Bid") :
                      row.Event === 'Transfer' ? wrapperIntl("pages.buy.TradeTable.Transfer") :
                        row.Event === 'Created' ? wrapperIntl("pages.buy.TradeTable.Created") :
                          row.Event === 'List' ? wrapperIntl("pages.buy.TradeTable.Listed") :
                            row.Event
                }
              </StyledTableCell>
              <StyledTableCell>{row.Quantity}</StyledTableCell>
              <StyledTableCell><span className="price1">{row.Price[0]}</span><span className="price2">{row.Price[1]}</span></StyledTableCell>
              <StyledTableCell>
                <div className="from">{row.From}</div>
              </StyledTableCell>
              <StyledTableCell>
                <div className="to">{row.To}</div>
              </StyledTableCell>
              <StyledTableCell>{ModifyDate(row.Date)}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </TradingHistoryStyled>
}

const TradingHistoryStyled = styled.div`
font-family: Helvetica Neue;
position: relative;
&::after{
  content: "";
  display: block;
  width: 100%;
  height: 1px;
  background-color: #fff;
  position: absolute;
  bottom: 0px;
  left: 0px;
}
.MuiTableContainer-root{
  box-shadow: none!important;
  border-radius: 0px!important;
}
.nested{
  padding-bottom: 0px!important;
}
.event_icon{
  width: 10px;
  height: 10px;
  margin-right: 6px;
}
.MuiTableCell-root{
  padding: 9px 5px;
}
tbody{
  .MuiTableCell-root{
    font-weight: 600;
    font-size: 12px;
  }
  .price1{
    font-weight: 600;
    font-size: 12px;
  }
}
.from, .to{
  padding: 9px 5px;
  max-width: 80px;
  text-overflow: ellipsis;
  display: block;
  overflow: hidden;
}
`