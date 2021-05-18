import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { t } from 'modules/i18n/utils/intl';
import { CloseIcon } from 'modules/common/components/Icons/CloseIcon';
import { useUploadFileStyles } from '../../useUploadFileStyles';

export interface IUploadedWrapProps {
  input: JSX.Element;
  cover: null | JSX.Element;
  handleReset: () => void;
}

export const UploadedWrap = ({
  input,
  cover,
  handleReset,
}: IUploadedWrapProps) => {
  const classes = useUploadFileStyles();

  return (
    <div className={classes.uploadedWrap}>
      {cover}
      {input}
      <Tooltip title={t('common.reset')} className={classes.clearBtn} arrow>
        <IconButton onClick={handleReset}>
          <CloseIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};
