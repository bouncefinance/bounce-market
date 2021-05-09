import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { Mutation, useDispatchRequest } from '@redux-requests/react';
import { Section } from 'modules/uiKit/Section';
import React, { useCallback, useEffect, useMemo } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { FormErrors } from '../../../form/utils/FormErrors';
import { t } from '../../../i18n/utils/intl';
import { GoBack } from '../../../layout/components/GoBack';
import { usePublishNFTtyles } from './usePublishNFTtyles';
import { ButtonGroupField } from '../../../form/components/ButtonGroupField/ButtonGroupField';
import { AuctionType } from '../../../overview/api/auctionType';
import { useParams } from 'react-router';
import { InputField } from '../../../form/components/InputField';
import { SelectField } from '../../../form/components/SelectField';
import { useCurrencies } from '../../hooks/useCurrencies';
import { ReactComponent as QuestionIcon } from '../../../common/assets/question.svg';
import { Queries } from '../../../common/components/Queries/Queries';
import { publishNft } from '../../actions/publishNft';
import { fetchItem } from '../../../detailsNFT/actions/fetchItem';
import { Days } from '../../../common/types/unit';
import { ResponseData } from '../../../common/types/ResponseData';
import { NftType } from '../../actions/createNft';
import BigNumber from 'bignumber.js';

const MIN_INCREMENTAL_PART = 0.05;

interface IPublishFixedSwap {
  type: AuctionType.FixedSwap;
  price: number;
  quantity: number;
  unitContract: string;
}

interface IPublishEnglishAuction {
  type: AuctionType.EnglishAuction;
  minBid: number;
  purchasePrice: number;
  reservePrice: number;
  quantity: number;
  duration: Days;
  unitContract: string;
}

type IPublishNFTFormData = IPublishFixedSwap | IPublishEnglishAuction;

const validateCreateNFT = (payload: IPublishNFTFormData) => {
  const errors: FormErrors<IPublishNFTFormData> = {};
  // name max length is 30

  return errors;
};

interface IPublishNFTComponentProps {
  name: string;
  tokenContract: string;
  standard: NftType;
  tokenId: number;
}

