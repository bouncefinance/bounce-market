import { Box, Dialog, Typography } from '@material-ui/core';
import { Mutation, useDispatchRequest } from '@redux-requests/react';
import { Bytes, convertBytesToMegabytes } from 'modules/common/types/unit';
import { UploadFileField } from 'modules/form/components/UploadFileField';
import { FormErrors } from 'modules/form/utils/FormErrors';
import { t } from 'modules/i18n/utils/intl';
import { fileUpload } from 'modules/profile/actions/fileUpload';
import { Button } from 'modules/uiKit/Button';
import { ModalCloseBtn } from 'modules/uiKit/ModalCloseBtn';
import React, { useCallback } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { useSetBandImgModalStyles } from './useSetBandImgModalStyles';

const MAX_SIZE: Bytes = 31457280;
const FILE_ACCEPTS: string[] = [
  'image/png',
  'image/jpeg',
  'image/jp2',
  'image/jpm',
];

export interface ISetBandImgValues {
  bandImg: File;
}

const validateForm = (payload: ISetBandImgValues) => {
  const errors: FormErrors<ISetBandImgValues> = {};
  console.log({ payload });

  if (payload.bandImg && !FILE_ACCEPTS.includes(payload.bandImg.type)) {
    errors.bandImg = t('validation.invalid-type');
  }
  if (payload.bandImg && payload.bandImg.size > MAX_SIZE) {
    errors.bandImg = t('validation.max-size', {
      value: convertBytesToMegabytes(MAX_SIZE),
    });
  }

  return errors;
};

interface ISetBandImgModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const SetBandImgModal = ({
  onClose,
  isOpen = false,
}: ISetBandImgModalProps) => {
  const classes = useSetBandImgModalStyles();
  const dispatch = useDispatchRequest();

  const onSubmit = useCallback(
    (payload: ISetBandImgValues) => {
      const formData = new FormData();
      formData.append('filename', payload.bandImg);

      dispatch(fileUpload({ formData, fileType: 'bandImg' })).then(
        ({ error }) => {
          if (!error && typeof onClose === 'function') {
            onClose();
          }
        },
      );
    },
    [dispatch, onClose],
  );

  const renderForm = ({
    handleSubmit,
    dirty,
  }: FormRenderProps<ISetBandImgValues>) => {
    return (
      <Box component="form" onSubmit={handleSubmit}>
        <Box mb={5}>
          <Field
            component={UploadFileField}
            name="bandImg"
            accepts={FILE_ACCEPTS}
            className={classes.fileBox}
          />
        </Box>

        <Box>
          <Mutation type={fileUpload.toString()}>
            {({ loading }) => (
              <Button
                size="large"
                type="submit"
                fullWidth
                disabled={loading || !dirty}
              >
                {loading
                  ? t('common.submitting')
                  : t('profile.edit.save-changes')}
              </Button>
            )}
          </Mutation>
        </Box>
      </Box>
    );
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      classes={{
        paper: classes.root,
      }}
    >
      <Box mb={3} textAlign="center">
        <Typography variant="h2">{t('profile.edit-cover')}</Typography>
      </Box>

      <Form onSubmit={onSubmit} render={renderForm} validate={validateForm} />

      <ModalCloseBtn onClick={onClose} />
    </Dialog>
  );
};
