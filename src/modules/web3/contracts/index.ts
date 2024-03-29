import { default as MulticallRaw } from './Multicall.json';
import { default as BounceERC1155WithSignRaw } from './BounceERC1155WithSign.json';
import { default as BounceERC20Raw } from './BounceERC20.json';
import { default as BounceERC721WithSignRaw } from './BounceERC721WithSign.json';
import { default as BounceEnglishAuctionNFTRaw } from './BounceEnglishAuctionNFT.json';
import { default as BounceEnglishAuctionNFTTimeRaw } from './BounceFixedEndEnglishAuctionNFTV2.json';
import { default as BounceFixedSwapNFTRaw } from './BounceFixedSwapNFT.json';
import { default as BounceFixedSwapNFT_TIME_Raw } from './BounceFixedSwapNFTTIME.json';
import { default as BounceErc721Raw } from './BounceErc721.json';
import { default as BounceErc1155Raw } from './BounceErc1155.json';
import { default as BounceNFTFactoryV2Raw } from './BounceNFTFactoryV2.json';
import { default as OwnableUpgradeSafeRaw } from './OwnableUpgradeSafe.json';
import { default as RoyaltyConfig } from './RoyaltyConfig.json';
import { default as BounceBlindBoxRaw } from './BounceBlindBox.json';
import { AbiItem } from 'web3-utils';

export const MultiCallAbi: AbiItem = (MulticallRaw as unknown) as AbiItem;
export const BounceERC1155WithSign: AbiItem = (BounceERC1155WithSignRaw.abi as unknown) as AbiItem;
export const BounceERC20: AbiItem = (BounceERC20Raw.abi as unknown) as AbiItem;
export const BounceERC721WithSign: AbiItem = (BounceERC721WithSignRaw.abi as unknown) as AbiItem;
export const BounceEnglishAuctionNFT: AbiItem = (BounceEnglishAuctionNFTRaw.abi as unknown) as AbiItem;
export const BounceEnglishAuctionNFTTime: AbiItem = (BounceEnglishAuctionNFTTimeRaw.abi as unknown) as AbiItem;
export const BounceFixedSwapNFT: AbiItem = (BounceFixedSwapNFTRaw.abi as unknown) as AbiItem;
export const BounceFixedSwapNFTTime: AbiItem = (BounceFixedSwapNFT_TIME_Raw.abi as unknown) as AbiItem;
export const BoucneErc721Bytecode = BounceErc721Raw.bytecode;
export const BounceErc721: AbiItem = (BounceErc721Raw.abi as unknown) as AbiItem;
export const BoucneErc1155Bytecode = BounceErc1155Raw.bytecode;
export const BounceErc1155: AbiItem = (BounceErc1155Raw.abi as unknown) as AbiItem;
export const BounceNFTFactoryV2: AbiItem = (BounceNFTFactoryV2Raw.abi as unknown) as AbiItem;
export const OwnableUpgradeSafe: AbiItem = (OwnableUpgradeSafeRaw.abi as unknown) as AbiItem;
export const BounceRoyalty: AbiItem = (RoyaltyConfig.abi as unknown) as AbiItem;
export const BounceBlindBox: AbiItem = (BounceBlindBoxRaw.abi as unknown) as AbiItem;
