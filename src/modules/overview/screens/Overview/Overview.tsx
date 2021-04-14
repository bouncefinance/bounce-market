import * as React from 'react';
import { useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { t } from '../../../i18n/utils/intl';
import { useAppDispatch } from '../../../../store/useAppDispatch';
import { connect } from '../../../wallet/connectionSlice';

export const Overview = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(connect());
  }, [dispatch]);
  return (
    <>
      <Typography>{t('foobar')}</Typography>
    </>
  );
};
