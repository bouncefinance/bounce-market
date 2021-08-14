import BigNumber from 'bignumber.js';
import { AuctionState } from 'modules/api/common/AuctionState';
import { AuctionType } from 'modules/api/common/auctionType';
import { FixedSwapState } from 'modules/api/common/FixedSwapState';
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
    return {
      ...item,
      price: new BigNumber(Web3.utils.fromWei(item.price)),
      openAt: new Date(item.open_at * 1e3),
      closeAt: new Date(item.close_at * 1e3),
      poolType: auctionTypeMap[item.pooltype],
      state: item.state === 0 ? liveSate : closeSate,
      isLike: Boolean(item.mylikecount),
      poolId: item.poolid ?? item.pool_id,
      itemName: item.itemname,
      tokenId: item.tokenid,
      likeCount: item.likecount,
      fileUrl: item.fileurl,
      description: item.description,
    };
  });
};
