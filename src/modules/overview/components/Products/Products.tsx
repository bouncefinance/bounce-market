import { Box, Container } from '@material-ui/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useAccount } from 'modules/account/hooks/useAccount';
import { NoItems } from 'modules/common/components/NoItems';
import { ProductCards } from 'modules/common/components/ProductCards';
import { t } from 'modules/i18n/utils/intl';
import { MarketNftCard } from 'modules/market/components/Products/nftCard';
import { MarketRoutesConfig } from 'modules/market/Routes';
import { ItemsChannel } from 'modules/overview/actions/fetchItemsByFilter';
import {
  fetchNFTItems,
  IFetchNFTItems,
} from 'modules/overview/actions/fetchNFTItems';
import { Button } from 'modules/uiKit/Button';
import { ISectionProps, Section } from 'modules/uiKit/Section';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { uid } from 'react-uid';
import { useProductsStyles } from './useProductsStyles';

const NFT_ITEMS_COUNT = 10;

export const Products = ({ ...sectionProps }: ISectionProps) => {
  const { isConnected } = useAccount();
  const dispatch = useDispatchRequest();
  const classes = useProductsStyles();

  const { data, loading } = useQuery<IFetchNFTItems | null>({
    type: fetchNFTItems.toString(),
  });

  useEffect(() => {
    dispatch(
      fetchNFTItems({
        channel: ItemsChannel.all,
        limit: NFT_ITEMS_COUNT,
      }),
    );
  }, [dispatch, isConnected]);

  const nftItems = data?.items;
  const hasItems = Boolean(nftItems && nftItems.length);

  const renderedItems = (nftItems || []).map(item => {
    return (
      <MarketNftCard
        item={item}
        key={uid(item)}
        tokenSymbol={data?.tokenSymbol ?? ''}
      />
    );
  });

  const renderedCards =
    loading || hasItems ? (
      <ProductCards isLoading={loading} skeletonsCount={NFT_ITEMS_COUNT}>
        {renderedItems}
      </ProductCards>
    ) : (
      <NoItems href={MarketRoutesConfig.Market.generatePath()} />
    );

  return (
    <Section {...sectionProps}>
      <Container>
        {/* <Box mb={6}>
          <ProductsPanel
            onSortChange={onSortChange}
            onCategoryChange={onCategoryChange}
            catergory={catergory}
            sortBy={sortBy}
            disabled={loading}
          />
        </Box> */}

        {renderedCards}

        {hasItems && (
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
        )}
      </Container>
    </Section>
  );
};
