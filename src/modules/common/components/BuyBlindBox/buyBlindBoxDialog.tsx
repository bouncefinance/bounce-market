import {
  Box,
  Dialog,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Mutation, useDispatchRequest } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useWeb3React } from 'modules/account/hooks/useWeb3React';
import { buyBlindBox, IBlindBoxItem } from 'modules/drops/actions/blindBox';
import { InputField } from 'modules/form/components/InputField';
import { FormErrors } from 'modules/form/utils/FormErrors';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'modules/uiKit/Button';
import { Img } from 'modules/uiKit/Img';
import { ModalCloseBtn } from 'modules/uiKit/ModalCloseBtn';
import { useState } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { getSymbolName } from '../Icons/Chains';
import { LayersIcon } from '../Icons/LayersIcon';
import { useBlindBoxDialogStyles } from './useBuyBlindBoxDialogStyles';

export interface IBuyCoinFormData {
  quantity: string;
  price: string;
}
export const BuyBlindBoxDialog = ({
  isOpen,
  onClose,
  setIsSuccessOpen,
  item,
  swapNum,
}: {
  isOpen: boolean;
  onClose: () => void;
  setIsSuccessOpen: (val: boolean) => void;
  item: IBlindBoxItem;
  swapNum: string;
}) => {
  const able =
    swapNum === '-'
      ? '-'
      : new BigNumber(item.total_supply).minus(swapNum || '0').toNumber();
  const classes = useBlindBoxDialogStyles();
  const { chainId } = useWeb3React();
  const dispatch = useDispatchRequest();
  const chainIdSymbol = getSymbolName(chainId);
  const handleSubmit = async (payload: IBuyCoinFormData) => {
    console.log('handleSubmit', payload);
    try {
      dispatch(buyBlindBox(payload, item.phase_id)).then(({ error }: any) => {
        if (!error) {
          console.log('success');
          onClose();
          setIsSuccessOpen(true);
          // push(ProfileRoutesConfig.UserProfile.generatePath());
        }
      });
    } catch (error) {}
  };
  const validate = (payload: IBuyCoinFormData) => {
    const errors: FormErrors<IBuyCoinFormData> = {};
    if (!payload.price) {
      errors.price = t('validation.required');
    }
    if (Number(payload.price) <= 0) {
      errors.price = t('validation.required');
    }
    if (!payload.quantity) {
      errors.quantity = t('validation.required');
    }
    if (Number(payload.quantity) <= 0) {
      errors.quantity = t('validation.required');
    }
    return errors;
  };
  const [initialValues] = useState<IBuyCoinFormData>({
    quantity: '1',
    price: new BigNumber(item?.price).dividedBy(100).dp(2).toString(),
  });
  const renderForm = ({
    handleSubmit,
    form,
  }: FormRenderProps<IBuyCoinFormData>) => {
    return (
      <Box
        mt={4}
        component="form"
        onSubmit={handleSubmit}
        className={classes.form}
      >
        <Box display="flex" mb={2}>
          <Box flex={1} mb={2}>
            <Field
              component={InputField}
              name="price"
              defaultValue={new BigNumber(item?.price)
                .dividedBy(100)
                .dp(2)
                .toString()}
              type="number"
              label={'Price'}
              fullWidth={true}
              disabled
            />
          </Box>
          {false && (
            <Box ml={2} mb={2} width={150}>
              <Field
                component={InputField}
                name="quantity"
                type="number"
                label={'Quantity'}
                fullWidth={true}
              />
            </Box>
          )}
        </Box>

        {false && (
          <Box mb={4} display="flex" justifyContent="space-between">
            <Typography>Total</Typography>
            <Typography>
              {new BigNumber(form?.getFieldState('quantity')?.value ?? '0')
                .multipliedBy(
                  new BigNumber(item?.price).dividedBy(100).dp(2).toString() ??
                    '0',
                )
                .toFixed(2)}{' '}
              {chainIdSymbol}
            </Typography>
          </Box>
        )}
        <Mutation type={buyBlindBox.toString()} action={buyBlindBox}>
          {({ loading }) => {
            return (
              <Button
                disabled={able.toString() === (item?.total_supply).toString()}
                loading={loading}
                type="submit"
                fullWidth
              >
                DRAW
              </Button>
            );
          }}
        </Mutation>
      </Box>
    );
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
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
        <Box mb={5} mt={5} className={classes.dialogHead}>
          <Typography variant="h2" className={classes.title}>
            Confirm
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Box mr={2}>
              <Img className={classes.leftImg} src={item?.cover_url} />
            </Box>
            <Box flex={1}>
              <Typography variant={isMobile ? 'h2' : 'h1'}>
                {item?.name}
              </Typography>
            </Box>
          </Box>
          <div>
            <Box mt={7} mb={isMobile ? 2 : 4} display="flex">
              <LayersIcon className={classes.icon} />
              <Tooltip
                title={`Available for purchase/Total Supply`}
                arrow
                placement="top"
              >
                <Typography className={classes.soldNumber}>
                  &nbsp;&nbsp; {able} / {item?.total_supply}
                </Typography>
              </Tooltip>
            </Box>
          </div>
        </Box>
        <Form
          onSubmit={handleSubmit}
          render={renderForm}
          validate={validate}
          initialValues={initialValues}
        />
        <ModalCloseBtn onClick={onClose} />
      </Dialog>
    </>
  );
};
