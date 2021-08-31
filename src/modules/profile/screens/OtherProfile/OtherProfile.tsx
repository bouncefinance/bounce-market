import { Container } from '@material-ui/core';
import { resetRequests } from '@redux-requests/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useAccount } from 'modules/account/hooks/useAccount';
import { queryMyBrandItem } from 'modules/brand/actions/queryMyBrandItem';
import { UserRoleEnum } from 'modules/common/actions/queryAccountInfo';
import { QueryLoadingAbsolute } from 'modules/common/components/QueryLoading/QueryLoading';
import { Social } from 'modules/common/components/Social';
import { featuresConfig } from 'modules/common/conts';
import { t } from 'modules/i18n/utils/intl';
import { fetchFollowInfo } from 'modules/profile/actions/fetchFollowInfo';
import { fetchOwned } from 'modules/profile/actions/fetchOwned';
import { fetchProfileInfo } from 'modules/profile/actions/fetchProfileInfo';
import { fetchMySale } from 'modules/profile/actions/fetchSale';
import {
  ILikedItem,
  queryLikedItems,
} from 'modules/profile/actions/queryLikedItems';
import { IProfileInfo } from 'modules/profile/api/profileInfo';
import { Avatar } from 'modules/profile/components/Avatar';
import { Bio } from 'modules/profile/components/Bio';
import { Header } from 'modules/profile/components/Header';
import { InfoPanel } from 'modules/profile/components/InfoPanel';
import { Subscribers } from 'modules/profile/components/Subscribers';
import { TabCollection } from 'modules/profile/components/TabCollection';
import { FollowGroup } from 'modules/profile/components/TabFollowing';
import { TabPanel } from 'modules/profile/components/TabPanel';
import { Tabs } from 'modules/profile/components/Tabs';
import { Tab } from 'modules/profile/components/Tabs/Tab';
import { ProfileRoutesConfig, ProfileTab } from 'modules/profile/ProfileRoutes';
import { Section } from 'modules/uiKit/Section';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { uid } from 'react-uid';
import { TabLiked } from '../Profile/components/TabLiked';
import { TabOwned } from '../Profile/components/tabOwned';
import { TabSale } from '../Profile/components/TabSale';
import { useOtherProfileStyles } from './useOtherProfileStyles';

export const PROFILE_INFO_REQUEST_KEY = '/other';

export const OtherProfile = () => {
  const dispatchRequest = useDispatchRequest();
  const dispatch = useDispatch();
  const { tab, address } = ProfileRoutesConfig.OtherProfile.useParams();
  const classes = useOtherProfileStyles();
  const { push } = useHistory();
  const { isConnected, address: accountAddress } = useAccount();
  const { data: likedItems } = useQuery<ILikedItem[] | null>({
    type: queryLikedItems.toString(),
  });

  useEffect(() => {
    dispatchRequest(
      fetchProfileInfo({ address }, { requestKey: PROFILE_INFO_REQUEST_KEY }),
    );

    if (isConnected && accountAddress) {
      dispatchRequest(
        fetchFollowInfo({
          accountAddress: accountAddress,
          followAddress: address,
        }),
      );
    }

    return function reset() {
      dispatch(
        resetRequests([
          {
            requestType: fetchProfileInfo.toString(),
            requestKey: PROFILE_INFO_REQUEST_KEY,
          },
          {
            requestType: fetchFollowInfo.toString(),
            requestKey: '/fetchFollowInfo',
          },
        ]),
      );
    };
  }, [address, dispatch, dispatchRequest, isConnected, accountAddress]);

  const {
    data: profileInfo,
    loading: profileInfoLoading,
  } = useQuery<IProfileInfo | null>({
    type: fetchProfileInfo.toString(),
    requestKey: PROFILE_INFO_REQUEST_KEY,
  });

  const renderFollow = useCallback(() => {
    return (
      <FollowGroup
        followAddress={address}
        followingCount={profileInfo?.followingCount}
        followersCount={profileInfo?.followersCount}
      />
    );
  }, [address, profileInfo]);

  const tabs = useMemo(
    () => [
      {
        value: ProfileTab.sells,
        label: t('profile.tabs.my-sells'),
      },
      {
        value: ProfileTab.collections,
        label: t('profile.tabs.collections'),
      },
      {
        value: ProfileTab.owned,
        label: t('profile.tabs.showcase'),
      },
      ...(featuresConfig.profileFollowers
        ? [
            {
              value: ProfileTab.following,
              label: t('profile.tabs.following'),
              count: 0,
            },
          ]
        : []),
    ],
    // eslint-disable-next-line
    [likedItems],
  );

  const updateData = useCallback(
    (value: ProfileTab) => {
      if (!address) {
        return;
      }
      switch (value) {
        case ProfileTab.collections: {
          dispatch(queryMyBrandItem(address));
          break;
        }
        case ProfileTab.owned: {
          dispatch(fetchOwned({ address }));
          break;
        }
        case ProfileTab.sells: {
          dispatch(fetchMySale({ address }));
          break;
        }
        default: {
          console.error('not match tab', value);
        }
      }
    },
    [address, dispatch],
  );

  const onTabsChange = useCallback(
    (_, value) => {
      push(ProfileRoutesConfig.OtherProfile.generatePath(address, value));
      updateData(value);
    },
    [address, push, updateData],
  );

  useEffect(() => {
    updateData(tab);
  }, [updateData, tab]);

  if (profileInfoLoading) {
    return <QueryLoadingAbsolute />;
  }

  return (
    <Section className={classes.root}>
      <Header img={profileInfo?.bgImgUrl} />

      <Container>
        <Avatar
          className={classes.avatar}
          src={profileInfo?.imgUrl}
          isVerified={profileInfo?.identity === UserRoleEnum.Verified}
        />
        <InfoPanel
          withSharing
          name={profileInfo?.username}
          email={profileInfo?.email}
          subscribers={
            featuresConfig.subscribers && (
              <Subscribers count={profileInfo?.followCount} />
            )
          }
          // https://ankrnetwork.atlassian.net/browse/FE-3449
          // TODO: [FE-3449] add social links after it will be implemented on backend side
          social={
            featuresConfig.profileSocialLinks && (
              <Social
                twitter={profileInfo?.twitter}
                instagram={profileInfo?.instagram}
                facebook={profileInfo?.facebook}
                website={profileInfo?.website}
              />
            )
          }
          follow={renderFollow()}
          address={address}
        />

        {profileInfo?.bio && <Bio>{profileInfo.bio}</Bio>}

        <Tabs
          className={classes.tabs}
          onChange={onTabsChange as any}
          value={tab}
        >
          {tabs.map(tabProps => (
            <Tab key={uid(tabProps)} {...tabProps} />
          ))}
        </Tabs>

        <TabPanel value={tab} index={ProfileTab.owned}>
          <TabOwned isOther address={address} />
        </TabPanel>

        <TabPanel value={tab} index={ProfileTab.collections}>
          <TabCollection address={address} isOther />
        </TabPanel>

        <TabPanel value={tab} index={ProfileTab.sells}>
          <TabSale isOther />
        </TabPanel>

        <TabPanel value={tab} index={ProfileTab.liked}>
          <TabLiked isOther />
        </TabPanel>

        {featuresConfig.profileFollowers && (
          <TabPanel value={tab} index={ProfileTab.following}>
            following
          </TabPanel>
        )}
      </Container>
    </Section>
  );
};
