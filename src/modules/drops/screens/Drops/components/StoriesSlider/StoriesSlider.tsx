import { resetRequests } from '@redux-requests/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useAccount } from 'modules/account/hooks/useAccount';
import { SearchDropsParamState } from 'modules/api/searchDrops';
import { getDrops, IGetDrops } from 'modules/drops/actions/getDrops';
import {
  DropsOwner,
  DropsOwnerSkeleton,
} from 'modules/drops/components/DropsOwner';
import { DropsRoutesConfig } from 'modules/drops/Routes';
import { ProfileRoutesConfig } from 'modules/profile/ProfileRoutes';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DROPS_LIVE_KEY } from '../../const';
import { StoriesChip } from '../StoriesChip';
import {
  StoriesSliderItem,
  StoriesSliderItemSkeleton,
} from '../StoriesSliderItem';
import { StoriesSliderComponent } from './StoriesSliderComponent';

export const StoriesSlider = () => {
  const { isConnected } = useAccount();
  const dispatchRequest = useDispatchRequest();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatchRequest(
      getDrops(
        { state: SearchDropsParamState.Live },
        { requestKey: DROPS_LIVE_KEY },
      ),
    );

    return function reset() {
      dispatch(
        resetRequests([
          {
            requestType: getDrops.toString(),
            requestKey: DROPS_LIVE_KEY,
          },
        ]),
      );
    };
  }, [dispatchRequest, isConnected, dispatch]);

  const { data, loading } = useQuery<IGetDrops | null>({
    type: getDrops.toString(),
    requestKey: DROPS_LIVE_KEY,
  });

  const liveDrops = data?.items || [];

  const renderedItems = liveDrops.map(item => {
    const chips = <StoriesChip label="live" isLive />;

    const profileInfo = (
      <DropsOwner
        title={item.username}
        href={ProfileRoutesConfig.OtherProfile.generatePath(
          item.accountAddress,
        )}
        isVerified={false}
      />
    );

    return (
      <StoriesSliderItem
        href={DropsRoutesConfig.DropDetails.generatePath(item.id)}
        key={item.id}
        title={item.title}
        text={item.description}
        img={item.coverImgUrl}
        chips={chips}
        gradientColor={item.bgColor}
        profileInfo={profileInfo}
      />
    );
  });

  const renderedSkeletons = new Array(3)
    .fill(0)
    .map((_, i) => (
      <StoriesSliderItemSkeleton key={i} profileInfo={<DropsOwnerSkeleton />} />
    ));

  return (
    <StoriesSliderComponent isSlider={loading || liveDrops.length > 1}>
      {loading ? renderedSkeletons : renderedItems}
    </StoriesSliderComponent>
  );
};
