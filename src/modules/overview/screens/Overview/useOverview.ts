import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useItems } from 'modules/marketplace/hooks/useItems';
import { MarketplaceActions } from 'modules/marketplace/marketplaceActions';
import { useEffect } from 'react';
import { CreateNftActions } from '../../../createNFT/CreateNftActions';

export const useOverview = () => {
  const { data } = useItems();
  const promoItems = data?.splice(0, 3);
  const fastMoversItems = data?.splice(3, 12);
  const dispatchRequest = useDispatchRequest();

  const {
    loading: poolsLoading,
    error: poolsError,
    pristine: poolsPristine,
  } = useQuery({
    type: MarketplaceActions.fetchPools,
  });
  const { loading: itemsLoading, error: itemsError } = useQuery({
    type: MarketplaceActions.fetchItems,
  });

  useEffect(() => {
    // TODO Move to profile
    dispatchRequest(
      CreateNftActions.fetchNftByUser({
        // user: request.data.address,
        user: '0x5fe96748b9f9f6df3b7f8c71cbd6b62e12997be2',
      }),
    );

    if (!poolsPristine) {
      return;
    }
    dispatchRequest(MarketplaceActions.fetchPools()).then(({ data }) => {
      if (data) {
        const ids = data.tradePools
          .map(item => item.tokenId)
          .concat(data.tradeAuctions.map(item => item.tokenId));

        dispatchRequest(
          MarketplaceActions.fetchItems({
            ids,
            channel: 'Sports',
          }),
        );
      }
    });
  }, [dispatchRequest, poolsPristine]);

  return {
    poolsLoading,
    poolsError,
    itemsLoading,
    itemsError,
    promoItems,
    fastMoversItems,
  };
};
