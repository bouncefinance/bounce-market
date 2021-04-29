import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useItems } from 'modules/overview/hooks/useItems';
import { useEffect } from 'react';
import { fetchItemsByIds } from '../../actions/fetchItemsByIds';
import { fetchPools } from '../../actions/fetchPools';

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
    type: fetchPools,
  });
  const { loading: itemsLoading, error: itemsError } = useQuery({
    type: fetchItemsByIds,
  });

  useEffect(() => {
    if (!poolsPristine) {
      return;
    }
    dispatchRequest(fetchPools()).then(({ data }) => {
      if (data) {
        const ids = data.tradePools
          .map(item => item.tokenId)
          .concat(data.tradeAuctions.map(item => item.tokenId));

        dispatchRequest(
          fetchItemsByIds({
            ids,
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
