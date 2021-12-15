import { Box, Typography, useTheme } from '@material-ui/core';
import { resetRequests } from '@redux-requests/core';
import { useDispatchRequest } from '@redux-requests/react';
import { ChainType, getChainConfig } from 'modules/account/hooks/chainConfig';
import { useAccount } from 'modules/account/hooks/useAccount';
import { getRandomHexColor } from 'modules/common/utils/getRandomHexColor';
import { setChainId } from 'modules/common/utils/localStorage';
import { fetchDropSubCard } from 'modules/drops/actions/fetchDropSubCard';
import { IAddEthereumChain } from 'modules/layout/components/Header/components/SelectChainDialog';
import { useIsMDUp } from 'modules/themes/useTheme';
import { Img } from 'modules/uiKit/Img';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Truncate from 'react-truncate';
import useBgColor from './useBgColor';
import { useDropStyles } from './useDropStyles';

import { ReactComponent as EthereumIcon } from '../../assets/ethereum.svg';
import { ReactComponent as BinanceIcon } from '../../../../../account/assets/binance.svg';
import { ReactComponent as SolanaIcon } from '../../assets/solana.svg';

interface IDropProps {
  creator: JSX.Element;
  title: string;
  text: string;
  timer: JSX.Element;
  href?: string;
  bgColor?: string;
  bgImg?: string;
  dropId?: number;
  dropType: number;
  itemImage: string;
  tarChain?: ChainType;
}

export const Drop = ({
  href,
  title,
  text,
  bgColor,
  bgImg,
  dropId,
  timer,
  tarChain,
}: IDropProps) => {
  const theme = useTheme();
  const isMDUp = useIsMDUp();
  const [bgImgColor, setBgImgColor] = useState<string | undefined>();
  const { getBackgroudColor } = useBgColor();
  const dispatch = useDispatch();
  const dispatchRequest = useDispatchRequest();
  const DROP_KEY = `/drop-${dropId}`;
  const history = useHistory();
  const { isConnected, handleChangeNetworkToSupported, chainId } = useAccount();

  useEffect(() => {
    getBackgroudColor(bgImg, theme.palette.background.paper, setBgImgColor);
  }, [getBackgroudColor, bgImg, theme]);

  const classes = useDropStyles({
    bgColor: bgColor || (bgImg ? bgImgColor : getRandomHexColor()),
  });

  useEffect(() => {
    if (dropId === undefined) return;

    dispatchRequest(
      fetchDropSubCard({ id: +dropId }, { requestKey: DROP_KEY }),
    );

    return function reset() {
      dispatch(
        resetRequests([
          {
            requestType: fetchDropSubCard.toString(),
            requestKey: DROP_KEY,
          },
        ]),
      );
    };
  }, [dispatch, dropId, dispatchRequest, DROP_KEY]);

  const renderChainIcon = useMemo(() => {
    switch (tarChain) {
      case 1:
      case 4:
        return <EthereumIcon />;

      case 56:
        return <BinanceIcon />;

      case 1111:
        return <SolanaIcon />;
      default:
        return <></>;
    }
  }, [tarChain]);

  return (
    <article className={classes.root}>
      {bgImg && (
        <Img
          className={classes.bgImgBox}
          src={bgImg}
          objectFit="cover"
          loading="lazy"
          width={900}
        />
      )}

      <Box
        className={classes.link}
        onClick={() => {
          if (tarChain && href && href.includes('http')) {
            if (
              isConnected &&
              tarChain &&
              tarChain !== 1111 &&
              tarChain !== chainId
            ) {
              // 如果用户链接了钱包，则调起钱包切链
              const tarChainConfig = getChainConfig(tarChain)
                .chainConfig as IAddEthereumChain;
              handleChangeNetworkToSupported(tarChainConfig, false);
              // .then((data) => {
              //   console.log('data', data)
              // })
            } else {
              // 如果用户没有连接钱包，则设置 localStrage [dropChainId]
              // 请求默认使用 localStrage 中的默认 chainId
              setChainId(tarChain);
              href && (window.location.href = href);
            }
          } else {
            href && history.push(href);
          }
        }}
      />

      <Box mb={5}>{timer}</Box>

      <Typography variant="h1" className={classes.title}>
        <Truncate lines={isMDUp ? 1 : 2}>{title}</Truncate>
      </Typography>

      <Typography className={classes.text}>
        <Truncate lines={isMDUp ? 2 : 4}>{text}</Truncate>
      </Typography>

      {/* <div className={classes.creator}>{creator}</div> */}

      <Box className={classes.chainIcon}>{renderChainIcon}</Box>
    </article>
  );
};
