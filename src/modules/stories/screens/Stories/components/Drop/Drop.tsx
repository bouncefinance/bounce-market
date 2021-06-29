import { Box, Typography } from '@material-ui/core';
import { useIsMDUp } from 'modules/themes/useTheme';
import { Img } from 'modules/uiKit/Img';
import React from 'react';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';
import { uid } from 'react-uid';
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
  items?: string[];
}

export const Drop = ({
  href,
  creator,
  title,
  text,
  timer,
  bgColor = '#232323',
  bgImg,
  items,
}: IDropProps) => {
  const classes = useDropStyles({ bgColor });
  const isMDUp = useIsMDUp();

  const itemsCount = items ? items.length : 0;

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

      {!!itemsCount && (
        <Box mb={4}>
          <div className={classes.nftList}>
            {items?.slice(0, MAX_ITEMS_COUNT).map((img, i) => (
              <Link to={href} key={uid(i)} className={classes.nftItem}>
                <Img
                  className={classes.itemImgBox}
                  src={img}
                  objectFit="cover"
                  loading="lazy"
                />
              </Link>
            ))}
          </div>
        </Box>
      )}

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
