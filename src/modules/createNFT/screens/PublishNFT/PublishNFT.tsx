import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  Paper,
  Switch,
  Tooltip,
  Typography,
  useTheme,
} from '@material-ui/core';
import { Mutation, useDispatchRequest } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { add } from 'date-fns';
import { Img } from 'modules/uiKit/Img';
import { Section } from 'modules/uiKit/Section';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { useParams } from 'react-router';
import { ReactComponent as QuestionIcon } from '../../../common/assets/question.svg';
import { Queries } from '../../../common/components/Queries/Queries';
import { ResponseData } from '../../../common/types/ResponseData';
import { Days } from '../../../common/types/unit';
import { fetchItem } from '../../../detailsNFT/actions/fetchItem';
import { ButtonGroupField } from '../../../form/components/ButtonGroupField/ButtonGroupField';
import { InputField } from '../../../form/components/InputField';
import { SelectField } from '../../../form/components/SelectField';
import { FormErrors } from '../../../form/utils/FormErrors';
import { t } from '../../../i18n/utils/intl';
import { GoBack } from '../../../layout/components/GoBack';
import { AuctionType } from '../../../overview/api/auctionType';
import { NftType } from '../../actions/createNft';
import { publishNft } from '../../actions/publishNft';
import { useCurrencies } from '../../hooks/useCurrencies';
import { usePublishNFTtyles } from './usePublishNFTtyles';

const MIN_AMOUNT = 1;
const MIN_INCREMENTAL_PART = 0.05;

// todo: get that values dynamic
const DEMO_CURRENCY_PRICE = 2600;
const FEE_PERCENTAGE = 1;

interface IPublishFixedSwap {
  type: AuctionType.FixedSwap;
  price: string;
  amount: number | string;
  unitContract: string;
  img?: string;
}

interface IPublishEnglishAuction {
  type: AuctionType.EnglishAuction;
  minBid: number;
  purchasePrice: number;
  reservePrice: number;
  amount: number | string;
  duration: Days;
  unitContract: string;
}

type IPublishNFTFormData = IPublishFixedSwap | IPublishEnglishAuction;

const formatAmount = (value: string) => (value ? `${Math.round(+value)}` : '1');

interface IPublishNFTComponentProps {
  name: string;
  tokenContract: string;
  standard: NftType;
  tokenId: number;
  img?: string;
}

