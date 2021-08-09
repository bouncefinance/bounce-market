import { AuctionType } from 'modules/api/common/auctionType';

export const getPoolKey = (like: { poolId: number; poolType: string }) =>
  [like.poolId, like.poolType].join(',');

export const isFixedSwap = (poolType: AuctionType) => {
  return (
    poolType === AuctionType.FixedSwap ||
    poolType === AuctionType.FixedSwap_Timing
  );
};
