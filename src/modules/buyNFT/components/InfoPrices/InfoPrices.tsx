import { Box, Button, Grid, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { t } from 'modules/i18n/utils/intl';
import React from 'react';
import { Timer } from '../Timer';
import { useInfoPricesStyles } from './useInfoPricesStyles';

interface IInfoPricesProps {
  price: BigNumber;
  cryptoPrice: BigNumber;
  cryptoCurrency: string;
  disabled: boolean;
  onBuyClick?: () => void;
  onBidClick?: () => void;
  endDate?: Date;
}

export const InfoPrices = ({
  endDate,
  price,
  cryptoPrice,
  cryptoCurrency,
  disabled,
  onBidClick,
  onBuyClick,
}: IInfoPricesProps) => {
  const classes = useInfoPricesStyles();
  return (
    <Grid container spacing={3} alignItems="center">
      <Grid item xs={12} sm>
        {endDate && (
          <div className={classes.bid}>
            {t('details-nft.top-bid')}
            <i className={classes.bidDevider} />
            {/* new Date(2021, 3, 30) */}
            <Timer endDate={endDate} />
          </div>
        )}

        <Typography variant="h2" component="h4" className={classes.cryptoPrice}>
          {`${cryptoPrice.toFormat()} ${cryptoCurrency}`}
        </Typography>

        <Typography className={classes.price} color="textSecondary">
          {t('wallet.$-value', { value: price.toFormat() })}
        </Typography>
      </Grid>

      <Grid item xs={12} sm={5}>
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
      </Grid>
    </Grid>
  );
};
