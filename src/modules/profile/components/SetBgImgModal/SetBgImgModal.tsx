import { Box, Dialog, Typography } from '@material-ui/core';
import { Mutation, useDispatchRequest } from '@redux-requests/react';
import { uploadFile } from 'modules/common/actions/uploadFile';
import { Bytes, convertBytesToMegabytes } from 'modules/common/types/unit';
import { UploadFileField } from 'modules/form/components/UploadFileField';
import { FormErrors } from 'modules/form/utils/FormErrors';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'modules/uiKit/Button';
import { ModalCloseBtn } from 'modules/uiKit/ModalCloseBtn';
import React, { useCallback } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { useSetBgImgModalStyles } from './useSetBgImgModalStyles';

const MAX_SIZE: Bytes = 31457280;
const FILE_ACCEPTS: string[] = [
  'image/png',
  'image/jpeg',
  'image/jp2',
  'image/jpm',
];

export interface ISetBgImgValues {
  bgImg: File;
}

const validateForm = (payload: ISetBgImgValues) => {
  const errors: FormErrors<ISetBgImgValues> = {};

  if (payload.bgImg && !FILE_ACCEPTS.includes(payload.bgImg.type)) {
    errors.bgImg = t('validation.invalid-type');
  }
  if (payload.bgImg && payload.bgImg.size > MAX_SIZE) {
    errors.bgImg = t('validation.max-size', {
      value: convertBytesToMegabytes(MAX_SIZE),
    });
  }

  return errors;
};

interface ISetBgImgModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const SetBgImgModal = ({
  onClose,
  isOpen = false,
}: ISetBgImgModalProps) => {
  const classes = useSetBgImgModalStyles();
  const dispatch = useDispatchRequest();

  const onSubmit = useCallback(
    (payload: ISetBgImgValues) => {
      dispatch(uploadFile({ file: payload.bgImg, fileType: 'bgImg' })).then(
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
  }: FormRenderProps<ISetBgImgValues>) => {
    return (
      <Box component="form" onSubmit={handleSubmit}>
        <Box mb={5}>
          <Field
            component={UploadFileField}
            name="bgImg"
            accepts={FILE_ACCEPTS}
            className={classes.fileBox}
          />
        </Box>

        <Box>
          <Mutation type={uploadFile.toString()}>
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
    <Dialog open={isOpen} onClose={onClose} maxWidth="lg">
      <Box mb={3} textAlign="center">
        <Typography variant="h2">{t('profile.edit-cover')}</Typography>
      </Box>

      <Form onSubmit={onSubmit} render={renderForm} validate={validateForm} />

      <ModalCloseBtn onClick={onClose} />
    </Dialog>
  );
};
