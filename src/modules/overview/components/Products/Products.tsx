import { Box, Container } from '@material-ui/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useAccount } from 'modules/account/hooks/useAccount';
import { NoItems } from 'modules/common/components/NoItems';
import { ProductCard } from 'modules/common/components/ProductCard';
import { ProductCards } from 'modules/common/components/ProductCards';
import { QueryLoading } from 'modules/common/components/QueryLoading/QueryLoading';
import { featuresConfig } from 'modules/common/conts';
import { t } from 'modules/i18n/utils/intl';
import { MarketRoutesConfig } from 'modules/market/Routes';
import { ItemsChannel } from 'modules/overview/actions/fetchItemsByFilter';
import {
  fetchNFTItems,
  INFTItem,
} from 'modules/overview/actions/fetchNFTItems';
import { mapNFTItem } from 'modules/overview/api/mapNFTItem';
import { Button } from 'modules/uiKit/Button';
import { ISectionProps, Section } from 'modules/uiKit/Section';
import { useCallback, useEffect, useState } from 'react';
import { uid } from 'react-uid';
import { ProductsPanel } from '../ProductsPanel';
import { useProductsStyles } from './useProductsStyles';

const NFT_ITEMS_COUNT = 30;

interface IProductsProps extends ISectionProps {
  cards?: JSX.Element;
  panel?: JSX.Element;
  loading?: boolean;
}

export const ProductsComponent = ({
  cards,
  panel,
  loading = false,
  ...sectionProps
}: IProductsProps) => {
  const classes = useProductsStyles();

  return (
    <Section {...sectionProps}>
      <Container>
        {panel && <Box mb={6}>{panel}</Box>}

        {loading ? (
          <Box
            py={5}
            position="relative"
            width="100%"
            display="flex"
            justifyContent="center"
          >
            <QueryLoading />
          </Box>
        ) : (
          cards
        )}

        {featuresConfig.loadMoreNFTs && (
          <Box display="flex" justifyContent="center" mt={5}>
            <Button
              variant="outlined"
              className={classes.moreBtn}
              fullWidth
              rounded
            >
              {t('common.load-more')}
            </Button>
          </Box>
        )}
      </Container>
    </Section>
  );
};

export const Products = ({ ...sectionProps }: ISectionProps) => {
  const { isConnected } = useAccount();
  const dispatch = useDispatchRequest();

  const { data, loading } = useQuery<INFTItem[] | null>({
    type: fetchNFTItems.toString(),
  });

  const [sortBy, setSortBy] = useState<string>('1');
  const [catergory, setCategory] = useState<ItemsChannel>(
    ItemsChannel.fineArts,
  );

  const onSortChange = useCallback((value: string) => {
    setSortBy(value);
  }, []);

  const onCategoryChange = useCallback(
    (value: string) => {
      setCategory(value as ItemsChannel);

      dispatch(
        fetchNFTItems({
          channel: value as ItemsChannel,
          count: NFT_ITEMS_COUNT,
        }),
      );
    },
    [dispatch],
  );

  useEffect(() => {
    if (!isConnected) {
      return;
    }

    dispatch(
      fetchNFTItems({
        count: NFT_ITEMS_COUNT,
      }),
    );
  }, [dispatch, isConnected]);

  const nftItems = data?.map(mapNFTItem);

  const renderedItems = (nftItems || []).map(item => {
    return (
      <ProductCard
        isOnSale
        id={item.id}
        poolId={item.poolId}
        auctionType={item.poolType}
        key={uid(item)}
        title={item.title}
        price={item.price}
        priceType={item.priceType}
        endDate={item.endDate}
        likes={item.likes}
        href={item.href}
        MediaProps={{
          category: item.category,
          src: item.src,
          objectFit: 'scale-down',
          loading: 'lazy',
        }}
        ProfileInfoProps={item.ProfileInfoProps}
      />
    );
  });

  const renderedCards =
    nftItems && nftItems.length ? (
      <ProductCards>{renderedItems}</ProductCards>
    ) : (
      <Box display="flex" justifyContent="center">
        <NoItems href={MarketRoutesConfig.Market.generatePath()} />
      </Box>
    );

  return isConnected ? (
    <ProductsComponent
      {...sectionProps}
      cards={renderedCards}
      loading={loading}
      panel={
        <ProductsPanel
          onSortChange={onSortChange}
          onCategoryChange={onCategoryChange}
          catergory={catergory}
          sortBy={sortBy}
          disabled={loading}
        />
      }
    />
  ) : null;
};
