import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useAccount } from 'modules/account/hooks/useAccount';
import { queryBrandById } from 'modules/brand/actions/getBrandById';
import { queryBrandNfts } from 'modules/brand/actions/queryBrandNfts';
import { IBrandInfo } from 'modules/brand/api/queryBrand';
import { ItemsChannel } from 'modules/overview/actions/fetchItemsByFilter';
import { INFTItem } from 'modules/overview/actions/fetchNFTItems';
import { useCallback, useEffect, useState } from 'react';

export const useBrandProducts = () => {
  const { isConnected } = useAccount();
  const dispatch = useDispatchRequest();

  const { loading } = useQuery<INFTItem[] | null>({
    type: queryBrandNfts.toString(),
  });

  const { data: brandInfo } = useQuery<IBrandInfo | null>({
    type: queryBrandById.toString(),
  });

  const [sortBy, setSortBy] = useState<string>('');
  const [catergory, setCategory] = useState<ItemsChannel>(
    ItemsChannel.fineArts,
  );

  const onSortChange = useCallback(
    (value: string) => {
      if (!isConnected) {
        return;
      }
      setSortBy(value);
    },
    [isConnected],
  );

  const onCategoryChange = useCallback(
    (value: string) => {
      if (!isConnected || !brandInfo) {
        return;
      }
      setCategory(value as ItemsChannel);
      dispatch(
        queryBrandNfts({
          channel: value as ItemsChannel,
          userAddress: brandInfo.owneraddress,
          contractAddress: brandInfo.contractaddress,
          count: 1000,
        }),
      );
    },
    [brandInfo, dispatch, isConnected],
  );

  useEffect(() => {
    if (!isConnected || !brandInfo) {
      return;
    }

    dispatch(
      queryBrandNfts({
        userAddress: brandInfo.owneraddress,
        contractAddress: brandInfo.contractaddress,
        count: 1000,
      }),
    );
  }, [brandInfo, dispatch, isConnected]);

  return {
    catergory,
    loading,
    onCategoryChange,
    onSortChange,
    sortBy,
  };
};
