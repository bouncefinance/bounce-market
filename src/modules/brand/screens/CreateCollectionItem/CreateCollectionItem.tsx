import { Box, Container, Typography } from '@material-ui/core';
import { Mutation, useDispatchRequest } from '@redux-requests/react';
import { useAccount } from 'modules/account/hooks/useAccount';
import { NftType } from 'modules/api/common/NftType';
import { createBrandNFT } from 'modules/brand/actions/createBrandNft';
import { queryBrandById } from 'modules/brand/actions/getBrandById';
import { IBrandInfo } from 'modules/brand/api/queryBrand';
import {
  Channel,
  ICreateNFTPayload,
} from 'modules/createNFT/actions/createNft';
import { useCreateNFTStyles } from 'modules/createNFT/screens/CreateNFT/useCreateNFTStyles';
import { Button } from 'modules/uiKit/Button';
import { Section } from 'modules/uiKit/Section';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { useHistory, useParams } from 'react-router';
import { Bytes, convertBytesToMegabytes } from '../../../common/types/unit';
import { InputField } from '../../../form/components/InputField';
import { SelectField } from '../../../form/components/SelectField';
import { UploadFileField } from '../../../form/components/UploadFileField';
import { FormErrors } from '../../../form/utils/FormErrors';
import { t } from '../../../i18n/utils/intl';
import { GoBack } from '../../../layout/components/GoBack';

const MAX_SIZE: Bytes = 31457280;
const FILE_ACCEPTS: string[] = [
  'image/png',
  'image/gif',
  'image/jpeg',
  'image/jp2',
  'image/jpm',
  'audio/mpeg',
  'video/mpeg',
  'video/mp4',
  'model/gltf-binary',
  '.glb',
];

interface ICreateNFTFormData extends Omit<ICreateNFTPayload, 'supply'> {
  supply: string;
}

const validateCreateNFT = (payload: ICreateNFTFormData) => {
  const errors: FormErrors<ICreateNFTFormData> = {};

  if (!payload.name) {
    errors.name = t('validation.required');
  } else {
    const reg = /^[^`'"“‘]{0,32}$/g;
    if (!reg.test(payload.name)) {
      errors.name = t('validation.invalid-name');
    }
  }

  if (!payload.description) {
    errors.description = t('validation.required');
  }

  if (payload.standard === NftType.ERC1155) {
    const supply = payload.supply;
    if (!supply) {
      errors.supply = t('validation.required');
    } else if (!/^\d+$/.test(supply)) {
      errors.supply = t('validation.require-integer');
    }
  }

  if (!payload.file) {
    errors.file = t('validation.required');
  } else if (
    !FILE_ACCEPTS.includes(payload.file.type) &&
    !payload.file.name.includes('.glb')
  ) {
    errors.file = t('validation.invalid-type');
  } else if (payload.file.size > MAX_SIZE) {
    errors.file = t('validation.max-size', {
      value: convertBytesToMegabytes(MAX_SIZE),
    });
  }

  return errors;
};

export const CreateCollectionItem = () => {
  const classes = useCreateNFTStyles();
  const dispatch = useDispatchRequest();
  const { goBack } = useHistory();
  const { address } = useAccount();
  const { brandId } = useParams<any>();
  const [brandInfo, setBrandInfo] = useState<IBrandInfo>();

  useEffect(() => {
    if (address && brandId) {
      dispatch(
        queryBrandById(
          {
            id: parseInt(brandId),
            accountaddress: address,
          },
          {
            asMutation: true,
          },
        ),
      ).then(({ data }) => {
        if (data) {
          setBrandInfo(data);
        }
      });
    }
  }, [brandId, address, dispatch]);

  const handleSubmit = useCallback(
    (payload: ICreateNFTFormData) => {
      if (brandInfo) {
        dispatch(
          createBrandNFT(
            {
              ...payload,
              standard: brandInfo.standard,
              supply: parseInt(payload.supply, 10),
            },
            brandInfo,
          ),
        ).then(({ error }) => {
          if (!error) {
            goBack();
          }
        });
      }
    },
    [brandInfo, dispatch, goBack],
  );

  const channelOptions = useMemo(
    () => [
      {
        label: t(`product-panel.art`),
        value: Channel.FineArts,
      },
      {
        label: t(`product-panel.sports`),
        value: Channel.Sports,
      },
      {
        label: t(`product-panel.comics`),
        value: Channel.Comics,
      },
      {
        label: t(`product-panel.collectible`),
        value: Channel.Collectible,
      },
      {
        label: t(`product-panel.music`),
        value: Channel.Music,
      },
      {
        label: t(`product-panel.performer`),
        value: Channel.Performer,
      },
      {
        label: t(`product-panel.metaverse`),
        value: Channel.Metaverse,
      },
      {
        label: t(`product-panel.games`),
        value: Channel.Games,
      },
    ],
    [],
  );

  const renderForm = ({
    handleSubmit,
    values,
  }: FormRenderProps<ICreateNFTFormData>) => {
    return (
      <Box className={classes.form} component="form" onSubmit={handleSubmit}>
        <div className={classes.formImgCol}>
          <Field
            className={classes.formImgBox}
            component={UploadFileField}
            name="file"
            maxSize={MAX_SIZE}
            acceptsHint={['PNG', 'JPG', 'GIF', 'MP4', 'MP3']}
            accepts={FILE_ACCEPTS}
            fitView={true} // TODO should switching by fit/fill switcher in form
          />
        </div>

        <div>
          <Box mb={5}>
            <Field
              component={InputField}
              name="name"
              type="text"
              label={t('create-collection-nft.label.name')}
              color="primary"
              fullWidth={true}
            />
          </Box>
          <Box mb={5}>
            <Field
              component={InputField}
              name="description"
              type="text"
              label={t('create-collection-nft.label.description')}
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
              label={t('create-collection-nft.label.channel')}
              color="primary"
              fullWidth={true}
              options={channelOptions}
            />
          </Box>
          {brandInfo?.standard === NftType.ERC1155 && (
            <Box mb={5}>
              <Field
                component={InputField}
                name="supply"
                type="number"
                label={t('create-nft.label.supply')}
                color="primary"
                fullWidth={true}
                inputProps={{
                  step: 'any',
                  min: '0',
                  inputMode: 'decimal',
                }}
              />
            </Box>
          )}
          <Box>
            <Mutation type={createBrandNFT.toString()}>
              {({ loading }) => (
                <Button
                  size="large"
                  type="submit"
                  loading={loading}
                  fullWidth
                  disabled={!brandInfo}
                >
                  {loading
                    ? t('common.submitting')
                    : t('create-collection-nft.submit')}
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
          <Typography variant="h1">
            {t('create-collection-nft.title')}
          </Typography>
        </Box>
        <Box>
          <Form
            onSubmit={handleSubmit}
            render={renderForm}
            validate={validateCreateNFT}
            initialValues={{
              channel: Channel.FineArts,
              standard: brandInfo?.standard,
            }}
          />
        </Box>
      </Container>
    </Section>
  );
};
