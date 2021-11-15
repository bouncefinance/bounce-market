import { Avatar, AvatarProps } from '@material-ui/core';
import userPic from 'assets/img/logo-small.svg';
import { addUserColorDataAsync } from 'modules/common/store/user';
import React, { useLayoutEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { useDefaultRandomAvatarStyles } from './useDefaultRandomAvatarStyles';
import useCdnUrl from 'modules/common/hooks/useCdnUrl';
import { VerifiedIcon } from 'modules/profile/components/Avatar/assets/VerifiedIcon';
import classNames from 'classnames';

const BG_PRESETS_COUNT = 19;

interface props extends AvatarProps {
  address?: string;
  verified?: boolean;
  verifiedIconClasses?: string;
}
export const DefaultRandomAvatar = ({
  classes,
  src,
  address,
  verified,
  verifiedIconClasses,
  ...restProps
}: props) => {
  const styles = useDefaultRandomAvatarStyles();
  const dispatch = useDispatch();
  const { colors } = useSelector((store: RootState) => store.user);

  const { imgSrc } = useCdnUrl(src || '', 160);

  const range = useMemo(() => Math.floor(Math.random() * BG_PRESETS_COUNT), []);
  useLayoutEffect(() => {
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

  const withoutImg = !imgSrc;

  return (
    <div className={styles.avatarBox}>
      <Avatar
        {...restProps}
        src={withoutImg ? userPic : imgSrc}
        classes={{
          ...classes,
          root: withoutImg ? styles[`color${randomBg}`] : '',
          img: withoutImg ? styles.img : '',
        }}
      />

      {verified && (
        <VerifiedIcon
          className={classNames(styles.verifiedIcon, verifiedIconClasses)}
        />
      )}
    </div>
  );
};
