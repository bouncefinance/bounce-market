import { Box, Button, Grid, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { t } from 'modules/i18n/utils/intl';
import React, { useCallback, useState } from 'react';
import { Timer } from '../Timer';
import { useInfoPricesStyles } from './useInfoPricesStyles';
import { AuctionState } from '../../../common/const/AuctionState';
import { UserRole } from '../../../overview/actions/fetchWeb3PoolDetails';
import { FixedSwapState } from '../../../common/const/FixedSwapState';

interface IInfoPricesProps {
  price: BigNumber;
  cryptoPrice: BigNumber;
  cryptoCurrency: string;
  disabled: boolean;
  loading: boolean;
  onBuyClick?: () => void;
  onBidClick?: () => void;
  onBidderClaim?: () => void;
  onCreatorClaim?: () => void;
  endDate?: Date;
  state: AuctionState | FixedSwapState;
  role?: UserRole;
  onCancel?: () => void;
}

export const InfoPrices = ({
  endDate,
  price,
  cryptoPrice,
  cryptoCurrency,
  disabled,
  loading,
  onBuyClick,
  onBidClick,
  onBidderClaim,
  onCreatorClaim,
  state,
  role,
  onCancel,
}: IInfoPricesProps) => {
  const classes = useInfoPricesStyles();

  // TODO: Update it on time over https://fangible.atlassian.net/browse/FAN-157
  const [isTimeOver] = useState(false);

  const renderButtons = useCallback(() => {
    if (state === FixedSwapState.Live && role === 'creator') {
      return (
        <Button
          variant="outlined"
          fullWidth
          onClick={onCancel}
          disabled={loading}
        >
          {t('info-prices.cancel')}
        </Button>
      );
    }

    if (state === FixedSwapState.Canceled) {
      return <Typography>{t('info-prices.canceled')}</Typography>;
    }

    if (
      state === AuctionState.CompletedByDirectPurchase ||
      (state === AuctionState.CompletedByTime && role === 'buyer') ||
      (state === AuctionState.Live && isTimeOver && role === 'buyer')
    ) {
      if (role === 'creator') {
        return (
          <>
            <Box mb={2}>
              {t('info-prices.status.CompletedByDirectPurchase.creator')}
            </Box>
          </>
        );
      } else if (role === 'buyer') {
        return (
          <>
            <Box mb={2}>
              {t('info-prices.status.CompletedByDirectPurchase.buyer')}
            </Box>
            <Button
              variant="outlined"
              fullWidth
              onClick={onBidderClaim}
              disabled={disabled || loading}
            >
              {t('info-prices.claim')}
            </Button>
          </>
        );
      } else {
        return (
          <Box mb={2}>
            {t('info-prices.status.CompletedByDirectPurchase.buyer')}
          </Box>
        );
      }
    }

    if (state === AuctionState.NotSoldByReservePrice) {
      if (role === 'creator') {
        return (
          <>
            <Box mb={2}>
              {t('info-prices.status.NotSoldByReservePrice.creator')}
            </Box>
            <Button
              variant="outlined"
              fullWidth
              onClick={onCreatorClaim}
              disabled={loading}
            >
              {t('info-prices.claim')}
            </Button>
          </>
        );
      } else if (role === 'buyer') {
        return (
          <>
            <Box mb={2}>
              {t('info-prices.status.NotSoldByReservePrice.buyer')}
            </Box>
            <Button
              variant="outlined"
              fullWidth
              onClick={onBidderClaim}
              disabled={loading}
            >
              {t('info-prices.claim')}
            </Button>
          </>
        );
      } else {
        return (
          <Box mb={2}>
            {t('info-prices.status.NotSoldByReservePrice.others')}
          </Box>
        );
      }
    }

    if (state === AuctionState.Claimed) {
      return <Box mb={2}>{t('info-prices.status.Claimed.default')}</Box>;
    }

    if (state === AuctionState.Live && role === 'creator') {
      return <Box mb={2}>{t('info-prices.status.Live.creator')}</Box>;
    }

    return (
      <>
        {!disabled && onBidClick && (
          <Box mb={2}>
            <Button fullWidth onClick={onBidClick}>
              {t('details-nft.place-a-bid')}
            </Button>
          </Box>
        )}

        <Button
          disabled={disabled}
          variant="outlined"
          fullWidth
          onClick={onBuyClick}
        >
          {disabled ? t('details-nft.sold-out') : t('details-nft.buy-now')}
        </Button>
      </>
    );
  }, [
    state,
    role,
    isTimeOver,
    disabled,
    onBidClick,
    onBuyClick,
    onCancel,
    loading,
    onBidderClaim,
    onCreatorClaim,
  ]);

  return (
    <Grid container spacing={3} alignItems="center">
      <Grid item xs={12} sm>
        {endDate && (
          <div className={classes.bid}>
            {t('details-nft.top-bid')}
            <i className={classes.bidDevider} />
            <Timer endDate={endDate} />
          </div>
        )}

        <Typography variant="h2" component="h4" className={classes.cryptoPrice}>
          {`${cryptoPrice.toFormat()} ${cryptoCurrency}`}
        </Typography>

        <Typography className={classes.price} color="textSecondary">
          {t('unit.$-value', { value: price.toFormat() })}
        </Typography>
      </Grid>

      <Grid item xs={12} sm={5}>
        {renderButtons()}
      </Grid>
    </Grid>
  );
};
