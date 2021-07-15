import { Box, Dialog, Typography } from '@material-ui/core';
import { Mutation, useDispatchRequest, useQuery } from '@redux-requests/react';
import {
  IUploadFileArgs,
  uploadFile,
  UploadFileType,
} from 'modules/common/actions/uploadFile';
import { Bytes, convertBytesToMegabytes } from 'modules/common/types/unit';
import { UploadFileField } from 'modules/form/components/UploadFileField';
import { FormErrors } from 'modules/form/utils/FormErrors';
import { t } from 'modules/i18n/utils/intl';
import { fetchProfileInfo } from 'modules/profile/actions/fetchProfileInfo';
import { IProfileInfo } from 'modules/profile/api/profileInfo';
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

  if (!payload.bgImg) {
    errors.bgImg = t('validation.required');
  } else if (!FILE_ACCEPTS.includes(payload.bgImg.type)) {
    errors.bgImg = t('validation.invalid-type');
  } else if (payload.bgImg.size > MAX_SIZE) {
    errors.bgImg = t('validation.max-size', {
      value: convertBytesToMegabytes(MAX_SIZE),
    });
  }

  return errors;
};

interface ISetBgImgModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  fileType: UploadFileType;
  contractaddress?: string;
}

export const SetBgImgModal = ({
  onClose,
  isOpen = false,
  fileType,
  contractaddress,
}: ISetBgImgModalProps) => {
  const classes = useSetBgImgModalStyles();
  const dispatch = useDispatchRequest();

  const { data: profileData } = useQuery<IProfileInfo | null>({
    type: fetchProfileInfo.toString(),
  });

  const onSubmit = useCallback(
    (payload: ISetBgImgValues) => {
      const data: IUploadFileArgs = {
        file: payload.bgImg,
        fileType: fileType,
      };
      if (fileType === UploadFileType.BrandImg) {
        data.contractaddress = contractaddress;
      }
      dispatch(uploadFile(data)).then(({ error }) => {
        if (!error && typeof onClose === 'function') {
          onClose();
        }
      });
    },
    [fileType, contractaddress, dispatch, onClose],
  );

  const renderForm = ({
    handleSubmit,
    dirty,
  }: FormRenderProps<ISetBgImgValues>) => {
    return (
      <Mutation type={uploadFile.toString()}>
        {({ loading }) => (
          <Box component="form" onSubmit={handleSubmit}>
            <Box mb={5}>
              <Field
                component={UploadFileField}
                name="bgImg"
                disabled={loading}
                acceptsHint={['PNG', 'JPG', 'JPEG2000']}
                accepts={FILE_ACCEPTS}
                className={classes.fileBox}
                cropper={true}
                cropperAspect={16 / 2}
              />
            </Box>

            <Box>
              <Button
                size="large"
                type="submit"
                fullWidth
                loading={loading}
                disabled={!dirty || !profileData}
              >
                {loading
                  ? t('common.submitting')
                  : !profileData
                  ? t('profile.edit.no-profile')
                  : t('profile.edit.save-changes')}
              </Button>
            </Box>
          </Box>
        )}
      </Mutation>
    );
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xl">
      <Box mb={3} textAlign="center">
        <Typography variant="h2">{t('profile.edit-cover')}</Typography>
      </Box>

      <Form onSubmit={onSubmit} render={renderForm} validate={validateForm} />

      <ModalCloseBtn onClick={onClose} />
    </Dialog>
  );
};
