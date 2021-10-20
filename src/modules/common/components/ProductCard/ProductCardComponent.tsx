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
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'modules/uiKit/Button';
import { IImgProps, Img } from 'modules/uiKit/Img';
import React, { ReactNode, useCallback, useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { VerticalDotsIcon } from '../Icons/VerticalDotsIcon';
import { Spinner } from '../Spinner';
import { VideoPlayer } from '../VideoPlayer';
import BidsState, { BidsType } from './BidsState';
import { CancelPutOnSale, CancelPutTime } from './cancel';
import { ClaimFunds } from './claimFunds';
import CardPutSaleTimer from './putsaleTimer';
import { useProductCardStyles } from './useProductCardStyles';
import { useEffect } from 'react';
import { useCount } from 'modules/common/hooks/useTimer';
import { ChainSymbolIcon } from '../Icons/Chains';
import { formatUnitNumber } from 'modules/common/utils/number';

export type ProductCardCategoryType = 'image' | 'video';

export enum ProductCardStatuses {
  Minting,
  OnSalePending,
}

export interface ISoldData {
  sold: number;
  quantity: number;
  supply?: number;
  color?: string;
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
  closeAt?: Date;
  bidTopPrice?: number;
  bidsReserveAmount?: number;
  myBidderAmount?: number;
  isBidder?: boolean;
  isOnSeller?: boolean;
  isBidderClaimed?: boolean;
  isCreatorClaimed?: boolean;
  soldData?: ISoldData;
  reload?: () => void;
  isOther?: boolean;
  isTotalSupply?: boolean;
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
  isLikeDisabled = false,
  isLiked = false,
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
  closeAt,
  bidTopPrice,
  bidsReserveAmount = 0,
  myBidderAmount = 0,
  isBidder = false,
  isOnSeller = false,
  soldData,
  isBidderClaimed = false,
  isCreatorClaimed = false,
  isOther = false,
  isTotalSupply,
  reload,
}: IProductCardComponentProps) => {
  const { isConnected, handleConnect, chainId } = useAccount();
  const classes = useProductCardStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const isPopoverOpened = Boolean(anchorEl);
  const isMinting = status === ProductCardStatuses.Minting;
  const isOnSalePending = status === ProductCardStatuses.OnSalePending;

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      setAnchorEl(event.currentTarget);
    },
    [],
  );

  const handleClose = useCallback(e => {
    e.stopPropagation();
    setAnchorEl(null);
  }, []);

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

  const hasRightButton = Boolean((isOnSeller || isBidder) && !isOther);
  const TooltipClasses = {
    tooltip: classes.avatarTips,
    arrow: classes.avatarTipsText,
  };

  const isOnlyTotalSupply = isTotalSupply === true;
  const renderedCopies = (
    <Tooltip
      title={
        isOnlyTotalSupply
          ? t('product-card.item-total-supply-tip')
          : t('product-card.item-balance-tip', {
            balance: new BigNumber(copiesBalance ?? 0).toFormat(0),
          })
      }
      arrow
      placement="top"
      classes={TooltipClasses}
    >
      <div className={classNames(classes.info, classes.itemCopiesInfo)}>
        <LayersIcon
          className={classNames(classes.icon, classes.iconRightOffset)}
        />
        {isOnlyTotalSupply
          ? formatUnitNumber(copies ?? 1)
          : `${formatUnitNumber(copiesBalance ?? 0)} of ${formatUnitNumber(
            copies ?? 1,
          )}`}
      </div>
    </Tooltip>
  );

  const renderSolds = (
    <Tooltip
      title={t('product-card.pool-balance-tip', {
        balance: new BigNumber(
          (soldData?.quantity || 0) - (soldData?.sold || 0),
        ).toFormat(0),
      })}
      arrow
      placement="top"
      classes={TooltipClasses}
    >
      <div className={soldData?.color ? '' : classes.info}>
        {t('product-card.sold-for-quantity', {
          sold: formatUnitNumber(soldData?.sold || 0),
          quantity: formatUnitNumber(soldData?.quantity || 1),
        })}
      </div>
    </Tooltip>
  );

  const renderedLikes = (
    <div
      onClick={e => {
        e.stopPropagation();
        if (!isConnected) {
          handleConnect();
        }
        if (!isLikeDisabled) {
          onLikeClick?.();
        }
      }}
      className={classNames(classes.info, classes.likeSite)}
    >
      <ButtonBase
        className={classNames(
          classes.likeBtn,
          isLiked && classes.likeBtnActive,
        )}
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

  const [now, setNow] = useState(Date.now());
  const count = useCount(2e3);
  useEffect(() => {
    setNow(Date.now());
  }, [count]);

  const isAuction =
    auctionType === AuctionType.EnglishAuction ||
    auctionType === AuctionType.EnglishAuction_Timing;
  const inAuction = openAt && closeAt && +openAt < now && +closeAt > now;
  const auctionEnd = closeAt && +closeAt <= now;
  const myPriceNumber = myBidderAmount || 0;
  // Figma 4
  const isOutBid = Boolean(
    !isBidderClaimed &&
    isAuction &&
    inAuction &&
    bidTopPrice &&
    myPriceNumber > 0 &&
    myPriceNumber < bidTopPrice,
  );
  // figama 1
  const isLost = Boolean(
    !isBidderClaimed &&
    isAuction &&
    auctionEnd &&
    bidTopPrice &&
    myPriceNumber > 0 &&
    myPriceNumber === bidTopPrice &&
    myPriceNumber < bidsReserveAmount,
  );
  // Figema 2
  const isWon = Boolean(
    !isBidderClaimed &&
    isAuction &&
    auctionEnd &&
    myPriceNumber > 0 &&
    myPriceNumber === bidTopPrice &&
    bidsReserveAmount &&
    myPriceNumber >= bidsReserveAmount,
  );
  // on sell
  const isSellerClaimMoney = Boolean(
    isOnSeller &&
    !isCreatorClaimed &&
    isAuction &&
    auctionEnd &&
    bidTopPrice &&
    bidTopPrice >= bidsReserveAmount,
  );
  const isSellerClaimNft =
    Boolean(
      isOnSeller &&
      !isCreatorClaimed &&
      isAuction &&
      auctionEnd &&
      bidTopPrice &&
      bidTopPrice < bidsReserveAmount,
    ) || Boolean(auctionEnd && bidTopPrice === 0);

  const isPutSaleTimeCancel = Boolean(openAt && +openAt > now);
  const isSellerCancel = Boolean(
    !isPutSaleTimeCancel && isOnSeller && !isCreatorClaimed && !isAuction,
  );

  const RenderChiaIcon = ({ className }: { className?: string }) => {
    return (
      <ChainSymbolIcon
        display="flex"
        alignItems="center"
        className={classes.topChiaIcon}
        chiaId={chainId}
      >
        {({ symbolName }) => {
          return <span className={classes.topChiaText}>{symbolName}</span>;
        }}
      </ChainSymbolIcon>
    );
  };
  return (
    <Card className={classNames(classes.root, className)} variant="outlined">
      <ConditionalWrapper
        condition={!!href}
        wrapper={
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => history.push(href ?? '#')}
          ></div>
        }
      >
        <Box
          display="flex"
          justifyContent="space-between"
          className={classes.topBar}
        >
          <RenderChiaIcon />
          {renderedLikes}
        </Box>
        <div className={classes.relative}>
          {renderMediaContent()}
          {isPutSaleTimeCancel && openAt && (
            <CardPutSaleTimer openAt={openAt} />
          )}
          {isOutBid && <BidsState type={BidsType.OUTBID} />}
          {isLost && <BidsState type={BidsType.LOST} />}
          {isWon && <BidsState type={BidsType.WON} />}
        </div>

        <CardContent className={classes.content}>
          {profileInfo}

          <hr className={classes.devider} />

          {stateTip && <p className={classes.stateTip}>{stateTip}</p>}

          <div className={classes.meta}>
            <div className={classes.saleMeta}>
              {isOnSale && price && (
                <div className={classes.saleContainer}>
                  <div className={classes.saleType}>
                    {(auctionType === AuctionType.FixedSwap ||
                      auctionType === AuctionType.FixedSwap_Timing) &&
                      (state === FixedSwapState.Live
                        ? t('product-card.price')
                        : t('product-card.sold-for'))}
                    {(auctionType === AuctionType.EnglishAuction ||
                      auctionType === AuctionType.EnglishAuction_Timing) &&
                      (state === AuctionState.Live
                        ? isSellerClaimMoney
                          ? t('product-card.sold-for')
                          : t('product-card.top-bid')
                        : t('product-card.sold-for'))}{' '}
                  </div>

                  <div className={classes.price}>
                    {formatUnitNumber(price.toNumber(), 4)} {priceType}
                  </div>
                  <div className={classes.infoRight}>
                    {!hasRightButton && (
                      <div className={classes.infoContainer}>
                        {isOnSale && soldData && renderSolds}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {!isOnSale && (
                <div className={classes.infoContainer}>
                  <div>{copies !== undefined ? renderedCopies : <></>}</div>
                </div>
              )}
            </div>

            <div
              onClick={e => e.stopPropagation()}
              className={classes.rightWrapper}
            >
              <div>
                {isCancelTimePut && !isOther ? (
                  <CancelPutTime
                    auctionType={auctionType}
                    id={poolId}
                    reload={reload}
                  />
                ) : (
                  <></>
                )}
                {isSellerCancel && !isOther && (
                  <CancelPutOnSale
                    auctionType={auctionType}
                    id={poolId}
                    reload={reload}
                  />
                )}

                {!isCancelTimePut && !isSellerCancel && !isOther && (
                  <>
                    {isLost && (
                      <ClaimFunds
                        auctionType={auctionType}
                        id={poolId}
                        type={BidsType.LOST}
                        isBidder={isBidder}
                        reload={reload}
                      />
                    )}
                    {isWon && (
                      <ClaimFunds
                        auctionType={auctionType}
                        id={poolId}
                        type={BidsType.WON}
                        isBidder={isBidder}
                        reload={reload}
                      />
                    )}
                    {isSellerClaimMoney && (
                      <ClaimFunds
                        auctionType={auctionType}
                        id={poolId}
                        type={BidsType.LOST}
                        isBidder={false}
                        text={t('product-card.claim-funds')}
                        reload={reload}
                      />
                    )}
                    {isSellerClaimNft && (
                      <ClaimFunds
                        auctionType={auctionType}
                        id={poolId}
                        type={BidsType.LOST}
                        isBidder={false}
                        text={t('product-card.claim-back')}
                        reload={reload}
                      />
                    )}
                    {isBidder && isBidderClaimed && (
                      <Button variant="outlined" rounded disabled>
                        {t('product-card.claimed')}
                      </Button>
                    )}
                    {isOnSeller && isCreatorClaimed && (
                      <Button variant="outlined" rounded disabled>
                        {t('product-card.claimed')}
                      </Button>
                    )}

                    {!isMinting && !isOnSalePending && (
                      <Box display="flex" alignItems="center">
                        {!(copiesBalance && copiesBalance >= 0) ? (
                          <></>
                        ) : (
                          <>
                            {toSale && (
                              <Button
                                className={classes.saleBtn}
                                component={RouterLink}
                                variant="outlined"
                                rounded
                                to={toSale}
                              >
                                {t('product-card.put-on-sale')}
                              </Button>
                            )}
                          </>
                        )}
                      </Box>
                    )}
                  </>
                )}
              </div>
              {hasAction && (
                <div onClick={e => e.stopPropagation()}>
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
                        disabled={(copiesBalance ?? -1) <= 0}
                      >
                        {t('product-card.transfer')}
                      </MenuItem>

                      {/* <MenuItem
                      className={classes.menuItem}
                      onClick={onBurnClick}
                    >
                      {t('product-card.burn')}
                    </MenuItem> */}
                    </MenuList>
                  </Popover>
                </div>
              )}
            </div>
          </div>

          {hasRightButton && (
            <div className={classes.infoContainer}>
              {isOnSale && (
                <>
                  {!endDate && copies && renderedCopies}

                  {soldData && renderSolds}
                </>
              )}
            </div>
          )}
        </CardContent>
      </ConditionalWrapper>
    </Card>
  );
};
