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
import { ItemsChannel } from 'modules/overview/actions/fetchItemsByFilter';
import {
  fetchNFTItems,
  IFetchNFTItems,
} from 'modules/overview/actions/fetchNFTItems';
import { mapProductCardData } from 'modules/overview/api/mapProductCardData';
import { ProductsPanel } from 'modules/overview/components/ProductsPanel';
import { ProfileRoutesConfig } from 'modules/profile/ProfileRoutes';
import { ISectionProps, Section } from 'modules/uiKit/Section';
import { useCallback, useEffect, useMemo, useState, ChangeEvent } from 'react';
import { uid } from 'react-uid';
import {Pagination} from "../../../uiKit/Pagination";
import {useQueryParams} from "../../../common/hooks/useQueryParams";
import {useHistory} from "react-router";

const ITEMS_PORTION_COUNT = 20;
const DEFAULT_PAGE = 1;

export const Products = ({ ...sectionProps }: ISectionProps) => {
  const dispatch = useDispatchRequest();

  const pageParam = useQueryParams().get("page");
  const page = pageParam ? parseInt(pageParam) : DEFAULT_PAGE;
  const category = useQueryParams().get("category") || ItemsChannel.fineArts;
  const history = useHistory();

  const [sortBy, setSortBy] = useState<string>('1');

  const {
    data: nftItemsData,
    loading: nftItemsLoading,
  } = useQuery<IFetchNFTItems | null>({
    type: fetchNFTItems.toString(),
  });

  const createURL = (page: number, category: string): string => {
    return `/market?page=${page}&category=${category}`;
  };

  useEffect(() => {
    history.push(createURL(page, category));
  },[]);

  const onCategoryChange = (value: string) => {
    history.push(createURL(DEFAULT_PAGE, value));
  };

  const onLoadMore = (event: ChangeEvent<unknown>, value: number) => {
    history.push(createURL(value, category));
  };

  const onSortChange = useCallback((value: string) => {
    setSortBy(value);
  }, []);

  useEffect(() => {
    dispatch(
      fetchNFTItems({
        offset: (page - 1) * ITEMS_PORTION_COUNT,
        limit: ITEMS_PORTION_COUNT,
        channel: category as ItemsChannel,
      })
    );
  }, [category, page, dispatch]);

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
              page={page}
              count={paginationCount}
              onChange={onLoadMore}
            />
          </>
        ) : (
          <NoItems />
        )}
      </Container>
    </Section>
  );
};
