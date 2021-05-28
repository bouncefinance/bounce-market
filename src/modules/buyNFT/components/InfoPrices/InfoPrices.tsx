import { Box, Button, Grid, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { t } from 'modules/i18n/utils/intl';
import React, { useCallback } from 'react';
import { Timer } from '../Timer';
import { useInfoPricesStyles } from './useInfoPricesStyles';
import { AuctionState } from '../../../common/const/AuctionState';
import { AuctionRole } from '../../../overview/actions/fetchWeb3PoolDetails';

interface IInfoPricesProps {
  price: BigNumber;
  cryptoPrice: BigNumber;
  cryptoCurrency: string;
  disabled: boolean;
  onBuyClick?: () => void;
  onBidClick?: () => void;
  onClaim?: () => void;
  endDate?: Date;
  state?: AuctionState;
  role?: AuctionRole;
}

export const InfoPrices = ({
  endDate,
  price,
  cryptoPrice,
  cryptoCurrency,
  disabled,
  onBuyClick,
  onBidClick,
  onClaim,
  state,
  role,
}: IInfoPricesProps) => {
  const classes = useInfoPricesStyles();

  const isTimeOver = endDate && new Date().getTime() > endDate.getTime();

  const renderButtons = useCallback(() => {
    if (
      state === AuctionState.CompletedByDirectPurchase ||
      state === AuctionState.CompletedByTime ||
      (state === AuctionState.Live && isTimeOver)
    ) {
      if (role === 'creator') {
        return (
          <>
            <Box mb={2}>
              {t('info-prices.status.CompletedByDirectPurchase.creator')}
            </Box>
            <Button variant="outlined" fullWidth onClick={onClaim}>
              {t('info-prices.claim')}
            </Button>
          </>
        );
      } else if (role === 'buyer') {
        return (
          <>
            <Box mb={2}>
              {t('info-prices.status.CompletedByDirectPurchase.buyer')}
            </Box>
            <Button variant="outlined" fullWidth onClick={onClaim}>
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
            <Button variant="outlined" fullWidth onClick={onClaim}>
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
            <Button variant="outlined" fullWidth onClick={onClaim}>
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
      return (
        <Box mb={2}>
          {t('info-prices.status.NotSoldByReservePrice.default')}
        </Box>
      );
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
  }, [disabled, isTimeOver, onBidClick, onBuyClick, onClaim, role, state]);

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
