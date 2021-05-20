import { Avatar, AvatarProps } from '@material-ui/core';
import userPic from 'assets/img/logo-small.svg';
import React, { useMemo } from 'react';
import { useDefaultRandomAvatarStyles } from './useDefaultRandomAvatarStyles';

const BG_PRESETS_COUNT = 19;

export const DefaultRandomAvatar = ({
  classes,
  src,
  ...restProps
}: AvatarProps) => {
  const styles = useDefaultRandomAvatarStyles();

  const randomBg = useMemo(
    () => Math.floor(Math.random() * BG_PRESETS_COUNT),
    [],
  );
  const withoutImg = !src;

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
