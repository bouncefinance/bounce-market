import { Avatar, AvatarProps } from '@material-ui/core';
import userPic from 'assets/img/logo-small.svg';
import React, { useMemo } from 'react';
import { useDefaultRandomAvatarStyles } from './useDefaultRandomAvatarStyles';

export const DefaultRandomAvatar = ({
  classes,
  src,
  ...restProps
}: AvatarProps) => {
  const styles = useDefaultRandomAvatarStyles();

  const randomBg = useMemo(() => Math.floor(Math.random() * 19), []);
  const withoutImg = !src;

  console.log(randomBg);

  return (
    <Avatar
      {...restProps}
      src={withoutImg ? userPic : src}
      classes={{
        ...classes,
        root: withoutImg ? styles[`color${randomBg}`] : '',
        img: withoutImg ? styles.img : '',
      }}
    />
  );
};
