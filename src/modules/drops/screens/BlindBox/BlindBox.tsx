import {
  Box,
  Button,
  Dialog,
  ThemeProvider,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { darkTheme } from 'modules/themes/darkTheme';
import { Img } from 'modules/uiKit/Img';
import { useBlindBoxStyles } from './useBlinkBoxStyles';
import topImg from './assets/blindBoxBg.png';
import { LayersIcon } from 'modules/common/components/Icons/LayersIcon';
import { BuyBlindBoxDialog } from 'modules/common/components/BuyBlindBox/buyBlindBoxDialog';
import { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import {
  fetchBlindBoxList,
  getApeBlindBoxContract,
  IBlindBoxItem,
  IBlindBoxList,
} from 'modules/drops/actions/blindBox';
import { useDispatch } from 'react-redux';
import { useWeb3React } from 'modules/account/hooks/useWeb3React';
import { useNftCardTimer } from 'modules/common/hooks/useTimer';
import { getSymbolName } from 'modules/common/components/Icons/Chains';
import { Queries } from 'modules/common/components/Queries/Queries';
import { NothingFound } from 'modules/drops/components/NothingFound';
import { Skeleton } from '@material-ui/lab';
import { ApeBlindBox } from 'modules/web3/contracts';
import Web3 from 'web3';
import BigNumber from 'bignumber.js';
import { getBlindBoxVerify } from 'modules/api/common/getBlindBoxVerify';
import { useAccount } from 'modules/account/hooks/useAccount';
import { useQuery } from '@redux-requests/react';
import {
  ISetAccountData,
  setAccount,
} from 'modules/account/store/actions/setAccount';
import { verifyWhiteList } from './verifyWhiteList';
import { ConnectWallet } from 'modules/router/components/ConnectWallet';

enum IsVerifyEnum {
  LOADING,
  NO,
  OK,
}
type onDrawType = (item: IBlindBoxItem, nftSwapNum: string) => void;

const IsBlindBoxSupportChainList = [4, 56];
export const BlindBox = () => {
  const classes = useBlindBoxStyles({});
  const { chainId, isConnected } = useAccount();
  const { address } = useWeb3React();

  const { data } = useQuery<ISetAccountData | null>({
    type: setAccount.toString(),
  });
  const web3 = data?.web3;

  const dispatch = useDispatch();
  const [isBuyOpen, setIsBuyOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [swapNum, setSwapNum] = useState('');
  const [selectItem, setSelectItem] = useState<IBlindBoxItem>();
  const onBuyClose = () => {
    setIsBuyOpen(false);
  };

  const onDraw: onDrawType = useCallback(
    (item: IBlindBoxItem, nftSwapNum: string) => {
      setIsBuyOpen(true);
      setSwapNum(nftSwapNum);
      setSelectItem(_.cloneDeep(item));
    },
    [],
  );

  useEffect(() => {
    console.log('chainId------>', chainId);
    if (IsBlindBoxSupportChainList.includes(chainId)) {
      setTimeout(() => {
        dispatch(fetchBlindBoxList({}));
      }, 200);
    }
  }, [chainId, dispatch]);
  //   const { data, loading } = useQuery<IBlindBoxList>({
  //     type: fetchBlindBoxList.toString(),
  //   });

  return (
    <ThemeProvider theme={darkTheme}>
      {!isConnected ? (
        <ConnectWallet />
      ) : (
        <>
          <div className={classes.root}>
            <img alt="" className={classes.headTopImg} src={topImg} />
            <div className={classes.inner}>
              <Box mt={5} mb={4}>
                <Typography variant="h2">🔥Live</Typography>
              </Box>
              {IsBlindBoxSupportChainList.includes(chainId) ? (
                <Queries<IBlindBoxList>
                  requestActions={[fetchBlindBoxList]}
                  // requestKeys={[BLIND_BOX_KEY]}
                  noDataMessage={<RenderedSkeletons />}
                  empty={<NothingFound />}
                >
                  {({ data }) => {
                    console.log('IBlindBoxList---->', data?.data?.length === 0);
                    //   return <RenderedSkeletons />;
                    return data?.data?.length === 0 ? (
                      <NothingFound />
                    ) : (
                      data?.data?.map(item => (
                        <ItemView
                          key={item.id}
                          item={item}
                          onDraw={onDraw}
                          web3={web3}
                          chainId={chainId}
                          address={address}
                        />
                      ))
                    );
                  }}
                </Queries>
              ) : (
                <Box mb={10}>
                  <Typography variant="h3" align="center" color="textSecondary">
                    Not support this chain
                  </Typography>
                </Box>
              )}
            </div>
          </div>
          {selectItem && (
            <BuyBlindBoxDialog
              item={selectItem as IBlindBoxItem}
              isOpen={isBuyOpen}
              swapNum={swapNum}
              onClose={onBuyClose}
              setIsSuccessOpen={setIsSuccessOpen}
            />
          )}

          <Dialog open={isSuccessOpen}>
            <Box mb={5} mt={5} className={classes.dialogHead}>
              <Box mb={3}>
                <svg
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2162"
                  width="80"
                  height="80"
                  fill="#fff"
                >
                  <path d="M918.795922 356.854687c-21.798121-51.476314-52.909055-97.631021-92.514092-137.236058-39.605037-39.605037-85.862083-70.818309-137.236058-92.514092C635.727364 104.590046 579.236458 93.128123 520.903458 93.128123s-114.823906 11.461923-168.142315 33.976414c-51.476314 21.798121-97.631021 52.909055-137.236058 92.514092s-70.818309 85.862083-92.514092 137.236058C100.496502 410.173096 89.034579 466.664002 89.034579 524.997002s11.461923 114.823906 33.976414 168.142315c21.798121 51.476314 52.909055 97.631021 92.514092 137.236058 39.605037 39.605037 85.862083 70.818309 137.236058 92.514092 53.21607 22.514491 109.809314 33.976414 168.142315 33.976414s114.823906-11.461923 168.142315-33.976414c51.476314-21.798121 97.631021-52.909055 137.236058-92.514092 39.605037-39.605037 70.818309-85.862083 92.514092-137.236058 22.514491-53.21607 33.976414-109.809314 33.976414-168.142315S941.310414 410.173096 918.795922 356.854687zM520.903458 911.836898c-213.273636 0-386.839896-173.56626-386.839896-386.839896s173.56626-386.839896 386.839896-386.839896 386.839896 173.56626 386.839896 386.839896S734.177094 911.836898 520.903458 911.836898zM713.402359 378.141115 713.402359 378.141115c-9.210474-8.289426-23.537877-7.470718-31.827304 1.739756L466.971017 619.046172l-110.218669-98.859085c-9.210474-8.289426-23.537877-7.470718-31.827304 1.739756l0 0c-8.289426 9.210474-7.470718 23.537877 1.739756 31.827304l126.490506 113.391165c0.102339 0.102339 0.204677 0.102339 0.307016 0.204677 0.102339 0.102339 0.204677 0.204677 0.204677 0.204677l0 0c9.210474 8.289426 23.537877 7.470718 31.827304-1.739756l229.647811-255.948831C723.431541 400.757945 722.612832 386.430542 713.402359 378.141115z"></path>
                </svg>
              </Box>
              <Typography variant="h2" className={classes.title}>
                Draw Successfully!
              </Typography>
              <Box mb={2} mt={2}>
                <Typography className={classes.tips}>
                  please check NFTs in the showcase
                </Typography>
              </Box>
              <Box mb={5}>
                <a
                  // target="_blank"
                  href={`/profile?id=&brand=&tab=owned`}
                  // rel="noreferrer"
                  className={classes.viewExplorer}
                >
                  go to showcase
                </a>
              </Box>
              <Button fullWidth onClick={() => setIsSuccessOpen(false)}>
                Close
              </Button>
            </Box>
          </Dialog>
        </>
      )}
    </ThemeProvider>
  );
};

const ItemView = ({
  item,
  onDraw,
  chainId,
  web3,
  address,
}: {
  item: IBlindBoxItem;
  onDraw: onDrawType;
  chainId?: number;
  web3?: Web3;
  address: string;
}) => {
  const classes = useBlindBoxStyles({});
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { duration, isTimeOver } = useNftCardTimer({
    endDate: new Date(item.end_ts * 1e3),
    formatTime: 'time.left-short-hour-2',
  });

  const [nftSwapNum, setTotalSell] = useState('-');
  const getBoxTotalSell = async () => {
    if (chainId) {
      if (!item.phase_id) {
        return console.error('not phase_id');
      }
      if (!web3) {
        window.location.reload();
        return;
      }
      const ApeBlindBox_CT = new web3.eth.Contract(
        ApeBlindBox,
        getApeBlindBoxContract(chainId),
      );
      const res = await ApeBlindBox_CT.methods.totalSell(item.phase_id).call();
      // console.log('box sell total --------->', res);
      setTotalSell(res);
    }
  };
  const [isVerify, setIsVerify] = useState<IsVerifyEnum>(IsVerifyEnum.LOADING);
  const initVerify = async () => {
    if (chainId && address) {
      try {
        const res = await getBlindBoxVerify(chainId, address);
        console.log('getBlindBoxVerify---->', res);
        if (res) {
          if (res?.call_code === 8000) {
            setIsVerify(IsVerifyEnum.OK);
          } else {
            if (
              verifyWhiteList.some(
                e => e.toLocaleLowerCase() === address.toLocaleLowerCase(),
              )
            ) {
              setIsVerify(IsVerifyEnum.OK);
            } else {
              setIsVerify(IsVerifyEnum.NO);
            }
          }
        }
      } catch (error) {
        console.log('Verify error--->', error);
      }
    }
  };
  useEffect(() => {
    if (chainId && IsBlindBoxSupportChainList.includes(chainId)) {
      getBoxTotalSell();
    }
    // eslint-disable-next-line
  }, [chainId, address]);
  useEffect(() => {
    if (!localStorage.notBlindBoxVerify) initVerify();
    // eslint-disable-next-line
  }, [chainId, address]);
  //   const { duration, isTimeOver } = { duration: '', isTimeOver: true };

  return (
    <Box key={item.id} className={classes.itemBox} mb={4.7}>
      <Box display="flex">
        <Img className={classes.boxLeft} src={item.cover_url} />
        <Box ml={6} className={classes.rightBox}>
          {isTimeOver ? (
            <Typography className={classes.time}>
              End of the activity
            </Typography>
          ) : (
            <Typography className={classes.time}>End: {duration}</Typography>
          )}
          <Box mt={2.5}>
            <Typography variant={isMobile ? 'h2' : 'h1'}>
              {item.title}
            </Typography>
          </Box>
          {!isMobile && (
            <Detail
              onDraw={onDraw}
              nftSwapNum={nftSwapNum}
              isTimeOver={isTimeOver}
              item={item}
              isVerify={isVerify}
            />
          )}
        </Box>
      </Box>
      {isMobile && (
        <Detail
          onDraw={onDraw}
          nftSwapNum={nftSwapNum}
          isTimeOver={isTimeOver}
          item={item}
          isVerify={isVerify}
        />
      )}
    </Box>
  );
};

const Detail = ({
  item,
  isTimeOver,
  nftSwapNum,
  onDraw,
  isVerify,
}: {
  item: IBlindBoxItem;
  isTimeOver: boolean;
  nftSwapNum: string;
  onDraw: onDrawType;
  isVerify: IsVerifyEnum;
}) => {
  const classes = useBlindBoxStyles({});
  const theme = useTheme();
  const { chainId } = useWeb3React();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const chainIdSymbol = getSymbolName(chainId);
  return (
    <>
      <Box mt={2} mb={2.4}>
        <Typography className={classes.desc}>{item.description}</Typography>
      </Box>
      <Box mb={isMobile ? 2 : 4} display="flex">
        <LayersIcon className={classes.icon} />
        <Tooltip
          title={`Available for purchase/Total Supply`}
          arrow
          placement="top"
        >
          <Typography className={classes.soldNumber}>
            &nbsp;&nbsp;{' '}
            {nftSwapNum === '-'
              ? '-'
              : new BigNumber(item.total_supply)
                  .minus(nftSwapNum || '0')
                  .toNumber()}{' '}
            / {item.total_supply}
          </Typography>
        </Tooltip>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography className={classes.price}>
          {new BigNumber(item?.price).dividedBy(100).dp(2).toString()}
          {chainIdSymbol} / DRAW
        </Typography>
        <Button
          onClick={() => onDraw(item, nftSwapNum)}
          style={{ flex: 1, maxWidth: 350, marginLeft: 15 }}
          disabled={isTimeOver || isVerify === IsVerifyEnum.NO}
        >
          {isVerify === IsVerifyEnum.NO
            ? isMobile
              ? 'Not qualified'
              : 'Not qualified'
            : 'DRAW'}
        </Button>
      </Box>
    </>
  );
};

const RenderedSkeletons = () => {
  const classes = useBlindBoxStyles({});
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <div>
      {[1, 2].map(i => (
        <Box key={i} className={classes.itemBox} mb={4.7}>
          <Box display="flex">
            <Skeleton className={classes.boxLeft} variant="circle" />
            <Box ml={6} className={classes.rightBox}>
              <Skeleton
                width={'30%'}
                height={isMobile ? 20 : 40}
                variant="rect"
              />
              <Box mt={isMobile ? 1 : 3}>
                <Skeleton
                  width={'60%'}
                  height={isMobile ? 20 : 40}
                  variant="rect"
                />
              </Box>
              <Box mt={isMobile ? 2 : 4}>
                <Skeleton
                  width={'100%'}
                  height={isMobile ? 50 : 100}
                  variant="rect"
                />
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
    </div>
  );
};
