import {
  Avatar,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { formatDistance } from 'date-fns';
import { t } from 'modules/i18n/utils/intl';
import { Img } from 'modules/uiKit/Img';
import React, { useCallback } from 'react';
import { TransferIcon } from './assets/TransferIcon';
import { useActivityTableStyles } from './useActivityTableStyles';

const data = [
  {
    event: 'Transfer',
    img: 'https://picsum.photos/52/52?random=1',
    name: 'Exquisite Rare Portraits #3/10',
    price: new BigNumber(1000),
    currency: 'BNB',
    quantity: 1,
    date: new Date(),
    from: {
      img: 'https://picsum.photos/24/24?random=1',
      name: 'Porkin_Hoomans',
    },
    to: {
      img: 'https://picsum.photos/24/24?random=2',
      name: 'Other guy',
    },
  },
  {
    event: 'Transfer',
    img: 'https://picsum.photos/52/52?random=2',
    name: 'Asdsad agsdfsdgas dasd ',
    price: new BigNumber(1.5692169),
    currency: 'BNB',
    quantity: 1,
    date: new Date(),
    from: {
      img: 'https://picsum.photos/24/24?random=3',
      name: 'Porkin_Hoomans',
    },
    to: {
      img: 'https://picsum.photos/24/24?random=4',
      name: 'Other guy',
    },
  },
];

const PRICE_PRECISION = 4;

interface IActivityTableProps {
  className?: string;
}

export const ActivityTable = ({ className }: IActivityTableProps) => {
  const classes = useActivityTableStyles();

  const renderProfileInfo = useCallback(
    (img: string, name: string) => {
      return (
        <Box display="flex" alignItems="center">
          <Avatar className={classes.avatar} src={img} />
          <div className={classes.name}>{name}</div>
        </Box>
      );
    },
    [classes],
  );

  return (
    <TableContainer>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>{t('profile.activity.event')}</TableCell>
            <TableCell>{t('profile.activity.item')}</TableCell>
            <TableCell>{t('profile.activity.price')}</TableCell>
            <TableCell>{t('profile.activity.quantity')}</TableCell>
            <TableCell>{t('profile.activity.from')}</TableCell>
            <TableCell>{t('profile.activity.to')}</TableCell>
            <TableCell>{t('profile.activity.date')}</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map(row => {
            return (
              <TableRow>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <TransferIcon className={classes.eventIcon} />
                    {row.event}
                  </Box>
                </TableCell>

                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Img
                      className={classes.itemImg}
                      src={row.img}
                      ratio="1x1"
                    />
                    <div className={classes.itemTitle}>{row.name}</div>
                  </Box>
                </TableCell>

                <TableCell>
                  {row.price.decimalPlaces(PRICE_PRECISION).toFormat()}{' '}
                  {row.currency}
                </TableCell>

                <TableCell>{row.quantity}</TableCell>

                <TableCell>
                  {renderProfileInfo(row.from.img, row.from.name)}
                </TableCell>

                <TableCell>
                  {renderProfileInfo(row.to.img, row.to.name)}
                </TableCell>

                <TableCell>
                  {formatDistance(row.date, new Date(), {
                    addSuffix: true,
                  })}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
