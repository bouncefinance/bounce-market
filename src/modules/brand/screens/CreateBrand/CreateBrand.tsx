import React, { useCallback } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { Box, Button, Container, Typography } from '@material-ui/core';
import { InputField } from 'modules/form/components/InputField';
import { t } from 'modules/i18n/utils/intl';
import { Mutation, useDispatchRequest } from '@redux-requests/react';
import { GoBack } from 'modules/layout/components/GoBack';
import { Section } from 'modules/uiKit/Section';
import { FormErrors } from 'modules/form/utils/FormErrors';
import { createBrand } from '../../actions/createBrand';
import { useHistory } from 'react-router';
import { BrandRoutesConfig } from '../../BrandRoutes';
import { UploadFileField } from 'modules/form/components/UploadFileField';

export interface ICreateBrand {
  brandName: string;
  brandUrl: string;
  description: string;
  customUrl: string;
}

const validateCreateBrand = (payload: ICreateBrand) => {
  const errors: FormErrors<ICreateBrand> = {};

  if (!payload.brandName) {
    errors.brandName = t('validation.required');
  }

  return errors;
};

const DESCRIPTION_CHARACTER_LIMIT = 200;

export const CreateBrand = () => {
  const dispatch = useDispatchRequest();
  const { push } = useHistory();

  const handleSubmit = useCallback(
    (payload: ICreateBrand) => {
      dispatch(createBrand()).then(({ error }) => {
        if (!error) {
          push(BrandRoutesConfig.CreateBrand.generatePath());
        }
      });
    },
    [dispatch, push],
  );

  const renderForm = ({ handleSubmit }: FormRenderProps<ICreateBrand>) => {
    return (
      <Box component="form" onSubmit={handleSubmit}>
        <Box mb={5}>
          <Field
            component={InputField}
            name="brandName"
            type="text"
            label={t('brand.create.label.brand-name')}
            color="primary"
            fullWidth={true}
            autoFocus
          />
        </Box>
        <Box mb={5}>
          <Field
            component={InputField}
            name="brandUrl"
            type="text"
            label={t('brand.create.label.brand-url')}
            color="primary"
            fullWidth={true}
          />
        </Box>
        <Box mb={5}>
          <Field
            component={InputField}
            name="description"
            type="text"
            label={t('brand.create.label.description')}
            color="primary"
            fullWidth={true}
            rowsMax={10}
            multiline
            showLimitCounter={true}
            inputProps={{
              maxLength: DESCRIPTION_CHARACTER_LIMIT,
            }}
          />
        </Box>
        <Box mb={5}>
          <Field
            component={InputField}
            name="customUrl"
            type="text"
            label={t('brand.create.label.custom-url')}
            color="primary"
            fullWidth={true}
          />
        </Box>

        <Box mb={5}>
          <Field
            component={UploadFileField}
            name="brandAvatar"
            label={t('brand.create.label.brand-avatar')}
            acceptsHint={['JPG', 'PNG', 'JPEG2000']}
            accepts={['image/png', 'image/jpeg', 'image/jp2', 'image/jpm']}
            template="bigBlock"
          />
        </Box>

        <Box>
          <Mutation type={createBrand.toString()}>
            {({ loading }) => (
              <Button size="large" type="submit" fullWidth disabled={loading}>
                {loading
                  ? t('common.submitting')
                  : t('brand.create.create-brand')}
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
          <Typography variant="h1">{t('brand.create.create-brand')}</Typography>
        </Box>
        <Box>
          <Form
            onSubmit={handleSubmit}
            render={renderForm}
            validate={validateCreateBrand}
          />
        </Box>
      </Container>
    </Section>
  );
};
