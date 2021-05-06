import React from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { Box, Button, Container, Typography } from '@material-ui/core';
import { InputField } from 'modules/form/components/InputField';
import { t } from 'modules/i18n/utils/intl';
import { Mutation } from '@redux-requests/react';
import { GoBack } from 'modules/layout/components/GoBack';
import { Section } from 'modules/uiKit/Section';
import { FormErrors } from 'modules/form/utils/FormErrors';

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

  return errors;
};

const handleSubmit = () => {};

export const EditProfile = () => {
  const BIO_CHARACTER_LIMIT = 200;

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
            type='email'
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
            showlimitcounter={true}
            inputProps={{
              maxLength: BIO_CHARACTER_LIMIT,
            }}
          />
        </Box>
        <Box mb={5}>
          <Field
            component={InputField}
            name='website'
            type='url'
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
          <Mutation>
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