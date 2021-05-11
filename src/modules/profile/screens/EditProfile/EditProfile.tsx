import { Box, Button, Container, Typography } from '@material-ui/core';
import { Mutation, useDispatchRequest, useQuery } from '@redux-requests/react';
import { isValidEmail } from 'modules/common/utils/isValidEmail';
import { isValidWebsiteUrl } from 'modules/common/utils/isValidWebsiteUrl';
import { InputField } from 'modules/form/components/InputField';
import { FormErrors } from 'modules/form/utils/FormErrors';
import { t } from 'modules/i18n/utils/intl';
import { GoBack } from 'modules/layout/components/GoBack';
import { fetchProfileInfo } from 'modules/profile/actions/fetchProfileInfo';
import { IProfileInfo } from 'modules/profile/api/profileInfo';
import { Section } from 'modules/uiKit/Section';
import React, { useCallback } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { editProfile } from '../../actions/editProfile';

export interface IEditProfileValues {
  fullName: string;
  username: string;
  email?: string;
  customUrl?: string;
  bio?: string;
  website?: string;
  instagram?: string;
  twitter?: string;
  facebook?: string;
}

const validateEditProfile = (payload: IEditProfileValues) => {
  const errors: FormErrors<IEditProfileValues> = {};

  if (!payload.username) {
    errors.username = t('validation.required');
  }

  if (!payload.fullName) {
    errors.fullName = t('validation.required');
  }

  if (!!payload.email && !isValidEmail(payload.email)) {
    errors.email = t('validation.invalid-email');
  }

  if (!!payload.website && !isValidWebsiteUrl(payload.website)) {
    errors.website = t('validation.invalid-website');
  }

  return errors;
};

const BIO_CHARACTER_LIMIT = 200;

export const EditProfile = () => {
  const dispatch = useDispatchRequest();

  const { data: profileInfo } = useQuery<IProfileInfo | null>({
    type: fetchProfileInfo.toString(),
  });

  const handleSubmit = useCallback(
    (payload: IEditProfileValues) => {
      dispatch(
        editProfile({
          bio: payload.bio,
          email: payload.email,
          fullName: payload.fullName,
          username: payload.username,
        }),
      );
    },
    [dispatch],
  );

  const renderForm = ({
    handleSubmit,
  }: FormRenderProps<IEditProfileValues>) => {
    return (
      <Box component="form" onSubmit={handleSubmit}>
        <Box mb={5}>
          <Field
            component={InputField}
            name="username"
            type="text"
            label={`${t('profile.edit.label.username')}*`}
            color="primary"
            fullWidth
          />
        </Box>

        <Box mb={5}>
          <Field
            component={InputField}
            name="fullName"
            type="text"
            label={`${t('profile.edit.label.full-name')}*`}
            color="primary"
            fullWidth
          />
        </Box>

        <Box mb={5}>
          <Field
            component={InputField}
            name="email"
            type="text"
            inputMode="email"
            label={t('profile.edit.label.email')}
            color="primary"
            fullWidth
          />
        </Box>

        <Box mb={5}>
          <Field
            component={InputField}
            name="bio"
            type="text"
            label={t('profile.edit.label.bio')}
            color="primary"
            fullWidth
            rowsMax={10}
            multiline
            showLimitCounter={true}
            inputProps={{
              maxLength: BIO_CHARACTER_LIMIT,
            }}
          />
        </Box>

        <Box>
          <Mutation type={editProfile.toString()}>
            {({ loading }) => (
              <Button size="large" type="submit" fullWidth disabled={loading}>
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
    <Section>
      <Container maxWidth="sm">
        <Box mb={3.5}>
          <GoBack />
        </Box>
        <Box mb={6}>
          <Typography variant="h1">{t('profile.user-profile')}</Typography>
        </Box>
        <Box>
          <Form
            onSubmit={handleSubmit}
            render={renderForm}
            validate={validateEditProfile}
            initialValues={{
              username: profileInfo?.username,
              email: profileInfo?.email,
              bio: profileInfo?.bio,
              fullName: profileInfo?.fullName,
            }}
          />
        </Box>
      </Container>
    </Section>
  );
};
