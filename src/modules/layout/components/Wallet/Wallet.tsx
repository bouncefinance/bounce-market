import { Avatar } from '@material-ui/core';
import classNames from 'classnames';
import { FocusOn } from 'react-focus-on';
import { useAccount } from 'modules/account/hooks/useAccount';
import { convertWallet } from 'modules/common/utils/convertWallet';
import { Button } from 'modules/uiKit/Button';
import React, { useRef } from 'react';
import { useWalletStyles } from './useWalletStyles';
import { WalletCard } from '../WalletCard';
import bnbLogo from 'modules/account/assets/bnb.svg'; // TODO: need provide logo from API?
import { useIsXLUp } from 'modules/themes/useTheme';
import { useWalletDropdown } from './useWalletDropdown';

interface IWalletProps {
  address?: string;
  img?: string;
}

// TODO: replace with real data
const walletCardData = {
  name: 'Nick',
  currency: 'BNB',
  balance: 1000.34,
  logo: bnbLogo,
};

const { name, currency, logo, balance } = walletCardData;

export const WalletComponent = ({ address = '', img }: IWalletProps) => {
  const classes = useWalletStyles();
  const isXLUp = useIsXLUp();

  const { isOpened, handleClose, handleOpen } = useWalletDropdown();

  const controlRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      {isXLUp ? (
        <>
          <Button
            className={classes.accountBtn}
            onClick={handleOpen}
            ref={controlRef}
            rounded
          >
            {convertWallet(address)}
            <Avatar src={img} className={classes.walletLogo} />
          </Button>
          <FocusOn
            enabled={isOpened}
            onEscapeKey={handleClose}
            onClickOutside={handleClose}
            focusLock={true}
            scrollLock={false}
            shards={[controlRef]}
          >
            <div
              className={classNames(
                classes.dropdown,
                isOpened && classes.dropdownActive,
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
      ) : (
        <>
          <WalletCard
            address={address}
            name={name}
            currency={currency}
            logo={logo}
            balance={balance}
          />
        </>
      )}
    </>
  );
};

export const Wallet = () => {
  const { address } = useAccount();

  return <WalletComponent address={address} />;
};
