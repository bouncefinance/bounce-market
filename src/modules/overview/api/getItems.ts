import BigNumber from 'bignumber.js';
import { AuctionState } from '../../common/const/AuctionState';
import { Address } from '../../common/types/unit';
import { NftType } from '../../createNFT/actions/createNft';
import { AuctionType } from './auctionType';
import { FixedSwapState } from '../../common/const/FixedSwapState';

export interface IApiItem {
  brandid: number;
  category: 'image';
  channel: string;
  contractaddress: Address;
  created_at: string;
  description: string;
  externallink: string;
  fileurl: string;
  id: number;
  itemname: string;
  itemsymbol: 'BOUNCE';
  levels: string;
  litimgurl: string;
  metadata: string;
  owneraddress: Address;
  ownername: string;
  popularweight: number;
  price: string;
  properties: string;
  standard: NftType;
  stats: string;
  status: AuctionState;
  supply: number;
  unlockablecontent: number;
  updated_at: string;
}

export interface IItem {
  brandId: number;
  category: 'image';
  channel: string;
  contractAddress: Address;
  description: string;
  externalLink: string;
  fileUrl: string;
  id: number;
  itemName: string;
  itemSymbol: 'BOUNCE';
  levels: string;
  litimgurl: string;
  metadata: string;
  ownerAddress: Address;
  ownerName: string;
  popularWeight: number;
  price: BigNumber;
  properties: string;
  standard: NftType;
  stats: string;
  status: AuctionState;
  supply: number;
  unlockableContent: number;
  createdAt: Date;
  updateAt: Date;
  closeAt?: Date;
  poolId?: number;
  poolType?: AuctionType;
  state?: AuctionState | FixedSwapState;
}

export function hasBrand(item: IItem) {
  return item.brandId && item.brandId !== 10;
}

export function mapItem(item: IApiItem): IItem {
  return {
    brandId: item.brandid,
    category: item.category,
    channel: item.channel,
    contractAddress: item.contractaddress,
    description: item.description,
    externalLink: item.externallink,
    fileUrl: item.fileurl,
    id: item.id,
    itemName: item.itemname,
    itemSymbol: item.itemsymbol,
    levels: item.levels,
    litimgurl: item.litimgurl,
    metadata: item.metadata,
    ownerAddress: item.owneraddress,
    ownerName: item.ownername,
    popularWeight: item.popularweight,
    price: item.price ? new BigNumber(item.price) : new BigNumber(0),
    properties: item.properties,
    standard: item.standard,
    stats: item.stats,
    status: item.status,
    supply: item.supply,
    unlockableContent: item.unlockablecontent,
    createdAt: new Date(item.created_at),
    updateAt: new Date(item.updated_at),
  };
}
