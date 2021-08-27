import { Mutation, useDispatchRequest } from '@redux-requests/react';
import { AuctionType } from 'modules/api/common/auctionType';
import { NftType } from 'modules/api/common/NftType';
import {
  BurnTokenDialog,
  IBurnFormValues,
} from 'modules/brand/components/BurnTokenDialog';
import {
  ITransferFormValues,
  TransferTokenDialog,
} from 'modules/brand/components/TransferTokenDialog';
import { useDialog } from 'modules/buyNFT/screens/BuyNFT/useDialog';
import { burnToken } from 'modules/common/actions/burnToken';
import { transferToken } from 'modules/common/actions/transferToken';
import { useLike } from 'modules/profile/hooks/useLike';
import React, { useCallback, useMemo } from 'react';
import {
  IProductCardComponentProps,
  ProductCardComponent,
} from './ProductCardComponent';

export interface IProductCardProps
  extends Omit<IProductCardComponentProps, 'isLiked'> {
  id: number;
  poolId: number;
  auctionType?: AuctionType;
  contractAddress?: string;
  standard?: NftType;
  maxQuantity?: number;
  queryAction?: () => void;
  state?: number;
  isLike?: boolean;
  isItemType?: boolean;
  bidTopPrice?: number;
  bidsReserveAmount?: number;
  myBidderAmount?: number;
  isBidder?: boolean;
  isOnSeller?: boolean;
  isBidderClaimed?: boolean;
  isCreatorClaimed?: boolean;
  isOther?: boolean;
  isTotalSupply?: boolean;
  reload?: () => void;
}

export const ProductCard = ({
  id,
  poolId,
  auctionType,
  MediaProps,
  onLikeClick,
  isLike = false,
  isItemType = false,
  likes,
  contractAddress,
  standard = -1,
  queryAction,
  maxQuantity,
  state,
  reload,
  ...restProps
}: IProductCardProps) => {
  const {
    isLiked,
    isLikeDisabled,
    onLikeClick: likeClickHandler,
    likeCount,
  } = useLike({
    id,
    category: MediaProps.category,
    count: likes,
    contractAddress,
  });

  const handleLikeClick = useCallback(() => {
    if (typeof onLikeClick === 'function') {
      onLikeClick();
    }

    likeClickHandler();
  }, [likeClickHandler, onLikeClick]);

  const dispatch = useDispatchRequest();

  const hasAction = useMemo(() => {
    return !!contractAddress && standard > -1 && !!id;
  }, [contractAddress, standard, id]);

  const {
    opened: transferOpen,
    open: openTransfer,
    close: closeTransfer,
  } = useDialog();
  const { opened: burnOpen, open: openBurn, close: closeBurn } = useDialog();

  const onTransferClick = useCallback(() => {
    if (hasAction) {
      openTransfer();
    }
  }, [hasAction, openTransfer]);

  const onBurnClick = useCallback(() => {
    if (hasAction) {
      openBurn();
    }
  }, [hasAction, openBurn]);

  const handleTransfer = (data: ITransferFormValues) => {
    if (contractAddress) {
      dispatch(
        transferToken(
          contractAddress,
          standard,
          id,
          data.toAddress,
          data.quantity,
        ),
      ).then(({ error }) => {
        closeTransfer();
        reload?.();
        if (!error && queryAction) {
          queryAction();
        }
      });
    }
  };

  const handleBurn = (data: IBurnFormValues) => {
    if (contractAddress) {
      dispatch(burnToken(contractAddress, standard, id, data.quantity)).then(
        ({ error }) => {
          closeBurn();
          reload?.();
          if (!error && queryAction) {
            queryAction();
          }
        },
      );
    }
  };

  return (
    <>
      <ProductCardComponent
        id={id}
        isLiked={isLiked}
        isLikeDisabled={isLikeDisabled}
        onLikeClick={handleLikeClick}
        hasAction={hasAction}
        onTransferClick={onTransferClick}
        onBurnClick={onBurnClick}
        MediaProps={MediaProps}
        likes={likeCount}
        auctionType={auctionType}
        state={state}
        poolId={poolId}
        reload={reload}
        {...restProps}
      />
      <Mutation type={transferToken.toString()}>
        {({ loading }) => (
          <TransferTokenDialog
            loading={loading}
            maxQuantity={maxQuantity}
            isOpen={transferOpen}
            onClose={closeTransfer}
            standard={standard}
            onSubmit={handleTransfer}
          />
        )}
      </Mutation>
      <Mutation type={burnToken.toString()}>
        {({ loading }) => (
          <BurnTokenDialog
            loading={loading}
            maxQuantity={maxQuantity}
            isOpen={burnOpen}
            onClose={closeBurn}
            standard={standard}
            onSubmit={handleBurn}
          />
        )}
      </Mutation>
    </>
  );
};
