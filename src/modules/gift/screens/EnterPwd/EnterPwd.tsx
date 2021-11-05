import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  OutlinedInput,
  Grow,
} from '@material-ui/core';
import { useEnterPwdStyles } from './useEnterPwdStyles';
import { Img } from 'modules/uiKit/Img';

import SVG_mail from '../../assets/mail.svg';
import classNames from 'classnames';

export const EnterPwd: React.FC = () => {
  const styles = useEnterPwdStyles();

  const [inputValue, setInputValue] = useState<string>('');
  const [isInputLegal, setIsInputLegal] = useState<boolean>(true);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <Box className={styles.root}>
      <Typography variant="h2" className={styles.title}>
        Please enter your unique password
      </Typography>

      <Typography variant="h5" className={styles.description}>
        You’ll find this password on the interior of the attached envelope that
        came in your package.
      </Typography>

      <Img src={SVG_mail} className={styles.mailImg} />

      <Box className={styles.inputField}>
        <OutlinedInput
          className={classNames(
            styles.pwdInput,
            isInputLegal ? '' : styles.errorPwdInput,
          )}
          value={inputValue}
          onChange={handleInputChange}
        />
        <Grow in={!isInputLegal}>
          <Typography variant="body2" className={styles.helperText}>
            You entered an incorrect password, please try again
          </Typography>
        </Grow>
      </Box>

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
