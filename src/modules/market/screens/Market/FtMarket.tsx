import { NoItems } from 'modules/common/components/NoItems';
import { ProductCardSkeleton } from 'modules/common/components/ProductCard';
import { ProductCards } from 'modules/common/components/ProductCards';
import { TabItems as TabItemsComponent } from 'modules/profile/components/TabItems';
import { uid } from 'react-uid';
import { useEffect, useMemo } from 'react';
import { FtPoolCard } from 'modules/common/components/ProductCard/FtPoolCard';
import { Box, Container } from '@material-ui/core';
import { fetchOnsellApeMarketPools, IApePoolMArketRes } from 'modules/market/actions/ftMarketList';
import { MarketRoutesConfig } from 'modules/market/Routes';
import { useAccount } from 'modules/account/hooks/useAccount';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useHistory } from 'react-router-dom';
import { HEADER_HEIGHT_XL } from 'modules/layout/components/Header/HeaderStyles';
import { Pagination } from 'modules/uiKit/Pagination';
import { useProductsStyles } from 'modules/market/components/Products/useProductsStyles';

const ITEMS_PORTION_COUNT = 20;
const DEFAULT_PAGE = 1;
export const FtMarket: React.FC<{}> = function () {
  const { data, loading } = useQuery<IApePoolMArketRes>({
    type: fetchOnsellApeMarketPools.toString(),
  });
  const dispatchRequest = useDispatchRequest();
  const { address } = useAccount();
  const history = useHistory();
  const { page, category } = MarketRoutesConfig.Market.useParams();
  const productscSlasses = useProductsStyles();
  
  useEffect(() => {
    if(address){
      dispatchRequest(fetchOnsellApeMarketPools({
        offset: (page - 1) * ITEMS_PORTION_COUNT,
        limit: ITEMS_PORTION_COUNT,
        useraddress: address
      }))
    }
  // eslint-disable-next-line
  }, [page, address])
  
  const onPaginationChange = (_: any, value: number) => {
    history.push(MarketRoutesConfig.Market.generatePath(value, category));
    window.scrollTo(0, HEADER_HEIGHT_XL);
  };

  const pagesCount = useMemo(() => {
    if (!data) {
      return DEFAULT_PAGE;
    }
    const total = data?.total ?? 1;
    const residue = total % ITEMS_PORTION_COUNT;
    return (total - residue) / ITEMS_PORTION_COUNT + (residue > 0 ? 1 : 0);
  }, [data]);
  const renderedPagination = (
    <Pagination
      disabled={loading}
      page={page}
      count={pagesCount}
      onChange={onPaginationChange}
    />
  );

  const renderedBottomPagination = (
    <div className={productscSlasses.paginationBottom}>{renderedPagination}</div>
  );

  return (
    <TabItemsComponent>
      <Container>
      <ProductCards isLoading={loading}>
        {loading ? (
          <ProductCardSkeleton />
        ) : (
          data?.data?.map(item => (
            <FtPoolCard
              key={uid(item)}
              reload={() => {}}
              isOther={true}
              item={item}
              isMarket
              // hasAction={Boolean(artAddress && compare(artAddress, address))}
            />
          ))
        )}
      </ProductCards>
      {!loading && data?.data?.length === 0 ? (
        <NoItems />
      ): <>
      {renderedBottomPagination}
      </>}
      <Box mt={5}></Box>
      </Container>
    </TabItemsComponent>
  );
};
