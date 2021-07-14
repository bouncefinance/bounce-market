import { Box, Typography } from '@material-ui/core';
import { useQuery } from '@redux-requests/react';
import { DropsDetailPoolState } from 'modules/api/getOneDropsDetail';
import { BuyNFTRoutesConfig } from 'modules/buyNFT/BuyNFTRoutes';
import {
  ProductCard,
  ProductCardSkeleton,
} from 'modules/common/components/ProductCard';
import { TokenSymbol } from 'modules/common/types/TokenSymbol';
import {
  getDropDetails,
  IGetDropDetails,
} from 'modules/drops/actions/getDropDetails';
import { t } from 'modules/i18n/utils/intl';
import React from 'react';
import { uid } from 'react-uid';
import { CardsList } from '../CardsList';

const SKELETONS_COUNT = 3;

export const LiveCards = () => {
  const { data, loading } = useQuery<IGetDropDetails | null>({
    type: getDropDetails.toString(),
  });

  const liveNfts = (data?.poolsInfo || []).filter(
    poolInfo => poolInfo.state === DropsDetailPoolState.Live,
  );

  const renderedCards = liveNfts.map(item => (
    <ProductCard
      isOnSale
      key={uid(item)}
      title={item.name}
      priceType={data?.tokenSymbol || TokenSymbol.BNB}
      price={item.price}
      MediaProps={{
        category: 'image',
        src: item.fileUrl,
      }}
      href={BuyNFTRoutesConfig.DetailsNFT.generatePath(
        item.poolId,
        item.poolType,
      )}
      // todo: id is needed to do likes
      id={0}
      poolId={item.poolId}
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
