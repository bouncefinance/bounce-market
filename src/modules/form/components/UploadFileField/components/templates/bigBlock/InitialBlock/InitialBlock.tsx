import React, { useCallback } from 'react';
import { ReactComponent as InitialBlockPic } from './assets/files.svg';
import { Box, Typography } from '@material-ui/core';
import { t, tHTML } from 'modules/i18n/utils/intl';
import { Bytes, convertBytesToMegabytes } from 'modules/common/types/unit';
import { useUploadFileStyles } from '../../../../useUploadFileStyles';

export interface IInitialBlock {
  input: JSX.Element;
  acceptsHint?: string[];
  maxSize?: Bytes;
}

export const InitialBlock = ({
  input,
  acceptsHint,
  maxSize,
}: IInitialBlock) => {
  const classes = useUploadFileStyles();

  const acceptsHintString = useCallback(() => {
    if (acceptsHint) {
      const acceptsHintMemo = [...acceptsHint];
      const acceptsHintLastType = acceptsHintMemo.pop();
      if (acceptsHintMemo.length) {
        return t('upload-file-field.formats-many', {
          firstTypes: acceptsHintMemo.join(', '),
          lastType: acceptsHintLastType,
        });
      } else {
        return t('upload-file-field.formats-one', {
          fileType: acceptsHintLastType,
        });
      }
    }
  }, [acceptsHint]);

  return (
    <div className={classes.initialBlock}>
      <InitialBlockPic className={classes.initialBlockPic} />
      <Box mb={1}>
        <Typography variant="h2" align="center">
          {t('upload-file-field.title')}
        </Typography>
      </Box>
      <Typography
        variant="h5"
        align="center"
        className={classes.initialBlockText}
      >
        {tHTML('upload-file-field.subtitle')}
      </Typography>
      <Box mt="auto">
        {acceptsHint && (
          <Typography
            variant="body1"
            align="center"
            className={classes.initialBlockText}
          >
            {acceptsHintString()}
          </Typography>
        )}
        {maxSize && (
          <Typography
            variant="body1"
            align="center"
            className={classes.initialBlockText}
          >
            {t('upload-file-field.max-size', {
              value: convertBytesToMegabytes(maxSize),
            })}
          </Typography>
        )}
      </Box>
      {input}
    </div>
  );
};
