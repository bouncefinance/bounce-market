import { Box, Dialog, IconButton, Typography } from '@material-ui/core';
import { Mutation, useDispatchRequest, useQuery } from '@redux-requests/react';
import { CloseIcon } from 'modules/common/components/Icons/CloseIcon';
import { Bytes, convertBytesToMegabytes } from 'modules/common/types/unit';
import { UploadAvatarField } from 'modules/form/components/UploadAvatarField';
import { FormErrors } from 'modules/form/utils/FormErrors';
import { t } from 'modules/i18n/utils/intl';
import { fetchProfileInfo } from 'modules/profile/actions/fetchProfileInfo';
import { fileUpload } from 'modules/profile/actions/fileUpload';
import { IProfileInfo } from 'modules/profile/api/profileInfo';
import { Button } from 'modules/uiKit/Button';
import React, { useCallback } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { useSetAvatarModalStyles } from './useSetAvatarModalStyles';

const MAX_SIZE: Bytes = 31457280;
const FILE_ACCEPTS: string[] = [
  'image/png',
  'image/jpeg',
  'image/jp2',
  'image/jpm',
];

export interface ISetAvatarValues {
  avatar: File;
}

const validateForm = (payload: ISetAvatarValues) => {
  const errors: FormErrors<ISetAvatarValues> = {};

  if (payload.avatar && !FILE_ACCEPTS.includes(payload.avatar.type)) {
    errors.avatar = t('validation.invalid-type');
  }
  if (payload.avatar && payload.avatar.size > MAX_SIZE) {
    errors.avatar = t('validation.max-size', {
      value: convertBytesToMegabytes(MAX_SIZE),
    });
  }

  return errors;
};

interface ISetAvatarModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const SetAvatarModal = ({
  onClose,
  isOpen = false,
}: ISetAvatarModalProps) => {
  const classes = useSetAvatarModalStyles();
  const dispatch = useDispatchRequest();

  const onSubmit = useCallback(
    (payload: ISetAvatarValues) => {
      const formData = new FormData();
      formData.append('filename', payload.avatar);

      dispatch(fileUpload(formData)).then(({ error }) => {
        if (!error && typeof onClose === 'function') {
          onClose();
        }
      });
    },
    [dispatch, onClose],
  );

  const { data: profileInfo } = useQuery<IProfileInfo | null>({
    type: fetchProfileInfo.toString(),
  });

  const renderForm = ({
    handleSubmit,
    dirty,
  }: FormRenderProps<ISetAvatarValues>) => {
    return (
      <Box component="form" onSubmit={handleSubmit}>
        <Box mb={5} maxWidth={500}>
          <Field
            component={UploadAvatarField}
            name="avatar"
            accepts={FILE_ACCEPTS}
            initialAvatar={profileInfo?.imgUrl}
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
      fullWidth
      open={isOpen}
      onClose={onClose}
      maxWidth="md"
      classes={{
        paper: classes.root,
      }}
      PaperProps={{
        elevation: 0,
      }}
    >
      <Box mb={3} textAlign="center">
        <Typography variant="h2">{t('profile.edit-avatar')}</Typography>
      </Box>

      <Form onSubmit={onSubmit} render={renderForm} validate={validateForm} />

      <IconButton onClick={onClose} className={classes.close}>
        <CloseIcon fontSize="large" />
      </IconButton>
    </Dialog>
  );
};
