import { Box, Container, Typography } from '@material-ui/core';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'modules/uiKit/Button';
import { Section } from 'modules/uiKit/Section';
import React from 'react';
import { useNotConnectedStyles } from './useNotConnectedStyles';

interface INotConnectedProps {
  onConnect: () => void;
  isLoading?: boolean;
}

export const NotConnected = ({
  onConnect,
  isLoading = false,
}: INotConnectedProps) => {
  const classes = useNotConnectedStyles();

  return (
    <Section>
      <Container>
        <Box mb={3} textAlign="center">
          <Typography variant="h2">{t('not-connected.title')}</Typography>
        </Box>

        <Box textAlign="center">
          <Button
            className={classes.btn}
            onClick={onConnect}
            disabled={isLoading}
            size="large"
          >
            {t('common.connect')}
          </Button>
        </Box>
      </Container>
    </Section>
  );
};
