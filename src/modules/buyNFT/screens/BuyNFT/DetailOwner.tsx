import { Grid } from '@material-ui/core';
import { BuyNFTRoutesConfig } from 'modules/buyNFT/BuyNFTRoutes';
import { InfoTabsList } from 'modules/buyNFT/components/InfoTabsList';
import { ProfileInfo } from 'modules/common/components/ProfileInfo';
import {
  truncateLongName,
  truncateWalletAddr,
} from 'modules/common/utils/truncateWalletAddr';
import { t } from 'modules/i18n/utils/intl';
import { wrapperPoolNftOwner } from 'modules/overview/actions/fetchPoolNftOwner';
import { IRoleInfo } from 'modules/overview/actions/fetchRoleInfo';
import { ProfileRoutesConfig } from 'modules/profile/ProfileRoutes';
import { useBuyNFTStyles } from './useBuyNFTStyles';
import { Button } from 'modules/uiKit/Button';
import { auctionTypeMap, PoolType } from 'modules/api/common/poolType';
import { PoolState } from 'modules/api/common/AuctionState';

export const getSenderName = (sender: IRoleInfo) => {
  return (
    (sender.username !== 'Unnamed' && truncateLongName(sender.username)) ||
    truncateWalletAddr(sender.address)
  );
};

export const RenderedDetailOwnersList = ({
  poolId,
  list,
}: {
  list: wrapperPoolNftOwner[];
  poolId?: number;
}) => {
  const classes = useBuyNFTStyles();
  return (
    <InfoTabsList>
      {list?.map(item => {
        return (
          <Grid
            container
            className={classes.ownerWrapper}
            key={item.owner.address}
          >
            <Grid item>
              <ProfileInfo
                isTitleFirst
                avatarSize="big"
                title={getSenderName(item.owner)}
                subTitle={t('details-nft.owner.balance', {
                  balance: item.quantity,
                })}
                users={[
                  {
                    name: getSenderName(item.owner),
                    href: ProfileRoutesConfig.OtherProfile.generatePath(
                      item.owner.address,
                    ),
                    avatar: item.owner.avatar,
                    verified: item.owner.isVerify,
                  },
                ]}
              />
            </Grid>
            <Grid item className={classes.ownerBuy}>
              {item.poolType !== PoolType.Unknown && (
                <Button
                  variant="outlined"
                  rounded
                  href={BuyNFTRoutesConfig.DetailsNFT.generatePath(
                    item.poolId,
                    auctionTypeMap[item.poolType],
                  )}
                  disabled={
                    item.poolId === poolId || // 当前池子
                    item.poolstate === PoolState.Close // 已关闭池子
                  }
                >
                  {item.poolId === poolId
                    ? t('buy-dialog.current')
                    : t('buy-dialog.buy')}
                </Button>
              )}
            </Grid>
          </Grid>
        );
      })}
    </InfoTabsList>
  );
};
