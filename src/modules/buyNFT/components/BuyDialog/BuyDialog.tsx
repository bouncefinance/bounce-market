import {
  Box,
  Button,
  Dialog,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
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
import { VideoPlayer } from '../../../common/components/VideoPlayer';
import { useBuyDialogStyles } from './useBuyDialogStyles';

const MIN_QUANTITY = 1;

interface IBuyFormValues {
  quantity: string;
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
  disabled?: boolean;
  maxQuantity?: number;
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
  disabled,
  maxQuantity,
}: IBuyDialogProps) => {
  const classes = useBuyDialogStyles();

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
    ({ handleSubmit, values, form }: FormRenderProps<IBuyFormValues>) => {
      const isQuantityMinusDisabled = +values.quantity <= MIN_QUANTITY;

      return (
        <>
          <Box mb={2}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Field
                  fullWidth
                  component={InputField}
                  name="quantity"
                  type="number"
                  label="Quantity"
                  parse={value => (value ? Math.round(+value) : 1)}
                  format={value => (value ? Math.round(+value) : 1)}
                  disabled={readonly}
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
            </Grid>
          </Box>

          <Button
            fullWidth
            size="large"
            onClick={handleSubmit}
            disabled={disabled}
          >
            {t('buy-dialog.submit')}
          </Button>
        </>
      );
    },
    [classes, disabled, readonly],
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
        {t('buy-dialog.title')}
      </Typography>

      <Box mb={5}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs="auto">
            {category === 'image' ? (
              <Img className={classes.imgWrap} src={filepath} ratio="1x1" />
            ) : (
              <VideoPlayer src={filepath} />
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
          quantity: '1',
        }}
      />

      <IconButton onClick={onClose} className={classes.close}>
        <CloseIcon fontSize="large" />
      </IconButton>
    </Dialog>
  );
};
