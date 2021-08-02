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
import { IFollowingItemProps, TabFollowing } from '.';
import { useFollow } from './useFollow';

enum FollowType {
  Followers = 'Followers',
  Following = 'Following',
}

const MockFollowList: IFollowingItemProps[] = [
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
  {
    userName: 'Pasha Ho',
    userId: 1233,
    href: '#',
    userFollowers: 150,
    imgSrc: 'https://picsum.photos/82?random=200',
    follow: false,
  },
  {
    userName: 'John Smith',
    userId: 3212,
    href: '#',
    userFollowers: 0,
    imgSrc: 'https://picsum.photos/82?random=201',
    follow: true,
  },
  {
    userName: 'Smith John',
    userId: 2143,
    href: '#',
    userFollowers: 15,
    imgSrc: 'https://picsum.photos/82?random=202',
    follow: false,
  },
  {
    userName: 'Pasha Ho',
    userId: 1253,
    href: '#',
    userFollowers: 150,
    imgSrc: 'https://picsum.photos/82?random=200',
    follow: false,
  },
];

export const FollowGroup = ({
  followAddress,
  followersCount: initFollowersCount = 0,
  followingCount: initFollowingCount = 0,
}: {
  followAddress: string;
  followersCount?: number;
  followingCount?: number;
}) => {
  const classes = useTabFollowingStyles();
  const [isCancelFollow, setIsCancelFollow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [followType, setFollowType] = useState<FollowType>(
    FollowType.Followers,
  );

  const [followersCount, setFollowersCount] = useState(initFollowersCount);
  const [followingCount, setFollowingCount] = useState(initFollowingCount);

  useEffect(() => {
    setFollowersCount(initFollowersCount);
    setFollowingCount(initFollowingCount);
  }, [initFollowersCount, initFollowingCount]);

  const { isFollowd, onFollowClick } = useFollow({ followAddress });

  const onClose = () => {
    setIsOpen(false);
  };

  const onSubmitFollow = () => {
    onFollowClick().then(async () => {
      await setIsCancelFollow(!isFollowd);
      if (!isFollowd) {
        return setFollowersCount(followersCount + 1);
      }
      setFollowersCount(followersCount - 1);
    });
  };

  const renderFollowGroup = () => (
    <div className={classes.followGroup}>
      {
        <div className={classes.followBtnBox}>
          <Button
            className={classes.followBtn}
            startIcon={
              !isCancelFollow &&
              (isFollowd ? <CheckmarkIcon /> : <AddFollowIcon />)
            }
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
      }

      <div className={classNames(classes.followers, classes.followFont)}>
        <p
          onClick={() => {
            setIsOpen(true);
            setFollowType(FollowType.Followers);
          }}
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
          <TabFollowing items={MockFollowList} />
        </div>

        <ModalCloseBtn onClick={onClose} />
      </Dialog>
    </>
  );
};
