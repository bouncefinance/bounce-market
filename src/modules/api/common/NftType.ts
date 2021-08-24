import { UserRoleType } from 'modules/common/actions/queryAccountInfo';

export enum NftType {
  ERC721,
  ERC1155,
}

export interface IPoolAvatar {
  address: string;
  avatar: string;
  identity: UserRoleType;
  name: string;
}

export type NftAvatarsType = 'collection' | 'creator' | 'owner';
export interface INftAvatar extends IPoolAvatar {
  typLabel: string;
  typName: NftAvatarsType;
}

export type INftAvatars = INftAvatar[];
export interface IPoolAvatars {
  collectioninfo: IPoolAvatar;
  creator?: IPoolAvatar;
  owner?: IPoolAvatar;
}
