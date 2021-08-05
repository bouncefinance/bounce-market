import { Box, Hidden, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { ProductCardCategoryType } from 'modules/common/components/ProductCard';
import { ProfileInfo } from 'modules/common/components/ProfileInfo';
import { SwiperPreloader } from 'modules/common/components/SwiperPreloader';
import { VideoPlayer } from 'modules/common/components/VideoPlayer';
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
  identity: number;
  MediaProps: IImgProps & {
    category: ProductCardCategoryType;
  };
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
  MediaProps,
  identity,
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
          <Truncate lines={3}>{title}</Truncate>
        </Typography>

        <Hidden smDown>{renderedText}</Hidden>

        <div className={classes.info}>
          <ProfileInfo
            avatarSize="medium"
            className={classes.ProfileInfo}
            subTitle={t('promo.created-by')}
            title={createdBy}
            users={[
              {
                name: createdBy,
                href: authorHref,
                avatar: avatar,
                verified: identity === 2,
              },
            ]}
          />

          <Typography className={classes.price}>
            {price.toFormat()} {priceType}
          </Typography>
        </div>
      </div>

      <Box position="relative">
        <Link to={href}>
          {MediaProps.category === 'image' ? (
            <Img
              className={classes.imgWrap}
              ratio="1x1"
              objectFit="contain"
              src={img}
              srcset={srcset}
              imgClassName="swiper-lazy"
              isNativeLazyLoading={false}
            />
          ) : (
            <div className={classes.videoWrapper}>
              <div className={classes.video}>
                {MediaProps.src && (
                  <VideoPlayer
                    src={MediaProps.src}
                    objectFit={MediaProps.objectFit}
                  />
                )}
              </div>
            </div>
          )}
        </Link>

        <SwiperPreloader />
      </Box>

      <Hidden mdUp>{renderedText}</Hidden>
    </div>
  );
};
