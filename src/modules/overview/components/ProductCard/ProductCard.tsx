import { ButtonBase, Card, CardContent, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { HeartIcon } from 'modules/common/components/Icons/HeartIcon';
import { LayersIcon } from 'modules/common/components/Icons/LayersIcon';
import { TimeIcon } from 'modules/common/components/Icons/TimeIcon';
import {
  IProfileInfoProps,
  ProfileInfo,
} from 'modules/common/components/ProfileInfo';
import { getDaysLeft } from 'modules/common/utils/getTimeRemaining';
import { IImgProps, Img } from 'modules/uiKit/Img';
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useProductCardStyles } from './ProductCardStyles';

export interface IProductCardProps {
  className?: string;
  price: BigNumber;
  title: string;
  priceType: string;
  endDate?: Date;
  likes?: number;
  copies?: string;
  ImgProps: IImgProps;
  ProfileInfoProps: IProfileInfoProps;
  href: string;
  isLiked?: boolean;
  imgPreloader?: ReactNode;
  onLikeClick?: () => void;
}

export const ProductCard = ({
  className,
  href,
  price,
  title,
  priceType,
  endDate,
  copies,
  likes = 0,
  isLiked = false,
  onLikeClick,
  ImgProps,
  ProfileInfoProps,
  imgPreloader,
}: IProductCardProps) => {
  const classes = useProductCardStyles();
  const daysLeft = endDate ? getDaysLeft(endDate) : 0;
  const isLastDay = daysLeft <= 0;

  return (
    <Card className={classNames(classes.root, className)} variant="outlined">
      <Link to={href} className={classes.imgLink}>
        <Img
          {...ImgProps}
          className={classNames(ImgProps.className, classes.imgWrap)}
          ratio="1x1"
        />
        {imgPreloader}
      </Link>

      <CardContent>
        <Typography variant="h5" className={classes.title} title={title}>
          {title}
        </Typography>

        <ProfileInfo {...ProfileInfoProps} />

        <hr className={classes.devider} />

        <div className={classes.price}>
          {price.toFormat()} {priceType}
        </div>

        <div className={classes.info}>
          <Typography
            color="textSecondary"
            variant="body2"
            component="div"
            className={classes.status}
          >
            {copies && (
              <>
                <LayersIcon
                  className={classNames(classes.icon, classes.iconRightOffset)}
                />{' '}
                {copies}
              </>
            )}

            {!copies && endDate && (
              <>
                <TimeIcon
                  className={classNames(classes.icon, classes.iconRightOffset)}
                />

                {isLastDay && 'the last day'}

                {!isLastDay && `${daysLeft} days left`}
              </>
            )}
          </Typography>

          <Typography
            color="textSecondary"
            variant="body2"
            component="div"
            className={classes.likes}
          >
            <ButtonBase
              className={classNames(
                classes.likeBtn,
                isLiked && classes.likeBtnActive,
              )}
              onClick={onLikeClick}
              disableRipple
            >
              <HeartIcon className={classes.icon} />
            </ButtonBase>

            {likes}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};
