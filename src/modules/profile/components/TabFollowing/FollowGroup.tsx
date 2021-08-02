import React from 'react';
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
  isShowBtn = true,
  isFollow = true,
}: {
  isShowBtn?: boolean;
  isFollow?: boolean;
}) => {
  const classes = useTabFollowingStyles();
  const [isCancelFollow, setIsCancelFollow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [followType, setFollowType] = useState<FollowType>(
    FollowType.Followers,
  );

  const onClose = () => {
    setIsOpen(false);
  };

  const renderFollowGroup = () => (
    <div className={classes.followGroup}>
      {isShowBtn && (
        <div className={classes.followBtnBox}>
          <Button
            className={classes.followBtn}
            startIcon={
              !isCancelFollow &&
              (isFollow ? <CheckmarkIcon /> : <AddFollowIcon />)
            }
            rounded
            onMouseEnter={() => {
              setIsCancelFollow(true);
            }}
            onMouseLeave={() => {
              setIsCancelFollow(false);
            }}
          >
            {isCancelFollow
              ? t('profile.follow.unfollow')
              : isFollow
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
        >
          21 Followers
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
          15 Following
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
