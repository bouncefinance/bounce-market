import React, { useCallback, useEffect, useState } from 'react';
import { Box, Dialog } from '@material-ui/core';
import { useAccount } from '../../../account/hooks/useAccount';
import { useWrongWalletModalStyles } from './useWrongWalletModalStyles';
import { ModalCloseBtn } from '../../../uiKit/ModalCloseBtn';
import { LogoIcon } from '../../../common/components/Icons/LogoIcon';
import { WrongNetworkContent } from '../../../common/components/WrongNetworkContent';

interface IWrongNetworkModalProps {
  isOpen?: boolean;
}

export const WrongNetworkModal = ({
  isOpen = false,
}: IWrongNetworkModalProps) => {
  const classes = useWrongWalletModalStyles();

  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    setShow(isOpen);
  }, [isOpen]);

  const { handleChangeNetworkToSupported } = useAccount();

  const handleClose = useCallback(() => {
    setShow(false);
  }, []);

  const handleConnectBtn = useCallback(() => {
    setShow(false);
    handleChangeNetworkToSupported();
  }, [handleChangeNetworkToSupported]);

  return (
    <Dialog
      onClose={handleClose}
      open={show}
      maxWidth="sm"
      className={classes.root}
    >
      <Box mb={3} textAlign="center">
        <LogoIcon className={classes.logo} />
      </Box>
      <WrongNetworkContent handleConnect={handleConnectBtn} />
      <ModalCloseBtn onClick={handleClose} />
    </Dialog>
  );
};
