import React, { useMemo } from 'react';
import classNames from 'classnames';
import { uid } from 'react-uid';
import { Link } from 'react-router-dom';
import { useTabFollowingStyles } from './useTabFollowingStyles';
import { Avatar, Box, Grid, Typography } from '@material-ui/core';
import { UserIcon } from 'modules/common/components/Icons/UserIcon';
import { Button } from 'modules/uiKit/Button';
import { t } from 'modules/i18n/utils/intl';

export interface IFollowingItemProps {
  className?: string;
  userName: string;
  userId: number;
  href: string;
  userFollowers: number;
  imgSrc: string;
  follow: boolean;
}

interface ITabFollowingProps {
  className?: string;
  items?: IFollowingItemProps[];
}

export const TabFollowing = ({ className, items }: ITabFollowingProps) => {
  const classes = useTabFollowingStyles();

  const renderListItems = useMemo(
    () =>
      items?.map(item => (
        <Grid item xs={12} spacing={0} className={classes.item} key={uid(item)}>
          <Grid item xs={12} sm={8} lg={9} className={classes.itemContentWrap}>
            <Link to={item.href} className={classes.itemAvatarLink}>
              <Avatar
                alt={item.userName}
                src={item.imgSrc}
                className={classes.itemAvatar}
              />
            </Link>
            <Box className={classes.itemContent}>
              <Link to={item.href} className={classes.itemUserNameLink}>
                <Typography
                  variant="h5"
                  className={classes.itemName}
                  title={item.userName}
                >
                  {item.userName}
                </Typography>
                {item.userFollowers ? (
                  <Typography
                    color="textSecondary"
                    variant="body2"
                    className={classes.userFollowers}
                  >
                    <UserIcon className={classes.userFollowersIcon} />
                    {item.userFollowers}
                  </Typography>
                ) : null}
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} lg={3} className={classes.itemFollowWrap}>
            {item.follow ? (
              <Button
                onClick={() => {}}
                className={classes.followButton}
                variant="outlined"
                fullWidth={false}
                rounded
              >
                {t('profile.unfollow')}
              </Button>
            ) : (
              <Button
                onClick={() => {}}
                className={classes.followButton}
                variant="outlined"
                fullWidth={false}
                rounded
              >
                {t('profile.follow')}
              </Button>
            )}
          </Grid>
        </Grid>
      )),
    [items, classes],
  );

  return (
    <Grid container spacing={0} className={classNames(classes.root, className)}>
      {renderListItems}
    </Grid>
  );
};