export const PublishNFTComponent = ({
  name,
  tokenContract,
  standard,
  tokenId,
}: IPublishNFTComponentProps) => {
  const classes = usePublishNFTtyles();
  const dispatch = useDispatchRequest();

  const options = useMemo(
    () => [
      {
        label: t(`publish-nft.auction-type.${AuctionType.FixedSwap}`),
        value: AuctionType.FixedSwap,
      },
      {
        label: t(`publish-nft.auction-type.${AuctionType.EnglishAuction}`),
        value: AuctionType.EnglishAuction,
      },
    ],
    [],
  );

  const {
    options: currencyOptions,
    default: defaultCurrency,
  } = useCurrencies();

  const durationOptions = useMemo(
    () => [
      {
        label: t('unit.day', { value: 3 }),
        value: 3,
      },
      {
        label: t('unit.day', { value: 5 }),
        value: 5,
      },
      {
        label: t('unit.day', { value: 7 }),
        value: 7,
      },
      {
        label: t('unit.day', { value: 14 }),
        value: 14,
      },
      {
        label: t('unit.day', { value: 30 }),
        value: 30,
      },
    ],
    [],
  );

  const handleSubmit = useCallback(
    (payload: IPublishNFTFormData) => {
      if (payload.type === AuctionType.FixedSwap) {
        dispatch(
          publishNft({
            type: payload.type,
            name,
            tokenContract,
            unitContract: payload.unitContract,
            standard,
            tokenId,
            price: new BigNumber(payload.price),
            quantity: payload.quantity,
          }),
        ).then(({ error }) => {
          if (!error) {
            console.log('sent');
          }
        });
      } else {
        dispatch(
          publishNft({
            type: payload.type,
            purchasePrice: payload.purchasePrice,
            minBid: payload.minBid,
            minIncremental: payload.minBid * MIN_INCREMENTAL_PART,
            reservePrice: payload.reservePrice,
            duration: payload.duration * 60 * 60 * 24,
            name,
            tokenContract,
            unitContract: payload.unitContract,
            standard,
            tokenId,
            quantity: payload.quantity,
          }),
        ).then(({ error }) => {
          if (!error) {
            console.log('sent');
          }
        });
      }
    },
    [dispatch, name, standard, tokenContract, tokenId],
  );

  const renderForm = ({
    handleSubmit,
    values,
  }: FormRenderProps<IPublishNFTFormData>) => {
    return (
      <Box className={classes.form} component="form" onSubmit={handleSubmit}>
        <div className={classes.formImgCol}>IMG</div>

        <div>
          <Box>
            <Field
              component={ButtonGroupField}
              name="type"
              type="number"
              color="primary"
              fullWidth={true}
              items={options}
            />
          </Box>
          {values.type === AuctionType.FixedSwap ? (
            <>
              <Box>
                <Field
                  component={InputField}
                  name="price"
                  type="number"
                  label={t('publish-nft.label.price')}
                  color="primary"
                  fullWidth={true}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Field
                          component={SelectField}
                          name="unitContract"
                          color="primary"
                          fullWidth={true}
                          options={currencyOptions}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box>
                <Field
                  component={InputField}
                  name="amount"
                  type="number"
                  label={t('publish-nft.label.amount')}
                  color="primary"
                  fullWidth={true}
                />
              </Box>
            </>
          ) : (
            <>
              <Box>
                <Field
                  component={InputField}
                  name="minBid"
                  type="number"
                  label={t('publish-nft.label.minBid')}
                  color="primary"
                  fullWidth={true}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Field
                          component={SelectField}
                          name="unitContract"
                          color="primary"
                          fullWidth={true}
                          options={currencyOptions}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box>
                <Field
                  component={InputField}
                  name="purchasePrice"
                  type="number"
                  label={
                    <>
                      {t('publish-nft.label.directPurchase')}
                      <Tooltip title={t('publish-nft.tooltip.directPurchase')}>
                        <Box component={IconButton}>
                          <QuestionIcon />
                        </Box>
                      </Tooltip>
                    </>
                  }
                  color="primary"
                  fullWidth={true}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Field
                          component={SelectField}
                          name="unitContract"
                          color="primary"
                          fullWidth={true}
                          options={currencyOptions}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box>
                <Field
                  component={InputField}
                  name="reservePrice"
                  type="number"
                  label={t('publish-nft.label.reservePrice')}
                  color="primary"
                  fullWidth={true}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Field
                          component={SelectField}
                          name="unitContract"
                          color="primary"
                          fullWidth={true}
                          options={currencyOptions}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box>
                <Field
                  component={InputField}
                  name="count"
                  type="number"
                  label={t('publish-nft.label.count')}
                  color="primary"
                  fullWidth={true}
                />
              </Box>
              <Box>
                <Field
                  component={SelectField}
                  name="duration"
                  label={t('publish-nft.label.duration')}
                  color="primary"
                  fullWidth={true}
                  options={durationOptions}
                />
              </Box>
            </>
          )}
          <Box>
            <Mutation type={publishNft.toString()}>
              {({ loading }) => (
                <Button size="large" type="submit" fullWidth disabled={loading}>
                  {loading
                    ? t('publish-nft.submitting')
                    : t('publish-nft.submit')}
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
          <Typography variant="h1">{t('publish-nft.title')}</Typography>
        </Box>
        <Box>
          <Form
            onSubmit={handleSubmit}
            render={renderForm}
            validate={validateCreateNFT}
            initialValues={
              {
                type: AuctionType.FixedSwap,
                unitContract: defaultCurrency,
                duration: durationOptions[0].value,
              } as Partial<IPublishFixedSwap>
            }
          />
        </Box>
      </Container>
    </Section>
  );
};

export const PublishNFT = () => {
  const dispatch = useDispatchRequest();
  const { id: idParam, contract } = useParams<{
    contract: string;
    id: string;
  }>();
  const id = parseInt(idParam, 10);
  useEffect(() => {
    dispatch(fetchItem({ contract, id }));
  }, [contract, dispatch, id]);

  return (
    <Queries<ResponseData<typeof fetchItem>> requestActions={[fetchItem]}>
      {({ data }) => {
        return (
          <PublishNFTComponent
            name={data.itemname}
            tokenContract={data.contractaddress}
            standard={data.standard}
            tokenId={data.id}
          />
        );
      }}
    </Queries>
  );
};
