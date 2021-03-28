import React, { useState } from 'react'
import styled from 'styled-components'
// import icon_pull from '@assets/images/icon/pull.svg'
import { Collapse, ListItem, ListItemText } from '@material-ui/core'
import { ExpandLess, ExpandMore } from '@material-ui/icons'

const NewPullDownStyled = styled.div`
    .MuiListItem-button:hover{
        background-color: #fff!important;
    }
    .MuiTouchRipple-root{
        display: none;
    }
    .MuiListItem-gutters {
        padding-left: 0px;
        padding-right: 0px;
    }
    .nested{
        /* padding: 0px 16px; */
    }
    .MuiTypography-displayBlock{
        color: rgba(31,25,27,0.5);
    }
`

export default function NewPullDown ({ title, open, children }) {
    const [openCollapse, setOpenCollapse] = useState(open)

    const onHandleCollapse = () => {
        setOpenCollapse(!openCollapse)
    }
    return (
        <NewPullDownStyled>
            <ListItem button onClick={onHandleCollapse}>
                <ListItemText primary={title} />
                {openCollapse ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={openCollapse} timeout="auto" unmountOnExit>
                <div className="nested">
                    {children}
                </div>
            </Collapse>
        </NewPullDownStyled>
    )
}
