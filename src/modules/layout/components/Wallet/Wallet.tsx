import { useQuery } from '@redux-requests/react';
import classNames from 'classnames';
import bnbLogo from 'modules/account/assets/bnb.svg'; // TODO: need provide logo from API?
import { useAccount } from 'modules/account/hooks/useAccount';
import { truncateWalletAddr } from 'modules/common/utils/truncateWalletAddr';
import { fetchProfileInfo } from 'modules/profile/actions/fetchProfileInfo';
import { IProfileInfo } from 'modules/profile/api/profileInfo';
import { useIsXLUp } from 'modules/themes/useTheme';
import { Button } from 'modules/uiKit/Button';
import React, { useRef } from 'react';
import { FocusOn } from 'react-focus-on';
import { DefaultRandomAvatar } from '../../../common/components/DefaultRandomAvatar';
import { WalletCard } from '../WalletCard';
import { useWalletDropdown } from './useWalletDropdown';
import { useWalletStyles } from './useWalletStyles';
import { getNativeTokenSymbol } from '../../../common/conts';
import { useWeb3Balance } from 'modules/account/hooks/useWeb3React';

interface IWalletProps {
  address?: string;
  img?: string;
  name?: string;
}

// TODO: replace with real data
const logo = bnbLogo;

export const WalletComponent = ({
  address = '',
  img,
  name = 'Unnamed',
}: IWalletProps) => {
  const classes = useWalletStyles();
  const isXLUp = useIsXLUp();

  const { chainId } = useAccount();
  const currency = getNativeTokenSymbol(chainId);

  const {
    isOpened,
    handleDisconnect,
    handleClose,
    handleOpen,
  } = useWalletDropdown();

  const controlRef = useRef<HTMLButtonElement>(null);

  const { balance } = useWeb3Balance();

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
            {truncateWalletAddr(address)}
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
            handleDisconnect={handleDisconnect}
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
