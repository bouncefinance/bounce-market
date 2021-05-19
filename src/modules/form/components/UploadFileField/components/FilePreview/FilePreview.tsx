import React from 'react';
import classNames from 'classnames';
import { useUploadFileStyles } from '../../useUploadFileStyles';
import { Box, Typography } from '@material-ui/core';
import { ReactComponent as FilePic } from './assets/file.svg';
import { t } from 'modules/i18n/utils/intl';
import { convertBytesToMegabytes } from 'modules/common/types/unit';

export interface IFilePreviewProps {
  fileName: string;
  fileSize: number;
}

export const FilePreview = ({ fileName, fileSize }: IFilePreviewProps) => {
  const classes = useUploadFileStyles();

  return (
    <div
      className={classNames(
        classes.previewContainer,
        classes.previewContainerFile,
      )}
    >
      <FilePic className={classes.filePic} />
      <Box mb={1}>
        <Typography variant="h2" align="center">
          {t('upload-file-field.file-uploaded')}
        </Typography>
      </Box>
      <Typography variant="h5" align="center" className={classes.fileText}>
        {t('upload-file-field.file-data', {
          fileName: fileName,
          fileSize: convertBytesToMegabytes(fileSize, 2),
        })}
      </Typography>
    </div>
  );
};
