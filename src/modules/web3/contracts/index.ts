import { default as BounceERC1155WithSignRaw } from './BounceERC1155WithSign.json';
import { default as BounceERC20Raw } from './BounceERC20.json';
import { default as BounceERC721WithSignRaw } from './BounceERC721WithSign.json';
import { default as BounceEnglishAuctionNFTRaw } from './BounceEnglishAuctionNFT.json';
import { default as BounceFixedSwapNFTRaw } from './BounceFixedSwapNFT.json';
import { AbiItem } from 'web3-utils';

export const BounceERC1155WithSign: AbiItem = (BounceERC1155WithSignRaw.abi as unknown) as AbiItem;
export const BounceERC20: AbiItem = (BounceERC20Raw.abi as unknown) as AbiItem;
export const BounceERC721WithSign: AbiItem = (BounceERC721WithSignRaw.abi as unknown) as AbiItem;
export const BounceEnglishAuctionNFT: AbiItem = (BounceEnglishAuctionNFTRaw.abi as unknown) as AbiItem;
export const BounceFixedSwapNFT: AbiItem = (BounceFixedSwapNFTRaw.abi as unknown) as AbiItem;
