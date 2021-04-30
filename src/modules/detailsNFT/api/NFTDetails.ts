import { Channel } from '../../createNFT/actions/createNft';

export interface IApiNFTDetails {
  code: number;
  data: {
    brandid: number;
    category: 'image';
    channel: Channel;
    contractaddress: string;
    created_at: string;
    description: string;
    externallink: string;
    fileurl: string;
    id: number;
    itemname: string;
    itemsymbol: 'BOUNCE';
    levels: string;
    metadata: string;
    owneraddress: string;
    ownername: string;
    popularweight: number;
    price: string;
    properties: string;
    standard: number;
    stats: string;
    status: number;
    supply: number;
    unlockablecontent: number;
    updated_at: string;
  };
}

export interface INFTDetails {
  brandid: number;
  category: 'image';
  channel: Channel;
  contractaddress: string;
  createdAt: Date;
  description: string;
  externallink: string;
  fileurl: string;
  id: number;
  itemname: string;
  itemsymbol: 'BOUNCE';
  levels: string;
  metadata: string;
  owneraddress: string;
  ownername: string;
  popularweight: number;
  price: string;
  properties: string;
  standard: number;
  stats: string;
  status: number;
  supply: number;
  unlockablecontent: number;
  updatedAt: Date;
}

export function mapNFTDetails({
  data: { created_at, updated_at, ...rest },
}: IApiNFTDetails): INFTDetails {
  return {
    createdAt: new Date(created_at),
    updatedAt: new Date(updated_at),
    ...rest,
  };
}
