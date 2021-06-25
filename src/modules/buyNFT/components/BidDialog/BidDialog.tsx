import { Box, Dialog, Grid, IconButton, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { AngleDownIcon } from 'modules/common/components/Icons/AngleDownIcon';
import { AngleUpIcon } from 'modules/common/components/Icons/AngleUpIcon';
import { ProfileInfo } from 'modules/common/components/ProfileInfo';
import { InputField } from 'modules/form/components/InputField';
import { FormErrors } from 'modules/form/utils/FormErrors';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'modules/uiKit/Button';
import { Img } from 'modules/uiKit/Img';
import { ModalCloseBtn } from 'modules/uiKit/ModalCloseBtn';
import React, { useCallback } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { VideoPlayer } from '../../../common/components/VideoPlayer';
import { useBidDialogStyles } from './useBidDialogStyles';

const MIN_QUANTITY = 1;

interface IBidFormValues {
  bid: string;
  quantity: string;
}

interface IBidDialogProps {
  currency?: string;
  filepath: string;
  isOpen?: boolean;
  isOwnerVerified?: boolean;
  name: string;
  onClose?: () => void;
  onSubmit: (values: IBidFormValues, form: any, callback: any) => void;
  owner: string;
  ownerAvatar?: string;
  category: 'image' | 'video';
  loading: boolean;
  maxQuantity: number;
  minIncrease: BigNumber;
  lastestBidAmount: BigNumber;
}

export const BidDialog = ({
  currency = '',
  filepath,
  isOpen = false,
  isOwnerVerified = false,
  name,
  onClose,
  onSubmit,
  owner,
  ownerAvatar,
  category,
  loading,
  maxQuantity,
  minIncrease,
  lastestBidAmount,
}: IBidDialogProps) => {
  const classes = useBidDialogStyles();

  const validateForm = useCallback(
    ({ bid, quantity }: IBidFormValues) => {
      const errors: FormErrors<IBidFormValues> = {};
      const currentBid = new BigNumber(bid);
      const minBid = lastestBidAmount.plus(minIncrease);

      if (!bid) {
        errors.bid = t('validation.required');
      } else if (currentBid.isLessThan(minBid)) {
        errors.bid = t('validation.min', {
          value: minBid.toFormat(),
        });
      }

      if (!quantity) {
        errors.quantity = t('validation.required');
      } else if (+quantity < MIN_QUANTITY) {
        errors.quantity = t('error.greater-than', { value: MIN_QUANTITY - 1 });
      } else if (maxQuantity && +quantity > maxQuantity) {
        errors.quantity = t('error.less-than', { value: maxQuantity + 1 });
      }

      return errors;
    },
    [lastestBidAmount, maxQuantity, minIncrease],
  );

  const renderForm = useCallback(
    ({ handleSubmit, values, form }: FormRenderProps<IBidFormValues>) => {
      const isQuantityMinusDisabled = +values.quantity <= MIN_QUANTITY;

      return (
        <>
          <Box mb={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm>
                <Field
                  fullWidth
                  className={classes.inputWithoutSpin}
                  component={InputField}
                  name="bid"
                  type="number"
                  label={t('details-nft.your-bid')}
                  size="medium"
                  placeholder={t('details-nft.enter-a-bid')}
                  inputProps={{
                    step: 'any',
                    min: '0',
                    inputMode: 'decimal',
                  }}
                  InputProps={{
                    endAdornment: (
                      <b className={classes.currency}>{currency}</b>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} sm="auto">
                <Field
                  fullWidth
                  className={classNames(
                    classes.inputNumber,
                    classes.inputWithoutSpin,
                  )}
                  component={InputField}
                  name="quantity"
                  type="number"
                  label={t('common.quantity')}
                  parse={value => (value ? Math.round(+value) : 1)}
                  format={value => (value ? Math.round(+value) : 1)}
                  inputProps={{
                    step: 1,
                    min: '0',
                    inputMode: 'decimal',
                  }}
                  InputProps={{
                    endAdornment: (
                      <div className={classes.spinBtns}>
                        <IconButton
                          className={classNames(
                            classes.spinBtn,
                            classes.spinBtnUp,
                          )}
                          onClick={form.mutators.increaseQuantity}
                          disabled={true}
                        >
                          <AngleUpIcon className={classes.spinBtnIcon} />
                        </IconButton>

                        <IconButton
                          className={classNames(
                            classes.spinBtn,
                            classes.spinBtnDown,
                          )}
                          disabled={true || isQuantityMinusDisabled} // TODO: Remove isQuantityMinusDisabled
                          onClick={form.mutators.decreaseQuantity}
                        >
                          <AngleDownIcon className={classes.spinBtnIcon} />
                        </IconButton>
                      </div>
                    ),
                  }}
                  disabled={true}
                />
              </Grid>
            </Grid>
          </Box>

          <Box mb={5}>
            <Typography color="textSecondary">
              {t('details-nft.dialog.input-info', {
                currency,
                value: minIncrease.toFormat(),
              })}
            </Typography>
          </Box>

          <Button
            fullWidth
            size="large"
            onClick={handleSubmit}
            loading={loading}
          >
            {t('details-nft.place-a-bid')}
          </Button>

          <Box mt={3} textAlign="center">
            <Typography color="textSecondary">
              {t('details-nft.dialog.footnote')}
            </Typography>
          </Box>
        </>
      );
    },
    [classes, currency, loading, minIncrease],
  );

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      classes={{
        paper: classes.root,
      }}
    >
      <Typography variant="h2" className={classes.title}>
        {t('details-nft.place-a-bid')}
      </Typography>

      <Box mb={5}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs="auto">
            {category === 'image' ? (
              <Img className={classes.imgWrap} src={filepath} ratio="1x1" />
            ) : (
              <VideoPlayer src={filepath} autoPlay />
            )}
          </Grid>

          <Grid item xs>
            <Typography variant="h3">{name}</Typography>
          </Grid>

          <Grid item xs={12} sm={4} md={3}>
            <ProfileInfo
              avatarSize="medium"
              subTitle="Owner"
              title={owner}
              users={[
                {
                  name: owner,
                  avatar: ownerAvatar,
                  verified: isOwnerVerified,
                },
              ]}
            />
          </Grid>
        </Grid>
      </Box>

      <Form
        onSubmit={onSubmit}
        render={renderForm}
        validate={validateForm}
        mutators={{
          increaseQuantity: (_args, state, utils) => {
            utils.changeValue(state, 'quantity', oldValue => +oldValue + 1);
          },
          decreaseQuantity: (_args, state, utils) => {
            utils.changeValue(state, 'quantity', oldValue => +oldValue - 1);
          },
        }}
        initialValues={{
          quantity: maxQuantity.toString(),
        }}
      />

      <ModalCloseBtn onClick={onClose} />
    </Dialog>
  );
};
