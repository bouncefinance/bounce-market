import { Avatar, Box, MenuItem, MenuList, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { CopyToClip } from 'modules/common/components/CopyToClip';
import { t } from 'modules/i18n/utils/intl';
import { ProfileRoutesConfig, ProfileTab } from 'modules/profile/ProfileRoutes';
import { useWeb3React } from '@web3-react/core';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useWalletCardStyles } from './WalletCardStyles';
import { useDispatch } from 'react-redux';
import { setOutLogion } from 'store/login';
import { useCallback } from 'react';

const ENABLE_CURRENCY_ICON = false;

export interface IWalletCardProps {
  address: string;
  balance?: BigNumber;
  logo?: string;
  currency?: string;
  name?: string;
  handleDisconnect?: () => void;
  handleClose?: () => void;
}

export const WalletCard = ({
  address,
  balance,
  logo = '',
  currency = '',
  name,
  handleDisconnect,
  handleClose,
}: IWalletCardProps) => {
  const classes = useWalletCardStyles();
  const { deactivate } = useWeb3React();
  const [isCopy, setCopy] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isCopy) {
      setTimeout(() => {
        setCopy(false);
        (document.activeElement as any)?.blur();
      }, 1000);
    }
  }, [isCopy]);

  const outLogin = useCallback(() => {
    localStorage.clear();
    deactivate();
    handleDisconnect && handleDisconnect();
  }, [deactivate, handleDisconnect]);

  useEffect(() => {
    dispatch(setOutLogion(outLogin));
  }, [dispatch, outLogin]);

  return (
    <Box className={classes.root}>
      {name ? (
        <Box className={classes.row}>
          <Typography variant="h3" className={classes.name}>
            {name}
          </Typography>
        </Box>
      ) : null}

      {address && (
        <Box className={classes.row}>
          <CopyToClip address={address} />
        </Box>
      )}

      {balance ? (
        <Box className={classes.row}>
          <Box className={classes.walletBalance}>
            {logo && ENABLE_CURRENCY_ICON ? (
              <Avatar src={logo} className={classes.walletLogo} />
            ) : null}
            {t('unit.custom-unit', {
              value: balance.toFixed(),
              unit: currency,
            })}
          </Box>
        </Box>
      ) : null}

      <MenuList className={classes.menuList}>
        <MenuItem
          component={RouterLink}
          to={ProfileRoutesConfig.UserProfile.generatePath()}
          className={classes.menuItem}
          onClick={handleClose}
        >
          {t('header.inventory')}
        </MenuItem>
        <MenuItem
          component={RouterLink}
          to={ProfileRoutesConfig.UserProfile.generatePath(ProfileTab.brands)}
          className={classes.menuItem}
          onClick={handleClose}
        >
          {t('header.brands')}
        </MenuItem>
        <MenuItem
          component={RouterLink}
          to={ProfileRoutesConfig.EditProfile.generatePath()}
          className={classes.menuItem}
          onClick={handleClose}
        >
          {t('header.profile-settings')}
        </MenuItem>
        <MenuItem className={classes.menuItem} onClick={outLogin}>
          {t('header.disconnect')}
        </MenuItem>
      </MenuList>
    </Box>
  );
};
