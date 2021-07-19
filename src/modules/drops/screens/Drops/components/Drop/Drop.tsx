import { Box, Typography, useTheme } from '@material-ui/core';
import { getRandomHexColor } from 'modules/common/utils/getRandomHexColor';
import { useIsMDUp } from 'modules/themes/useTheme';
import { Img } from 'modules/uiKit/Img';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';
import { uid } from 'react-uid';
import { useDropStyles } from './useDropStyles';
import { useState } from 'react';
import useBgColor from './useBgColor';
import { useDispatchRequest } from '@redux-requests/react';
import { useDispatch } from 'react-redux';
import { fetchDropSubCard } from 'modules/drops/actions/fetchDropSubCard';
import { ResponseData } from 'modules/common/types/ResponseData';
import { Queries } from 'modules/common/components/Queries/Queries';
import { resetRequests } from '@redux-requests/core';
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

  useEffect(() => {
    getBackgroudColor(bgImg, theme.palette.background.paper, setBgImgColor);
  }, [getBackgroudColor, bgImg, theme]);

  const classes = useDropStyles({
    bgColor: bgColor || (bgImg ? bgImgColor : getRandomHexColor()),
  });

  useEffect(() => {
    if (dropId === undefined) return;

    dispatchRequest(fetchDropSubCard({ id: +dropId }));

    return function reset() {
      dispatch(resetRequests([fetchDropSubCard({ id: +dropId }).toString()]));
    };
  }, [dispatch, dropId, dispatchRequest]);

  return (
    <article className={classes.root}>
      {bgImg && (
        <Img
          className={classes.bgImgBox}
          src={bgImg}
          objectFit="cover"
          loading="lazy"
        />
      )}

      <Link className={classes.link} to={href} />

      <Box mb={5}>{timer}</Box>

      <Queries<ResponseData<typeof fetchDropSubCard>>
        requestActions={[fetchDropSubCard]}
        // noDataMessage={renderedPromoSkeleton}
      >
        {({ loading, data }) => (
          <Box mb={4}>
            <div className={classes.nftList}>
              {false &&
                !loading &&
                data?.slice(0, MAX_ITEMS_COUNT).map((item, i) => (
                  <Link
                    to={href}
                    key={uid(item.name)}
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
