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
import { RoyaltyTable } from './RoyaltyTable';
import BigNumber from 'bignumber.js';
import { setRoyaltyContract } from 'modules/common/actions/setRoyaltyContract';
import { useAccount } from 'modules/account/hooks/useAccount';
import { useDispatchRequest } from '@redux-requests/react';

const MIN_RATE = 0.1;
const MAX_RATE = 6.5;

export interface IBurnFormValues {
  royaltyRate: string;
}

interface IBurnTokenDialogProps {
  isOpen: boolean;
  onClose: () => void;
  collection: string;
}

export const RoyaltyDialog = ({
  isOpen,
  onClose,
  collection,
}: IBurnTokenDialogProps) => {
  const classes = useRoyaltyDialogStyles();
  const { address } = useAccount();
  const dispatch = useDispatchRequest();

  const readonly = false;
  const loading = false;
  const onSubmit = ({ royaltyRate }: { royaltyRate: string }) => {
    if (!royaltyRate || !address) return;
    const payload = {
      collection: collection,
      receiverAddress: address,
      rate: new BigNumber(royaltyRate).div(100),
    };
    dispatch(setRoyaltyContract(payload));
  };

  const validateForm = useCallback(({ royaltyRate }: IBurnFormValues) => {
    const errors: FormErrors<IBurnFormValues> = {};

    if (!royaltyRate) {
      errors.royaltyRate = t('validation.required');
    } else if (+royaltyRate < MIN_RATE) {
      errors.royaltyRate = t('error.greater-than', { value: MIN_RATE });
    } else if (MAX_RATE && +royaltyRate > MAX_RATE) {
      errors.royaltyRate = t('error.less-than', { value: +MAX_RATE });
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
              name="royaltyRate"
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
    <Dialog open={isOpen} maxWidth={'lg'}>
      <Typography variant="h2" className={classes.title}>
        {t('royalty.royalties')}
      </Typography>
      <Form
        validate={validateForm}
        onSubmit={onSubmit}
        render={renderForm}
        initialValues={{ royaltyRate: '0' }}
      />

      <div className={classes.desc}>
        <p>{t('royalty.royalty-desc')}</p>
      </div>

      <RoyaltyTable
        data={[
          {
            itemName: 'Exquisite Rare Portraits /10',
            fileUrl:
              'https://ap1-cfs3-media-bounce.bounce.finance/0df0ae4b4bab4f51832df8bef2d8d0f3-1627021511.png',
            quantity: '1',
            ctime: 1628567477281,
            category: 'image',
            price: new BigNumber(1000),
            fee: new BigNumber(15),
            symbol: 'BNB',
            viewScan: 'baidu.com',
          },
        ]}
      />

      <IconButton onClick={onClose} className={classes.close}>
        <CloseIcon fontSize="large" />
      </IconButton>
    </Dialog>
  );
};
