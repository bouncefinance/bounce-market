import {
  Box,
  Button,
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

enum IsVerifyEnum {
  LOADING,
  NO,
  OK,
}
type onDrawType = (item: IBlindBoxItem, nftSwapNum: string) => void;

const IsBlindBoxSupportChainList = [4, 56];
export const BlindBox = () => {
  const classes = useBlindBoxStyles({});
  const { chainId } = useAccount();
  const { web3, address } = useWeb3React();
  const dispatch = useDispatch();
  const [isBuyOpen, setIsBuyOpen] = useState(false);
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
            <>
              <Typography variant="h2">Not support this chain</Typography>
            </>
          )}
        </div>
      </div>
      {selectItem && (
        <BuyBlindBoxDialog
          item={selectItem as IBlindBoxItem}
          isOpen={isBuyOpen}
          swapNum={swapNum}
          onClose={onBuyClose}
        />
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
  web3: Web3;
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
        // console.log('getBlindBoxVerify---->', res);
        if (res) {
          if (res?.call_code === 8000) {
            setIsVerify(IsVerifyEnum.OK);
          } else {
            setIsVerify(IsVerifyEnum.NO);
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
            &nbsp;&nbsp; {nftSwapNum} / {item.total_supply}
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
