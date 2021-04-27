import { Avatar } from '@material-ui/core';
import classNames from 'classnames';
import { useAccount } from 'modules/account/hooks/useAccount';
import { convertWallet } from 'modules/common/utils/convertWallet';
import { ProfileRoutesConfig } from 'modules/profile/ProfileRoutes';
import { Button } from 'modules/uiKit/Button';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useWalletStyles } from './useWalletStyles';

interface IWalletProps {
  className?: string;
  address?: string;
  img?: string;
}

export const WalletComponent = ({
  className,
  address = '',
  img,
}: IWalletProps) => {
  const classes = useWalletStyles();

  return (
    <Button
      className={classNames(classes.root, className)}
      component={RouterLink}
      to={ProfileRoutesConfig.UserProfile.generatePath()}
      rounded
    >
      {convertWallet(address)}
      <Avatar src={img} className={classes.walletLogo} />
    </Button>
  );
};

export const Wallet = ({ className }: Pick<IWalletProps, 'className'>) => {
  const { address } = useAccount();

  return <WalletComponent address={address} className={className} />;
};
