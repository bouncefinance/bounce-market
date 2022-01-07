import { Box, Button, Container, Typography } from '@material-ui/core';
import { Mutation, useDispatchRequest, useQuery } from '@redux-requests/react';
import {
  ISetAccountData,
  setAccount,
} from 'modules/account/store/actions/setAccount';
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

  if (!!payload.instagram && !isValidWebsiteUrl(payload.instagram)) {
    errors.instagram = t('validation.invalid-instagram');
  }

  if (!!payload.twitter && !isValidWebsiteUrl(payload.twitter)) {
    errors.twitter = t('validation.invalid-twitter');
  }

  if (!!payload.facebook && !isValidWebsiteUrl(payload.facebook)) {
    errors.facebook = t('validation.invalid-facebook');
  }

  return errors;
};

const USERNAME_MAX_LENGTH = 25;
const FULLNAME_MAX_LENGTH = 25;
const BIO_CHARACTER_LIMIT = 1000;

export const EditProfile = () => {
  const dispatch = useDispatchRequest();

  const { data: profileInfo } = useQuery<IProfileInfo | null>({
    type: fetchProfileInfo.toString(),
  });

  const {
    data: { address },
  } = useQuery<ISetAccountData>({
    type: setAccount.toString(),
  });

  const handleSubmit = useCallback(
    (payload: IEditProfileValues) => {
      dispatch(
        editProfile({
          bio: payload.bio,
          email: payload.email,
          fullName: payload.fullName,
          username: payload.username,
          website: payload?.website,
          instagram: payload?.instagram,
          twitter: payload?.twitter,
          facebook: payload?.facebook,
          accountAddress: address,
        }),
      );
    },
    [address, dispatch],
  );

  const renderForm = ({
    handleSubmit,
    dirty,
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
            showLimitCounter={true}
            inputProps={{
              maxLength: USERNAME_MAX_LENGTH,
            }}
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
            showLimitCounter={true}
            inputProps={{
              maxLength: FULLNAME_MAX_LENGTH,
            }}
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
            inputProps={{
              maxLength: BIO_CHARACTER_LIMIT,
            }}
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

        <Box mb={5}>
          <Field
            component={InputField}
            name="website"
            type="text"
            inputMode="website"
            label={t('profile.edit.label.website')}
            placeholder={t('profile.edit.placeholder.website')}
            color="primary"
            fullWidth
          />
        </Box>

        <Box mb={5}>
          <Field
            component={InputField}
            name="instagram"
            type="text"
            inputMode="instagram"
            label={t('profile.edit.label.instagram')}
            placeholder={t('profile.edit.placeholder.instagram')}
            color="primary"
            fullWidth
          />
        </Box>

        <Box mb={5}>
          <Field
            component={InputField}
            name="twitter"
            type="text"
            inputMode="twitter"
            label={t('profile.edit.label.twitter')}
            placeholder={t('profile.edit.placeholder.twitter')}
            color="primary"
            fullWidth
          />
        </Box>

        <Box mb={5}>
          <Field
            component={InputField}
            name="facebook"
            type="text"
            inputMode="facebook"
            label={t('profile.edit.label.facebook')}
            placeholder={t('profile.edit.placeholder.facebook')}
            color="primary"
            fullWidth
          />
        </Box>

        <Box>
          <Mutation type={editProfile.toString()}>
            {({ loading }) => (
              <Button
                size="large"
                type="submit"
                fullWidth
                disabled={!dirty || loading}
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
    <Section>
      <Container maxWidth="sm">
        <Box mb={3.5}>
          <GoBack />
        </Box>

        <Box mb={6}>
          <Typography variant="h1">{t('profile.user-profile')}</Typography>
        </Box>

        <Form
          onSubmit={handleSubmit}
          render={renderForm}
          validate={validateEditProfile}
          initialValues={{
            username: profileInfo?.username,
            email: profileInfo?.email,
            bio: profileInfo?.bio,
            fullName: profileInfo?.fullName,
            website: profileInfo?.website,
            instagram: profileInfo?.instagram,
            twitter: profileInfo?.twitter,
            facebook: profileInfo?.facebook,
          }}
        />
      </Container>
    </Section>
  );
};
