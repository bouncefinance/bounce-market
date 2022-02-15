import { Container } from '@material-ui/core';
import { resetRequests } from '@redux-requests/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useAccount } from 'modules/account/hooks/useAccount';
import { NoItems } from 'modules/common/components/NoItems';
import { ProductCards } from 'modules/common/components/ProductCards';
import { HEADER_HEIGHT_XL } from 'modules/layout/components/Header/HeaderStyles';
import { MarketRoutesConfig } from 'modules/market/Routes';
import { ItemsChannel } from 'modules/overview/actions/fetchItemsByFilter';
import {
  fetchNFTItems,
  IFetchNFTItems,
} from 'modules/overview/actions/fetchNFTItems';
import { useIsSMDown } from 'modules/themes/useTheme';
import { ISectionProps } from 'modules/uiKit/Section';
import { ChangeEvent, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Pagination } from '../../../uiKit/Pagination';
import { useProductsStyles } from './useProductsStyles';
import { MarketNftCard } from './nftCard';
import { uid } from 'react-uid';
import { ZERO_ADDRESS } from 'modules/common/conts';
import { getApeContract } from 'modules/common/hooks/contractHelps';

const ITEMS_PORTION_COUNT = 20;
const DEFAULT_PAGE = 1;

export const Products = ({ ...sectionProps }: ISectionProps) => {
  const dispatchRequest = useDispatchRequest();
  const dispatch = useDispatch();
  const { page, category } = MarketRoutesConfig.Market.useParams();
  const history = useHistory();
  const isMobile = useIsSMDown();
  const classes = useProductsStyles();
  const { isConnected, chainId } = useAccount();

  const {
    data: nftItemsData,
    loading: nftItemsLoading,
  } = useQuery<IFetchNFTItems | null>({
    type: fetchNFTItems.toString(),
  });

  const onPaginationChange = (event: ChangeEvent<unknown>, value: number) => {
    history.push(MarketRoutesConfig.Market.generatePath(value, category));
    window.scrollTo(0, HEADER_HEIGHT_XL);
  };

  useEffect(() => {
    dispatchRequest(
      fetchNFTItems({
        offset: (page - 1) * ITEMS_PORTION_COUNT,
        limit: ITEMS_PORTION_COUNT,
        channel: category as ItemsChannel,
      }),
    );

    return function reset() {
      dispatch(resetRequests([fetchNFTItems.toString()]));
    };
  }, [category, page, dispatch, isConnected, dispatchRequest]);

  const nftItems = useMemo(() => (nftItemsData ? nftItemsData.items : []), [
    nftItemsData,
  ]);

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
        <MarketNftCard
          item={item}
          key={uid(item)}
          tokenSymbol={
            (item.token1.toLocaleLowerCase() === ZERO_ADDRESS.toLocaleLowerCase()) ? (nftItemsData?.tokenSymbol ?? '') :
          getApeContract(chainId)?.toLocaleLowerCase() === item.token1.toLocaleLowerCase()? 'APE' : 'APE'}
        />
      )),
    [nftItems, nftItemsData?.tokenSymbol, chainId],
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
    <>
      <Container>
        {/* <Box mb={{ xs: 4, md: 6 }}>
          <ProductsPanel
            onSortChange={onSortChange}
            onCategoryChange={onCategoryChange}
            catergory={category}
            sortBy={sortBy}
            disabled={nftItemsLoading}
          />
        </Box> */}

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
    </>
  );
};
