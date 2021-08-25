import { Box, Typography } from '@material-ui/core';
import { ProductCardSkeleton } from 'modules/common/components/ProductCard';
import { IGetDropDetails } from 'modules/drops/actions/getDropDetails';
import { t } from 'modules/i18n/utils/intl';
import { MarketNftCard } from 'modules/market/components/Products/nftCard';
import { uid } from 'react-uid';
import { CardsList } from '../CardsList';

const SKELETONS_COUNT = 2;

export const SoldCards = ({
  loading,
  data,
}: {
  loading: boolean;
  data: IGetDropDetails | null;
}) => {
  const soldNfts = (data?.poolsInfo || []).filter(poolInfo => poolInfo.isClose);

  const renderedCards = soldNfts.map(item => (
    <MarketNftCard
      item={item}
      key={uid(item)}
      tokenSymbol={data?.tokenSymbol ?? ''}
    />
  ));

  const renderedSkeletons = Array(SKELETONS_COUNT)
    .fill(0)
    .map((_, i) => <ProductCardSkeleton key={uid(i)} />);

  if (!loading && !soldNfts.length) {
    return null;
  }

  return (
    <Box mb={5}>
      <Box mb={5}>
        <Typography variant="h2">{t('drop-details.sold')}</Typography>
      </Box>

      <CardsList>{loading ? renderedSkeletons : renderedCards}</CardsList>
    </Box>
  );
};
