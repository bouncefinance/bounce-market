import React, { useCallback, useEffect, useState } from 'react';
import { Box, Dialog } from '@material-ui/core';
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

  const handleClose = useCallback(() => {
    setShow(false);
  }, []);

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
      <WrongNetworkContent />
      <ModalCloseBtn onClick={handleClose} />
    </Dialog>
  );
};
