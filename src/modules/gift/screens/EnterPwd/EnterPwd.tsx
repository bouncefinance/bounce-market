import React, { useState } from 'react';
import { Box, Button } from '@material-ui/core';
import { useEnterPwdStyles } from './useEnterPwdStyles';
import { Img } from 'modules/uiKit/Img';

import SVG_mail from '../../assets/mail.svg';

import testImg from '../../assets/square.png';
import { GiftTextInput } from 'modules/gift/components/GiftTextInput';
import { GiftHeader } from 'modules/gift/components/GiftHeader';

const brandAvatar = testImg;
const brandName = 'Boxing Bullies';
const title = 'Please enter your unique password';
const description =
  'You’ll find this password on the interior of the attached envelope that came in your package.';

export const EnterPwd: React.FC = () => {
  const styles = useEnterPwdStyles();

  const [inputValue, setInputValue] = useState<string>('');
  const [isInputLegal, setIsInputLegal] = useState<boolean>(true);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <Box className={styles.root}>
      <GiftHeader
        brandAvatar={brandAvatar}
        brandName={brandName}
        title={title}
        description={description}
      />
      {/* <Box className={styles.brandInfo}>
        <Avatar className={styles.brandAvatar} src={brandAvatar} />
        <Typography variant="h5" className={styles.brandName}>
          {brandName}
        </Typography>
      </Box>

      <Typography variant="h2" className={styles.title}>
        Please enter your unique password
      </Typography>

      <Typography variant="h5" className={styles.description}>
        You’ll find this password on the interior of the attached envelope that
        came in your package.
      </Typography> */}

      <Img src={SVG_mail} className={styles.mailImg} />

      <GiftTextInput
        value={inputValue}
        isValueLegal={isInputLegal}
        onChange={handleInputChange}
        helpText="You entered an incorrect password, please try again"
      />

      <Button
        className={styles.enterBtn}
        onClick={() => {
          setIsInputLegal(!isInputLegal);
        }}
      >
        Enter Password
      </Button>
    </Box>
  );
};
