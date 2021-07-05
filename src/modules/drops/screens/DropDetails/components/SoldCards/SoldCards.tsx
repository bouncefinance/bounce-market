import { Box, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import {
  ProductCard,
  ProductCardSkeleton,
} from 'modules/common/components/ProductCard';
import { t } from 'modules/i18n/utils/intl';
import React, { useEffect, useState } from 'react';
import { uid } from 'react-uid';
import { CardsList } from '../CardsList';

const demoData = new Array(2).fill(0);

export const SoldCards = () => {
  // for demo purpose
  const [loading, setLoading] = useState(true);

  // for demo purpose
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
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
        src: `https://picsum.photos/400/300?random=${i + 10}`,
      }}
      id={i}
      poolId={23}
    />
  ));

  const renderedSkeletons = Array(2)
    .fill(0)
    .map((_, i) => <ProductCardSkeleton key={uid(i)} />);

  return (
    <Box mb={5}>
      <Box mb={5}>
        <Typography variant="h2">{t('drop-details.sold')}</Typography>
      </Box>

      <CardsList>{loading ? renderedSkeletons : renderedCards}</CardsList>
    </Box>
  );
};
