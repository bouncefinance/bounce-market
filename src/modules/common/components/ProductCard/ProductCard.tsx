import { Mutation, useDispatchRequest } from '@redux-requests/react';
import { poolTypeMap } from 'modules/common/api/poolType';
import { AuctionType } from 'modules/overview/api/auctionType';
import { useLike } from 'modules/profile/hooks/useLike';
import React, { useCallback } from 'react';
import { useMemo } from 'react';
import {
  IProductCardComponentProps,
  ProductCardComponent,
} from './ProductCardComponent';
import { transferToken } from 'modules/common/actions/transferToken';
import { burnToken } from 'modules/common/actions/burnToken';
import { useDialog } from 'modules/buyNFT/screens/BuyNFT/useDialog';
import {
  ITransferFormValues,
  TransferTokenDialog,
} from 'modules/brand/components/TransferTokenDialog';
import {
  BurnTokenDialog,
  IBurnFormValues,
} from 'modules/brand/components/BurnTokenDialog';
import { NftType } from 'modules/common/api/NftType';

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
}

export const ProductCard = ({
  id,
  poolId,
  auctionType,
  MediaProps,
  onLikeClick,
  likes,
  contractAddress,
  standard = -1,
  queryAction,
  maxQuantity,
  state,
  ...restProps
}: IProductCardProps) => {
  const {
    isLiked,
    isLikeDisabled,
    onLikeClick: likeClickHandler,
    likeCount,
  } = useLike({
    id,
    poolId,
    poolType: auctionType ? +poolTypeMap[auctionType] : undefined,
    category: MediaProps.category,
    count: likes,
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
        closeBurn();
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
