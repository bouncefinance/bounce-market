import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { queryBrandById } from 'modules/brand/actions/getBrandById';
import { IBrandInfo } from 'modules/brand/api/queryBrand';
import { useEffect } from 'react';
import { useParams } from 'react-router';

export const useBrand = () => {
  const dispatch = useDispatchRequest();
  const { id: brandId } = useParams<{
    id: string;
  }>();

  const {
    data: brandInfo,
    loading: brandInfoLoading,
  } = useQuery<IBrandInfo | null>({
    type: queryBrandById.toString(),
  });

  useEffect(() => {
    dispatch(queryBrandById({ id: +brandId }, { asMutation: false }));
  }, [brandId, dispatch]);

  return {
    brandInfo,
    brandInfoLoading,
  };
};
