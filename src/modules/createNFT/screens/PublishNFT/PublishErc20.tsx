import {
  Box,
  Button,
  Container,
  Typography,
} from '@material-ui/core';
import { Mutation, useDispatchRequest } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useWeb3React } from 'modules/account/hooks/useWeb3React';
import { getFtItemInfo } from 'modules/common/components/ProductCard/FtItemCard';
import { QueryLoading } from 'modules/common/components/QueryLoading/QueryLoading';
import { depositToken } from 'modules/createNFT/actions/depositToken';
import { publishToken } from 'modules/createNFT/actions/publishToken';
import { getFTAddress } from 'modules/createNFT/hooks/useCurrencies';
import { InputField } from 'modules/form/components/InputField';
import { FormErrors } from 'modules/form/utils/FormErrors';
import { t } from 'modules/i18n/utils/intl';
import { GoBack } from 'modules/layout/components/GoBack';
import { useIsSMDown } from 'modules/themes/useTheme';
import { Img } from 'modules/uiKit/Img';
import { Section } from 'modules/uiKit/Section';
import { BounceERC20 } from 'modules/web3/contracts';
import { useEffect, useState } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { useParams } from 'react-router';
import { usePublishErc20Styles } from './usePublishErc20Styles';


interface IDepositToken { }
interface IDepositTokenFormData {
  amount: string;
  uintPrice: string;
}

