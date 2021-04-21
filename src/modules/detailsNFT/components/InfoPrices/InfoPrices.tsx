import { Box, Button, Grid, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import React from 'react';
import { Timer } from '../Timer';
import { useInfoPricesStyles } from './useInfoPricesStyles';

interface IInfoPricesProps {
  endDate: Date;
  price: BigNumber;
  currency: string;
  cryptoPrice: BigNumber;
  cryptoCurrency: string;
  onBuyClick?: () => void;
  onBidClick?: () => void;
}

export const InfoPrices = ({
  endDate,
  price,
  currency,
  cryptoPrice,
  cryptoCurrency,
  onBidClick,
  onBuyClick,
}: IInfoPricesProps) => {
  const classes = useInfoPricesStyles();

  return (
    <Grid container spacing={3} alignItems="center">
      <Grid item xs={12} sm>
        <div className={classes.bid}>
          Top Bid
          <i className={classes.bidDevider} />
          {/* new Date(2021, 3, 30) */}
          <Timer endDate={endDate} />
        </div>

        <Typography variant="h2" component="h4" className={classes.cryptoPrice}>
          {`${cryptoPrice.toFormat()} ${cryptoCurrency}`}
        </Typography>

        <Typography className={classes.price} color="textSecondary">
          {`${currency}${price.toFormat()}`}
        </Typography>
      </Grid>

      <Grid item xs={12} sm={5}>
        <Box mb={2}>
          <Button fullWidth onClick={onBidClick}>
            Place a bid
          </Button>
        </Box>

        <Button variant="outlined" fullWidth onClick={onBuyClick}>
          Buy now
        </Button>
      </Grid>
    </Grid>
  );
};
