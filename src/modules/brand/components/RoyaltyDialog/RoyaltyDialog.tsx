import {
  Box,
  Dialog,
  IconButton,
  InputAdornment,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { CloseIcon } from 'modules/common/components/Icons/CloseIcon';
import { InputField } from 'modules/form/components/InputField';
import { FormErrors } from 'modules/form/utils/FormErrors';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'modules/uiKit/Button';
import { useCallback } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { useRoyaltyDialogStyles } from './useRoyaltyDialogStyles';
import { ReactComponent as QuestionIcon } from '../../../common/assets/question.svg';

const MIN_RATE = 1;
const MAX_RATE = 10;

export interface IBurnFormValues {
  rotaltyRate: string;
}

interface IBurnTokenDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoyaltyDialog = ({ isOpen, onClose }: IBurnTokenDialogProps) => {
  const classes = useRoyaltyDialogStyles();

  const readonly = false;
  const loading = false;
  const onSubmit = () => {
    // alert(45656)
  };

  const validateForm = useCallback(({ rotaltyRate }: IBurnFormValues) => {
    console.log(rotaltyRate);
    const errors: FormErrors<IBurnFormValues> = {};

    if (!rotaltyRate) {
      errors.rotaltyRate = t('validation.required');
    } else if (+rotaltyRate < MIN_RATE) {
      errors.rotaltyRate = t('error.greater-than', { value: MIN_RATE - 1 });
    } else if (MAX_RATE && +rotaltyRate > MAX_RATE) {
      errors.rotaltyRate = t('error.less-than', { value: +MAX_RATE + 1 });
    }

    return errors;
  }, []);

  const renderForm = useCallback(
    ({ handleSubmit, values, form }: FormRenderProps<IBurnFormValues>) => {
      return (
        <Box mb={5} className={classes.royaltyRate}>
          <div>
            <Field
              component={InputField}
              name="rotaltyRate"
              type="number"
              label={
                <Box display="flex" alignItems="center">
                  {t('royalty.royalty-rate')}
                  <Tooltip title={t('royalty.royalty-rate-tip')}>
                    <Box component="i" ml={1}>
                      <QuestionIcon />
                    </Box>
                  </Tooltip>
                </Box>
              }
              InputProps={{
                classes: { adornedEnd: classes.adornedEnd },
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
              parse={value => (value ? value.substr(0, 5) : value)}
              disabled={readonly}
              className={classes.input}
            />
          </div>
          <Button
            size="large"
            loading={loading}
            onClick={handleSubmit}
            variant="outlined"
          >
            {t('royalty.change')}
          </Button>
        </Box>
      );
    },
    [classes, readonly, loading],
  );

  return (
    <Dialog open={isOpen}>
      <Typography variant="h2" className={classes.title}>
        {t('royalty.royalties')}
      </Typography>
      <Form
        validate={validateForm}
        onSubmit={onSubmit}
        render={renderForm}
        initialValues={{ rotaltyRate: '0' }}
      />
      <IconButton onClick={onClose} className={classes.close}>
        <CloseIcon fontSize="large" />
      </IconButton>
    </Dialog>
  );
};
