import * as React from 'react';
import { Typography } from '@material-ui/core';
import { t } from '../../../i18n/utils/intl';
import { useAppDispatch } from '../../../../store/useAppDispatch';
import { useEffect } from 'react';
import { MarketplaceActions } from '../../../marketplace/marketplaceActions';

export const Overview = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(MarketplaceActions.fetchMarketplaceItems());
  }, [dispatch]);
  return (
    <>
      <Typography>{t('foobar')}</Typography>
    </>
  );
};
