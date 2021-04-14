import { Container, Typography } from '@material-ui/core';
import { Section } from 'modules/uiKit/Section';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../../store/useAppDispatch';
import { t } from '../../../i18n/utils/intl';
import { MarketplaceActions } from '../../../marketplace/marketplaceActions';

export const Overview = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(MarketplaceActions.fetchMarketplaceItems());
  }, [dispatch]);
  return (
    <Section>
      <Container>
        <Typography>{t('foobar')}</Typography>
      </Container>
    </Section>
  );
};
