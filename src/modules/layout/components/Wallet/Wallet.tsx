import React, { useRef } from 'react';
import { useQuery } from '@redux-requests/react';
import classNames from 'classnames';
import bnbLogo from 'modules/account/assets/bnb.svg'; // TODO: need provide logo from API?
import { useAccount } from 'modules/account/hooks/useAccount';
import { convertWallet } from 'modules/common/utils/convertWallet';
import { fetchProfileInfo } from 'modules/profile/actions/fetchProfileInfo';
import { IProfileInfo } from 'modules/profile/api/profileInfo';
import { useIsXLUp } from 'modules/themes/useTheme';
import { Button } from 'modules/uiKit/Button';
import { FocusOn } from 'react-focus-on';
import { DefaultRandomAvatar } from '../../../common/components/DefaultRandomAvatar';
import { WalletCard } from '../WalletCard';
import { useWalletDropdown } from './useWalletDropdown';
import { useWalletStyles } from './useWalletStyles';

interface IWalletProps {
  address?: string;
  img?: string;
  name?: string;
}

// TODO: replace with real data
const walletCardData = {
  currency: 'BNB',
  logo: bnbLogo,
};

const { currency, logo } = walletCardData;

export const WalletComponent = ({
  address = '',
  img,
  name = 'Unnamed',
}: IWalletProps) => {
  const classes = useWalletStyles();
  const isXLUp = useIsXLUp();

  const {
    isOpened,
    handleDisconnect,
    handleClose,
    handleOpen,
  } = useWalletDropdown();

  const controlRef = useRef<HTMLButtonElement>(null);

  const { balance } = useAccount();

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
            <DefaultRandomAvatar src={img} className={classes.walletLogo} />
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
                handleDisconnect={handleDisconnect}
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
            handleClose={handleClose}
          />
        </>
      )}
    </>
  );
};

export const Wallet = () => {
  const { address } = useAccount();

  const { data } = useQuery<IProfileInfo | null>({
    type: fetchProfileInfo.toString(),
  });

  return (
    <WalletComponent
      address={address}
      name={data?.username}
      img={data?.imgUrl}
    />
  );
};
