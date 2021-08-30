import { Container } from '@material-ui/core';
import { useQuery } from '@redux-requests/react';
import { useAccount } from 'modules/account/hooks/useAccount';
import { queryMyBrandItem } from 'modules/brand/actions/queryMyBrandItem';
import { UploadFileType } from 'modules/common/actions/uploadFile';
import { Social } from 'modules/common/components/Social';
import { featuresConfig } from 'modules/common/conts';
import { t } from 'modules/i18n/utils/intl';
import { fetchOwned } from 'modules/profile/actions/fetchOwned';
import { fetchProfileInfo } from 'modules/profile/actions/fetchProfileInfo';
import { fetchMyBids, fetchMySale } from 'modules/profile/actions/fetchSale';
import { queryLikedItems } from 'modules/profile/actions/queryLikedItems';
import { IProfileInfo } from 'modules/profile/api/profileInfo';
import { Avatar } from 'modules/profile/components/Avatar';
import { Bio } from 'modules/profile/components/Bio';
import { Header } from 'modules/profile/components/Header';
import { InfoPanel } from 'modules/profile/components/InfoPanel';
import { SetAvatarModal } from 'modules/profile/components/SetAvatarModal';
import { SetBgImgModal } from 'modules/profile/components/SetBgImgModal';
import { Subscribers } from 'modules/profile/components/Subscribers';
import { FollowGroup } from 'modules/profile/components/TabFollowing';
import { TabCollection } from 'modules/profile/components/TabCollection';
import { TabPanel } from 'modules/profile/components/TabPanel';
import { Tabs } from 'modules/profile/components/Tabs';
import { Tab } from 'modules/profile/components/Tabs/Tab';
import { ProfileRoutesConfig, ProfileTab } from 'modules/profile/ProfileRoutes';
import { Section } from 'modules/uiKit/Section';
import React, { useCallback, useMemo, useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { uid } from 'react-uid';
import { TabActivity } from '../../components/TabActivity';
import { TabBids } from './components/TabBids';
import { TabLiked } from './components/TabLiked';
import { TabOwned } from './components/tabOwned';
import { TabSale } from './components/TabSale';
import { useProfileStyles } from './useProfileStyles';
import { RootState } from 'store/store';
import useCdnUrl from 'modules/common/hooks/useCdnUrl';

export const Profile = () => {
  const { tab } = ProfileRoutesConfig.UserProfile.useParams();
  const [isAvatarModalOpened, setAvatarModalOpened] = useState(false);
  const [isBgImgModalOpened, setBgImgModalOpened] = useState(false);
  const classes = useProfileStyles();
  const { address } = useAccount();
  const { push } = useHistory();
  const dispatch = useDispatch();

  const { count: likeCount } = useSelector<RootState, RootState['like']>(
    state => state.like,
  );

  const { data: profileInfo } = useQuery<IProfileInfo | null>({
    type: fetchProfileInfo.toString(),
  });

  const { imgSrc } = useCdnUrl(profileInfo?.imgUrl || ' ', 160);

  const toggleAvatarModal = useCallback(
    (isOpen: boolean) => () => {
      setAvatarModalOpened(isOpen);
    },
    [],
  );

  const toggleBgImgModal = useCallback(
    (isOpen: boolean) => () => {
      setBgImgModalOpened(isOpen);
    },
    [],
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
        case ProfileTab.bids: {
          dispatch(fetchMyBids({ address }));
          break;
        }
        case ProfileTab.activity: {
          break;
        }
        case ProfileTab.liked: {
          dispatch(queryLikedItems());
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
      push(ProfileRoutesConfig.UserProfile.generatePath(value));
      updateData(value);
    },
    [push, updateData],
  );

  useEffect(() => {
    updateData(tab);
  }, [updateData, tab]);

  const reload = (value: ProfileTab) => () => {
    setTimeout(() => {
      updateData(value);
    }, 100);
  };

  const tabs = useMemo(
    () => [
      {
        value: ProfileTab.sells,
        label: t('profile.tabs.my-sells'),
      },
      {
        value: ProfileTab.collections,
        label: t('profile.tabs.my-collections'),
      },
      {
        value: ProfileTab.owned,
        label: t('profile.tabs.showcase'),
      },
      {
        value: ProfileTab.bids,
        label: t('profile.tabs.my-bids'),
      },
      {
        value: ProfileTab.activity,
        label: t('profile.tabs.activity'),
      },
      ...(featuresConfig.nftLikes
        ? [
            {
              value: ProfileTab.liked,
              label: t('profile.tabs.liked'),
              count: likeCount,
            },
          ]
        : []),
      ...(featuresConfig.profileFollowers
        ? [
            {
              value: ProfileTab.following,
              label: t('profile.tabs.following'),
              count: 0,
            },
            {
              value: ProfileTab.followers,
              label: t('profile.tabs.followers'),
              count: 0,
            },
          ]
        : []),
    ],
    [likeCount],
  );

  const renderFollow = useCallback(() => {
    if (!address) return;
    return (
      <FollowGroup
        followAddress={address}
        followersCount={profileInfo?.followersCount}
        followingCount={profileInfo?.followingCount}
        black={true}
      />
    );
  }, [profileInfo, address]);

  return (
    <Section className={classes.root}>
      <Header
        img={profileInfo?.bgImgUrl}
        onEditClick={toggleBgImgModal(true)}
      />

      <SetBgImgModal
        isOpen={isBgImgModalOpened}
        onClose={toggleBgImgModal(false)}
        fileType={UploadFileType.BgImg}
      />

      <Container>
        <Avatar
          className={classes.avatar}
          src={imgSrc}
          onEditClick={toggleAvatarModal(true)}
          isEditable
          isVerified={profileInfo?.identity === 2}
        />

        <SetAvatarModal
          isOpen={isAvatarModalOpened}
          onClose={toggleAvatarModal(false)}
        />

        <InfoPanel
          isEditable
          withSharing={featuresConfig.ownProfileSharing}
          name={profileInfo?.username}
          email={profileInfo?.email}
          subscribers={
            featuresConfig.subscribers && (
              <Subscribers count={profileInfo?.followCount} />
            )
          }
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
          <TabOwned address={address} reload={reload(ProfileTab.owned)} />
        </TabPanel>

        <TabPanel value={tab} index={ProfileTab.collections}>
          <TabCollection />
        </TabPanel>

        <TabPanel value={tab} index={ProfileTab.sells}>
          <TabSale reload={reload(ProfileTab.sells)} />
        </TabPanel>

        <TabPanel value={tab} index={ProfileTab.bids}>
          <TabBids reload={reload(ProfileTab.bids)} />
        </TabPanel>

        <TabPanel value={tab} index={ProfileTab.activity}>
          <TabActivity />
        </TabPanel>

        {featuresConfig.nftLikes && (
          <TabPanel value={tab} index={ProfileTab.liked}>
            <TabLiked />
          </TabPanel>
        )}
      </Container>
    </Section>
  );
};
