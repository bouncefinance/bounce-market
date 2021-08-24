import { Box, Dialog, Typography } from '@material-ui/core';
import { Mutation, useDispatchRequest, useQuery } from '@redux-requests/react';
import { uploadFile, UploadFileType } from 'modules/common/actions/uploadFile';
import { Bytes, convertBytesToMegabytes } from 'modules/common/types/unit';
import { UploadAvatarField } from 'modules/form/components/UploadAvatarField';
import { FormErrors } from 'modules/form/utils/FormErrors';
import { t } from 'modules/i18n/utils/intl';
import { fetchProfileInfo } from 'modules/profile/actions/fetchProfileInfo';
import { IProfileInfo } from 'modules/profile/api/profileInfo';
import { Button } from 'modules/uiKit/Button';
import { ModalCloseBtn } from 'modules/uiKit/ModalCloseBtn';
import React, { useCallback } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';

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

export enum AvatarType {
  Profile = 'Profile',
  Collection = 'Collection',
}

const validateForm = (payload: ISetAvatarValues) => {
  const errors: FormErrors<ISetAvatarValues> = {};

  if (!payload.avatar) {
    errors.avatar = t('validation.required');
  } else if (!FILE_ACCEPTS.includes(payload.avatar.type)) {
    errors.avatar = t('validation.invalid-type');
  } else if (payload.avatar.size > MAX_SIZE) {
    errors.avatar = t('validation.max-size', {
      value: convertBytesToMegabytes(MAX_SIZE),
    });
  }

  return errors;
};

interface ISetAvatarModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  avatarType?: AvatarType;
  collectionAvatar?: string;
  collectionAddress?: string;
  successCallback?: (img: string) => void;
}

export const SetAvatarModal = ({
  onClose,
  isOpen = false,
  avatarType = AvatarType.Profile,
  collectionAvatar,
  collectionAddress,
  successCallback,
}: ISetAvatarModalProps) => {
  const dispatch = useDispatchRequest();

  const onSubmit = useCallback(
    (payload: ISetAvatarValues) => {
      dispatch(
        avatarType === AvatarType.Collection
          ? uploadFile({
              file: payload.avatar,
              fileType: UploadFileType.BrandAvatar,
              contractaddress: collectionAddress,
            })
          : uploadFile({
              file: payload.avatar,
              fileType: UploadFileType.Avatar,
            }),
      ).then(({ data, error }) => {
        if (!error && typeof onClose === 'function') {
          const newImg = data?.result.path || '';
          successCallback && successCallback(newImg);

          onClose();
        }
      });
    },
    [dispatch, onClose, avatarType, collectionAddress, successCallback],
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
            initialAvatar={
              avatarType === AvatarType.Collection
                ? collectionAvatar
                : profileInfo?.imgUrl
            }
          />
        </Box>

        <Box>
          <Mutation type={uploadFile.toString()}>
            {({ loading }) => (
              <Button
                size="large"
                type="submit"
                fullWidth
                loading={loading}
                disabled={!dirty}
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
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm">
      <Box mb={3} textAlign="center">
        <Typography variant="h2">{t('profile.edit-avatar')}</Typography>
      </Box>

      <Form onSubmit={onSubmit} render={renderForm} validate={validateForm} />

      <ModalCloseBtn onClick={onClose} />
    </Dialog>
  );
};
