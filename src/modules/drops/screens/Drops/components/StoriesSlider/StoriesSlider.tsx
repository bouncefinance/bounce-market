import { resetRequests } from '@redux-requests/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useAccount } from 'modules/account/hooks/useAccount';
import { SearchDropsParamState } from 'modules/api/searchDrops';
import { getDrops, IGetDrops } from 'modules/drops/actions/getDrops';
import {
  DropsOwner,
  DropsOwnerSkeleton,
} from 'modules/drops/components/DropsOwner';
import { NothingFound } from 'modules/drops/components/NothingFound';
import { DropsRoutesConfig } from 'modules/drops/Routes';
import { t } from 'modules/i18n/utils/intl';
import { ProfileRoutesConfig } from 'modules/profile/ProfileRoutes';
import { Section } from 'modules/uiKit/Section';
import React, { useEffect } from 'react';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { DROPS_COMING_KEY, DROPS_LIVE_KEY, DROPS_PREV_KEY } from '../../const';
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

  const { data, loading, pristine } = useQuery<IGetDrops | null>({
    type: getDrops.toString(),
    requestKey: DROPS_LIVE_KEY,
  });

  const {
    data: dataComing,
    loading: loadingComing,
  } = useQuery<IGetDrops | null>({
    type: getDrops.toString(),
    requestKey: DROPS_COMING_KEY,
  });

  const { data: dataPrev, loading: loadingPrev } = useQuery<IGetDrops | null>({
    type: getDrops.toString(),
    requestKey: DROPS_PREV_KEY,
  });

  const showDrop = useMemo(() => {
    return [data, dataComing, dataPrev]
      .map(e => e?.items ?? [])
      .reduce((prev, next) => (prev.length > 0 ? prev : next), []);
  }, [data, dataComing, dataPrev]);

  const renderedItems = showDrop.map(item => {
    const chips = (state: number) => {
      const label =
        state === SearchDropsParamState.Live
          ? t('drops.label.live')
          : state === SearchDropsParamState.Coming
          ? t('drops.label.coming')
          : t('drops.label.previous');
      return <StoriesChip label={label} isLive />;
    };
    const profileInfo = (
      <DropsOwner
        title={item.username}
        href={ProfileRoutesConfig.OtherProfile.generatePath(
          item.accountAddress,
        )}
        // TODO: update avatar of drop owner
        avatar={item.avatar}
        isVerified={true}
      />
    );

    return (
      <StoriesSliderItem
        href={DropsRoutesConfig.DropDetails.generatePath(item.id)}
        key={item.id}
        title={item.title}
        text={item.description}
        img={item.coverImgUrl}
        chips={chips(item.state)}
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

  if (!pristine && !showDrop.length && !loading) {
    return (
      <Section>
        <NothingFound />
      </Section>
    );
  }

  return (
    <StoriesSliderComponent
      isSlider={
        (loading && loadingComing && loadingPrev) || showDrop.length > 1
      }
    >
      {loading && loadingComing && loadingPrev
        ? renderedSkeletons
        : renderedItems}
    </StoriesSliderComponent>
  );
};
