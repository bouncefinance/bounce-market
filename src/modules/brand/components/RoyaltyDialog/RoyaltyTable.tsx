import React, { useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { t } from '../../../i18n/utils/intl';
import { IRoyaltyRowProps, RoyaltyTableRow } from './RoyaltyTableRow';
import { useRoyaltyTable } from './useRoyaltyDialogStyles';

interface IActivitiesTableProps {
  data: IRoyaltyRowProps[];
}

export const RoyaltyTable = ({ data }: IActivitiesTableProps) => {
  const classes = useRoyaltyTable();

  const EmptyText = () =>
    useMemo(() => {
      return <div className={classes.empty}>{t('royalty.table.empty')}</div>;
    }, []);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('royalty.table.item')}</TableCell>
            <TableCell>{t('royalty.table.price')}</TableCell>
            <TableCell>{t('royalty.table.quantity')}</TableCell>
            <TableCell>{t('royalty.table.fee')}</TableCell>
            <TableCell>{t('royalty.table.payout')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map(item => (
            <RoyaltyTableRow {...item} key={item.ctime.toString()} />
          ))}
        </TableBody>
      </Table>
      {!data?.length && <EmptyText />}
    </TableContainer>
  );
};
