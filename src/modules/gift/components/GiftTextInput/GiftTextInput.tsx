import React, { ChangeEventHandler } from 'react';
import { Box, Typography, OutlinedInput, Grow } from '@material-ui/core';
import { useGiftTextInputStyles } from './useGiftTextInputStyles';
import classNames from 'classnames';
import { useIsSMDown } from 'modules/themes/useTheme';

export type IGiftTextInputProps = {
  className?: string;
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  isValueLegal?: boolean;
  helpText?: string;
};

export const GiftTextInput: React.FC<IGiftTextInputProps> = ({
  className,
  value,
  onChange,
  isValueLegal = true,
  helpText,
}) => {
  const isSMDown = useIsSMDown();
  const styles = useGiftTextInputStyles({ isSMDown });

  return (
    <Box className={classNames(className, styles.root)}>
      <OutlinedInput
        className={classNames(
          styles.pwdInput,
          !isValueLegal && styles.errorPwdInput,
        )}
        value={value}
        onChange={onChange}
      />

      <Grow in={!isValueLegal}>
        <Typography variant="body2" className={styles.helperText}>
          {helpText}
        </Typography>
      </Grow>
    </Box>
  );
};
