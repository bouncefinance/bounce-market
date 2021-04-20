import { QueryState } from '@redux-requests/core';
import { useDispatchRequest } from '@redux-requests/react';
import { NFTContent } from 'modules/detailsNFT/components/NFTContent';
import { NFTDescription } from 'modules/detailsNFT/components/NFTDescription';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Queries } from '../../../common/components/Queries/Queries';
import { INFTDetails } from '../../api/NFTDetails';
import { DetailsNFTActions } from '../../DetailsNFTActions';
import { useDetailsNFTStyles } from './useDetailsNFTStyles';

export const DetailsNFT = () => {
  const classes = useDetailsNFTStyles();
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatchRequest();

  useEffect(() => {
    dispatch(DetailsNFTActions.fethItem({ id: parseInt(id, 10) }));
  }, [dispatch, id]);

  return (
    <div className={classes.root}>
      <Queries requestActions={[DetailsNFTActions.fethItem]}>
        {({ data }: QueryState<INFTDetails>) => {
          console.log('data', data);
          return (
            <>
              <NFTContent className={classes.content} src={data.fileurl} />
              <NFTDescription
                className={classes.descr}
                name={data.itemname}
                description={data.description}
              />
            </>
          );
        }}
      </Queries>
    </div>
  );
};
