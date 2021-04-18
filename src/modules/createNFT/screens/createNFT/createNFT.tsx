import React, { useMemo } from 'react';
import { Box, Button, Container, Typography } from '@material-ui/core';
import { GoBack } from '../../../layout/components/GoBack';
import { useCreateNFTStyles } from './useCreateNFTStyles';
import { t } from '../../../i18n/utils/intl';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { InputField } from '../../../form/components/InputField';
import { FormErrors } from '../../../form/utils/FormErrors';
import { SelectField } from '../../../form/components/SelectField';

enum Channel {
  FineArts,
  Sports,
  Conicbooks,
}

enum Standard {
  ERC721,
  ERC1155,
}

interface ICreateNFTPayload {
  name: string;
  description: string;
  channel: Channel;
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
  const channelOptions = useMemo(
    () => [
      {
        label: t(`create-nft.channelOption.${Channel.FineArts}`),
        value: Channel.FineArts,
      },
      {
        label: t(`create-nft.channelOption.${Channel.Sports}`),
        value: Channel.Sports,
      },
      {
        label: t(`create-nft.channelOption.${Channel.Conicbooks}`),
        value: Channel.Conicbooks,
      },
    ],
    [],
  );

  const standardOptions = useMemo(
    () => [
      {
        label: t(`create-nft.standardOption.${Standard.ERC721}`),
        value: Standard.ERC721,
      },
      {
        label: t(`create-nft.standardOption.${Standard.ERC1155}`),
        value: Standard.ERC1155,
      },
    ],
    [],
  );

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
          <Box mb={5}>
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
          </Box>
          <Box mb={5}>
            <Field
              component={SelectField}
              name="channel"
              type="text"
              label={t('create-nft.label.channel')}
              color="primary"
              fullWidth={true}
              options={channelOptions}
            />
          </Box>
          <Box mb={5}>
            <Field
              component={SelectField}
              name="channel"
              type="text"
              label={t('create-nft.label.standard')}
              color="primary"
              fullWidth={true}
              options={standardOptions}
            />
          </Box>
          <Box>
            <Button
              color="primary"
              size="large"
              variant="contained"
              type="submit"
              fullWidth={true}
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
          initialValues={{ channel: Channel.FineArts }}
        />
      </Box>
    </Container>
  );
};
