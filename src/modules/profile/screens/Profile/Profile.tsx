import { Container } from '@material-ui/core';
import { useQuery } from '@redux-requests/react';
import { useAccount } from 'modules/account/hooks/useAccount';
import { UploadFileType } from 'modules/common/actions/uploadFile';
import { Social } from 'modules/common/components/Social';
import { featuresConfig } from 'modules/common/conts';
import { t } from 'modules/i18n/utils/intl';
import { fetchProfileInfo } from 'modules/profile/actions/fetchProfileInfo';
import {
  ILikedItem,
  queryLikedItems,
} from 'modules/profile/actions/queryLikedItems';
import { IProfileInfo } from 'modules/profile/api/profileInfo';
import { Avatar } from 'modules/profile/components/Avatar';
import { Bio } from 'modules/profile/components/Bio';
import { Header } from 'modules/profile/components/Header';
import { InfoPanel } from 'modules/profile/components/InfoPanel';
import { SetAvatarModal } from 'modules/profile/components/SetAvatarModal';
import { SetBgImgModal } from 'modules/profile/components/SetBgImgModal';
import { Subscribers } from 'modules/profile/components/Subscribers';
import { TabBrands } from 'modules/profile/components/TabBrands';
import {
  IFollowingItemProps,
  TabFollowing,
} from 'modules/profile/components/TabFollowing';
import { TabPanel } from 'modules/profile/components/TabPanel';
import { Tabs } from 'modules/profile/components/Tabs';
import { Tab } from 'modules/profile/components/Tabs/Tab';
import { ProfileRoutesConfig, ProfileTab } from 'modules/profile/ProfileRoutes';
import { Section } from 'modules/uiKit/Section';
import React, { useCallback, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { uid } from 'react-uid';
import { TabActivity } from '../../components/TabActivity';
import { TabBids } from './components/TabBids';
import { TabItems } from './components/TabItems';
import { TabLiked } from './components/TabLiked';
import { useProfileStyles } from './useProfileStyles';

const followings: IFollowingItemProps[] = [
  {
    userName: 'Pasha Ho',
    userId: 123,
    href: '#',
    userFollowers: 150,
    imgSrc: 'https://picsum.photos/82?random=200',
    follow: false,
  },
  {
    userName: 'John Smith',
    userId: 321,
    href: '#',
    userFollowers: 0,
    imgSrc: 'https://picsum.photos/82?random=201',
    follow: true,
  },
  {
    userName: 'Smith John',
    userId: 213,
    href: '#',
    userFollowers: 15,
    imgSrc: 'https://picsum.photos/82?random=202',
    follow: false,
  },
];

const followers = followings;

export const Profile = () => {
  const { tab } = ProfileRoutesConfig.UserProfile.useParams();
  const [isAvatarModalOpened, setAvatarModalOpened] = useState(false);
  const [isBgImgModalOpened, setBgImgModalOpened] = useState(false);
  const classes = useProfileStyles();
  const { address } = useAccount();
  const { push } = useHistory();

  const { data: likedItems } = useQuery<ILikedItem[] | null>({
    type: queryLikedItems.toString(),
  });

  const { data: profileInfo } = useQuery<IProfileInfo | null>({
    type: fetchProfileInfo.toString(),
  });

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

  const onTabsChange = useCallback(
    (_, value) => {
      push(ProfileRoutesConfig.UserProfile.generatePath(value));
    },
    [push],
  );

  const tabs = useMemo(
    () => [
      {
        value: ProfileTab.items,
        label: t('profile.tabs.my-items'),
      },
      {
        value: ProfileTab.bids,
        label: t('profile.tabs.my-bids'),
      },
      {
        value: ProfileTab.brands,
        label: t('profile.tabs.my-collections'),
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
              count: likedItems ? likedItems.length : 0,
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
    [likedItems],
  );

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
          src={profileInfo?.imgUrl}
          onEditClick={toggleAvatarModal(true)}
          isEditable
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
              />
            )
          }
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

        <TabPanel value={tab} index={ProfileTab.items}>
          <TabItems />
        </TabPanel>

        <TabPanel value={tab} index={ProfileTab.brands}>
          <TabBrands />
        </TabPanel>

        <TabPanel value={tab} index={ProfileTab.sells}>
          <TabBids />
        </TabPanel>

        <TabPanel value={tab} index={ProfileTab.bids}>
          <TabBids />
        </TabPanel>

        <TabPanel value={tab} index={ProfileTab.activity}>
          <TabActivity />
        </TabPanel>

        {featuresConfig.nftLikes && (
          <TabPanel value={tab} index={ProfileTab.liked}>
            <TabLiked />
          </TabPanel>
        )}

        <TabPanel value={tab} index={ProfileTab.following}>
          <TabFollowing items={followings} />
        </TabPanel>

        <TabPanel value={tab} index={ProfileTab.followers}>
          <TabFollowing items={followers} />
        </TabPanel>
      </Container>
    </Section>
  );
};
