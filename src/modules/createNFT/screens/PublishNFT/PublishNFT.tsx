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
import { SelectTimeField } from '../../../form/components/SelectTimeField';
import { NftType } from 'modules/api/common/NftType';
import { Button } from 'modules/uiKit/Button';
import { Img } from 'modules/uiKit/Img';
import { Section } from 'modules/uiKit/Section';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { useHistory, useParams } from 'react-router';
import { useAccount } from '../../../account/hooks/useAccount';
import { AuctionType } from '../../../api/common/auctionType';
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
import { t } from '../../../i18n/utils/intl';
import { GoBack } from '../../../layout/components/GoBack';
import { fetchCurrency } from '../../../overview/actions/fetchCurrency';
import { ProfileRoutesConfig } from '../../../profile/ProfileRoutes';
import { fetchNftByUser } from '../../actions/fetchNftByUser';
import { publishNft } from '../../actions/publishNft';
import type { ISaleTime } from '../../actions/publishNft';
import { useCurrencies } from '../../hooks/useCurrencies';
import { usePublishNFTtyles } from './usePublishNFTtyles';
import {
  UserRoleEnum,
  UserRoleType,
} from 'modules/common/actions/queryAccountInfo';
import {
  fetchItemRoyalty,
  IItemRoyaltyRes,
} from 'modules/brand/components/RoyaltyDialog/action/fetchItemRoyalty';
import { NFTCategoryType } from 'modules/overview/actions/fetchItemsByFilter';

const MIN_AMOUNT = 1;
const MIN_INCREMENTAL_PART = 0.05;

interface IPublishFixedSwap {
  type: AuctionType.FixedSwap;
  price: string;
  quantity: string;
  unitContract: string;
  img?: string;
  saleTimeFS: ISaleTime;
}

interface IPublishEnglishAuction {
  type: AuctionType.EnglishAuction;
  minBid: string;
  purchasePrice: string;
  reservePrice: string;
  quantity: string;
  duration: Days;
  unitContract: string;
  saleTimeEA: ISaleTime;
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
  category: NFTCategoryType;
  file?: string;
  identity: UserRoleType;
  RoyaltyData: IItemRoyaltyRes | null;
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
  identity,
  RoyaltyData,
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

        if (purchasePriceChecked) {
          if (!purchasePrice) {
            errors.purchasePrice = t('validation.required');
          } else if (purchasePrice <= 0) {
            errors.purchasePrice = t('validation.min', { value: 0 });
          } else if (!reservePriceChecked && minBid >= purchasePrice) {
            errors.purchasePrice = t(
              'publish-nft.error.wrong-direct-bid-amount',
            );
          }
        }

        if (reservePriceChecked) {
          if (!reservePrice) {
            errors.reservePrice = t('validation.required');
          } else if (reservePrice <= 0) {
            errors.reservePrice = t('validation.min', { value: 0 });
          } else if (!purchasePriceChecked && minBid > reservePrice) {
            errors.purchasePrice = t(
              'publish-nft.error.wrong-reserve-bid-amount',
            );
          }
        }

