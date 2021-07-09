import { resetRequests } from '@redux-requests/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useAccount } from 'modules/account/hooks/useAccount';
import { queryBrandById } from 'modules/brand/actions/getBrandById';
import { IBrandInfo } from 'modules/brand/api/queryBrand';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';

export const useBrand = () => {
  const { isConnected } = useAccount();
  const dispatchRequest = useDispatchRequest();
  const dispatch = useDispatch();
  const { id: brandId } = useParams<{
    id: string;
  }>();

  const {
    data: brandInfo,
    loading: brandInfoLoading,
    pristine,
  } = useQuery<IBrandInfo | null>({
    type: queryBrandById.toString(),
  });

  useEffect(() => {
    dispatchRequest(queryBrandById({ id: +brandId }, { asMutation: false }));

    return function reset() {
      dispatch(resetRequests([queryBrandById.toString()]));
    };
  }, [brandId, dispatch, dispatchRequest, isConnected]);

  return {
    pristine,
    brandInfo,
    brandInfoLoading,
  };
};
