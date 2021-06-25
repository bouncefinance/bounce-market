import { Box, Typography } from '@material-ui/core';
import classNames from 'classnames';
import { SwiperPreloader } from 'modules/common/components/SwiperPreloader';
import { Img } from 'modules/uiKit/Img';
import React from 'react';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';
import { useTopCreatorsItemStyles } from './useTopCreatorsItemStyles';

interface ITopCreatorsItemProps {
  className?: string;
  href: string;
  img: string;
  title: string;
}

export const TopCreatorsItem = ({
  className,
  href,
  img,
  title,
}: ITopCreatorsItemProps) => {
  const classes = useTopCreatorsItemStyles();

  return (
    <Link to={href} className={classNames(classes.root, className)}>
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
