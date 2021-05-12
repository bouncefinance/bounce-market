import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { t } from 'modules/i18n/utils/intl';
import { CloseIcon } from 'modules/common/components/Icons/CloseIcon';
import { useUploadFileStyles } from '../../useUploadFileStyles';

export interface IFileUploaded {
  cover: null | JSX.Element;
  input: JSX.Element;
  handleReset: any;
}

export const FileUploaded = ({ cover, input, handleReset }: IFileUploaded) => {
  const classes = useUploadFileStyles();

  return (
    <div className={classes.fileUploaded}>
      {cover}
      {input}
      <Tooltip
        title={t('upload-file-field.reset')}
        className={classes.clearBtn}
        arrow
      >
        <IconButton onClick={handleReset}>
          <CloseIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};
