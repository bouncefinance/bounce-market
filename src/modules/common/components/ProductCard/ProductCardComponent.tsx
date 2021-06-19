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
import { t } from 'modules/i18n/utils/intl';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { HeartIcon } from 'modules/common/components/Icons/HeartIcon';
import { LayersIcon } from 'modules/common/components/Icons/LayersIcon';
import { TimeIcon } from 'modules/common/components/Icons/TimeIcon';
import { featuresConfig } from 'modules/common/conts';
import { getDaysLeft } from 'modules/common/utils/getTimeRemaining';
import { Button } from 'modules/uiKit/Button';
import { IImgProps, Img } from 'modules/uiKit/Img';
import React, { ReactNode, useCallback, useState } from 'react';
import { Link, Link as RouterLink } from 'react-router-dom';
import { VerticalDotsIcon } from '../Icons/VerticalDotsIcon';
import { Spinner } from '../Spinner';
import { VideoPlayer } from '../VideoPlayer';
import { useProductCardStyles } from './useProductCardStyles';
import { AuctionType } from 'modules/overview/api/auctionType';
import { FixedSwapState } from 'modules/common/const/FixedSwapState';
import { AuctionState } from 'modules/common/const/AuctionState';

export type ProductCardCategoryType = 'image' | 'video';

export enum ProductCardStatuses {
  Minting,
  OnSalePending,
}

export interface IProductCardComponentProps {
  className?: string;
  price?: BigNumber;
  isOnSale?: boolean;
  title: string;
  priceType?: string;
  endDate?: Date;
  likes?: number;
  copies?: number;
  auctionType?: AuctionType;
  state?: number;
  MediaProps: IImgProps & {
    category: ProductCardCategoryType;
  };
  profileInfo?: ReactNode;
  href?: string;
  isLiked?: boolean;
  isLikeDisabled?: boolean;
  imgPreloader?: ReactNode;
  onLikeClick?: () => void;
  status?: ProductCardStatuses;
  toSale?: string;
  onTransferClick?: () => void;
  onBurnClick?: () => void;
}

export const ProductCardComponent = ({
  className,
  href,
  price,
  isOnSale,
  title,
  priceType,
  endDate,
  copies,
  auctionType,
  state,
  likes,
  isLikeDisabled = false,
  isLiked = false,
  onLikeClick,
  MediaProps,
  profileInfo,
  imgPreloader,
  status,
  toSale,
  onTransferClick,
  onBurnClick,
}: IProductCardComponentProps) => {
  const classes = useProductCardStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const isPopoverOpened = Boolean(anchorEl);
  const isMinting = status === ProductCardStatuses.Minting;
  const isOnSalePending = status === ProductCardStatuses.OnSalePending;

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
        onClick={isLikeDisabled ? undefined : onLikeClick}
        disabled={isLikeDisabled}
      >
        <HeartIcon className={classes.icon} />
      </ButtonBase>

      {likes}
    </div>
  );

  const renderMediaContent = useCallback(
    () => (
      <>
        {MediaProps.category === 'image' ? (
          <Img
            {...MediaProps}
            className={classNames(MediaProps.className, classes.imgWrap)}
            ratio="1x1"
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

        {imgPreloader}

        {isMinting &&
          renderCardStatus('Creating', 'Waiting for block confirmation...')}

        {isOnSalePending &&
          renderCardStatus('Puting up for sale', 'May take up to 5 minutes')}
      </>
    ),
    [
      MediaProps,
      classes.imgWrap,
      classes.video,
      classes.videoWrapper,
      imgPreloader,
      isMinting,
      isOnSalePending,
      renderCardStatus,
    ],
  );

  return (
    <Card className={classNames(classes.root, className)} variant="outlined">
      {href ? (
        <Link to={href} className={classes.imgBox}>
          {renderMediaContent()}
        </Link>
      ) : (
        renderMediaContent()
      )}

      <CardContent className={classes.content}>
        <Typography variant="h5" className={classes.title} title={title}>
          {title}
        </Typography>

        {profileInfo}

        <hr className={classes.devider} />

        {isOnSale && price && (
          <div className={classes.price}>
            {auctionType === AuctionType.FixedSwap &&
              (state === FixedSwapState.Completed
                ? t('product-card.sold-for')
                : t('product-card.price'))}
            {auctionType === AuctionType.EnglishAuction &&
              (state === AuctionState.Claimed
                ? t('product-card.top-bid')
                : t('product-card.sold-for'))}
            {} {price.toFormat()} {priceType}
          </div>
        )}

        <div className={classes.infoContainer}>
          {isOnSale && (
            <>
              {!endDate && copies && renderedCopies}

              {endDate && renderTimer()}

              {!endDate && !copies && <i />}

              {featuresConfig.nftLikes && renderedLikes}
            </>
          )}

          {!isOnSale && (
            <>
              <div>
                <Typography className={classes.status}>
                  {t('product-card.not-on-sale')}
                </Typography>

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
