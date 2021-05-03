import {
  Box,
  ButtonBase,
  Card,
  CardContent,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from '@material-ui/core';
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
import { Button } from 'modules/uiKit/Button';
import { IImgProps, Img } from 'modules/uiKit/Img';
import React, { ReactNode, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { VerticalDotsIcon } from '../Icons/VerticalDotsIcon';
import { Spinner } from '../Spinner';
import { useProductCardStyles } from './useProductCardStyles';
import { Link as RouterLink } from 'react-router-dom';

export enum ProductCardStatuses {
  minting,
  onSalePending,
}

export interface IProductCardProps {
  className?: string;
  price?: BigNumber;
  title: string;
  priceType?: string;
  endDate?: Date;
  likes?: number;
  copies?: string;
  ImgProps: IImgProps;
  ProfileInfoProps: IProfileInfoProps;
  href: string;
  isLiked?: boolean;
  imgPreloader?: ReactNode;
  onLikeClick?: () => void;
  status?: ProductCardStatuses;
  toSale?: string;
  onTransferClick?: () => void;
  onBurnClick?: () => void;
}

export const ProductCard = ({
  className,
  href,
  price,
  title,
  priceType,
  endDate,
  copies,
  likes,
  isLiked = false,
  onLikeClick,
  ImgProps,
  ProfileInfoProps,
  imgPreloader,
  status,
  toSale,
  onTransferClick,
  onBurnClick,
}: IProductCardProps) => {
  const classes = useProductCardStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const isOnSale = !!price;
  const isPopoverOpened = Boolean(anchorEl);
  const isMinting = status === ProductCardStatuses.minting;
  const isOnSalePending = status === ProductCardStatuses.onSalePending;

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [],
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const renderTimer = useCallback(() => {
    const daysLeft = endDate ? getDaysLeft(endDate) : 0;
    const isLastDay = daysLeft <= 0;

    return (
      <div className={classes.info}>
        <TimeIcon
          className={classNames(classes.icon, classes.iconRightOffset)}
        />

        {isLastDay && 'the last day'}

        {!isLastDay && `${daysLeft} days left`}
      </div>
    );
  }, [classes, endDate]);

  const renderCardStatus = useCallback(
    (title: string, subTitle: string) => {
      return (
        <div className={classes.cardStatus}>
          <Box textAlign="center">
            <div className={classes.statusTitle}>
              <Spinner size={18} className={classes.statusSpinner} />
              {title}
            </div>

            <div className={classes.statusSubTitle}>{subTitle}</div>
          </Box>
        </div>
      );
    },
    [classes],
  );

  const renderedCopies = (
    <div className={classes.info}>
      <LayersIcon
        className={classNames(classes.icon, classes.iconRightOffset)}
      />

      {copies}
    </div>
  );

  const renderedLikes = (
    <div className={classes.info}>
      <ButtonBase
        className={classNames(
          classes.likeBtn,
          isLiked && classes.likeBtnActive,
        )}
        onClick={onLikeClick}
      >
        <HeartIcon className={classes.icon} />
      </ButtonBase>

      {likes}
    </div>
  );

  return (
    <Card className={classNames(classes.root, className)} variant="outlined">
      <Link to={href} className={classes.imgBox}>
        <Img
          {...ImgProps}
          className={classNames(ImgProps.className, classes.imgWrap)}
          ratio="1x1"
        />

        {imgPreloader}

        {isMinting &&
          renderCardStatus('Creating', 'Waiting for block confirmation...')}

        {isOnSalePending &&
          renderCardStatus('Puting up for sale', 'May take up to 5 minutes')}
      </Link>

      <CardContent className={classes.content}>
        <Typography variant="h5" className={classes.title} title={title}>
          {title}
        </Typography>

        <ProfileInfo {...ProfileInfoProps} />

        <hr className={classes.devider} />

        {price && (
          <div className={classes.price}>
            {price.toFormat()} {priceType}
          </div>
        )}

        <div className={classes.infoContainer}>
          {isOnSale && (
            <>
              {copies && renderedCopies}

              {!copies && endDate && renderTimer()}

              {likes && renderedLikes}
            </>
          )}

          {!isOnSale && (
            <>
              <div>
                <Typography className={classes.status}>Not on sale</Typography>

                {copies && renderedCopies}
              </div>

              {!isMinting && !isOnSalePending && (
                <Box display="flex" alignItems="center">
                  <Button
                    className={classes.saleBtn}
                    component={RouterLink}
                    variant="outlined"
                    rounded
                    to={toSale}
                  >
                    Put on sale
                  </Button>
                  <ButtonBase className={classes.menuBtn} onClick={handleClick}>
                    <VerticalDotsIcon className={classes.menuIcon} />
                  </ButtonBase>
                  <Popover
                    className={classes.menuPopover}
                    open={isPopoverOpened}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    PaperProps={{
                      variant: 'outlined',
                    }}
                  >
                    <MenuList>
                      <MenuItem
                        className={classes.menuItem}
                        onClick={onTransferClick}
                      >
                        Transfer token
                      </MenuItem>

                      <MenuItem
                        className={classes.menuItem}
                        onClick={onBurnClick}
                      >
                        Burn token
                      </MenuItem>
                    </MenuList>
                  </Popover>
                </Box>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
