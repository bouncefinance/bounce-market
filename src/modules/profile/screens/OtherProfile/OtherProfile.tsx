import { Container } from '@material-ui/core';
import { resetRequests } from '@redux-requests/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useAccount } from 'modules/account/hooks/useAccount';
import { QueryLoadingAbsolute } from 'modules/common/components/QueryLoading/QueryLoading';
import { featuresConfig } from 'modules/common/conts';
import { t } from 'modules/i18n/utils/intl';
import { fetchProfileInfo } from 'modules/profile/actions/fetchProfileInfo';
import { IProfileInfo } from 'modules/profile/api/profileInfo';
import { Avatar } from 'modules/profile/components/Avatar';
import { Bio } from 'modules/profile/components/Bio';
import { Header } from 'modules/profile/components/Header';
import { InfoPanel } from 'modules/profile/components/InfoPanel';
import { Social } from 'modules/profile/components/Social';
import { Subscribers } from 'modules/profile/components/Subscribers';
import { TabPanel } from 'modules/profile/components/TabPanel';
import { Tabs } from 'modules/profile/components/Tabs';
import { Tab } from 'modules/profile/components/Tabs/Tab';
import { ProfileRoutesConfig, ProfileTab } from 'modules/profile/ProfileRoutes';
import { Section } from 'modules/uiKit/Section';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { uid } from 'react-uid';
import { ConnectWallet } from './components/ConnectWallet';
import { TabBrands } from './components/TabBrands';
import { TabItems } from './components/TabItems';
import { useOtherProfileStyles } from './useOtherProfileStyles';

export const PROFILE_INFO_REQUEST_KEY = '/other';

export const OtherProfile = () => {
  const dispatchRequest = useDispatchRequest();
  const dispatch = useDispatch();
  const { tab, address } = ProfileRoutesConfig.OtherProfile.useParams();
  const classes = useOtherProfileStyles();
  const { push } = useHistory();
  const { isConnected } = useAccount();

  const {
    data: profileInfo,
    loading: profileInfoLoading,
  } = useQuery<IProfileInfo | null>({
    type: fetchProfileInfo.toString(),
    requestKey: PROFILE_INFO_REQUEST_KEY,
  });

  useEffect(() => {
    dispatchRequest(
      fetchProfileInfo({ address }, { requestKey: PROFILE_INFO_REQUEST_KEY }),
    );

    return function reset() {
      dispatch(
        resetRequests([
          {
            requestType: fetchProfileInfo.toString(),
            requestKey: PROFILE_INFO_REQUEST_KEY,
          },
        ]),
      );
    };
  }, [address, dispatch, dispatchRequest, isConnected]);

  const tabs = useMemo(
    () => [
      {
        value: ProfileTab.items,
        label: t('profile.tabs.items'),
      },
      {
        value: ProfileTab.brands,
        label: t('profile.tabs.brands'),
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
    [],
  );

  const onTabsChange = useCallback(
    (_, value) => {
      push(ProfileRoutesConfig.OtherProfile.generatePath(address, value));
    },
    [address, push],
  );

  if (profileInfoLoading) {
    return <QueryLoadingAbsolute />;
  }

  return (
    <Section className={classes.root}>
      <Header img={profileInfo?.bgImgUrl} />

      <Container>
        <Avatar className={classes.avatar} src={profileInfo?.imgUrl} />
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
          social={featuresConfig.profileSocialLinks && <Social />}
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

        {isConnected ? (
          <>
            <TabPanel value={tab} index={ProfileTab.items}>
              <TabItems address={address} />
            </TabPanel>

            <TabPanel value={tab} index={ProfileTab.brands}>
              <TabBrands address={address} />
            </TabPanel>

            {featuresConfig.profileFollowers && (
              <TabPanel value={tab} index={ProfileTab.following}>
                following
              </TabPanel>
            )}
          </>
        ) : (
          <ConnectWallet />
        )}
      </Container>
    </Section>
  );
};
