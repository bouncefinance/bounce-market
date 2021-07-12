import { Box, Dialog, Grid, IconButton, Typography } from '@material-ui/core';
import classNames from 'classnames';
import { NftType } from 'modules/api/common/NftType';
import { AngleDownIcon } from 'modules/common/components/Icons/AngleDownIcon';
import { AngleUpIcon } from 'modules/common/components/Icons/AngleUpIcon';
import { CloseIcon } from 'modules/common/components/Icons/CloseIcon';
import { InputField } from 'modules/form/components/InputField';
import { FormErrors } from 'modules/form/utils/FormErrors';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'modules/uiKit/Button';
import { useCallback, useMemo } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { useBurnTokenDialogStyles } from './useBurnTokenDialogStyles';

const MIN_QUANTITY = 1;

export interface IBurnFormValues {
  quantity: number;
}

interface IBurnTokenDialogProps {
  loading: boolean;
  isOpen: boolean;
  standard: NftType;
  maxQuantity?: number;
  onClose: () => void;
  onSubmit: (value: IBurnFormValues, form: any, callback: any) => void;
}

export const BurnTokenDialog = ({
  loading,
  isOpen,
  standard,
  maxQuantity,
  onClose,
  onSubmit,
}: IBurnTokenDialogProps) => {
  const classes = useBurnTokenDialogStyles();

  const readonly = useMemo(() => standard === NftType.ERC721, [standard]);

  const validateForm = useCallback(
    ({ quantity }: IBurnFormValues) => {
      const errors: FormErrors<IBurnFormValues> = {};

      if (!quantity) {
        errors.quantity = t('validation.required');
      } else if (+quantity < MIN_QUANTITY) {
        errors.quantity = t('error.greater-than', { value: MIN_QUANTITY - 1 });
      } else if (maxQuantity && +quantity > maxQuantity) {
        errors.quantity = t('error.less-than', { value: +maxQuantity + 1 });
      }

      return errors;
    },
    [maxQuantity],
  );

  const renderForm = useCallback(
    ({ handleSubmit, values, form }: FormRenderProps<IBurnFormValues>) => {
      const isQuantityMinusDisabled = +values.quantity <= MIN_QUANTITY;

      return (
        <>
          <Box mb={5}>
            <Grid container spacing={3}>
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
          </Box>
          <Button
            fullWidth
            size="large"
            loading={loading}
            onClick={handleSubmit}
          >
            {t('burn-token.submit')}
          </Button>
        </>
      );
    },
    [classes, readonly, loading],
  );

  return (
    <Dialog open={isOpen}>
      <Typography variant="h2" className={classes.title}>
        {t('burn-token.title')}
      </Typography>
      <Form
        validate={validateForm}
        onSubmit={onSubmit}
        render={renderForm}
        initialValues={{ quantity: 1 }}
        mutators={{
          increaseQuantity: (_args, state, utils) => {
            utils.changeValue(state, 'quantity', oldValue => +oldValue + 1);
          },
          decreaseQuantity: (_args, state, utils) => {
            utils.changeValue(state, 'quantity', oldValue => +oldValue - 1);
          },
        }}
      />
      <IconButton onClick={onClose} className={classes.close}>
        <CloseIcon fontSize="large" />
      </IconButton>
    </Dialog>
  );
};
