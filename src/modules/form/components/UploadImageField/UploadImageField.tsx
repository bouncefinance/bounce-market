import {
  Box,
  FormHelperText,
  TextFieldProps,
  Typography,
} from '@material-ui/core';
import React, { useCallback } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { useUploadImageStyles } from './useUploadImageStyles';
import { ReactComponent as DropImage } from './assets/drop.svg';
import { t, tHTML } from '../../../i18n/utils/intl';
import { getErrorText } from '../../utils/getErrorText';

interface IFieldProps extends FieldRenderProps<string> {}

export const UploadImageField = ({
  input: { name, onChange, value },
  meta,
}: IFieldProps & TextFieldProps) => {
  const classes = useUploadImageStyles();

  const handleChange = useCallback(
    (
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

      const reader = new FileReader();
      reader.onload = () => {
        onChange(reader.result);
      };
      if (files) {
        reader.readAsDataURL(files[0]);
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
          <img src={value} alt="" className={classes.uploadedImage} />
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
            <Typography variant="body1" align="center" className={classes.note}>
              {t('upload-image-field.max-size')}
            </Typography>
          </Box>
          {input}
        </div>
      )}
      <FormHelperText error={true}>{getErrorText(meta)}</FormHelperText>
    </div>
  );
};
