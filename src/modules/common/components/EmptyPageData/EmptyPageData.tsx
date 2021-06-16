import { Container, Typography } from '@material-ui/core';
import classNames from 'classnames';
import { useAccount } from 'modules/account/hooks/useAccount';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'modules/uiKit/Button';
import { Section } from 'modules/uiKit/Section';
import React, { useCallback } from 'react';
import { useEmptyPageDataStyles } from './useEmptyPageDataStyles';

interface IEmptyPageDataProps {
  className?: string;
  onNetworkChange?: () => void;
}

export const EmptyPageData = ({
  className,
  onNetworkChange,
}: IEmptyPageDataProps) => {
  const classes = useEmptyPageDataStyles();
  const {
    handleChangeNetworkToSupported,
    walletSupportNetworkChange,
    loading,
  } = useAccount();

  const onClick = useCallback(() => {
    handleChangeNetworkToSupported();
    if (typeof onNetworkChange === 'function') {
      onNetworkChange();
    }
  }, [handleChangeNetworkToSupported, onNetworkChange]);

  return (
    <Section className={classNames(classes.root, className)}>
      <Container>
        <Typography variant="h1" className={classes.title}>
          Whoops. Looks like there's no data.
        </Typography>

        <Typography variant="body1" className={classes.text}>
          Try to change the network to view the content of the page.
        </Typography>

        {walletSupportNetworkChange && (
          <Button
            onClick={onClick}
            loading={loading}
            className={classes.connectBtn}
          >
            {t('change-wallet.submit')}
          </Button>
        )}
      </Container>
    </Section>
  );
};
