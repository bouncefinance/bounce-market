import React, { useState } from 'react';
import { Box, Button, Typography, InputLabel, Avatar } from '@material-ui/core';
import { useConfirmProfileStyles } from './useConfirmProfileStyles';
import { useIsXSDown } from 'modules/themes/useTheme';
import { DefaultRandomAvatar } from 'modules/common/components/DefaultRandomAvatar';
import { GiftTextInput } from 'modules/gift/components/GiftTextInput';

import testImg from '../../assets/square.png';

const brandAvatar = testImg;
const brandName = 'Boxing Bullies';

export const ConfirmProfile: React.FC = () => {
  const styles = useConfirmProfileStyles();

  const isXSDown = useIsXSDown();

  const [inputValue, setInputValue] = useState<string>('');
  const [isInputLegal, setIsInputLegal] = useState<boolean>(true);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

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
        <GiftTextInput
          className={isXSDown ? styles.mobileInput : styles.desktopInput}
          value={inputValue}
          isValueLegal={isInputLegal}
          onChange={handleInputChange}
          helpText="You entered an incorrect password, please try again"
        />
      </Box>

      <Button className={styles.continueBtn}>Continue</Button>
    </Box>
  );
};
