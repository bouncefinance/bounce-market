import React from 'react';
import {
  Box,
  Button,
  Typography,
  OutlinedInput,
  InputLabel,
  Avatar,
} from '@material-ui/core';
import { useConfirmProfileStyles } from './useConfirmProfileStyles';
import { DefaultRandomAvatar } from 'modules/common/components/DefaultRandomAvatar';

import testImg from '../../assets/square.png';

const brandAvatar = testImg;
const brandName = 'Boxing Bullies';

export const ConfirmProfile: React.FC = () => {
  const styles = useConfirmProfileStyles();

  return (
    <Box className={styles.root}>
      <Box className={styles.brandInfo}>
        <Avatar className={styles.brandAvatar} src={brandAvatar} />
        <Typography variant="h5" className={styles.brandName}>
          {brandName}
        </Typography>
      </Box>

      <Typography variant="h2" className={styles.title}>
        Confirm your profile
      </Typography>

      <Box className={styles.addPhotoField}>
        <DefaultRandomAvatar
          className={styles.avatar}
          verified
          verifiedIconClasses={styles.verifiedIcon}
        />

        <Button className={styles.addPhotoBtn} variant="text">
          Add profile photo
        </Button>
      </Box>

      <Box className={styles.textField}>
        <InputLabel className={styles.inputLabel}>name</InputLabel>
        <OutlinedInput className={styles.Input} fullWidth label="Name" />
      </Box>

      <Button className={styles.continueBtn}>Continue</Button>
    </Box>
  );
};
