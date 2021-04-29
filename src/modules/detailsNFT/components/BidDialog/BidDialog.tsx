import {
  Box,
  Button,
  Dialog,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { AngleDownIcon } from 'modules/common/components/Icons/AngleDownIcon';
import { AngleUpIcon } from 'modules/common/components/Icons/AngleUpIcon';
import { CloseIcon } from 'modules/common/components/Icons/CloseIcon';
import { ProfileInfo } from 'modules/common/components/ProfileInfo';
import { InputField } from 'modules/form/components/InputField';
import { FormErrors } from 'modules/form/utils/FormErrors';
import { t } from 'modules/i18n/utils/intl';
import { Img } from 'modules/uiKit/Img';
import React, { useCallback } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { useBidDialogStyles } from './useBidDialogStyles';

const MIN_QUANTITY = 1;
const MIN_BID = 0.5;

interface IBidFormValues {
  bid: string;
  quantity: string;
}

const validateForm = ({ bid, quantity }: IBidFormValues) => {
  const errors: FormErrors<IBidFormValues> = {};
  const currentBid = new BigNumber(bid);
  const minBid = new BigNumber(MIN_BID);

  if (!bid) {
    errors.bid = t('validation.required');
  } else if (currentBid.isLessThan(minBid)) {
    errors.bid = t('validation.min', {
      value: MIN_BID,
    });
  }

  if (!quantity) {
    errors.quantity = t('validation.required');
  } else if (+quantity < MIN_QUANTITY) {
    errors.quantity = `It must be grater than ${MIN_QUANTITY - 1}`;
  }

  return errors;
};

interface IBidDialogProps {
  currency?: string;
  img: string;
  isOpen?: boolean;
  isOwnerVerified?: boolean;
  name: string;
  onClose?: () => void;
  onSubmit: (values: IBidFormValues, form: any, callback: any) => void;
  owner: string;
  ownerAvatar: string;
}

export const BidDialog = ({
  currency = 'ETH',
  img,
  isOpen = false,
  isOwnerVerified = false,
  name,
  onClose,
  onSubmit,
  owner,
  ownerAvatar,
}: IBidDialogProps) => {
  const classes = useBidDialogStyles();

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
                  label="Your bid"
                  size="medium"
                  placeholder="Enter a Bid"
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
                  label="Quantity"
                  parse={value => value && Math.round(+value)}
                  format={value => (value ? Math.round(+value) : '')}
                  InputProps={{
                    endAdornment: (
                      <div className={classes.spinBtns}>
                        <IconButton
                          className={classes.spinBtn}
                          onClick={form.mutators.increaseQuantity}
                        >
                          <AngleUpIcon className={classes.spinBtnIcon} />
                        </IconButton>

                        <IconButton
                          className={classes.spinBtn}
                          disabled={isQuantityMinusDisabled}
                          onClick={form.mutators.decreaseQuantity}
                        >
                          <AngleDownIcon className={classes.spinBtnIcon} />
                        </IconButton>
                      </div>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Box>

          <Box mb={5}>
            <Typography color="textSecondary">
              {t('details-nft.dialog.input-info', {
                currency,
                value: MIN_BID,
              })}
            </Typography>
          </Box>

          <Button fullWidth size="large" onClick={handleSubmit}>
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
    [classes, currency],
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
        {t('details-nft.place-a-bid')}
      </Typography>

      <Box mb={5}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs="auto">
            <Img className={classes.imgWrap} src={img} ratio="1x1" />
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
          quantity: '1',
        }}
      />

      <IconButton onClick={onClose} className={classes.close}>
        <CloseIcon fontSize="large" />
      </IconButton>
    </Dialog>
  );
};
