import {
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  Typography,
} from '@material-ui/core';
import { Mutation, useDispatchRequest } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useWeb3React } from 'modules/account/hooks/useWeb3React';
import { QueryLoading } from 'modules/common/components/QueryLoading/QueryLoading';
import { getBlockChainExplorerAddress } from 'modules/common/conts';
// import { useCount } from 'modules/common/hooks/useTimer';
import { depositToken } from 'modules/createNFT/actions/depositToken';
import { getFTAddress } from 'modules/createNFT/hooks/useCurrencies';
import { InputField } from 'modules/form/components/InputField';
import { FormErrors } from 'modules/form/utils/FormErrors';
import { t } from 'modules/i18n/utils/intl';
import { GoBack } from 'modules/layout/components/GoBack';
import { Section } from 'modules/uiKit/Section';
import { BounceERC20 } from 'modules/web3/contracts';
import { useEffect, useState } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { useDepositStyles } from './useDepositToken';

interface IDepositToken {}
interface IDepositTokenFormData {
  amount: string;
}

export const DepositToken: React.FC<IDepositToken> = () => {
  const classes = useDepositStyles();
  const { web3, address, chainId } = useWeb3React();
  const blockChainScan = getBlockChainExplorerAddress(chainId);
  const [tokenInfo, setTokenInfo] = useState({
    // contractAddress: '0xE9EB9E2E6a03f7a78a6Cf75B15c42c8954CCD200', // FT rinkeby
    // contractAddress: '0xc3Af90A5b9DB6ca66664da4d6B54092Dc8943ebe', //StrayInu bsc
    contractAddress: getFTAddress(chainId), 
    logo:
      'https://pancakeswap.finance/images/tokens/0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82.png',
    name: 'TokenName',
    balance: '0',
    decimals: '18',
  });
  useEffect(() => {
    setTokenInfo({...tokenInfo, contractAddress: getFTAddress(chainId)})
  // eslint-disable-next-line
  }, [chainId, getFTAddress])
  const validateDeposit = (payload: IDepositTokenFormData) => {
    const errors: FormErrors<IDepositTokenFormData> = {};
    if (!payload.amount) {
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
  const [submitTokenNum, setSubmitTokenNum] = useState('0');
  const handleSubmit = (payload: IDepositTokenFormData) => {
    console.log('handleSubmit', payload, tokenInfo);
    setSubmitTokenNum(payload.amount);
    dispatch(
      depositToken({
        contract: tokenInfo.contractAddress,
        walletAddress: address,
        web3,
        amount: payload.amount,
        decimals: tokenInfo.decimals,
      }),
    ).then(res => {
      console.log('handleSubmit res ----->', res);
      if (res.error) {
        return console.error('error', res);
      }
      const th = (res?.data as any)?.transactionHash;
      console.log('th-->', th);
      setTx(th);
      setIsPopupOpen(true);
    });
  };
  const [initialValues] = useState<IDepositTokenFormData>({
    amount: '0',
  });

  // const count = useCount(7e3);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [tx, setTx] = useState('--');
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
        <Box mb={2}>
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
        </Box>
        <Box mb={2}>
          <Field
            component={InputField}
            name="amount"
            type="number"
            label={'Deposit Amount'}
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

        <Box mb={5}>
          <Typography className={classes.tips}>
            This is only for recharge operation, please check the corresponding
            amount after successful recharge in the game
          </Typography>
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
          <Typography variant="h1">Deposit FT</Typography>
        </Box>
        <Box>
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
        </Box>
      </Container>
      <Dialog open={isPopupOpen}>
        <Box mb={5} mt={5} className={classes.dialogHead}>
          <Box mb={3}>
            <svg
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2162"
              width="80"
              height="80"
            >
              <path d="M918.795922 356.854687c-21.798121-51.476314-52.909055-97.631021-92.514092-137.236058-39.605037-39.605037-85.862083-70.818309-137.236058-92.514092C635.727364 104.590046 579.236458 93.128123 520.903458 93.128123s-114.823906 11.461923-168.142315 33.976414c-51.476314 21.798121-97.631021 52.909055-137.236058 92.514092s-70.818309 85.862083-92.514092 137.236058C100.496502 410.173096 89.034579 466.664002 89.034579 524.997002s11.461923 114.823906 33.976414 168.142315c21.798121 51.476314 52.909055 97.631021 92.514092 137.236058 39.605037 39.605037 85.862083 70.818309 137.236058 92.514092 53.21607 22.514491 109.809314 33.976414 168.142315 33.976414s114.823906-11.461923 168.142315-33.976414c51.476314-21.798121 97.631021-52.909055 137.236058-92.514092 39.605037-39.605037 70.818309-85.862083 92.514092-137.236058 22.514491-53.21607 33.976414-109.809314 33.976414-168.142315S941.310414 410.173096 918.795922 356.854687zM520.903458 911.836898c-213.273636 0-386.839896-173.56626-386.839896-386.839896s173.56626-386.839896 386.839896-386.839896 386.839896 173.56626 386.839896 386.839896S734.177094 911.836898 520.903458 911.836898zM713.402359 378.141115 713.402359 378.141115c-9.210474-8.289426-23.537877-7.470718-31.827304 1.739756L466.971017 619.046172l-110.218669-98.859085c-9.210474-8.289426-23.537877-7.470718-31.827304 1.739756l0 0c-8.289426 9.210474-7.470718 23.537877 1.739756 31.827304l126.490506 113.391165c0.102339 0.102339 0.204677 0.102339 0.307016 0.204677 0.102339 0.102339 0.204677 0.204677 0.204677 0.204677l0 0c9.210474 8.289426 23.537877 7.470718 31.827304-1.739756l229.647811-255.948831C723.431541 400.757945 722.612832 386.430542 713.402359 378.141115z"></path>
            </svg>
          </Box>
          <Typography variant="h2" className={classes.title}>
            Deposit Successfully!
          </Typography>
          <Box mb={2} mt={2}>
            <Typography className={classes.tips}>
              You have successfully deposited {submitTokenNum} {tokenInfo.name}
            </Typography>
          </Box>
          <Box mb={5}>
            <a
              target="_blank"
              href={`${blockChainScan}tx/${tx}`}
              rel="noreferrer"
              className={classes.viewExplorer}
            >
              View on block explorer
            </a>
          </Box>
          <Button fullWidth onClick={() => setIsPopupOpen(false)}>
            Close
          </Button>
        </Box>
      </Dialog>
    </Section>
  );
};