import { resetRequests } from '@redux-requests/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useAccount } from 'modules/account/hooks/useAccount';
import { ITopArtistItem } from 'modules/api/getTopArtistList/mappers';
import { getTopArtists } from 'modules/drops/actions/getTopArtists';
import { ProfileRoutesConfig } from 'modules/profile/ProfileRoutes';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { uid } from 'react-uid';
import { TopCreatorsItem, TopCreatorsItemSkeleton } from '../TopCreatorsItem';
import { TopCreatorsComponent } from './TopCreatorsComponent';

interface ITopCreatorsProps {
  className?: string;
}

export const TopCreators = ({ className }: ITopCreatorsProps) => {
  const { isConnected } = useAccount();
  const dispatchRequest = useDispatchRequest();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatchRequest(getTopArtists());

    return function reset() {
      dispatch(resetRequests([getTopArtists.toString()]));
    };
  }, [dispatchRequest, isConnected, dispatch]);

  const { data, loading } = useQuery<ITopArtistItem[] | null>({
    type: getTopArtists.toString(),
  });

  const renderedSkeletons = new Array(7)
    .fill(0)
    .map((_, i) => <TopCreatorsItemSkeleton key={i} />);

  const creatorsData = data || [];

  const renderedItems = creatorsData.map(item => (
    <TopCreatorsItem
      to={ProfileRoutesConfig.OtherProfile.generatePath(item.accountAddress)}
      key={uid(item)}
      img={item.imgUrl}
      title={item.userName}
    />
  ));

  return (
    <TopCreatorsComponent
      itemsCount={loading ? 10 : creatorsData.length}
      loading={loading}
    >
      {loading ? renderedSkeletons : renderedItems}
    </TopCreatorsComponent>
  );
};
