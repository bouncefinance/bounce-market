import { Box, Container } from '@material-ui/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { UserRoleEnum } from 'modules/common/actions/queryAccountInfo';
import { NoItems } from 'modules/common/components/NoItems';
import { ProductCard } from 'modules/common/components/ProductCard';
import { ProductCards } from 'modules/common/components/ProductCards';
import { ProfileInfo } from 'modules/common/components/ProfileInfo';
import { truncateWalletAddr } from 'modules/common/utils/truncateWalletAddr';
import { t } from 'modules/i18n/utils/intl';
import { HEADER_HEIGHT_XL } from 'modules/layout/components/Header/HeaderStyles';
import { MarketRoutesConfig } from 'modules/market/Routes';
import { ItemsChannel } from 'modules/overview/actions/fetchItemsByFilter';
import {
  fetchNFTItems,
  IFetchNFTItems,
} from 'modules/overview/actions/fetchNFTItems';
import { mapProductCardData } from 'modules/overview/api/mapProductCardData';
import { ProductsPanel } from 'modules/overview/components/ProductsPanel';
import { ProfileRoutesConfig } from 'modules/profile/ProfileRoutes';
import { useIsSMDown } from 'modules/themes/useTheme';
import { ISectionProps, Section } from 'modules/uiKit/Section';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router';
import { uid } from 'react-uid';
import { Pagination } from '../../../uiKit/Pagination';
import { useProductsStyles } from './useProductsStyles';

const ITEMS_PORTION_COUNT = 20;
const DEFAULT_PAGE = 1;

export const Products = ({ ...sectionProps }: ISectionProps) => {
  const dispatch = useDispatchRequest();
  const { page, category } = MarketRoutesConfig.Market.useParams();
  const history = useHistory();
  const [sortBy, setSortBy] = useState<string>('1');
  const isMobile = useIsSMDown();
  const classes = useProductsStyles();

  const {
    data: nftItemsData,
    loading: nftItemsLoading,
  } = useQuery<IFetchNFTItems | null>({
    type: fetchNFTItems.toString(),
  });

  const onCategoryChange = (value: string) => {
    history.push(MarketRoutesConfig.Market.generatePath(DEFAULT_PAGE, value));
  };

  const onPaginationChange = (event: ChangeEvent<unknown>, value: number) => {
    history.push(MarketRoutesConfig.Market.generatePath(value, category));
    window.scrollTo(0, HEADER_HEIGHT_XL);
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
      }),
    );
  }, [category, page, dispatch]);

  const nftItems = useMemo(
    () => (nftItemsData ? nftItemsData.items.map(mapProductCardData) : []),
    [nftItemsData],
  );

  const pagesCount = useMemo(() => {
    if (!nftItemsData) {
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
                  verified: item.identity === UserRoleEnum.Verified,
                },
              ]}
            />
          }
        />
      )),
    [nftItems],
  );

  const renderedPagination = (
    <Pagination
      disabled={nftItemsLoading}
      page={page}
      count={pagesCount}
      onChange={onPaginationChange}
    />
  );

  const renderedBottomPagination = (
    <div className={classes.paginationBottom}>{renderedPagination}</div>
  );

  return (
    <Section {...sectionProps}>
      <Container>
        <Box mb={{ xs: 4, md: 6 }}>
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
            {isMobile && (
              <div className={classes.paginationTop}>{renderedPagination}</div>
            )}

            <ProductCards
              isLoading={nftItemsLoading}
              skeletonsCount={ITEMS_PORTION_COUNT}
            >
              {rendrerdCards}
            </ProductCards>

            {renderedBottomPagination}
          </>
        ) : (
          <>
            <NoItems />
            {page !== DEFAULT_PAGE && renderedBottomPagination}
          </>
        )}
      </Container>
    </Section>
  );
};
