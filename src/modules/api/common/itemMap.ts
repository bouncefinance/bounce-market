import { isOtherPlatformCode } from 'modules/common/conts';
import { INftItem, IOriginNftItem } from './itemType';
import { getNftAvatars } from './nftCardMap';

export const mapNftItemData = (data: IOriginNftItem[]): INftItem[] => {
  return (
    data?.map(item => {
      return {
        ...item,
        avatars: getNftAvatars({
          avatars: item,
          isPlatform: item.isplatform === isOtherPlatformCode,
        }),
        isLike: Boolean(item.mylikecount),
        tokenId: item.tokenid,
        itemId: item.tokenid,
        likeCount: item.likecount,
        fileUrl: item.fileurl,
        contractAddress: item.contractaddress,
        poolId: 0,
        isItemType: true,
        name: item.itemname ?? item.name,
        litimgurl: item.litimgurl,
      };
    }) ?? []
  );
};
