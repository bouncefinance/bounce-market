import React from 'react';
import { Box, Button, Container, Typography } from '@material-ui/core';
import { GoBack } from '../../../layout/components/GoBack';
import { useCreateNFTStyles } from './useCreateNFTStyles';
import { t } from '../../../i18n/utils/intl';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { InputField } from '../../../form/components/InputField';
import { FormErrors } from '../../../form/utils/FormErrors';

interface ICreateNFTPayload {
  name: string;
  description: string;
}

const validateCreateNFT = (payload: ICreateNFTPayload) => {
  const errors: FormErrors<ICreateNFTPayload> = {};

  if (!payload.name) {
    errors.name = t('validation.required');
  }

  if (!payload.description) {
    errors.description = t('validation.required');
  }

  return errors;
};

export const CreateNFT = () => {
  const classes = useCreateNFTStyles();
  const renderForm = ({ handleSubmit }: FormRenderProps<ICreateNFTPayload>) => {
    return (
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="grid"
        gridTemplateColumns="1fr minmax(320px, auto)"
        gridGap={72}
      >
        <div>
          <Box mb={5}>
            <Field
              component={InputField}
              name="name"
              type="text"
              label={t('create-nft.label.name')}
              color="primary"
              fullWidth={true}
            />
          </Box>
          <Field
            component={InputField}
            name="description"
            type="text"
            label={t('create-nft.label.description')}
            color="primary"
            fullWidth={true}
            rowsMax={10}
            multiline
          />
          <Box>
            <Button
              color="primary"
              size="large"
              variant="contained"
              type="submit"
            >
              {t('create-nft.submit')}
            </Button>
          </Box>
        </div>
        <div>Column 2</div>
      </Box>
    );
  };
  return (
    <Container maxWidth="lg" className={classes.root}>
      <Box mb={3.5}>
        <GoBack />
      </Box>
      <Box mb={3}>
        <Typography variant="h1">{t('create-nft.title')}</Typography>
      </Box>
      <Box>
        <Form
          onSubmit={() => alert('Submit')}
          render={renderForm}
          validate={validateCreateNFT}
        />
      </Box>
    </Container>
  );
};
