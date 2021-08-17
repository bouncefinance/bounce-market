import { Avatar, AvatarProps } from '@material-ui/core';
import userPic from 'assets/img/logo-small.svg';
import { addUserColorDataAsync } from 'modules/common/store/user';
import React, { useMemo } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { useDefaultRandomAvatarStyles } from './useDefaultRandomAvatarStyles';

const BG_PRESETS_COUNT = 19;

interface props extends AvatarProps {
  address?: string;
}
export const DefaultRandomAvatar = ({
  classes,
  src,
  address,
  ...restProps
}: props) => {
  const styles = useDefaultRandomAvatarStyles();
  const dispatch = useDispatch();
  const { colors } = useSelector((store: RootState) => store.user);

  const range = useMemo(() => Math.floor(Math.random() * BG_PRESETS_COUNT), []);
  useEffect(() => {
    if (address) {
      addUserColorDataAsync({ userName: address, randomColor: range })(
        dispatch,
      );
    }
  }, [address, range, dispatch]);

  const randomBg = useMemo(() => {
    if (address) {
      return colors[address] ?? range;
    }
    return range;
  }, [address, range, colors]);

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
