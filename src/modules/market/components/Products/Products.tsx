import {Box, Container} from '@material-ui/core';
import {
  useDispatchRequest,
  useQuery,
} from '@redux-requests/react';
import { NoItems } from 'modules/common/components/NoItems';
import { ProductCard } from 'modules/common/components/ProductCard';
import { ProductCards } from 'modules/common/components/ProductCards';
import { ProfileInfo } from 'modules/common/components/ProfileInfo';
import { truncateWalletAddr } from 'modules/common/utils/truncateWalletAddr';
import { t } from 'modules/i18n/utils/intl';
import { updateNFTItems } from 'modules/market/actions/updateNFTItems';
import { ItemsChannel } from 'modules/overview/actions/fetchItemsByFilter';
import {
  fetchNFTItems,
  IFetchNFTItems,
} from 'modules/overview/actions/fetchNFTItems';
import { mapProductCardData } from 'modules/overview/api/mapProductCardData';
import { ProductsPanel } from 'modules/overview/components/ProductsPanel';
import { ProfileRoutesConfig } from 'modules/profile/ProfileRoutes';
import { ISectionProps, Section } from 'modules/uiKit/Section';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { uid } from 'react-uid';
import { Pagination } from "@material-ui/lab";
import { useProductsStyles } from "./useProductsStyles";

const ITEMS_PORTION_COUNT = 15;

export const Products = ({ ...sectionProps }: ISectionProps) => {
  const styleProps = {
    firstTitle: t('market.pagination.first-title'),
    lastTitle: t('market.pagination.last-title')
  };
  const classes = useProductsStyles(styleProps);
  const dispatch = useDispatchRequest();

  const [sortBy, setSortBy] = useState<string>('1');
  const [category, setCategory] = useState<ItemsChannel>(ItemsChannel.fineArts);

  const {
    data: nftItemsData,
    loading: nftItemsLoading,
  } = useQuery<IFetchNFTItems | null>({
    type: fetchNFTItems.toString(),
  });

  const onSortChange = useCallback((value: string) => {
    setSortBy(value);
  }, []);

  const onCategoryChange = useCallback(
    (value: string) => {
      setCategory(value as ItemsChannel);
      dispatch(
        fetchNFTItems({
          limit: ITEMS_PORTION_COUNT,
          channel: value as ItemsChannel,
        }),
      );
    },
    [dispatch],
  );

  const onLoadMore = useCallback((event, value) => {
    if (!nftItemsData) {
      return;
    }

    dispatch(
      updateNFTItems({
        offset: (value - 1) * ITEMS_PORTION_COUNT,
        limit: ITEMS_PORTION_COUNT,
        channel: category,
      }),
    );
  }, [category, dispatch, nftItemsData]);

  useEffect(() => {
    dispatch(
      fetchNFTItems({
        limit: ITEMS_PORTION_COUNT,
        channel: ItemsChannel.fineArts,
      }),
    );
  }, [dispatch]);

  const nftItems = useMemo(
    () => (nftItemsData ? nftItemsData.items.map(mapProductCardData) : []),
    [nftItemsData],
  );

  const paginationCount = useMemo(() => {
    if(!nftItemsData) {
      return 1;
    }
    const total = nftItemsData.total;
    const residue = total % ITEMS_PORTION_COUNT;
    return (total - residue) / ITEMS_PORTION_COUNT + (residue > 0 ? 1 : 0);
  }, [nftItemsData]);

  const hasItems = !!nftItems.length;

  const rendrerdCards = useMemo(
    () =>
      nftItems.map(item => (
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
          copies={item.copies}
          likes={item.likes}
          href={item.href}
          MediaProps={{
            category: item.category,
            src: item.src,
            objectFit: 'contain',
            loading: 'lazy',
          }}
          profileInfo={
            <ProfileInfo
              subTitle={t('product-card.owner')}
              title={item.ownerName ?? truncateWalletAddr(item.ownerAddress)}
              users={[
                {
                  href: ProfileRoutesConfig.OtherProfile.generatePath(
                    item.ownerAddress,
                  ),
                  name: item.ownerName ?? truncateWalletAddr(item.ownerAddress),
                  avatar: item.ownerAvatar,
                },
              ]}
            />
          }
        />
      )),
    [nftItems],
  );

  return (
    <Section {...sectionProps}>
      <Container>
        <Box mb={6}>
          <ProductsPanel
            onSortChange={onSortChange}
            onCategoryChange={onCategoryChange}
            catergory={category}
            sortBy={sortBy}
            disabled={nftItemsLoading}
          />
        </Box>

        {nftItemsLoading || hasItems ? (
          <>
            <ProductCards
              isLoading={nftItemsLoading}
              skeletonsCount={ITEMS_PORTION_COUNT}
            >
              {rendrerdCards}
            </ProductCards>

              <Pagination
                className={classes.root}
                count={paginationCount}
                showFirstButton
                showLastButton
                onChange={onLoadMore}
                variant="outlined"
                shape="rounded"
              />
          </>
        ) : (
          <NoItems />
        )}
      </Container>
    </Section>
  );
};
