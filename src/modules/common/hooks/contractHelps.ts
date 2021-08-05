import { AuctionType } from 'modules/api/common/auctionType';
import {
  getEnglishAuctionContract,
  getFixedSwapContract,
} from 'modules/createNFT/actions/publishNft';
import {
  BounceEnglishAuctionNFT,
  BounceEnglishAuctionNFTTime,
  BounceFixedSwapNFT,
  BounceFixedSwapNFTTime,
} from 'modules/web3/contracts';

export const getPoolAddress = ({
  poolType,
  chainId,
}: {
  poolType: AuctionType;
  chainId: number;
}) => {
  if (
    poolType === AuctionType.FixedSwap ||
    poolType === AuctionType.FixedSwap_Timing
  ) {
    return getFixedSwapContract(
      chainId,
      poolType === AuctionType.FixedSwap_Timing,
    );
  }
  return getEnglishAuctionContract(
    chainId,
    poolType === AuctionType.EnglishAuction_Timing,
  );
};

export const getPoolContract = (poolType: AuctionType) => {
  return poolType === AuctionType.FixedSwap_Timing
    ? BounceFixedSwapNFTTime
    : poolType === AuctionType.FixedSwap
    ? BounceFixedSwapNFT
    : poolType === AuctionType.EnglishAuction_Timing
    ? BounceEnglishAuctionNFTTime
    : poolType === AuctionType.EnglishAuction
    ? BounceEnglishAuctionNFT
    : BounceFixedSwapNFTTime;
};
