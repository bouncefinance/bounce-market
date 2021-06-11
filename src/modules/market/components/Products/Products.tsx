import { Box, Container } from '@material-ui/core';
import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import { useAccount } from 'modules/account/hooks/useAccount';
import { NoItems } from 'modules/common/components/NoItems';
import { ProductCard } from 'modules/common/components/ProductCard';
import { ProductCards } from 'modules/common/components/ProductCards';
import { ProfileInfo } from 'modules/common/components/ProfileInfo';
import { ScrollLoader } from 'modules/common/components/ScrollLoader';
import { truncateWalletAddr } from 'modules/common/utils/truncateWalletAddr';
import { updateNFTItems } from 'modules/market/actions/updateNFTItems';
import { ItemsChannel } from 'modules/overview/actions/fetchItemsByFilter';
import {
  fetchNFTItems,
  FetchNFTItemsStatus,
  IFetchNFTItems,
} from 'modules/overview/actions/fetchNFTItems';
import { mapProductCardData } from 'modules/overview/api/mapProductCardData';
import { ProductsPanel } from 'modules/overview/components/ProductsPanel';
import { ProfileRoutesConfig } from 'modules/profile/ProfileRoutes';
import { ISectionProps, Section } from 'modules/uiKit/Section';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { uid } from 'react-uid';

const ITEMS_PORTION_COUNT = 20;

export const Products = ({ ...sectionProps }: ISectionProps) => {
  const { isConnected } = useAccount();
  const dispatch = useDispatchRequest();

  const [sortBy, setSortBy] = useState<string>('1');
  const [category, setCategory] = useState<ItemsChannel>(ItemsChannel.fineArts);

  const {
    data: nftItemsData,
    loading: nftItemsLoading,
  } = useQuery<IFetchNFTItems | null>({
    type: fetchNFTItems.toString(),
  });

  const { loading: updateLoading } = useMutation({
    type: updateNFTItems.toString(),
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

  const onLoadMore = useCallback(() => {
    if (!nftItemsData) {
      return;
    }

    dispatch(
      updateNFTItems({
        offset: nftItemsData.offset + ITEMS_PORTION_COUNT,
        limit: ITEMS_PORTION_COUNT,
        channel: category,
      }),
    );
  }, [category, dispatch, nftItemsData]);

  useEffect(() => {
    if (!isConnected) {
      return;
    }

    dispatch(
      fetchNFTItems({
        limit: ITEMS_PORTION_COUNT,
        channel: ItemsChannel.fineArts,
      }),
    );
  }, [dispatch, isConnected]);

  const nftItems = useMemo(
    () => (nftItemsData ? nftItemsData.items.map(mapProductCardData) : []),
    [nftItemsData],
  );

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
              subTitle="Owner"
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

  if (!isConnected) {
    return null;
  }

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

            <ScrollLoader
              disabled={
                nftItemsLoading ||
                nftItemsData?.status === FetchNFTItemsStatus.done
              }
              isLoading={updateLoading}
              onLoadMore={onLoadMore}
              loadingComponent={
                <Box mt={4}>
                  <ProductCards
                    isLoading
                    skeletonsCount={ITEMS_PORTION_COUNT}
                  />
                </Box>
              }
            />
          </>
        ) : (
          <NoItems />
        )}
      </Container>
    </Section>
  );
};
