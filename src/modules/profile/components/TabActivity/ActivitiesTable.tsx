import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { t } from '../../../i18n/utils/intl';
import { ActivitiesTableRow } from './ActivitiesTableRow';
import { uid } from 'react-uid';
import { IActivityTableItem } from '../../api/getActivity';

interface IActivitiesTableProps {
  data: IActivityTableItem[];
  classes: any;
}

export const ActivitiesTable = ({ data, classes }: IActivitiesTableProps) => {
  return (
    <TableContainer>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>{t('profile.activity.event')}</TableCell>
            <TableCell>{t('profile.activity.item')}</TableCell>
            <TableCell>{t('profile.activity.price')}</TableCell>
            <TableCell>{t('common.quantity')}</TableCell>
            <TableCell>{t('profile.activity.from')}</TableCell>
            <TableCell>{t('profile.activity.to')}</TableCell>
            <TableCell>{t('profile.activity.date')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(item => (
            <ActivitiesTableRow item={item} classes={classes} key={uid(item)} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
