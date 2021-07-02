import { Box, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import {
  ProductCard,
  ProductCardSkeleton,
} from 'modules/common/components/ProductCard';
import React, { useEffect, useState } from 'react';
import { uid } from 'react-uid';
import { CardsList } from '../CardsList';

const demoData = new Array(3).fill(0);

export const LiveCards = () => {
  // for demo purpose
  const [loading, setLoading] = useState(true);

  // for demo purpose
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const renderedCards = demoData.map((_, i) => (
    <ProductCard
      isOnSale
      key={uid(i)}
      title="some Title"
      priceType="BNB"
      price={new BigNumber('0.03')}
      MediaProps={{
        category: 'image',
        src: `https://picsum.photos/400/300?random=${i + 1}`,
      }}
      id={i}
      poolId={23}
    />
  ));

  const renderedSkeletons = Array(3)
    .fill(0)
    .map((_, i) => <ProductCardSkeleton key={uid(i)} />);

  return (
    <Box mb={{ xs: 6, md: 10 }}>
      <Box mb={5}>
        <Typography variant="h2">⚡ Live</Typography>
      </Box>

      <CardsList>{loading ? renderedSkeletons : renderedCards}</CardsList>
    </Box>
  );
};
