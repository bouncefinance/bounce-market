import { compare } from 'modules/brand/api/queryBrand';
import { UserRoleEnum } from 'modules/common/actions/queryAccountInfo';
import {
  truncateLongName,
  truncateWalletAddr,
} from 'modules/common/utils/truncateWalletAddr';
import { ProfileRoutesConfig, ProfileTab } from 'modules/profile/ProfileRoutes';
import { t } from '../../i18n/utils/intl';
import {
  INftAvatars,
  IPoolAvatar,
  IPoolAvatars,
  NftAvatarsType,
} from './NftType';

type getNftAvatarsType = (options: {
  avatars: IPoolAvatars;
  isPlatform: boolean;
}) => INftAvatars;

export const getNftAvatars: getNftAvatarsType = ({ avatars, isPlatform }) => {
  let initData: {
    typName: NftAvatarsType;
    value: IPoolAvatar;
  }[] = [];
  if (avatars?.collectioninfo?.name) {
    initData = initData.concat({
      typName: 'collection',
      value: avatars?.collectioninfo,
    });
  }
  if (avatars?.creator?.address && !isPlatform) {
    initData = initData.concat({ typName: 'creator', value: avatars.creator });
  }
  if (avatars?.owner?.address) {
    initData = initData.concat({ typName: 'owner', value: avatars.owner });
  }
  try {
    return initData.map(e => {
      return {
        ...e.value,
        name: !compare(e.value.name, e.value.address)
          ? truncateLongName(e.value.name)
          : truncateWalletAddr(e.value.address),
        typLabel: t(`avatarsType.${e.typName}`),
        typName: e.typName,
        verified: e.value.identity === UserRoleEnum.Verified,
        href:
          e.typName === 'collection'
            ? ProfileRoutesConfig.Collection.generatePath(
                e.value.address,
                ProfileTab.sells,
              )
            : ProfileRoutesConfig.OtherProfile.generatePath(e.value.address),
      };
    });
  } catch (error) {
    return [];
  }
};
