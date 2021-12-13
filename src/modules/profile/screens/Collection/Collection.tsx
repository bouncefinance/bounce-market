import { Box, Container } from '@material-ui/core';
import { useQuery } from '@redux-requests/react';
import { useAccount } from 'modules/account/hooks/useAccount';
import { UploadFileType } from 'modules/common/actions/uploadFile';
import {
  featuresConfig,
  isOtherPlatformCode,
  ZERO_ADDRESS,
} from 'modules/common/conts';
import { t } from 'modules/i18n/utils/intl';
import { fetchCollectionSale } from 'modules/profile/actions/fetchSale';
import { IProfileInfo } from 'modules/profile/api/profileInfo';
import { Avatar } from 'modules/profile/components/Avatar';
import { Header } from 'modules/profile/components/Header';
import { InfoPanel } from 'modules/profile/components/InfoPanel';
import {
  AvatarType,
  SetAvatarModal,
} from 'modules/profile/components/SetAvatarModal';
import { SetBgImgModal } from 'modules/profile/components/SetBgImgModal';
import { Subscribers } from 'modules/profile/components/Subscribers';
import { FollowGroup } from 'modules/profile/components/TabFollowing';
import { TabPanel } from 'modules/profile/components/TabPanel';
import { Tabs } from 'modules/profile/components/Tabs';
import { Tab } from 'modules/profile/components/Tabs/Tab';
import { ProfileRoutesConfig, ProfileTab } from 'modules/profile/ProfileRoutes';
import { Section } from 'modules/uiKit/Section';
import React, { useCallback, useMemo, useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { uid } from 'react-uid';
import { useCollectionStyles } from './useCollectionStyles';
import useCdnUrl from 'modules/common/hooks/useCdnUrl';
import {
  fetchCollectionInfoByAddress,
  ICollectionItem,
} from 'modules/profile/actions/fetchCollectionInfoByAddress';
import { fetchProfileInfo } from 'modules/profile/actions/fetchProfileInfo';
import { RoyaltyDialog } from 'modules/brand/components/RoyaltyDialog';
import { ProfileInfo } from 'modules/common/components/ProfileInfo';
import { truncateWalletAddr } from 'modules/common/utils/truncateWalletAddr';
import { UserRoleEnum } from 'modules/common/actions/queryAccountInfo';
import { CollectionDescDialog } from './components/CollectionDescDialog';
import { TabSale } from '../Profile/components/TabSale';
import { GoBack } from 'modules/layout/components/GoBack';
import { Button } from 'modules/uiKit/Button';
import { Link as RouterLink } from 'react-router-dom';
import { PlusIcon } from 'modules/common/components/Icons/PlusIcon';
import classNames from 'classnames';
import { BrandRoutesConfig } from 'modules/brand/BrandRoutes';
import { resetRequests } from '@redux-requests/core';
import { CrateItemAll } from 'modules/profile/components/TabCollection';
import { fetchCollection } from 'modules/profile/actions/fetchCollection';
import { compare } from 'modules/brand/api/queryBrand';

export const Collection = () => {
  const {
    tab,
    address: collectionAddress,
    art,
  } = ProfileRoutesConfig.Collection.useParams();
  const [isMyCollection, setIsMyCollection] = useState(false);
  const classes = useCollectionStyles();
  const { address } = useAccount();
  const { replace } = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!collectionAddress) return;
    dispatch(
      fetchCollectionInfoByAddress({
        collectionAddress: collectionAddress,
      }),
    );

    return function reset() {
      dispatch(resetRequests([fetchCollectionInfoByAddress.toString()]));
    };
  }, [collectionAddress, dispatch]);
  const { data: profileInfo } = useQuery<IProfileInfo | null>({
    type: fetchProfileInfo.toString(),
  });

  const { data: collectionInfo } = useQuery<ICollectionItem | null>({
    type: fetchCollectionInfoByAddress.toString(),
  });

  // 设置 Collection 头像功能
  const [isAvatarModalOpened, setAvatarModalOpened] = useState(false);
  const [showAvatarImg, setShowAvatarImg] = useState('');
  const { imgSrc: avatarImg } = useCdnUrl(collectionInfo?.imgurl || ' ', 160);
  const changeShowAvatarImg = (imgSrc: string) => {
    setShowAvatarImg(imgSrc);
  };

  // 设置背景图片功能
  const bgImg = collectionInfo?.bandimgurl;
  const [isBgImgModalOpened, setBgImgModalOpened] = useState(false);
  const [showBgImg, setShowBgImg] = useState('');
  const changeShowBgImg = (imgSrc: string) => {
    setShowBgImg(imgSrc);
  };

  // 控制 Royalty 板块
  const [royaltyOpen, setRoyaltyOpen] = useState(false);
  const handelOpenRoyalty: (collection: string) => void = collection => {
    setRoyaltyOpen(!royaltyOpen);
  };

  // 控制修改 Desc 板块
  const [showCollectionDesc, setShowCollectionDesc] = useState('');
  const changeShowCollectionDesc: (desc: string) => void = desc => {
    setShowCollectionDesc(desc);
  };
  const [modifyDescOpen, setModifyDescOpen] = useState(false);
  const handelOpenModifyDesc: (collection: string) => void = collection => {
    setModifyDescOpen(!modifyDescOpen);
  };

  useEffect(() => {
    const isMyCollection = compare(
      address ?? ZERO_ADDRESS,
      collectionInfo?.owneraddress || '',
    );
    setIsMyCollection(isMyCollection);
  }, [address, collectionInfo]);

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

  interface reloadOptions {
    offset: number;
  }
  const isOtherPlatform = collectionInfo?.isplatform === isOtherPlatformCode;
  const updateData = useCallback(
    (value: ProfileTab, option?: reloadOptions) => {
      if (!collectionInfo?.owneraddress) {
        return;
      }
      switch (value) {
        case ProfileTab.owned: {
          dispatch(
            fetchCollection({
              address: collectionInfo?.owneraddress || '',
              className: collectionAddress,
              isPlatform: collectionInfo.isplatform,
              ...(isOtherPlatform
                ? {
                    offset: option?.offset ?? 0,
                    limit: 10,
                  }
                : {}),
            }),
          );
          break;
        }
        case ProfileTab.sells: {
          dispatch(
            fetchCollectionSale({
              address: art === 'art' ? collectionInfo?.owneraddress || '' : '',
              collectionAddress,
            }),
          );
          break;
        }
        default: {
          console.error('not match tab', value);
        }
      }
    },
    // eslint-disable-next-line
    [
      address,
      collectionAddress,
      dispatch,
      collectionInfo?.owneraddress,
      collectionInfo?.isplatform,
      art,
    ],
  );

  const onTabsChange = useCallback(
    (_, value) => {
      replace(
        ProfileRoutesConfig.Collection.generatePath(
          collectionAddress,
          value,
          art,
        ),
      );
      updateData(value);
    },
    [replace, updateData, collectionAddress, art],
  );

  useEffect(() => {
    updateData(tab);
  }, [updateData, tab]);

  const reload = (value: ProfileTab) => (option?: reloadOptions) => {
    setTimeout(() => {
      updateData(value, option);
    }, 100);
  };

  const tabs = useMemo(
    () => [
      {
        value: ProfileTab.sells,
        label: t('profile.tabs.my-sells'),
      },
      {
        value: ProfileTab.owned,
        label: t('profile.tabs.all-item'),
      },
    ],
    [],
  );

  const renderFollow = useCallback(() => {
    if (!address) return;
    return (
      <FollowGroup
        followAddress={collectionInfo?.owneraddress || ''}
        followersCount={collectionInfo?.followerscount || 0}
        followingCount={collectionInfo?.followingcount || 0}
        black={true}
      />
    );
  }, [collectionInfo, address]);

  return (
    <Section className={classes.root}>
      {/* 设置背景图片 */}
      <Header
        img={showBgImg || bgImg}
        onEditClick={toggleBgImgModal(true)}
        isHiddenCustom={!isMyCollection}
      />

      {isMyCollection && (
        <SetBgImgModal
          isOpen={isBgImgModalOpened}
          onClose={toggleBgImgModal(false)}
          fileType={UploadFileType.BrandImg}
          contractaddress={collectionInfo?.contractaddress}
          successCallback={changeShowBgImg}
        />
      )}

      <Container>
        <Avatar
          className={classes.avatar}
          src={showAvatarImg || avatarImg}
          onEditClick={toggleAvatarModal(true)}
          isEditable={isMyCollection}
          isVerified={collectionInfo?.identity === UserRoleEnum.Verified}
        />
        {isMyCollection && (
          <SetAvatarModal
            isOpen={isAvatarModalOpened}
            onClose={toggleAvatarModal(false)}
            avatarType={AvatarType.Collection}
            collectionAvatar={showAvatarImg || avatarImg}
            collectionAddress={collectionAddress}
            successCallback={changeShowAvatarImg}
          />
        )}
        <InfoPanel
          isEditable={isMyCollection}
          withSharing={featuresConfig.ownProfileSharing}
          name={collectionInfo?.brandname}
          subscribers={
            featuresConfig.subscribers && (
              <Subscribers count={profileInfo?.followCount} />
            )
          }
          follow={featuresConfig.collectionFollow && renderFollow()}
          address={address}
          isCollection={true}
          collectionAddress={collectionAddress}
          handelOpenRoyalty={handelOpenRoyalty}
          handelOpenModifyDesc={handelOpenModifyDesc}
          profile={
            isMyCollection && (
              <ProfileInfo
                subTitle={t('details-nft.role.minter')}
                title={
                  collectionInfo?.ownername ??
                  truncateWalletAddr(collectionInfo?.owneraddress || '')
                }
                users={[
                  {
                    href: ProfileRoutesConfig.OtherProfile.generatePath(
                      collectionInfo?.owneraddress,
                    ),
                    name:
                      collectionInfo?.ownername ??
                      truncateWalletAddr(collectionInfo?.owneraddress || ''),
                    avatar: collectionInfo?.ownerimg,
                    verified:
                      collectionInfo?.identity === UserRoleEnum.Verified,
                    address: collectionInfo?.owneraddress,
                  },
                ]}
              />
            )
          }
          collectionDesc={showCollectionDesc || collectionInfo?.description}
        />
        <Tabs
          className={classes.tabs}
          onChange={onTabsChange as any}
          value={tab}
        >
          {tabs.map(tabProps => (
            <Tab key={uid(tabProps)} {...tabProps} />
          ))}
        </Tabs>
        <Box mb={3.5} className={classes.optionHeaderBtnWrapper}>
          <GoBack />
          {isMyCollection && (
            <Button
              component={RouterLink}
              to={BrandRoutesConfig.CreateCollectionItem.generatePath(
                collectionInfo?.id || -1,
              )}
              size="medium"
              variant="outlined"
              fullWidth={false}
              rounded
              startIcon={
                <PlusIcon
                  className={classNames(
                    classes.icon,
                    classes.iconInheritFontSize,
                  )}
                />
              }
            >
              {t('collection.card.addNewItem')}
            </Button>
          )}
        </Box>

        <TabPanel value={tab} index={ProfileTab.owned}>
          <CrateItemAll
            artAddress={collectionInfo?.owneraddress || ''}
            isOther={!isMyCollection}
            reload={reload(ProfileTab.owned)}
            isOtherPlatform={isOtherPlatform}
          />
        </TabPanel>
        <TabPanel value={tab} index={ProfileTab.sells}>
          <TabSale
            isOther={!isMyCollection}
            isCollectionSale
            reload={reload(ProfileTab.sells)}
          />
        </TabPanel>
      </Container>

      <RoyaltyDialog
        isOpen={royaltyOpen}
        onClose={() => {
          setRoyaltyOpen(false);
        }}
        collection={collectionAddress}
      />

      <CollectionDescDialog
        isOpen={modifyDescOpen}
        onClose={() => {
          setModifyDescOpen(false);
        }}
        collection={collectionAddress}
        description={showCollectionDesc || collectionInfo?.description || ''}
        successCallback={changeShowCollectionDesc}
      />
    </Section>
  );
};
