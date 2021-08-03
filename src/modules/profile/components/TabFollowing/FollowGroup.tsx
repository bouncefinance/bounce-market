import React, { useEffect } from 'react';
import { useTabFollowingStyles } from './useTabFollowingStyles';
import { AddFollowIcon } from './assets/AddFollowIcon';
import { CheckmarkIcon } from './assets/CheckmarkIcon';
import { Button } from 'modules/uiKit/Button';
import { t } from 'modules/i18n/utils/intl';
import classNames from 'classnames';
import { useState } from 'react';
import { Dialog } from '@material-ui/core';
import { ModalCloseBtn } from 'modules/uiKit/ModalCloseBtn';
import { TabFollowing } from '.';
import { useFollow } from './useFollow';
import { useAccount } from 'modules/account/hooks/useAccount';

export enum FollowType {
  Followers = 'Followers',
  Following = 'Following',
}

export const FollowGroup = ({
  followAddress,
  followersCount: initFollowersCount = 0,
  followingCount: initFollowingCount = 0,
  black,
}: {
  followAddress: string;
  followersCount?: number;
  followingCount?: number;
  black?: boolean;
}) => {
  const classes = useTabFollowingStyles();
  const [isCancelFollow, setIsCancelFollow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [followType, setFollowType] = useState<FollowType>(
    FollowType.Followers,
  );
  const { address } = useAccount();
  const [followersCount, setFollowersCount] = useState(initFollowersCount);
  const [followingCount, setFollowingCount] = useState(initFollowingCount);

  useEffect(() => {
    setFollowersCount(initFollowersCount);
    setFollowingCount(initFollowingCount);
  }, [initFollowersCount, initFollowingCount]);

  const {
    isFollowd,
    onFollowClick,
    isHiddenFollowBtn,
    toggleLoading,
  } = useFollow({ followAddress, setFollowersCount });

  const onClose = () => {
    setIsOpen(false);
  };

  const onSubmitFollow = () => {
    onFollowClick({})
      .then(async () => {
        setIsCancelFollow(!isFollowd);
      })
      .catch(() => {});
  };

  const renderFollowGroup = () => (
    <div className={classes.followGroup}>
      {!isHiddenFollowBtn && (
        <div className={classes.followBtnBox}>
          <Button
            className={classes.followBtn}
            startIcon={
              !isCancelFollow &&
              (isFollowd ? <CheckmarkIcon /> : <AddFollowIcon />)
            }
            disabled={toggleLoading}
            rounded
            onMouseEnter={() => {
              if (!isFollowd) return;
              setIsCancelFollow(true);
            }}
            onMouseLeave={() => {
              setIsCancelFollow(false);
            }}
            onClick={onSubmitFollow}
          >
            {isCancelFollow
              ? t('profile.follow.unfollow')
              : isFollowd
              ? t('profile.follow.following')
              : t('profile.follow.follow')}
          </Button>
        </div>
      )}

      <div className={classNames(classes.followers, classes.followFont)}>
        <p
          onClick={() => {
            setIsOpen(true);
            setFollowType(FollowType.Followers);
          }}
          className={black ? classes.black : ''}
        >
          {`${followersCount} ${t('profile.follow.followers')}`}
        </p>
      </div>

      <div className={classes.divid}></div>

      <div className={classNames(classes.following, classes.followFont)}>
        <p
          onClick={() => {
            setIsOpen(true);
            setFollowType(FollowType.Following);
          }}
          className={black ? classes.black : ''}
        >
          {`${followingCount} ${t('profile.follow.following')}`}
        </p>
      </div>
    </div>
  );

  return (
    <>
      {renderFollowGroup()}

      <Dialog
        open={isOpen}
        onClose={onClose}
        classes={{
          paper: classes.root,
        }}
      >
        <h1 className={classes.h1}>
          {followType === FollowType.Followers
            ? t('profile.follow.followers')
            : t('profile.follow.following')}
        </h1>
        <div className={classes.cardWrapper}>
          <TabFollowing
            followAddress={followAddress}
            accountaddress={address || ''}
            renderType={followType}
            setFollowingCount={setFollowingCount}
          />
        </div>

        <ModalCloseBtn onClick={onClose} />
      </Dialog>
    </>
  );
};
