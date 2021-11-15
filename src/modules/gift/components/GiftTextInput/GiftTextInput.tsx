import React from 'react';
import { Box, Typography, OutlinedInput, Grow } from '@material-ui/core';
import { useGiftTextInputStyles } from './useGiftTextInputStyles';
import classNames from 'classnames';
import { useIsXSDown } from 'modules/themes/useTheme';

export type IGiftTextInputProps = {
  className?: string;
  value: string;
  onChange: any;
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
  const isXSDown = useIsXSDown();
  const props = { isXSDown };
  const styles = useGiftTextInputStyles(props);

  return (
    <Box className={classNames(className, styles.root)}>
      <OutlinedInput
        // fullWidth
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
