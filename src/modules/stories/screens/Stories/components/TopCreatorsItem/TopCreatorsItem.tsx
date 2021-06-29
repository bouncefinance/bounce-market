import { Box, Typography } from '@material-ui/core';
import { SwiperPreloader } from 'modules/common/components/SwiperPreloader';
import { Img } from 'modules/uiKit/Img';
import React from 'react';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';
import { useTopCreatorsItemStyles } from './useTopCreatorsItemStyles';

interface ITopCreatorsItemProps {
  to: string;
  img: string;
  title: string;
}

export const TopCreatorsItem = ({ to, img, title }: ITopCreatorsItemProps) => {
  const classes = useTopCreatorsItemStyles();

  return (
    <Link to={to} className={classes.root}>
      <Box position="relative">
        <Img
          className={classes.imgWrap}
          imgClassName="swiper-lazy"
          isNativeLazyLoading={false}
          src={img}
        />

        <SwiperPreloader />
      </Box>

      <Typography className={classes.title}>
        <Truncate lines={2}>{title}</Truncate>
      </Typography>
    </Link>
  );
};
