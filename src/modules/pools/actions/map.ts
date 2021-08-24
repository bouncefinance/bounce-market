import BigNumber from 'bignumber.js';
import { AuctionState } from 'modules/api/common/AuctionState';
import { AuctionType } from 'modules/api/common/auctionType';
import { FixedSwapState } from 'modules/api/common/FixedSwapState';
import { getNftAvatars } from 'modules/api/common/nftCardMap';
import {
  auctionTypeMap,
  IPoolNftItem,
  OriginIPoolNftItem,
} from 'modules/api/common/poolType';
import { isFixedSwap } from 'modules/common/utils/poolHelps';
import Web3 from 'web3';

export const mapPoolData = (data: OriginIPoolNftItem[]): IPoolNftItem[] => {
  return data.map(item => {
    const isEnglishAuction = !isFixedSwap(
      (item.pooltype as unknown) as AuctionType,
    );
    const liveSate = isEnglishAuction ? AuctionState.Live : FixedSwapState.Live;
    const closeSate = isEnglishAuction
      ? AuctionState.Claimed
      : FixedSwapState.Completed;
    const openAt = new Date(item.open_at * 1e3);
    const closeAt = new Date(item.close_at * 1e3);
    const isCreatorClaimed = Boolean(item.creator_claimed);
    const isBidderClaimed = Boolean(item.bidder_claimed);
    return {
      ...item,
      price: new BigNumber(Web3.utils.fromWei(item.price)),
      openAt,
      closeAt,
      poolType: auctionTypeMap[item.pooltype ?? item.auction_type],
      state: item.state === 0 ? liveSate : closeSate,
      isLike: Boolean(item.mylikecount),
      poolId: item.poolid ?? item.pool_id,
      itemName: item.itemname,
      tokenId: item.tokenid,
      likeCount: item.likecount,
      fileUrl: item.fileurl,
      description: item.description,
      nftCardOption: {
        openAt,
        closeAt,
        now: Date.now(),
        isBidderClaimed,
        isCreatorClaimed,
      },
      avatars: getNftAvatars({
        avatars: item,
        isPlatform: Boolean(item.isplatform),
      }),
    };
  });
};
