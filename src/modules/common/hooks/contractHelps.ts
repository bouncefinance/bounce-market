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
import { isFixedSwap } from '../utils/poolHelps';

export const getPoolAddress = ({
  poolType,
  chainId,
}: {
  poolType: AuctionType;
  chainId: number;
}) => {
  if (isFixedSwap(poolType)) {
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
  const poolTypes = {
    [AuctionType.FixedSwap_Timing]: BounceFixedSwapNFTTime,
    [AuctionType.FixedSwap]: BounceFixedSwapNFT,
    [AuctionType.EnglishAuction_Timing]: BounceEnglishAuctionNFTTime,
    [AuctionType.EnglishAuction]: BounceEnglishAuctionNFT,
  };
  return poolTypes[poolType] || poolTypes[AuctionType.FixedSwap_Timing];
};
