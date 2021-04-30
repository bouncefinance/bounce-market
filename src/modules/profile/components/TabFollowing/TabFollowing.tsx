import React, { ReactNode, useMemo } from 'react';
import classNames from 'classnames';
import { uid } from 'react-uid';
import { IImgProps, Img } from 'modules/uiKit/Img';
import { useTabFollowingStyles } from './useTabFollowingStyles';
import { Box, Grid } from '@material-ui/core';

interface IFollowingItemProps {
  className?: string;
  userName: string;
  href: string;
  userFollowers: number;
  ImgProps: IImgProps;
  imgPreloader?: ReactNode;
  follow: boolean;
}

type TabFollowingProps = Omit<IFollowingItemProps, 'ImgProps'> & {
  img: string;
};

interface ITabFollowingProps {
  className?: string;
  items?: TabFollowingProps[];
}

export const TabFollowing = ({ className, items }: ITabFollowingProps) => {
  const classes = useTabFollowingStyles();

  const renderListItems = useMemo(() => {
    items?.map(item => (
      null
    ));
  }, [items]);

  return (
    <Box className={classNames(classes.root, className)}>
      <Grid container xs={12} className={classes.followingList}>
          {renderListItems}
      </Grid>
    </Box>
  );
};