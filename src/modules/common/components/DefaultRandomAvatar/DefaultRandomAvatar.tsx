import React, { useRef } from 'react';
import { Avatar, AvatarProps } from '@material-ui/core';
import { useDefaultRandomAvatarStyles } from './useDefaultRandomAvatarStyles';
import userPic from 'assets/img/logo-small.svg';

export const DefaultRandomAvatar = ({ classes, ...restProps }: AvatarProps) => {
  const styles = useDefaultRandomAvatarStyles();

  const randomBg = useRef(Math.floor(Math.random() * 19));
  let rootRandomBg = '';
  let imgFallbackStyle = '';

  if (!restProps.src || !restProps.srcSet) {
    restProps.src = userPic;
    rootRandomBg = styles[`color${randomBg.current}`];
    imgFallbackStyle = styles.img;
  }

  return (
    <Avatar
      {...restProps}
      classes={{
        ...classes,
        root: rootRandomBg,
        img: imgFallbackStyle,
      }}
    />
  );
};