        if (
          minBid &&
          purchasePriceChecked &&
          reservePriceChecked &&
          !(minBid <= reservePrice && reservePrice < purchasePrice)
        ) {
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
            saleTime: payload.saleTimeFS,
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
            purchasePrice: purchasePriceChecked ? payload.purchasePrice : '0',
            minBid: payload.minBid,
            minIncremental: new BigNumber(payload.minBid).multipliedBy(
              MIN_INCREMENTAL_PART,
            ),
            reservePrice: reservePriceChecked ? payload.reservePrice : '0',
            duration:
              process.env.REACT_APP_BASE_ENV === 'TEST'
                ? payload.duration * 60
                : payload.duration * 60 * 60 * 24,
            name,
            tokenContract,
            unitContract: payload.unitContract,
            standard: nftType,
            tokenId,
            quantity: +payload.quantity,
            saleTime: payload.saleTimeEA,
          }),
        ).then(({ error }) => {
          if (!error) {
            onPublish();
          }
        });
      }
    },
    [
      dispatch,
      name,
      nftType,
      onPublish,
      tokenContract,
      tokenId,
      purchasePriceChecked,
      reservePriceChecked,
    ],
  );

  const isVerify = identity === UserRoleEnum.Verified;
  const renderForm = ({
    handleSubmit,
    values,
  }: FormRenderProps<IPublishNFTFormData>) => {
    const currentCryptoCurrencyLabel = currencyOptions.find(
      o => o.value === values.unitContract,
    )?.label;

    const reciveValue =
      values.type === AuctionType.FixedSwap
        ? new BigNumber(values.price).multipliedBy(
            RoyaltyData?.remainingRatio || 1,
          )
        : undefined;

    const renderRoyalty = () => {
      return (
        <Box>
          <Grid container spacing={3} className={classes.royaltyWrapper}>
            <Grid item className={classes.royaltyItem}>
              <span>{t('publish-nft.royalty.platform-fee')}</span>
              <span>{`${RoyaltyData?.platformFee.dp(2).toNumber()} %`}</span>
            </Grid>
            <div className={classes.divLine}>
              <i></i>
            </div>

            <Grid item className={classes.royaltyItem}>
              <span>
                <Box display="flex" alignItems="center">
                  {t('publish-nft.royalty.royalty-fee')}

                  <Tooltip title={t('publish-nft.royalty.royalty-fee-tip')}>
                    <Box component="i" ml={1}>
                      <QuestionIcon />
                    </Box>
                  </Tooltip>
                </Box>
              </span>
              <span>{`${RoyaltyData?.royaltyFee.dp(2).toNumber()} %`}</span>
            </Grid>
            <div className={classes.divLine}>
              <i></i>
            </div>

            <Grid item className={classes.royaltyItem}>
              <span>
                {values.type === AuctionType.FixedSwap
                  ? t('publish-nft.royalty.receive-fs')
                  : t('publish-nft.royalty.receive-ea')}
              </span>
              {reciveValue && reciveValue.dp(6, 1).toNumber() ? (
                <span>
                  {reciveValue.dp(6, 1).toNumber()}
                  &nbsp;
                  {currentCryptoCurrencyLabel}
                  &nbsp;&nbsp;
                  <Queries<ResponseData<typeof fetchCurrency>>
                    requestActions={[fetchCurrency]}
                    requestKeys={[values.unitContract]}
                    noDataMessage={<></>}
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
                </span>
              ) : (
                '-'
              )}
            </Grid>
          </Grid>
        </Box>
      );
    };

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
            <Typography variant="h2" className={classes.textCenter}>
              {name}
            </Typography>
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

              {isVerify && (
                <Box className={classes.formControl}>
                  <Field
                    component={SelectTimeField}
                    name="saleTimeFS"
                    type="text"
                    label={t('create-nft.label.specific-time-sale')}
                    color="primary"
                    fullWidth={true}
                  />
                </Box>
              )}
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
                    value: add(
                      isVerify &&
                        values.saleTimeEA?.open &&
                        values.saleTimeEA?.time
                        ? values.saleTimeEA?.time
                        : new Date(),
                      {
                        days: +values.duration,
                      },
                    ),
                  })}
                </div>
              </Box>

              {isVerify && (
                <Box className={classes.formControl}>
                  <Field
                    component={SelectTimeField}
                    name="saleTimeEA"
                    type="text"
                    label={t('create-nft.label.specific-time-sale')}
                    color="primary"
                    fullWidth={true}
                  />
                </Box>
              )}

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

          {renderRoyalty()}

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
    dispatch(fetchItemRoyalty({ collection: contract, tokenId: id }));
  }, [address, contract, dispatch, id]);

  return (
    <Queries<
      ResponseData<typeof fetchItem>,
      ResponseData<typeof fetchNftByUser>,
      ResponseData<typeof fetchItemRoyalty>
    >
      requestActions={[fetchItem, fetchNftByUser, fetchItemRoyalty]}
    >
      {({ data }, { data: nftData }, { data: RoyaltyData }) => {
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
            identity={data.identity}
            RoyaltyData={RoyaltyData}
          />
        );
      }}
    </Queries>
  );
};
