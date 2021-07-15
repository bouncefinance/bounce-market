import { Box, Container, Typography } from '@material-ui/core';
import { Mutation, useDispatchRequest } from '@redux-requests/react';
import { NftType } from 'modules/api/common/NftType';
import { InputField } from 'modules/form/components/InputField';
import { SelectField } from 'modules/form/components/SelectField';
import { UploadAvatarField } from 'modules/form/components/UploadAvatarField';
import { FormErrors } from 'modules/form/utils/FormErrors';
import { t } from 'modules/i18n/utils/intl';
import { GoBack } from 'modules/layout/components/GoBack';
import { Button } from 'modules/uiKit/Button';
import { Section } from 'modules/uiKit/Section';
import React, { useCallback, useMemo } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { useHistory } from 'react-router';
import { Bytes, convertBytesToMegabytes } from '../../../common/types/unit';
import {
  ProfileRoutesConfig,
  ProfileTab,
} from '../../../profile/ProfileRoutes';
import { createBrand } from '../../actions/createBrand';

export interface ICreateBrand {
  brandName: string;
  standard: NftType;
  description: string;
  brandSymbol: string;
  file: File;
}

const MAX_SIZE: Bytes = 31457280;
const FILE_ACCEPTS: string[] = [
  'image/png',
  'image/jpeg',
  'image/jp2',
  'image/jpm',
];

const validateCreateBrand = (payload: ICreateBrand) => {
  const errors: FormErrors<ICreateBrand> = {};

  if (!payload.brandName) {
    errors.brandName = t('validation.required');
  }

  if (!payload.brandSymbol) {
    errors.brandSymbol = t('validation.required');
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

const DESCRIPTION_CHARACTER_LIMIT = 200;

export const CreateBrand = () => {
  const dispatch = useDispatchRequest();
  const { replace } = useHistory();

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

  const handleSubmit = useCallback(
    (payload: ICreateBrand) => {
      dispatch(createBrand(payload)).then(({ error }) => {
        if (!error) {
          replace(
            ProfileRoutesConfig.UserProfile.generatePath(ProfileTab.brands),
          );
        }
      });
    },
    [dispatch, replace],
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
            component={SelectField}
            name="standard"
            type="text"
            label={t('create-nft.label.standard')}
            color="primary"
            fullWidth={true}
            options={standardOptions}
          />
        </Box>
        <Box mb={5}>
          <Field
            component={InputField}
            name="brandSymbol"
            type="text"
            label={t('brand.create.label.brand-symbol')}
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
            component={UploadAvatarField}
            name="file"
            label={t('brand.create.label.brand-avatar')}
            accepts={FILE_ACCEPTS}
          />
        </Box>

        <Box>
          <Mutation type={createBrand.toString()}>
            {({ loading }) => (
              <Button size="large" type="submit" fullWidth loading={loading}>
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
            initialValues={{
              standard: NftType.ERC721,
            }}
          />
        </Box>
      </Container>
    </Section>
  );
};
