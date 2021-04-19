import {
  Box,
  FormHelperText,
  TextFieldProps,
  Typography,
} from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { useUploadImageStyles } from './useUploadImageStyles';
import { ReactComponent as DropImage } from './assets/drop.svg';
import { t, tHTML } from '../../../i18n/utils/intl';
import { getErrorText } from '../../utils/getErrorText';
import { readImage } from '../../utils/readImage';
import { convertBytesToMegabytes } from '../../../common/types/unit';

interface IFieldProps extends FieldRenderProps<string> {
  maxSize?: number;
}

export const UploadImageField = ({
  input: { name, onChange, value },
  meta,
  maxSize,
}: IFieldProps & TextFieldProps) => {
  const classes = useUploadImageStyles();
  const [cover, setCover] = useState<string>();

  const handleChange = useCallback(
    async (
      event: React.ChangeEvent<HTMLInputElement> & {
        dataTransfer: DataTransfer;
      },
    ) => {
      event.preventDefault();
      const files = (() => {
        if (event.dataTransfer) {
          return event.dataTransfer.files;
        } else if (event.target) {
          return event.target.files;
        }
      })();

      if (files) {
        const file = files[0];
        const { image } = await readImage(file);
        setCover(image);
        onChange(file);
      } else {
        onChange(undefined);
      }
    },
    [onChange],
  );

  const input = (
    <input
      type="file"
      accept={'image/*'}
      name={name}
      onChange={handleChange}
      className={classes.input}
    />
  );

  return (
    <div>
      {value ? (
        <div className={classes.uploaded}>
          <img src={cover} alt="" className={classes.uploadedImage} />
          {input}
        </div>
      ) : (
        <div className={classes.upload}>
          <DropImage className={classes.image} />
          <Box mb={1}>
            <Typography variant="h2" align="center">
              {t('upload-image-field.title')}
            </Typography>
          </Box>
          <Typography variant="h5" align="center" className={classes.note}>
            {tHTML('upload-image-field.subtitle')}
          </Typography>
          <Box mt="auto">
            <Typography variant="body1" align="center" className={classes.note}>
              {t('upload-image-field.formats')}
            </Typography>
            {maxSize && (
              <Typography
                variant="body1"
                align="center"
                className={classes.note}
              >
                {t('upload-image-field.max-size', {
                  value: convertBytesToMegabytes(maxSize),
                })}
              </Typography>
            )}
          </Box>
          {input}
        </div>
      )}
      <FormHelperText error={true}>{getErrorText(meta)}</FormHelperText>
    </div>
  );
};
