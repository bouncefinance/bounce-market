import {
  Box,
  Dialog,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@material-ui/core';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { useAccount } from 'modules/account/hooks/useAccount';
import { AngleDownIcon } from 'modules/common/components/Icons/AngleDownIcon';
import { AngleUpIcon } from 'modules/common/components/Icons/AngleUpIcon';
import { CloseIcon } from 'modules/common/components/Icons/CloseIcon';
import { LayersIcon } from 'modules/common/components/Icons/LayersIcon';
import { ProfileInfo } from 'modules/common/components/ProfileInfo';
import { getTokenSymbol } from 'modules/common/conts';
import { InputField } from 'modules/form/components/InputField';
import { FormErrors } from 'modules/form/utils/FormErrors';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'modules/uiKit/Button';
import { Img } from 'modules/uiKit/Img';
import React, { useCallback } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { VideoPlayer } from '../../../common/components/VideoPlayer';
import { useBuyDialogStyles } from './useBuyDialogStyles';

const MIN_QUANTITY = 1;

interface IBuyFormValues {
  quantity: string;
  price?: string;
}

interface IBuyDialogProps {
  filepath: string;
  isOpen?: boolean;
  isOwnerVerified?: boolean;
  name: string;
  onClose?: () => void;
  onSubmit: (values: IBuyFormValues, form: any, callback: any) => void;
  owner: string;
  ownerAvatar?: string;
  readonly: boolean;
  category: 'image' | 'video';
  loading?: boolean;
  maxQuantity?: number;
  currentPrice: BigNumber;
  isPack?: boolean;
  isBlindBox?: boolean;
  soldData?: {
    notsaled: number;
    quantity: number;
  };
  isFinished?: boolean;
  onOk?: () => void;
  onView?: () => void;
}

export const BuyDialog = ({
  filepath,
  isOpen = false,
  isOwnerVerified = false,
  name,
  onClose,
  onSubmit,
  owner,
  ownerAvatar,
  readonly,
  category,
  loading,
  maxQuantity,
  currentPrice,
  isPack = false,
  isBlindBox = false,
  soldData,
  isFinished = false,
  onOk,
  onView,
}: IBuyDialogProps) => {
  const classes = useBuyDialogStyles();

  const { chainId } = useAccount();
  const validateForm = useCallback(
    ({ quantity }: IBuyFormValues) => {
      const errors: FormErrors<IBuyFormValues> = {};

      if (!quantity) {
        errors.quantity = t('validation.required');
      } else if (+quantity < MIN_QUANTITY) {
        errors.quantity = t('error.greater-than', { value: MIN_QUANTITY - 1 });
      } else if (maxQuantity && +quantity > maxQuantity) {
        errors.quantity = t('error.less-than', { value: maxQuantity + 1 });
      }

      return errors;
    },
    [maxQuantity],
  );

  const renderForm = useCallback(
    ({
      handleSubmit,
      values,
      form,
      submitting,
    }: FormRenderProps<IBuyFormValues>) => {
      const isQuantityMinusDisabled = +values.quantity <= MIN_QUANTITY;
      const showTotal = values.quantity
        ? !isPack
          ? currentPrice.multipliedBy(values.quantity).dp(4).toString()
          : currentPrice.dp(4).toString()
        : '-';
      return (
        <>
          <Box mb={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} className={classes.inputWrapper}>
                <Field
                  className={classes.priceInput}
                  component={InputField}
                  name="price"
                  type="number"
                  label={t('common.price')}
                  initialValue={currentPrice.toString()}
                  disabled
                />
                <Field
                  className={classes.quantityInput}
                  component={InputField}
                  name="quantity"
                  type="number"
                  label={t('common.quantity')}
                  parse={value => (value ? Math.round(+value) : 1)}
                  format={value => (value ? Math.round(+value) : 1)}
                  disabled={readonly}
                  inputProps={{
                    step: 1,
                    min: '0',
                    inputMode: 'decimal',
                  }}
                  InputProps={{
                    classes: { adornedEnd: classes.adornedEnd },
                    endAdornment: (
                      <div className={classes.spinBtns}>
                        <IconButton
                          className={classNames(
                            classes.spinBtn,
                            classes.spinBtnUp,
                          )}
                          onClick={form.mutators.increaseQuantity}
                          disabled={readonly}
                        >
                          <AngleUpIcon className={classes.spinBtnIcon} />
                        </IconButton>

                        <IconButton
                          className={classNames(
                            classes.spinBtn,
                            classes.spinBtnDown,
                          )}
                          disabled={readonly || isQuantityMinusDisabled}
                          onClick={form.mutators.decreaseQuantity}
                        >
                          <AngleDownIcon className={classes.spinBtnIcon} />
                        </IconButton>
                      </div>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} className={classes.totalWrapper}>
                <h5>{t('buy-dialog.total')}</h5>
                <h5>
                  {showTotal} {getTokenSymbol(chainId)}
                </h5>
              </Grid>
            </Grid>
          </Box>

          {isBlindBox ? (
            isFinished ? (
              <div className={classes.btnWrapper}>
                <Button
                  className={classNames('White', classes.okBtn)}
                  size="large"
                  onClick={onOk}
                  loading={loading}
                  disabled={submitting}
                >
                  {t('buy-dialog.ok')}
                </Button>

                <Button
                  className={classNames('Red-Violet', classes.viewBtn)}
                  size="large"
                  onClick={onView}
                  loading={loading}
                  disabled={submitting}
                >
                  {t('buy-dialog.view')}
                </Button>
              </div>
            ) : (
              <Button
                className="Red-Violet"
                fullWidth
                size="large"
                onClick={handleSubmit}
                loading={loading}
                disabled={submitting}
              >
                {t('buy-dialog.submit')}
              </Button>
            )
          ) : (
            <Button
              fullWidth
              size="large"
              onClick={handleSubmit}
              loading={loading}
              disabled={submitting}
            >
              {t('buy-dialog.submit')}
            </Button>
          )}
        </>
      );
    },
    [
      classes,
      loading,
      readonly,
      currentPrice,
      chainId,
      isPack,
      isBlindBox,
      isFinished,
      onOk,
      onView,
    ],
  );

  return (
    <Dialog
      fullWidth
      open={isOpen}
      onClose={onClose}
      classes={{
        paper: classes.root,
      }}
      PaperProps={{
        elevation: 0,
      }}
      maxWidth="md"
    >
      <Typography variant="h2" className={classes.title}>
        {isBlindBox ? t('buy-dialog.blind-title') : t('buy-dialog.title')}
      </Typography>

      <Box mb={5}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs="auto">
            {category === 'image' ? (
              <Img
                className={classes.imgWrap}
                src={filepath}
                size="small"
                ratio="1x1"
              />
            ) : (
              <VideoPlayer src={filepath} autoPlay />
            )}
          </Grid>

          <Grid item xs>
            <Typography variant="h3">{name}</Typography>
          </Grid>

          <Grid item xs={12} sm={4} md={3}>
            {isBlindBox ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <LayersIcon />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Tooltip
                  title={`Available for purchase/Total Supply`}
                  placement="top"
                >
                  <h3>
                    {' '}
                    {soldData?.notsaled || 0} / {soldData?.quantity || 0}
                  </h3>
                </Tooltip>
              </div>
            ) : (
              <ProfileInfo
                avatarSize="medium"
                subTitle={t('product-card.owner')}
                title={owner}
                users={[
                  {
                    name: owner,
                    avatar: ownerAvatar,
                    verified: isOwnerVerified,
                  },
                ]}
              />
            )}
          </Grid>
        </Grid>
      </Box>

      <Form
        onSubmit={onSubmit}
        render={renderForm}
        validate={validateForm}
        mutators={{
          increaseQuantity: (_args, state, utils) => {
            utils.changeValue(state, 'quantity', oldValue => {
              if (+oldValue <= (maxQuantity || 1) - 1) {
                return +oldValue + 1;
              }
              return oldValue;
            });
          },
          decreaseQuantity: (_args, state, utils) => {
            utils.changeValue(state, 'quantity', oldValue => +oldValue - 1);
          },
        }}
        initialValues={{
          quantity: maxQuantity ? maxQuantity.toString() : '1',
        }}
      />

      <IconButton onClick={onClose} className={classes.close}>
        <CloseIcon fontSize="large" />
      </IconButton>
    </Dialog>
  );
};
