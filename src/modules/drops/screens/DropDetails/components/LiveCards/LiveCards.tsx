import { Box, Typography } from '@material-ui/core';
import { ProductCardSkeleton } from 'modules/common/components/ProductCard';
import { IGetDropDetails } from 'modules/drops/actions/getDropDetails';
import { t } from 'modules/i18n/utils/intl';
import { MarketNftCard } from 'modules/market/components/Products/nftCard';
import React from 'react';
import { uid } from 'react-uid';
import { CardsList } from '../CardsList';

const SKELETONS_COUNT = 3;

export const LiveCards = ({
  loading,
  data,
}: {
  loading: boolean;
  data: IGetDropDetails | null;
}) => {
  const liveNfts = (data?.poolsInfo || []).filter(poolInfo => poolInfo.isLive);

  const renderedCards = liveNfts.map(item => (
    <MarketNftCard
      item={item}
      key={uid(item)}
      tokenSymbol={data?.tokenSymbol ?? ''}
    />
  ));

  const renderedSkeletons = Array(SKELETONS_COUNT)
    .fill(0)
    .map((_, i) => <ProductCardSkeleton key={uid(i)} />);

  if (!loading && !liveNfts.length) {
    return null;
  }

  return (
    <Box mb={{ xs: 6, md: 10 }}>
      <Box mb={5}>
        <Typography variant="h2">⚡ {t('drop-details.live')}</Typography>
      </Box>

      <CardsList>{loading ? renderedSkeletons : renderedCards}</CardsList>
    </Box>
  );
};
