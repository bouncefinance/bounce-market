import { Box, Button, Container, Typography } from '@material-ui/core';
import { Mutation, useDispatchRequest } from '@redux-requests/react';
import { Section } from 'modules/uiKit/Section';
import React, { useCallback, useMemo } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { useHistory } from 'react-router';
import { Bytes, convertBytesToMegabytes } from '../../../common/types/unit';
import { InputField } from '../../../form/components/InputField';
import { SelectField } from '../../../form/components/SelectField';
import { UploadFileField } from '../../../form/components/UploadFileField';
import { FormErrors } from '../../../form/utils/FormErrors';
import { t } from '../../../i18n/utils/intl';
import { GoBack } from '../../../layout/components/GoBack';
import { RoutesConfiguration } from '../../../overview/Routes';
import { useCreateNFTStyles } from './useCreateNFTStyles';
import {
  Channel,
  createNft,
  ICreateNFTPayload,
  NftType,
} from '../../actions/createNft';

const MAX_SIZE: Bytes = 31457280;
const FILE_ACCEPTS: string[] = [
  'image/png',
  'image/gif',
  'image/jpeg',
  'image/jp2',
  'image/jpm',
  'image/webp',
  'audio/mpeg',
  'video/mpeg',
  'video/mp4',
];

const validateCreateNFT = (payload: ICreateNFTPayload) => {
  const errors: FormErrors<ICreateNFTPayload> = {};

  if (!payload.name) {
    errors.name = t('validation.required');
  }

  if (!payload.description) {
    errors.description = t('validation.required');
  }

  if (payload.standard === NftType.ERC1155) {
    if (!payload.supply) {
      errors.supply = t('validation.required');
    }
  }

  if (!payload.file) {
    errors.file = t('validation.required');
  } else if (!FILE_ACCEPTS.includes(payload.file.type)) {
    errors.file = t('validation.invalid-type');
  } else if (payload.file.size > MAX_SIZE) {
    errors.file = t('validation.max-size', {
      value: convertBytesToMegabytes(MAX_SIZE),
    });
  }

  return errors;
};

export const CreateNFT = () => {
  const classes = useCreateNFTStyles();
  const dispatch = useDispatchRequest();
  const { push } = useHistory();

  const handleSubmit = useCallback(
    (payload: ICreateNFTPayload) => {
      dispatch(createNft(payload)).then(({ error }) => {
        if (!error) {
          push(RoutesConfiguration.Overview.generatePath());
        }
      });
    },
    [dispatch, push],
  );

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
        label: t(`create-nft.standardOption.${NftType.ERC721}`),
        value: NftType.ERC721,
      },
      {
        label: t(`create-nft.standardOption.${NftType.ERC1155}`),
        value: NftType.ERC1155,
      },
    ],
    [],
  );

  const renderForm = ({
    handleSubmit,
    values,
  }: FormRenderProps<ICreateNFTPayload>) => {
    return (
      <Box className={classes.form} component="form" onSubmit={handleSubmit}>
        <div className={classes.formImgCol}>
          <Field
            className={classes.formImgBox}
            component={UploadFileField}
            name="file"
            maxSize={MAX_SIZE}
            acceptsHint={['PNG', 'JPG', 'GIF', 'WEBP', 'MP4', 'MP3']}
            accepts={FILE_ACCEPTS}
            template="bigBlock"
            fitView={true} // TODO should switching by fit/fill switcher in form
          />
        </div>

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
              name="standard"
              type="text"
              label={t('create-nft.label.standard')}
              color="primary"
              fullWidth={true}
              options={standardOptions}
            />
          </Box>
          {values.standard === NftType.ERC1155 && (
            <Box mb={5}>
              <Field
                component={InputField}
                name="supply"
                type="number"
                label={t('create-nft.label.supply')}
                color="primary"
                fullWidth={true}
                options={standardOptions}
              />
            </Box>
          )}
          <Box>
            <Mutation type={createNft.toString()}>
              {({ loading }) => (
                <Button size="large" type="submit" fullWidth disabled={loading}>
                  {loading ? t('common.submitting') : t('create-nft.submit')}
                </Button>
              )}
            </Mutation>
          </Box>
        </div>
      </Box>
    );
  };

  return (
    <Section>
      <Container maxWidth="lg">
        <Box mb={3.5}>
          <GoBack />
        </Box>
        <Box mb={3}>
          <Typography variant="h1">{t('create-nft.title')}</Typography>
        </Box>
        <Box>
          <Form
            onSubmit={handleSubmit}
            render={renderForm}
            validate={validateCreateNFT}
            initialValues={{
              channel: Channel.FineArts,
              standard: NftType.ERC721,
            }}
          />
        </Box>
      </Container>
    </Section>
  );
};
