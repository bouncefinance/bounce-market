import { Channel, NftType } from '../../createNFT/actions/createNft';

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
    fileUrl: string;
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
    standard: 0 | 1;
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
  contractAddress: string;
  createdAt: Date;
  description: string;
  externallink: string;
  fileurl: string;
  fileUrl: string;
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
  standard: NftType;
  stats: string;
  status: number;
  supply: number;
  unlockablecontent: number;
  updatedAt: Date;
}

export function mapNFTDetails({
  data: { created_at, updated_at, standard, fileurl, fileUrl, ...rest },
}: IApiNFTDetails): INFTDetails {
  return {
    createdAt: new Date(created_at),
    updatedAt: new Date(updated_at),
    standard: standard,
    contractAddress: rest.contractaddress,
    fileUrl: fileurl,
    fileurl,
    ...rest,
  };
}
