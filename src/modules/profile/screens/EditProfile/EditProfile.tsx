import React, { useCallback } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { Box, Button, Container, Typography } from '@material-ui/core';
import { InputField } from 'modules/form/components/InputField';
import { t } from 'modules/i18n/utils/intl';
import { Mutation, useDispatchRequest } from '@redux-requests/react';
import { GoBack } from 'modules/layout/components/GoBack';
import { Section } from 'modules/uiKit/Section';
import { FormErrors } from 'modules/form/utils/FormErrors';
import { editProfile } from '../../actions/editProfile';
import { useHistory } from 'react-router';
import { ProfileRoutesConfig } from '../../ProfileRoutes';

export interface IEditProfile {
  username: string;
  email: string;
  customUrl: string;
  bio: string;
  website: string;
  instagram: string;
  twitter: string;
  facebook: string;
}

const validateEditProfile = (payload: IEditProfile) => {
  const errors: FormErrors<IEditProfile> = {};

  if (!payload.username) {
    errors.username = t('validation.required');
  }

  const emailRegex = /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!!payload.email && !emailRegex.test(String(payload.email).toLowerCase())) {
    errors.email = t('validation.invalid-email');
  }

  const urlRegex = /^(?:(?:http|https):\/\/)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(\/|\\?|#)[^\\s]*)?$/;
  if (!!payload.website && (payload.website.length >= 2083 || !urlRegex.test(String(payload.website).toLowerCase()))) {
    errors.website = t('validation.invalid-website');
  }

  return errors;
};

const BIO_CHARACTER_LIMIT = 200;

export const EditProfile = () => {
  const dispatch = useDispatchRequest();
  const { push } = useHistory();

  const handleSubmit = useCallback(
    (payload: IEditProfile) => {
      dispatch(editProfile()).then(({ error }) => {
        if (!error) {
          push(ProfileRoutesConfig.EditProfile.generatePath());
        }
      });
    },
    [dispatch, push],
  );

  const renderForm = ({ handleSubmit }: FormRenderProps<IEditProfile>) => {
    return (
      <Box component='form' onSubmit={handleSubmit}>
        <Box mb={5}>
          <Field
            component={InputField}
            name='username'
            type='text'
            label={t('profile.edit.label.username')}
            color='primary'
            fullWidth={true}
          />
        </Box>
        <Box mb={5}>
          <Field
            component={InputField}
            name='email'
            type='text'
            inputMode='email'
            label={t('profile.edit.label.email')}
            color='primary'
            fullWidth={true}
          />
        </Box>
        <Box mb={5}>
          <Field
            component={InputField}
            name='customUrl'
            type='text'
            label={t('profile.edit.label.custom-url')}
            color='primary'
            fullWidth={true}
          />
        </Box>
        <Box mb={5}>
          <Field
            component={InputField}
            name='bio'
            type='text'
            label={t('profile.edit.label.bio')}
            color='primary'
            fullWidth={true}
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
            name='website'
            type='text'
            inputMode='url'
            label={t('profile.edit.label.website')}
            color='primary'
            fullWidth={true}
          />
        </Box>
        <Box mb={5}>
          <Field
            component={InputField}
            name='instagram'
            type='text'
            label={t('profile.edit.label.instagram')}
            placeholder={t('profile.edit.placeholder.instagram')}
            color='primary'
            fullWidth={true}
          />
        </Box>
        <Box mb={5}>
          <Field
            component={InputField}
            name='twitter'
            type='text'
            label={t('profile.edit.label.twitter')}
            placeholder={t('profile.edit.placeholder.twitter')}
            color='primary'
            fullWidth={true}
          />
        </Box>
        <Box mb={5}>
          <Field
            component={InputField}
            name='facebook'
            type='text'
            label={t('profile.edit.label.facebook')}
            placeholder={t('profile.edit.placeholder.facebook')}
            color='primary'
            fullWidth={true}
          />
        </Box>

        <Box>
          <Mutation type={editProfile.toString()}>
            {({ loading }) => (
              <Button size='large' type='submit' fullWidth disabled={loading}>
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
      <Container maxWidth='sm'>
        <Box mb={3.5}>
          <GoBack />
        </Box>
        <Box mb={6}>
          <Typography variant='h1'>{t('profile.user-profile')}</Typography>
        </Box>
        <Box>
          <Form
            onSubmit={handleSubmit}
            render={renderForm}
            validate={validateEditProfile}
          />
        </Box>
      </Container>
    </Section>
  );
};
