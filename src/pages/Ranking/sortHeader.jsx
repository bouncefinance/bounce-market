import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import useWrapperIntl from '@/locales/useWrapperIntl'



export default function SortHeader (props) {
    const { classes, order, orderBy, onRequestSort, headCells } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    const { wrapperIntl } = useWrapperIntl()

    return (
        <TableHead>
            <TableRow>
                {
                    headCells.map((headCell, index) => {
                        return !headCell.sortable ? 
                        <Tooltip title={wrapperIntl(headCell.intlSpan)} placement="top" arrow key={index}>
                            <TableCell key={headCell.key} align="center">{wrapperIntl(headCell.label)}</TableCell>
                        </Tooltip>
                        :
                        <Tooltip title={wrapperIntl(headCell.intlSpan)} placement="top" arrow>
                            <TableCell
                                key={headCell.key}
                                // align={headCell.numeric ? 'right' : 'left'}
                                align="right"
                                padding={headCell.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === headCell.key ? order : false}
                            >
                                <TableSortLabel
                                    active={orderBy === headCell.key}
                                    direction={orderBy === headCell.key ? order : 'asc'}
                                    onClick={createSortHandler(headCell.key)}
                                >
                                    {wrapperIntl(headCell.label)}
                                    {orderBy === headCell.key ? (
                                        <span className={classes.visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </span>
                                    ) : null}
                                </TableSortLabel>
                            </TableCell>
                        </Tooltip>
                    })
                }
            </TableRow>
        </TableHead>
    )
}

SortHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
}

