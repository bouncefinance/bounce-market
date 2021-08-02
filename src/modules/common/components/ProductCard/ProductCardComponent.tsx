import {
  Box,
  ButtonBase,
  Card,
  CardContent,
  ClickAwayListener,
  MenuItem,
  MenuList,
  Popover,
  Tooltip,
  Typography,
} from '@material-ui/core';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { useAccount } from 'modules/account/hooks/useAccount';
import { AuctionState } from 'modules/api/common/AuctionState';
import { AuctionType } from 'modules/api/common/auctionType';
import { FixedSwapState } from 'modules/api/common/FixedSwapState';
import { ConditionalWrapper } from 'modules/common/components/ConditionalWrapper';
import { HeartIcon } from 'modules/common/components/Icons/HeartIcon';
import { LayersIcon } from 'modules/common/components/Icons/LayersIcon';
import { TimeIcon } from 'modules/common/components/Icons/TimeIcon';
import { featuresConfig } from 'modules/common/conts';
import { getDaysLeft } from 'modules/common/utils/getTimeRemaining';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'modules/uiKit/Button';
import { IImgProps, Img } from 'modules/uiKit/Img';
import React, { ReactNode, useCallback, useState } from 'react';
import { Link, Link as RouterLink } from 'react-router-dom';
import { VerticalDotsIcon } from '../Icons/VerticalDotsIcon';
import { Spinner } from '../Spinner';
import { VideoPlayer } from '../VideoPlayer';
import { CancelPutTime } from './cancel';
import CardPutSaleTimer from './putsaleTimer';
import { useProductCardStyles } from './useProductCardStyles';

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
  copiesBalance?: number;
  auctionType?: AuctionType;
  state?: number;
  MediaProps: IImgProps & {
    category: ProductCardCategoryType;
  };
  profileInfo?: ReactNode;
  href?: string;
  id?: number;
  isLiked?: boolean;
  isLikeDisabled?: boolean;
  hiddenLikeBtn?: boolean;
  imgPreloader?: ReactNode;
  onLikeClick?: () => void;
  status?: ProductCardStatuses;
  toSale?: string;
  hasAction?: boolean;
  stateTip?: string;
  onTransferClick?: () => void;
  onBurnClick?: () => void;
  isCancelTimePut?: boolean;
  poolId?: number;
  openAt?: Date;
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
  copiesBalance,
  auctionType,
  state,
  likes,
  id,
  isLikeDisabled = false,
  isLiked = false,
  hiddenLikeBtn = false,
  onLikeClick,
  MediaProps,
  profileInfo,
  imgPreloader,
  status,
  toSale,
  hasAction,
  stateTip,
  onTransferClick,
  onBurnClick,
  // profile page && put on of time && not up to shelf time && owner
  isCancelTimePut = false,
  poolId,
  openAt,
}: IProductCardComponentProps) => {
  const { isConnected, handleConnect } = useAccount();
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
    <Tooltip
      title={t('product-card.balance-tip', { balance: copiesBalance ?? 0 })}
      arrow
      placement="top"
    >
      <div className={classes.info}>
        <LayersIcon
          className={classNames(classes.icon, classes.iconRightOffset)}
        />
        {copiesBalance ? `${copiesBalance} of ` : ''}
        {copies}
      </div>
    </Tooltip>
  );

  const renderedLikes = (
    <div
      onClick={e => {
        if (!isConnected) {
          handleConnect();
        }
      }}
      className={classNames(classes.info, classes.likeSite)}
    >
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

      {likes || '0'}
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
      <div className={classes.relative}>
        <ConditionalWrapper
          condition={!!href}
          wrapper={<Link to={href || '#'} className={classes.imgBox} />}
        >
          {renderMediaContent()}
          {openAt && +openAt > Date.now() && (
            <CardPutSaleTimer openAt={openAt} />
          )}
        </ConditionalWrapper>
        {featuresConfig.nftLikes && !hiddenLikeBtn && renderedLikes}
      </div>

      <CardContent className={classes.content}>
        <ConditionalWrapper
          condition={!!href}
          wrapper={<Link to={href || '#'} />}
        >
          <Typography variant="h5" className={classes.title} title={title}>
            {title}
          </Typography>
        </ConditionalWrapper>

        {profileInfo}

        <hr className={classes.devider} />

        {stateTip && <p className={classes.stateTip}>{stateTip}</p>}

        {isOnSale && price && (
          <div className={classes.price}>
            {(auctionType === AuctionType.FixedSwap ||
              auctionType === AuctionType.FixedSwap_Timing) &&
              (state === FixedSwapState.Live
                ? t('product-card.price')
                : t('product-card.sold-for'))}
            {(auctionType === AuctionType.EnglishAuction ||
              auctionType === AuctionType.EnglishAuction_Timing) &&
              (state === AuctionState.Live
                ? t('product-card.top-bid')
                : t('product-card.sold-for'))}{' '}
            {price.toFormat()} {priceType}
          </div>
        )}

        <div className={classes.infoContainer}>
          {isOnSale && (
            <>
              {!endDate && copies && renderedCopies}

              {endDate && renderTimer()}

              {!endDate && !copies && <i />}
              {isCancelTimePut ? (
                <CancelPutTime auctionType={auctionType} id={poolId} />
              ) : (
                <></>
              )}
            </>
          )}

          {!isOnSale && (
            <>
              <div>{copies ? renderedCopies : <></>}</div>

              {!isMinting && !isOnSalePending && (
                <Box display="flex" alignItems="center">
                  <Button
                    className={classes.saleBtn}
                    component={RouterLink}
                    variant="outlined"
                    rounded
                    to={toSale}
                  >
                    {t('product-card.put-on-sale')}
                  </Button>
                  {hasAction && (
                    <>
                      <ClickAwayListener onClickAway={handleClose}>
                        <ButtonBase
                          className={classes.menuBtn}
                          onClick={handleClick}
                        >
                          <VerticalDotsIcon className={classes.menuIcon} />
                        </ButtonBase>
                      </ClickAwayListener>
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
                            {t('product-card.transfer')}
                          </MenuItem>

                          <MenuItem
                            className={classes.menuItem}
                            onClick={onBurnClick}
                          >
                            {t('product-card.burn')}
                          </MenuItem>
                        </MenuList>
                      </Popover>
                    </>
                  )}
                </Box>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
