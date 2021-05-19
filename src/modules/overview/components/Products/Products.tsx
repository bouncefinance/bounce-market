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
import { mapNFTItem } from 'modules/overview/api/mapNFTItems';
import { Button } from 'modules/uiKit/Button';
import { ISectionProps, Section } from 'modules/uiKit/Section';
import { useCallback, useEffect, useState } from 'react';
import { uid } from 'react-uid';
import { ProductsPanel } from '../ProductsPanel';
import { useProductsStyles } from './useProductsStyles';

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
          count: 20,
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
        count: 20,
      }),
    );
  }, [dispatch, isConnected]);

  const nftItems = data?.map(mapNFTItem);

  const renderedNFTItems =
    nftItems && nftItems.length ? (
      <ProductCards>
        {(nftItems || []).map(cardProps => (
          <ProductCard
            key={uid(cardProps)}
            title={cardProps.title}
            price={cardProps.price}
            priceType={cardProps.priceType}
            endDate={cardProps.endDate}
            likes={cardProps.likes}
            href={cardProps.href}
            MediaProps={{
              category: cardProps.category,
              src: cardProps.src,
              objectFit: 'scale-down',
              loading: 'lazy',
            }}
            ProfileInfoProps={cardProps.ProfileInfoProps}
          />
        ))}
      </ProductCards>
    ) : (
      <Box display="flex" justifyContent="center">
        <NoItems href={MarketRoutesConfig.Market.generatePath()} />
      </Box>
    );

  return isConnected ? (
    <ProductsComponent
      {...sectionProps}
      cards={renderedNFTItems}
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
