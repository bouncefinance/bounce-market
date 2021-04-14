import { Container, Typography } from '@material-ui/core';
import { Section } from 'modules/uiKit/Section';
import * as React from 'react';
import { t } from '../../../i18n/utils/intl';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useDispatchRequest } from '@redux-requests/react';
import { MarketplaceActions } from '../../../marketplace/marketplaceActions';

export const Overview = () => {
  const dispatchRequest = useDispatchRequest();
  useEffect(() => {
    dispatchRequest(MarketplaceActions.fetchPools());
  }, [dispatchRequest]);

  return (
    <Section>
      <Container>
        <Typography>{t('foobar')}</Typography>
      </Container>
    </Section>
  );
};