export const PublishErc20: React.FC<IDepositToken> = () => {
  const classes = usePublishErc20Styles();
  const isMobile = useIsSMDown();
  const { web3, address, chainId } = useWeb3React();
  const { id } = useParams<{
    id: string;
  }>();
  const itemInfo = getFtItemInfo(id)
  if(!itemInfo){
    console.error('not find contract')
  }
  const [tokenInfo, setTokenInfo] = useState({
    contractAddress: id,
    logo: itemInfo?.tokenImg,
    name: itemInfo?.name,
    balance: '0',
    decimals: itemInfo?.decimals ?? '18',
  });
  useEffect(() => {
    setTokenInfo({ ...tokenInfo, contractAddress: getFTAddress(chainId) })
    // eslint-disable-next-line
  }, [chainId, getFTAddress])
  const validateDeposit = (payload: IDepositTokenFormData) => {
    const errors: FormErrors<IDepositTokenFormData> = {};
    if (!payload.amount) {
      errors.amount = t('validation.required');
    }
    if (!payload.uintPrice) {
      errors.amount = t('validation.required');
    }
    if (Number(payload.amount) <= 0) {
      errors.amount = t('validation.required');
    }
    if (Number(payload.amount) > Number(tokenInfo.balance)) {
      errors.amount = 'insufficient of balance';
    }
    return errors;
  };

  const dispatch = useDispatchRequest();
  const handleSubmit = (payload: IDepositTokenFormData) => {
    console.log('handleSubmit', payload, tokenInfo);
    dispatch(
      publishToken({
        contract: tokenInfo.contractAddress,
        walletAddress: address,
        web3,
        amount: payload.amount,
        uintPrice: payload.uintPrice,
        decimals: tokenInfo.decimals,
      }),
    ).then(res => {
      console.log('handleSubmit res ----->', res);
      if (res.error) {
        return console.error('error', res);
      }
      console.log(res?.data)
    });
  };
  const [initialValues] = useState<IDepositTokenFormData>({
    amount: '0',
    uintPrice: '0',
  });

  // const count = useCount(7e3);
  const [tx] = useState('--');
  useEffect(() => {
    const getBalance = async () => {
      const ERC20Contract = new web3.eth.Contract(
        BounceERC20,
        tokenInfo.contractAddress,
      );
      const decimals = await ERC20Contract.methods.decimals().call();
      const tokenName = await ERC20Contract.methods.name().call();
      const balanceRes = await ERC20Contract.methods.balanceOf(address).call();
      const balance = new BigNumber(balanceRes).dividedBy(
        new BigNumber(10).pow(decimals),
      );
      // console.log('token balance---->', balance.toString(), decimals);
      setTokenInfo({
        ...tokenInfo,
        balance: balance.toString(),
        name: tokenName,
        decimals: decimals,
      });
    };
    if (address) {
      getBalance();
    }
    // eslint-disable-next-line
  }, [tokenInfo.contractAddress, address, tx /* count */]);
  const renderForm = ({
    handleSubmit,
    form,
  }: FormRenderProps<IDepositTokenFormData>) => {
    return (
      <Box component="form" onSubmit={handleSubmit} className={classes.form}>
        {/* <Box mb={2}>
          <Typography component="h2" style={{ fontWeight: 'bold' }}>
            Token
          </Typography>
        </Box>
        <Box
          mb={5}
          display="flex"
          alignItems="center"
          className={classes.tokenItem}
        >
          <Avatar className={classes.avatar} src={tokenInfo.logo} />
          <Typography>{tokenInfo.name}</Typography>
        </Box> */}
        <Box mb={2}>
          <Field
            component={InputField}
            name="amount"
            type="number"
            label={'Amount'}
            placeholder="Only integers can be entered"
            fullWidth={true}
            InputProps={{
              endAdornment: (
                <Button onClick={form.mutators.max} className={classes.maxBtn}>
                  MAX
                </Button>
              ),
            }}
          />
        </Box>
        <Box mb={5}>
          <Box display="flex" justifyContent="space-between">
            <span>Wallet Balance</span>
            <span>
              {tokenInfo.balance} {tokenInfo.name}
            </span>
          </Box>
        </Box>

        <Box mb={2}>
          <Field
            component={InputField}
            name="uintPrice"
            type="number"
            label={'Unit Price'}
            fullWidth={true}
            InputProps={{
              endAdornment: (
                <span>APE</span>
              ),
            }}
          />
        </Box>
        {/* <Box mb={2}>
          <Field
            component={InputField}
            name="salePrice"
            disable
            type="number"
            label={'Sale price'}
            placeholder="Only integers can be entered"
            fullWidth={true}
            InputProps={{
              endAdornment: (
                <span>APE</span>
              ),
            }}
          />
        </Box> */}

        <Box mb={1} mt={4} display="flex" justifyContent="space-between">
          <span>{t('publish-nft.royalty.platform-fee')}</span>
          <span>{`${new BigNumber(2).dp(2).toNumber()} %`}</span>
        </Box>
        <div className={classes.divLine}>
          <i></i>
        </div>
        <Box mt={1} mb={4} display="flex" justifyContent="space-between">
          <span>You will receive</span>
          <span>xx APE</span>
        </Box>

        <Box mb={2}>
          <Mutation type={depositToken.toString()}>
            {({ loading }) =>
              loading ? (
                <Button
                  startIcon={<QueryLoading size={16} />}
                  fullWidth
                  disabled
                  variant="outlined"
                >
                  Confirming
                </Button>
              ) : (
                <Button type="submit" fullWidth>
                  Confirm
                </Button>
              )
            }
          </Mutation>
        </Box>

      </Box>
    );
  };
  return (
    <Section>
      <Container maxWidth="lg">
        <Box mb={3.5}>
          <GoBack />
        </Box>
        <Box mb={3}>
          <Typography variant="h1">Put on sale</Typography>
        </Box>
        <Box display="flex">
          <Form
            onSubmit={handleSubmit}
            render={renderForm}
            validate={validateDeposit}
            initialValues={initialValues}
            mutators={{
              max(_, state, util) {
                util.changeValue(state, 'amount', oldValue => {
                  return parseInt(tokenInfo.balance);
                });
              },
            }}
          />
          {!isMobile && <Img
            className={classes.rightImg}
            src={itemInfo?.tokenImg}
            ratio="1x1"
            objectFit="scale-down"
          />}
        </Box>
      </Container>
    </Section>
  );
};