import {
  Box,
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
import { Button } from 'modules/uiKit/Button';
import { Img } from 'modules/uiKit/Img';
import { Section } from 'modules/uiKit/Section';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { useHistory, useParams } from 'react-router';
import { useAccount } from '../../../account/hooks/useAccount';
import { fetchItem } from '../../../buyNFT/actions/fetchItem';
import { ReactComponent as QuestionIcon } from '../../../common/assets/question.svg';
import { Queries } from '../../../common/components/Queries/Queries';
import { VideoPlayer } from '../../../common/components/VideoPlayer';
import { ResponseData } from '../../../common/types/ResponseData';
import { Address, Days } from '../../../common/types/unit';
import { ButtonGroupField } from '../../../form/components/ButtonGroupField/ButtonGroupField';
import { InputField } from '../../../form/components/InputField';
import { SelectField } from '../../../form/components/SelectField';
import { FormErrors } from '../../../form/utils/FormErrors';
import { OnChange } from '../../../form/utils/OnChange';
import { t, tHTML } from '../../../i18n/utils/intl';
import { GoBack } from '../../../layout/components/GoBack';
import { fetchCurrency } from '../../../overview/actions/fetchCurrency';
import { AuctionType } from '../../../overview/api/auctionType';
import { ProfileRoutesConfig } from '../../../profile/ProfileRoutes';
import { NftType } from '../../actions/createNft';
import { fetchNftByUser } from '../../actions/fetchNftByUser';
import { publishNft } from '../../actions/publishNft';
import { useCurrencies } from '../../hooks/useCurrencies';
import { usePublishNFTtyles } from './usePublishNFTtyles';

const ENABLE_DIRECT_AND_RESERVE_AS_REQUIRED = true;

const MIN_AMOUNT = 1;
const MIN_INCREMENTAL_PART = 0.05;

const FEE_PERCENTAGE = 1;

interface IPublishFixedSwap {
  type: AuctionType.FixedSwap;
  price: string;
  quantity: string;
  unitContract: string;
  img?: string;
}

interface IPublishEnglishAuction {
  type: AuctionType.EnglishAuction;
  minBid: string;
  purchasePrice: string;
  reservePrice: string;
  quantity: string;
  duration: Days;
  unitContract: string;
}

type IPublishNFTFormData = IPublishFixedSwap | IPublishEnglishAuction;

const formatAmount = (value: string) => (value ? `${Math.round(+value)}` : '1');

interface IPublishNFTComponentProps {
  name: string;
  tokenContract: string;
  nftType: NftType;
  tokenId: number;
  maxQuantity: number;
  onPublish: () => void;
  category: 'image' | 'video';
  file?: string;
}

export const PublishNFTComponent = ({
  name,
  tokenContract,
  nftType,
  tokenId,
  maxQuantity,
  onPublish,
  category,
  file,
}: IPublishNFTComponentProps) => {
  const classes = usePublishNFTtyles();
  const dispatch = useDispatchRequest();
  const theme = useTheme();
  const [purchasePriceChecked, setPurchasePriceChecked] = useState(true);
  const [reservePriceChecked, setReservePriceChecked] = useState(true);

  const togglePurchasePriceChecked = useCallback(() => {
    setPurchasePriceChecked(prev => !prev);
  }, []);

  const toggleReservePriceChecked = useCallback(() => {
    setReservePriceChecked(prev => !prev);
  }, []);

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

  const handleUnitChange = useCallback(
    (value: Address) => {
      dispatch(fetchCurrency({ unitContract: value }));
    },
    [dispatch],
  );

  const validateCreateNFT = useCallback(
    (payload: IPublishNFTFormData) => {
      const errors: FormErrors<IPublishNFTFormData> = {};
      const quantity = +payload.quantity;

      if (!quantity) {
        errors.quantity = t('validation.required');
      } else if (quantity < MIN_AMOUNT) {
        errors.quantity = t('validation.min', { value: MIN_AMOUNT });
      } else if (quantity > maxQuantity) {
        errors.quantity = t('validation.max', { value: maxQuantity });
      }

      if (payload.type === AuctionType.FixedSwap) {
        const price = +payload.price;
        if (!price) {
          errors.price = t('validation.required');
        } else if (price <= 0) {
          errors.price = t('validation.min', { value: 0 });
        }
      } else {
        const minBid = +payload.minBid;
        const purchasePrice = +payload.purchasePrice;
        const reservePrice = +payload.reservePrice;
        if (!minBid) {
          errors.minBid = t('validation.required');
        } else if (minBid <= 0) {
          errors.minBid = t('validation.min', { value: 0 });
        }

        if (purchasePriceChecked || ENABLE_DIRECT_AND_RESERVE_AS_REQUIRED) {
          if (!purchasePrice) {
            errors.purchasePrice = t('validation.required');
          } else if (purchasePrice <= 0) {
            errors.purchasePrice = t('validation.min', { value: 0 });
          }
        }

        if (reservePriceChecked || ENABLE_DIRECT_AND_RESERVE_AS_REQUIRED) {
          if (!reservePrice) {
            errors.reservePrice = t('validation.required');
          } else if (reservePrice <= 0) {
            errors.reservePrice = t('validation.min', { value: 0 });
          }
        }

        if (!(minBid <= reservePrice && reservePrice <= purchasePrice)) {
          errors.minBid = t(
            'publish-nft.error.wrong-direct-reserve-bid-amount',
          );
        }
      }

      return errors;
    },
    [maxQuantity, purchasePriceChecked, reservePriceChecked],
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
            standard: nftType,
            tokenId,
            price: new BigNumber(payload.price),
            quantity: +payload.quantity,
          }),
        ).then(({ error }) => {
          if (!error) {
            onPublish();
          }
        });
      } else {
        dispatch(
          publishNft({
            type: payload.type,
            purchasePrice: payload.purchasePrice,
            minBid: payload.minBid,
            minIncremental: new BigNumber(payload.minBid).multipliedBy(
              MIN_INCREMENTAL_PART,
            ),
            reservePrice: payload.reservePrice,
            duration: payload.duration * 60 * 60 * 24,
            // duration: 60 * 60 * 1,
            name,
            tokenContract,
            unitContract: payload.unitContract,
            standard: nftType,
            tokenId,
            quantity: +payload.quantity,
          }),
        ).then(({ error }) => {
          if (!error) {
            onPublish();
          }
        });
      }
    },
    [dispatch, name, nftType, onPublish, tokenContract, tokenId],
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
        <OnChange name="unitContract">{handleUnitChange}</OnChange>
        <div className={classes.formImgCol}>
          {file && (
            <Paper className={classes.formImgBox} variant="outlined">
              {category === 'image' ? (
                <Img
                  src={file}
                  alt={name}
                  title={name}
                  ratio="1x1"
                  objectFit="scale-down"
                />
              ) : (
                <VideoPlayer src={file} objectFit="cover" />
              )}
            </Paper>
          )}

          <Box mt={2}>
            <Typography variant="h2">{name}</Typography>
          </Box>
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
                  label={t('publish-nft.label.price')}
                  color="primary"
                  fullWidth
                  inputProps={{
                    step: 'any',
                    min: '0',
                    inputMode: 'decimal',
                  }}
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
                        {tHTML('publish-nft.receive', {
                          value: reciveValue?.decimalPlaces(6).toFormat(),
                          unit: currentCryptoCurrencyLabel,
                        })}{' '}
                        <Queries<ResponseData<typeof fetchCurrency>>
                          requestActions={[fetchCurrency]}
                          requestKeys={[values.unitContract]}
                        >
                          {({ data }) => (
                            <Box
                              component="span"
                              color={theme.palette.text.secondary}
                            >
                              {t('unit.$-value', {
                                value: reciveValue
                                  ?.multipliedBy(data.priceUsd)
                                  .decimalPlaces(2)
                                  .toFormat(),
                              })}
                            </Box>
                          )}
                        </Queries>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              </Box>
              <Box className={classes.formControl}>
                <Field
                  component={InputField}
                  name="quantity"
                  type="number"
                  label={t('publish-nft.label.amount')}
                  color="primary"
                  fullWidth={true}
                  parse={formatAmount}
                  format={formatAmount}
                  disabled={nftType === NftType.ERC721}
                  inputProps={{
                    step: 1,
                    min: '0',
                    inputMode: 'decimal',
                  }}
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
                  inputProps={{
                    step: 'any',
                    min: '0',
                    inputMode: 'decimal',
                  }}
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
                  name="quantity"
                  type="number"
                  label={t('publish-nft.label.amount')}
                  color="primary"
                  fullWidth={true}
                  disabled={nftType === NftType.ERC721}
                  inputProps={{
                    step: 1,
                    min: '0',
                    inputMode: 'decimal',
                  }}
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
                    inputProps={{
                      step: 'any',
                      min: '0',
                      inputMode: 'decimal',
                    }}
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
                    inputProps={{
                      step: 'any',
                      min: '0',
                      inputMode: 'decimal',
                    }}
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
                <Button size="large" type="submit" fullWidth loading={loading}>
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
                quantity: maxQuantity.toString(),
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
  const { replace } = useHistory();
  const id = parseInt(idParam, 10);

  const handlePublish = useCallback(() => {
    replace(ProfileRoutesConfig.UserProfile.generatePath());
  }, [replace]);
  const { address } = useAccount();

  useEffect(() => {
    dispatch(fetchItem({ contract, id }));
    dispatch(fetchNftByUser({ userId: address }));
  }, [address, contract, dispatch, id]);

  return (
    <Queries<
      ResponseData<typeof fetchItem>,
      ResponseData<typeof fetchNftByUser>
    >
      requestActions={[fetchItem, fetchNftByUser]}
    >
      {({ data }, { data: nftData }) => {
        const nfts = [...(nftData.nfts721 ?? []), ...(nftData.nfts1155 ?? [])];
        const maxQuantity =
          nfts.find(item => item.tokenId === id)?.balance ?? 0;

        return (
          <PublishNFTComponent
            name={data.itemName}
            tokenContract={data.contractAddress}
            nftType={data.standard}
            tokenId={data.id}
            file={data.fileUrl}
            category={data.category}
            maxQuantity={maxQuantity}
            onPublish={handlePublish}
          />
        );
      }}
    </Queries>
  );
};
