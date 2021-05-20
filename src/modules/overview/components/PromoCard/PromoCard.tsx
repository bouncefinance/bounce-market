import { Box, Hidden, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { DefaultRandomAvatar } from 'modules/common/components/DefaultRandomAvatar';
import { SwiperPreloader } from 'modules/common/components/SwiperPreloader';
import { t } from 'modules/i18n/utils/intl';
import { IImgProps, Img } from 'modules/uiKit/Img';
import React from 'react';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';
import { usePromoCardStyles } from './PromoCardStyles';

export interface IPromoCardProps {
  className?: string;
  title: string;
  text: string;
  createdBy: string;
  avatar?: string;
  price: BigNumber;
  priceType: string;
  img?: string;
  srcset?: IImgProps['srcset'];
  href: string;
  authorHref: string;
}

export const PromoCard = ({
  className,
  title,
  text,
  createdBy,
  avatar,
  price,
  priceType,
  img,
  srcset,
  href,
  authorHref,
}: IPromoCardProps) => {
  const classes = usePromoCardStyles();

  const renderedText = (
    <Typography color="textSecondary" className={classes.text}>
      <Truncate
        lines={3}
        ellipsis={
          <>
            ... <Link to={href}>{t('common.read-more')}</Link>
          </>
        }
      >
        {text}
      </Truncate>
    </Typography>
  );

  return (
    <div className={classNames(classes.root, className)}>
      <div className={classes.content}>
        <Typography
          className={classes.title}
          variant="h1"
          component={Link}
          to={href}
          title={title}
        >
          <Truncate lines={2}>{title}</Truncate>
        </Typography>

        <Hidden smDown>{renderedText}</Hidden>

        <div className={classes.info}>
          <Link to={authorHref} className={classes.author}>
            <DefaultRandomAvatar
              className={classes.avatar}
              alt={createdBy}
              src={avatar}
            />

            <Typography
              color="textSecondary"
              variant="body2"
              className={classes.authorText}
            >
              {t('promo.created-by')}
            </Typography>

            <Typography className={classes.authorName} variant="body2">
              {createdBy}
            </Typography>
          </Link>

          <Typography className={classes.price}>
            {price.toFormat()} {priceType}
          </Typography>
        </div>
      </div>

      <Box position="relative">
        <Link to={href}>
          <Img
            className={classes.imgWrap}
            ratio="1x1"
            objectFit="contain"
            src={img}
            srcset={srcset}
            imgClassName="swiper-lazy"
            isNativeLazyLoading={false}
          />
        </Link>

        <SwiperPreloader />
      </Box>

      <Hidden mdUp>{renderedText}</Hidden>
    </div>
  );
};
