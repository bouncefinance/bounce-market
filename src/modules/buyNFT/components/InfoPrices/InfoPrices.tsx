import { Box, Grid, Tooltip, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { AuctionType } from 'modules/api/common/auctionType';
import { CancelPutTime } from 'modules/common/components/ProductCard/cancel';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'modules/uiKit/Button';
import React, { useCallback, useState } from 'react';
import { AuctionState } from '../../../api/common/AuctionState';
import { FixedSwapState } from '../../../api/common/FixedSwapState';
import { UserRole } from '../../../overview/actions/fetchWeb3PoolDetails';
import { Timer } from '../Timer';
import { useInfoPricesStyles } from './useInfoPricesStyles';
import { ReactComponent as QuestionIcon } from '../../../common/assets/question.svg';

interface IInfoPricesProps {
  price: BigNumber;
  hasSetDirectPrice: boolean;
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
  poolType?: AuctionType;
  poolId?: number;
  saleTime: boolean;
}

export const InfoPrices = ({
  endDate,
  price,
  hasSetDirectPrice,
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
  poolType,
  poolId,
  saleTime,
}: IInfoPricesProps) => {
  const classes = useInfoPricesStyles();
  const [isTimeOver] = useState(false);

  const renderButtons = useCallback(() => {
    if (state === FixedSwapState.Live && role === 'creator') {
      return poolType === AuctionType.FixedSwap_Timing ? (
        <CancelPutTime auctionType={poolType} id={poolId} />
      ) : (
        <Button
          variant="outlined"
          fullWidth
          onClick={onCancel}
          loading={loading}
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
      (state === AuctionState.CompletedByTime &&
        (role === 'buyer' || role === 'creator')) ||
      (state === AuctionState.Live &&
        isTimeOver &&
        (role === 'buyer' || role === 'creator'))
    ) {
      if (role === 'creator') {
        if (state === AuctionState.CompletedByDirectPurchase) {
          return (
            <>
              <Box mb={2}>{t('info-prices.status.Claimed.creator')}</Box>
              <Button
                variant="outlined"
                fullWidth
                onClick={onCreatorClaim}
                loading={loading}
                disabled={true}
              >
                {t('info-prices.claimed')}
              </Button>
            </>
          );
        } else {
          return (
            <>
              <Box mb={2}>
                {t('info-prices.status.CompletedByDirectPurchase.creator')}
              </Box>
              <Button
                variant="outlined"
                fullWidth
                onClick={onCreatorClaim}
                loading={loading}
              >
                {t('info-prices.claim')}
              </Button>
            </>
          );
        }
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
              loading={loading}
            >
              {t('info-prices.claim')}
            </Button>
          </>
        );
      } else {
        return (
          <Box mb={2}>
            {t('info-prices.status.CompletedByDirectPurchase.others')}
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
              loading={loading}
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
              loading={loading}
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
      if (role === 'creator') {
        return <Box mb={2}>{t('info-prices.status.Claimed.creator')}</Box>;
      }

      return <Box mb={2}>{t('info-prices.status.Claimed.default')}</Box>;
    }

    if (state === AuctionState.Live && role === 'creator') {
      return <Box mb={2}>{t('info-prices.status.Live.creator')}</Box>;
    }

    return (
      <>
        {!disabled && onBidClick && (
          <Button disabled={saleTime} fullWidth onClick={onBidClick}>
            {t('details-nft.place-a-bid')}
          </Button>
        )}

        {hasSetDirectPrice && (
          <Box mt={2}>
            <Button
              disabled={saleTime || disabled}
              variant="outlined"
              fullWidth
              onClick={onBuyClick}
            >
              {disabled ? t('details-nft.sold-out') : t('details-nft.buy-now')}
            </Button>
          </Box>
        )}
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
    hasSetDirectPrice,
    poolType,
    poolId,
    saleTime,
  ]);

  const renderRoyalty = () => {
    return (
      <Box display="flex" alignItems="center" className={classes.rateDesc}>
        {t('info-prices.royalty.rate-desc', { rate: '3 %' })}

        <Tooltip title={t('info-prices.royalty.rate-desc-tip')}>
          <Box component="i" ml={1}>
            <QuestionIcon />
          </Box>
        </Tooltip>
      </Box>
    );
  };

  return (
    <Grid container spacing={3} alignItems="center">
      <Grid item xs={12} sm>
        {endDate && (
          <div className={classes.bid}>
            {t('details-nft.top-bid')}
            {saleTime || (
              <>
                <i className={classes.bidDevider} />
                <Timer endDate={endDate} />
              </>
            )}
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

      <Grid item xs={12} md={12} sm={12}>
        {renderRoyalty()}
      </Grid>
    </Grid>
  );
};
