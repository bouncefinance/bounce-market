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
import { IActivityItem, ActivityKeys } from '../../api/getActivity';

interface IActivitiesTableProps {
  data: IActivityItem[];
  tabKey: ActivityKeys;
  symbol: string;
}

export const ActivitiesTable = ({
  data,
  symbol,
  tabKey,
}: IActivitiesTableProps) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('profile.activity.event')}</TableCell>
            <TableCell>{t('profile.activity.item')}</TableCell>
            <TableCell>{t('profile.activity.price')}</TableCell>
            <TableCell>{t('common.quantity')}</TableCell>
            <TableCell>
              {tabKey === ActivityKeys.Sales
                ? t('profile.activity.to')
                : t('profile.activity.from')}
            </TableCell>

            <TableCell>{t('profile.activity.date')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .filter(item => item.contractaddress)
            ?.map(item => (
              <ActivitiesTableRow
                symbol={symbol}
                tabKey={tabKey}
                item={item}
                key={item.ctime.toString()}
                target="_self"
              />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
