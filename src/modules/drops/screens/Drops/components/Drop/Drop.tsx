import { Box, Typography, useTheme } from '@material-ui/core';
import { resetRequests } from '@redux-requests/core';
import { useDispatchRequest } from '@redux-requests/react';
import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/common/types/ResponseData';
import { getRandomHexColor } from 'modules/common/utils/getRandomHexColor';
import { fetchDropSubCard } from 'modules/drops/actions/fetchDropSubCard';
import { useIsMDUp } from 'modules/themes/useTheme';
import { Img } from 'modules/uiKit/Img';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';
import { uid } from 'react-uid';
import useBgColor from './useBgColor';
import { useDropStyles } from './useDropStyles';
const MAX_ITEMS_COUNT = 5;

interface IDropProps {
  creator: JSX.Element;
  title: string;
  text: string;
  timer: JSX.Element;
  href: string;
  bgColor?: string;
  bgImg?: string;
  dropId?: number;
}

export const Drop = ({
  href,
  creator,
  title,
  text,
  timer,
  bgColor,
  bgImg,
  dropId,
}: IDropProps) => {
  const theme = useTheme();
  const isMDUp = useIsMDUp();
  const [bgImgColor, setBgImgColor] = useState<string | undefined>();
  const { getBackgroudColor } = useBgColor();
  const dispatch = useDispatch();
  const dispatchRequest = useDispatchRequest();
  const DROP_KEY = `/drop-${dropId}`;

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

  return (
    <article className={classes.root}>
      {bgImg && <img className={classes.bgImgBox} src={bgImg} alt="" />}

      <Link className={classes.link} to={href} />

      <Box mb={5}>{timer}</Box>

      <Queries<ResponseData<typeof fetchDropSubCard>>
        requestActions={[fetchDropSubCard]}
        requestKeys={[DROP_KEY]}
      >
        {({ loading, data }) => (
          <Box mb={4}>
            <div className={classes.nftList}>
              {!loading &&
                data?.slice(0, MAX_ITEMS_COUNT).map((item, i) => (
                  <Link
                    to={href}
                    key={uid(item, i)}
                    className={classes.nftItem}
                  >
                    <Img
                      className={classes.itemImgBox}
                      src={item.fileurl}
                      objectFit="cover"
                      loading="lazy"
                    />
                  </Link>
                ))}
            </div>
          </Box>
        )}
      </Queries>

      <Typography variant="h1" className={classes.title}>
        <Truncate lines={isMDUp ? 1 : 2}>{title}</Truncate>
      </Typography>

      <Typography className={classes.text}>
        <Truncate lines={isMDUp ? 2 : 4}>{text}</Truncate>
      </Typography>

      <div className={classes.creator}>{creator}</div>
    </article>
  );
};
