import { Box, Container, Typography } from '@material-ui/core';
import { Mutation, useDispatchRequest } from '@redux-requests/react';
import { NftType } from 'modules/api/common/NftType';
import { Button } from 'modules/uiKit/Button';
import { Section } from 'modules/uiKit/Section';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { useHistory } from 'react-router';
import { Bytes, convertBytesToMegabytes } from '../../../common/types/unit';
import { InputField } from '../../../form/components/InputField';
import { SelectField } from '../../../form/components/SelectField';
import { UploadFileField } from '../../../form/components/UploadFileField';
import { CollectionField } from '../../../form/components/CollectionField';
import { FormErrors } from '../../../form/utils/FormErrors';
import { t } from '../../../i18n/utils/intl';
import { GoBack } from '../../../layout/components/GoBack';
import {
  ProfileRoutesConfig,
  ProfileTab,
} from '../../../profile/ProfileRoutes';
import { Channel, ICreateNFTPayload } from '../../actions/createNft';
import { useCreateNFTStyles } from './useCreateNFTStyles';
import { useAccount } from 'modules/account/hooks/useAccount';
import {
  IMyBrand,
  queryMyBrandItem,
} from 'modules/brand/actions/queryMyBrandItem';
import { ICollectionItem } from 'modules/form/components/CollectionField/CollectionField';
import { createBrandNFT } from 'modules/brand/actions/createBrandNft';
import { IBrandInfo } from 'modules/brand/api/queryBrand';

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
];

interface ICreateNFTFormData extends Omit<ICreateNFTPayload, 'supply'> {
  supply: string;
}

const validateCreateNFT = (payload: ICreateNFTFormData) => {
  const errors: FormErrors<ICreateNFTFormData> = {};

  if (!payload.name) {
    errors.name = t('validation.required');
  }

  if (!payload.description) {
    errors.description = t('validation.required');
  }

  // if (payload.standard === NftType.ERC1155) {
  //   const supply = payload.supply;
  //   if (!supply) {
  //     errors.supply = t('validation.required');
  //   } else if (!/^\d+$/.test(supply)) {
  //     errors.supply = t('validation.require-integer');
  //   }
  // }

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

const mapperCollectionList = (item: IMyBrand): ICollectionItem => {
  return {
    id: item.id,
    collectionName: item.title,
    imgSrc: item.imgSrc,
    contractAddress: item.contract,
    nftType: item.nftType,
    symbol: item.symbol,
    ownername: item.ownername,
    owneraddress: item.owneraddress,
  };
};

export const CreateNFT = () => {
  const classes = useCreateNFTStyles();
  const dispatch = useDispatchRequest();
  const { push } = useHistory();
  const [selectCollection, setSelectCollection] = useState<ICollectionItem>();
  const [collectionList, setCollectionList] = useState<ICollectionItem[]>([]);
  const { address } = useAccount();

  const handleSubmit = useCallback(
    (payload: ICreateNFTFormData) => {
      if (!selectCollection || !address) return;
      const brandInfo: IBrandInfo = {
        brandname: selectCollection.collectionName,
        brandsymbol: selectCollection.symbol,
        contractaddress: selectCollection.contractAddress,
        id: selectCollection.id,
        owneraddress: selectCollection.owneraddress,
        ownername: selectCollection.ownername,
        standard: selectCollection.nftType,
      };
      dispatch(
        createBrandNFT(
          {
            ...payload,
            standard: selectCollection.nftType,
            supply: parseInt(payload.supply, 10),
          },
          brandInfo,
        ),
      ).then(({ error }) => {
        if (!error) {
          push(ProfileRoutesConfig.UserProfile.generatePath(ProfileTab.brands));
        }
      });
    },
    [dispatch, push, selectCollection, address],
  );

  useEffect(() => {
    if (address) {
      dispatch(queryMyBrandItem(address)).then(res => {
        const { data: collections } = res;
        if (collections) {
          setCollectionList(collections.map(mapperCollectionList));
        }
      });
    }
  }, [address, dispatch]);

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
        label: t(`create-nft.channelOption.${Channel.Comics}`),
        value: Channel.Comics,
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

  const handleChangeCollection = (collection: ICollectionItem) => {
    setSelectCollection(collection);
  };

  const renderCollection = () => {
    return (
      <CollectionField
        items={collectionList}
        title={t('create-collection-nft.collections')}
        subTitle={t('create-collection-nft.subCollection')}
        handleChangeCollection={handleChangeCollection}
        currentAddr={selectCollection?.contractAddress}
      />
    );
  };

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
              component={renderCollection}
              name="collection"
              type="text"
              label={t('create-nft.label.collection')}
              color="primary"
              fullWidth={true}
              rowsMax={10}
              multiline
            />
          </Box>
          {/* <Box mb={5}>
            <Field
              component={SelectField}
              name="standard"
              type="text"
              label={t('create-nft.label.standard')}
              color="primary"
              fullWidth={true}
              options={standardOptions}
            />
          </Box> */}
          {selectCollection?.nftType === NftType.ERC1155 && (
            <Box mb={5}>
              <Field
                component={InputField}
                name="supply"
                type="number"
                label={t('create-nft.label.supply')}
                color="primary"
                fullWidth={true}
                options={standardOptions}
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
                <Button size="large" type="submit" fullWidth loading={loading}>
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
