import { Avatar } from '@material-ui/core';
import classNames from 'classnames';
import { FocusOn } from 'react-focus-on';
import { useAccount } from 'modules/account/hooks/useAccount';
import { convertWallet } from 'modules/common/utils/convertWallet';
import { ProfileRoutesConfig } from 'modules/profile/ProfileRoutes';
import { Button } from 'modules/uiKit/Button';
import React, { useCallback, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useWalletStyles } from './useWalletStyles';
import { WalletCard } from '../WalletCard';
import bnbLogo from 'modules/account/assets/bnb.svg'; // TODO: need provide logo from API?
import { useIsXLUp } from 'modules/themes/useTheme';

interface IWalletProps {
  className?: string;
  address?: string;
  img?: string;
}

// TODO: replace with real data
const walletCardData = {
  name: 'Nick',
  currency: 'BNB',
  balance: 1000.34,
  logo: bnbLogo
};

const { name, currency, logo, balance } = walletCardData;

export const WalletComponent = ({
  className,
  address = '',
  img,
}: IWalletProps) => {
  const classes = useWalletStyles();
  const isXLUp = useIsXLUp();

  const [isOpen, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    if (isOpen) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const controlRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      {isXLUp ?
        <>
          <Button
            className={classNames(classes.accountBtn, className)}
            onClick={handleOpen}
            ref={controlRef}
            rounded
          >
            {convertWallet(address)}
            <Avatar src={img} className={classes.walletLogo} />
          </Button>
          <FocusOn
            enabled={isOpen}
            onEscapeKey={handleClose}
            onClickOutside={handleClose}
            focusLock={true}
            scrollLock={false}
            shards={[controlRef]}
          >
            <div
              className={classNames(
                classes.dropdown,
                isOpen && classes.dropdownActive,
              )}
            >
              <WalletCard
                address={address}
                name={name}
                currency={currency}
                logo={logo}
                balance={balance}
                handleClose={handleClose}
              />
            </div>
          </FocusOn>
        </>
        :
        <>
          <Button
            className={classNames(classes.accountBtn, classes.accountBtnMd, className)}
            component={RouterLink}
            to={ProfileRoutesConfig.UserProfile.generatePath()}
            rounded
          >
            {convertWallet(address)}
            <Avatar src={img} className={classes.walletLogo} />
          </Button>

          <WalletCard
            address={address}
            name={name}
            currency={currency}
            logo={logo}
            balance={balance}
          />
        </>
      }
    </>
  )
};

export const Wallet = ({ className }: Pick<IWalletProps, 'className'>) => {
  const { address } = useAccount();

  return <WalletComponent address={address} className={className} />;
};