export const PublishNFTComponent = ({
  name,
  tokenContract,
  standard,
  tokenId,
  img,
}: IPublishNFTComponentProps) => {
  const classes = usePublishNFTtyles();
  const dispatch = useDispatchRequest();
  const theme = useTheme();
  const [purchasePriceChecked, setPurchasePriceChecked] = useState(false);
  const [reservePriceChecked, setReservePriceChecked] = useState(false);

  const togglePurchasePriceChecked = () => {
    setPurchasePriceChecked(prev => !prev);
  };

  const toggleReservePriceChecked = () => {
    setReservePriceChecked(prev => !prev);
  };

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

  const validateCreateNFT = useCallback(
    (payload: IPublishNFTFormData) => {
      const errors: FormErrors<IPublishNFTFormData> = {};

      if (!payload.amount) {
        errors.amount = t('validation.required');
      } else if (+payload.amount < MIN_AMOUNT) {
        errors.amount = t('validation.min', { value: MIN_AMOUNT - 1 });
      }

      if (payload.type === AuctionType.FixedSwap) {
        if (!payload.price) {
          (errors as any).price = t('validation.required');
        } else if (+payload.price <= 0) {
          (errors as any).price = t('validation.min', { value: 0 });
        }
      } else {
        if (!payload.minBid) {
          (errors as any).minBid = t('validation.required');
        } else if (+payload.minBid <= 0) {
          (errors as any).minBid = t('validation.min', { value: 0 });
        }

        if (purchasePriceChecked) {
          if (!payload.purchasePrice) {
            (errors as any).purchasePrice = t('validation.required');
          } else if (+payload.purchasePrice <= 0) {
            (errors as any).purchasePrice = t('validation.min', { value: 0 });
          }
        }

        if (reservePriceChecked) {
          if (!payload.reservePrice) {
            (errors as any).reservePrice = t('validation.required');
          } else if (+payload.reservePrice <= 0) {
            (errors as any).reservePrice = t('validation.min', { value: 0 });
          }
        }
      }

      return errors;
    },
    [purchasePriceChecked, reservePriceChecked],
  );

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
            quantity: +payload.amount,
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
            quantity: +payload.amount,
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
    const currentCryptoCurrencyLabel = currencyOptions.find(
      o => o.value === values.unitContract,
    )?.label;

    const reciveValue =
      values.type === AuctionType.FixedSwap
        ? new BigNumber((+values.price * (100 - FEE_PERCENTAGE)) / 100)
        : undefined;

    return (
      <Box className={classes.form} component="form" onSubmit={handleSubmit}>
        <div className={classes.formImgCol}>
          <Paper className={classes.formImgBox} variant="outlined">
            <Img
              src={img}
              alt={name}
              title={name}
              ratio="1x1"
              objectFit="scale-down"
            />
          </Paper>
        </div>

        <div>
          <Box mb={6}>
            <FormControl fullWidth>
              <InputLabel shrink>{t('publish-nft.label.type')}</InputLabel>

              <Field
                component={ButtonGroupField}
                name="type"
                type="number"
                color="primary"
                fullWidth={true}
                items={options}
              />
            </FormControl>
          </Box>

          {values.type === AuctionType.FixedSwap ? (
            <>
              <Box className={classes.formControl}>
                <Field
                  component={InputField}
                  name="price"
                  type="number"
                  min={0}
                  label={t('publish-nft.label.price')}
                  color="primary"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Field
                          component={SelectField}
                          name="unitContract"
                          color="primary"
                          fullWidth={true}
                          options={currencyOptions}
                          className={classes.currencySelect}
                        />
                      </InputAdornment>
                    ),
                  }}
                />

                <Box className={classes.fieldText}>
                  <Grid container spacing={3}>
                    <Grid item xs>
                      {t('publish-nft.fee', { value: FEE_PERCENTAGE })}
                    </Grid>

                    {values.price && +values.price > 0 && (
                      <Grid item>
                        {t('publish-nft.recieve')}{' '}
                        <b>
                          {reciveValue?.decimalPlaces(6).toFormat()}{' '}
                          {currentCryptoCurrencyLabel}
                        </b>{' '}
                        <Box
                          component="span"
                          color={theme.palette.text.secondary}
                        >
                          $
                          {reciveValue
                            ?.multipliedBy(DEMO_CURRENCY_PRICE)
                            .decimalPlaces(2)
                            .toFormat()}
                        </Box>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              </Box>
              <Box className={classes.formControl}>
                <Field
                  component={InputField}
                  name="amount"
                  type="number"
                  label={t('publish-nft.label.amount')}
                  color="primary"
                  fullWidth={true}
                  parse={formatAmount}
                  format={formatAmount}
                />
              </Box>
            </>
          ) : (
            <>
              <Box className={classes.formControl}>
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
                          className={classes.currencySelect}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box className={classes.formControl}>
                <Field
                  component={InputField}
                  name="amount"
                  type="number"
                  label={t('publish-nft.label.amount')}
                  color="primary"
                  fullWidth={true}
                  disabled
                />
                <div className={classes.fieldText}>
                  {t('publish-nft.auction-amount')}
                </div>
              </Box>

              <Box className={classes.formControl}>
                <Field
                  component={SelectField}
                  name="duration"
                  color="primary"
                  fullWidth={true}
                  options={durationOptions}
                  label={
                    <Box display="flex" alignItems="center">
                      {t('publish-nft.label.duration')}

                      <Tooltip title={t('publish-nft.tooltip.duration')}>
                        <Box component="i" ml={1}>
                          <QuestionIcon />
                        </Box>
                      </Tooltip>
                    </Box>
                  }
                />

                <div className={classes.fieldText}>
                  {t('publish-nft.expire', {
                    value: add(new Date(), {
                      days: +values.duration,
                    }),
                  })}
                </div>
              </Box>

              <Box className={classes.formControl}>
                <Box mb={2.5}>
                  <Grid container alignItems="center">
                    <Grid item xs>
                      <InputLabel shrink className={classes.labelNoMargin}>
                        <Box display="flex" alignItems="center">
                          {t('publish-nft.label.directPurchase')}

                          <Tooltip
                            title={t('publish-nft.tooltip.directPurchase')}
                          >
                            <Box component="i" ml={1}>
                              <QuestionIcon />
                            </Box>
                          </Tooltip>
                        </Box>
                      </InputLabel>
                    </Grid>

                    <Grid item>
                      <Switch
                        checked={purchasePriceChecked}
                        onChange={togglePurchasePriceChecked}
                      />
                    </Grid>
                  </Grid>
                </Box>

                {purchasePriceChecked && (
                  <Field
                    component={InputField}
                    name="purchasePrice"
                    type="number"
                    color="primary"
                    fullWidth={true}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Field
                            component={SelectField}
                            name="unitContract"
                            color="primary"
                            fullWidth
                            options={currencyOptions}
                            className={classes.currencySelect}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              </Box>

              <Box className={classes.formControl}>
                <Box mb={2.5}>
                  <Grid container alignItems="center">
                    <Grid item xs>
                      <InputLabel shrink className={classes.labelNoMargin}>
                        <Box display="flex" alignItems="center">
                          {t('publish-nft.label.reservePrice')}

                          <Tooltip
                            title={t('publish-nft.tooltip.reservePrice')}
                          >
                            <Box component="i" ml={1}>
                              <QuestionIcon />
                            </Box>
                          </Tooltip>
                        </Box>
                      </InputLabel>
                    </Grid>

                    <Grid item>
                      <Switch
                        checked={reservePriceChecked}
                        onChange={toggleReservePriceChecked}
                      />
                    </Grid>
                  </Grid>
                </Box>

                {reservePriceChecked && (
                  <Field
                    component={InputField}
                    name="reservePrice"
                    type="number"
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
                            className={classes.currencySelect}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
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
        <Box mb={6}>
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
                amount: '1',
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
            img={data.fileurl}
          />
        );
      }}
    </Queries>
  );
};
