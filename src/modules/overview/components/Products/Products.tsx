import { Box, Container } from '@material-ui/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useAccount } from 'modules/account/hooks/useAccount';
import { AccountInfo } from 'modules/common/components/AccountInfo';
import { NoItems } from 'modules/common/components/NoItems';
import { ProductCard } from 'modules/common/components/ProductCard';
import { ProductCards } from 'modules/common/components/ProductCards';
import { t } from 'modules/i18n/utils/intl';
import { MarketRoutesConfig } from 'modules/market/Routes';
import { ItemsChannel } from 'modules/overview/actions/fetchItemsByFilter';
import {
  fetchNFTItems,
  IFetchNFTItems,
} from 'modules/overview/actions/fetchNFTItems';
import { mapProductCardData } from 'modules/overview/api/mapProductCardData';
import { Button } from 'modules/uiKit/Button';
import { ISectionProps, Section } from 'modules/uiKit/Section';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { uid } from 'react-uid';
import { ProductsPanel } from '../ProductsPanel';
import { useProductsStyles } from './useProductsStyles';

const NFT_ITEMS_COUNT = 10;

interface IProductsProps extends ISectionProps {
  cards?: JSX.Element;
  panel?: JSX.Element;
}

export const ProductsComponent = ({
  cards,
  panel,
  ...sectionProps
}: IProductsProps) => {
  const classes = useProductsStyles();

  return (
    <Section {...sectionProps}>
      <Container>
        {panel && <Box mb={6}>{panel}</Box>}

        {cards}

        <Box display="flex" justifyContent="center" mt={5}>
          <Button
            component={Link}
            variant="outlined"
            to={MarketRoutesConfig.Market.generatePath()}
            className={classes.moreBtn}
            fullWidth
            rounded
          >
            {t('common.view-all')}
          </Button>
        </Box>
      </Container>
    </Section>
  );
};

export const Products = ({ ...sectionProps }: ISectionProps) => {
  const { isConnected } = useAccount();
  const dispatch = useDispatchRequest();

  const { data, loading } = useQuery<IFetchNFTItems | null>({
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
          limit: NFT_ITEMS_COUNT,
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
        channel: ItemsChannel.fineArts,
        limit: NFT_ITEMS_COUNT,
      }),
    );
  }, [dispatch, isConnected]);

  const nftItems = data?.items.map(mapProductCardData);
  const hasItems = Boolean(nftItems && nftItems.length);

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
        profileInfo={
          item.ownerAddress && <AccountInfo address={item.ownerAddress} />
        }
      />
    );
  });

  const renderedCards =
    loading || hasItems ? (
      <ProductCards isLoading={loading} skeletonsCount={NFT_ITEMS_COUNT}>
        {renderedItems}
      </ProductCards>
    ) : (
      <Box display="flex" justifyContent="center">
        <NoItems href={MarketRoutesConfig.Market.generatePath()} />
      </Box>
    );

  return isConnected ? (
    <ProductsComponent
      {...sectionProps}
      cards={renderedCards}
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
