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
import { useCallback, useEffect } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { useRoyaltyDialogStyles } from './useRoyaltyDialogStyles';
import { ReactComponent as QuestionIcon } from '../../../common/assets/question.svg';
import { RoyaltyTable } from './RoyaltyTable';
import BigNumber from 'bignumber.js';
import { setRoyaltyContract } from 'modules/brand/components/RoyaltyDialog/action/setRoyaltyContract';
import { useAccount } from 'modules/account/hooks/useAccount';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import {
  fetchRoyaltyListByCollection,
  IRoyaltyListParams,
  IRoyaltyMapListRes,
} from 'modules/brand/components/RoyaltyDialog/action/fetchRoyaltyListByCollection';
import { getBlockChainExplorerAddress } from 'modules/common/conts';
import { ReactComponent as CheckIcon } from './assets/check.svg';
import { useState } from 'react';

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
  const { address, chainId } = useAccount();
  const dispatch = useDispatchRequest();
  const [showChangeTip, setShowChangeTip] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const readonly = false;
  useEffect(() => {
    if (!collection) return;

    const params: IRoyaltyListParams = {
      collection,
    };
    if (isOpen) dispatch(fetchRoyaltyListByCollection(params));
  }, [collection, dispatch, isOpen]);

  const { data: royaltyList } = useQuery<IRoyaltyMapListRes | null>({
    type: fetchRoyaltyListByCollection.toString(),
  });

  const [showRoyalty, setShowRoyalty] = useState('');

  const onSubmit = ({ royaltyRate }: { royaltyRate: string }) => {
    if (!royaltyRate || !address) return;
    setSubmitLoading(true);
    const payload = {
      collection: collection,
      receiverAddress: address,
      rate: new BigNumber(royaltyRate).div(100),
      successCallBack: () => {
        setShowChangeTip(true);
        setShowRoyalty(royaltyRate);
      },
    };
    dispatch(setRoyaltyContract(payload)).finally(() => {
      setSubmitLoading(false);
    });
  };

  const validateForm = useCallback(({ royaltyRate }: IBurnFormValues) => {
    const errors: FormErrors<IBurnFormValues> = {};

    if (!royaltyRate) {
      errors.royaltyRate = t('validation.required');
    } else if (+royaltyRate < MIN_RATE) {
      errors.royaltyRate = t('royalty.royalty-rate-error');
    } else if (MAX_RATE && +royaltyRate > MAX_RATE) {
      errors.royaltyRate = t('royalty.royalty-rate-error');
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
            loading={submitLoading}
            onClick={handleSubmit}
            variant="outlined"
          >
            {t('royalty.change')}
          </Button>
          {showChangeTip && collection && (
            <div className={classes.changeTip}>
              <CheckIcon />
              {t('royalty.royalty-change-tip')}
            </div>
          )}
        </Box>
      );
    },
    [classes, readonly, submitLoading, showChangeTip, collection],
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
        initialValues={{
          royaltyRate:
            showRoyalty || royaltyList?.currentratio.toString() || '0',
        }}
      />

      <div className={classes.desc}>
        <p>{t('royalty.royalty-desc')}</p>
      </div>

      <RoyaltyTable
        data={
          royaltyList?.list.map(item => {
            return {
              itemName: item.item,
              fileUrl: item.nfturl,
              quantity: item.quantity,
              ctime: item.ctime,
              category: item.category,
              price: item.price,
              fee: item.feeEarned,
              symbol: item.symbol,
              viewScan: `${getBlockChainExplorerAddress(chainId) as string}tx/${
                item.txid
              }`,
            };
          }) || []
        }
      />

      <IconButton onClick={onClose} className={classes.close}>
        <CloseIcon fontSize="large" />
      </IconButton>
    </Dialog>
  );
};
