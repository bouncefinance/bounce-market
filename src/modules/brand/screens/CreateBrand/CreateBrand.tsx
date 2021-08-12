import { Box, Container, Tooltip, Typography } from '@material-ui/core';
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
import { ReactComponent as QuestionIcon } from '../../../common/assets/question.svg';

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

const NAME_CHARACTER_LIMIT = 30;
const SYMBOL_CHARACTER_LIMIT = 15;
const DESCRIPTION_CHARACTER_LIMIT = 200;

const validateCreateBrand = (payload: ICreateBrand) => {
  const errors: FormErrors<ICreateBrand> = {};

  if (!payload.brandName) {
    errors.brandName = t('validation.required');
  } else {
    const reg = /^[^(`|'|"|“|‘)]{0,32}$/g;
    if (!reg.test(payload.brandName)) {
      errors.brandName = t('validation.invalid-name');
    }
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
            label={t('collection.create.label.collection-name')}
            color="primary"
            fullWidth={true}
            autoFocus
            showLimitCounter={true}
            inputProps={{
              maxLength: NAME_CHARACTER_LIMIT,
            }}
          />
        </Box>
        <Box mb={5}>
          <Field
            component={SelectField}
            name="standard"
            type="text"
            label={
              <Box display="flex" alignItems="center">
                {t('create-nft.label.standard')}

                <Tooltip
                  title={
                    <>
                      <p>{t('collection.create.tip-warning.ERC721')}</p>
                      <p>{t('collection.create.tip-warning.ERC1155')}</p>
                    </>
                  }
                >
                  <Box component="i" ml={1}>
                    <QuestionIcon />
                  </Box>
                </Tooltip>
              </Box>
            }
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
            color="primary"
            fullWidth={true}
            label={
              <Box display="flex" alignItems="center">
                {t('collection.create.label.collection-symbol')}

                <Tooltip
                  title={t('collection.create.tip-warning.collection-symbol')}
                >
                  <Box component="i" ml={1}>
                    <QuestionIcon />
                  </Box>
                </Tooltip>
              </Box>
            }
            showLimitCounter={true}
            inputProps={{
              maxLength: SYMBOL_CHARACTER_LIMIT,
            }}
          />
        </Box>
        <Box mb={5}>
          <Field
            component={InputField}
            name="description"
            type="text"
            label={
              <Box display="flex" alignItems="center">
                {t('collection.create.label.description')}
                <Tooltip title={t('collection.create.tip-warning.description')}>
                  <Box component="i" ml={1}>
                    <QuestionIcon />
                  </Box>
                </Tooltip>
              </Box>
            }
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
            label={t('collection.create.label.collection-avatar')}
            accepts={FILE_ACCEPTS}
          />
        </Box>

        <Box>
          <Mutation type={createBrand.toString()}>
            {({ loading }) => (
              <Button size="large" type="submit" fullWidth loading={loading}>
                {loading
                  ? t('common.submitting')
                  : t('collection.create.create-collection')}
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
          <Typography variant="h1">
            {t('collection.create.create-collection')}
          </Typography>
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
