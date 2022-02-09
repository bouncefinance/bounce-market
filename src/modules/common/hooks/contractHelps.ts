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

export const getApeSwapContract = (chainID: number) => {
  switch (chainID) {
    case 1: return '';
    case 4:  return '0xa2655d3a8197bD16259461d3FACe52F48d7D5B89';
    case 56: return ''
    case 128: return ''
    case 137: return '';
    default:
      return '0xa2655d3a8197bD16259461d3FACe52F48d7D5B89';
  }
}

export const getApeContract = (chainID: number) => {
  switch (chainID) {
    case 1: return '';
    case 4:  return '0x4ab5117195e6a4921ae90312a914d7f5a769455e';
    case 56: return ''
    case 128: return ''
    case 137: return '';
    default:
      return '0x4ab5117195e6a4921ae90312a914d7f5a769455e';
  }
}