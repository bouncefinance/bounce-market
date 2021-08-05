import { Grid } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';
import { fetchItem, fetchItem2 } from 'modules/buyNFT/actions/fetchItem';
import { Info } from 'modules/buyNFT/components/Info';
import { InfoDescr } from 'modules/buyNFT/components/InfoDescr';
import {
  InfoTabs,
  NftInfoDetailOption,
  NftInfoOwnersOption,
} from 'modules/buyNFT/components/InfoTabs';
import { InfoTabsList } from 'modules/buyNFT/components/InfoTabsList';
import { NftLikeBtn } from 'modules/buyNFT/components/LikeBtn';
import { MediaContainer } from 'modules/buyNFT/components/MediaContainer';
import { TokenInfo } from 'modules/buyNFT/components/TokenInfo';
import { UserRoleEnum } from 'modules/common/actions/queryAccountInfo';
import { ProfileInfo } from 'modules/common/components/ProfileInfo';
import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/common/types/ResponseData';
import { truncateWalletAddr } from 'modules/common/utils/truncateWalletAddr';
import { t } from 'modules/i18n/utils/intl';
import { ProfileRoutesConfig } from 'modules/profile/ProfileRoutes';
import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useBuyNFTStyles } from './useBuyNFTStyles';

export const BuyItemNFT = () => {
  const classes = useBuyNFTStyles();
  const { poolId: tokenIdParam, contract } = useParams<{
    poolId: string;
    contract: string;
  }>();

  const tokenId = parseInt(tokenIdParam, 10);
  const dispatch = useDispatchRequest();

  const init = useCallback(() => {
    (async () => {
      dispatch(fetchItem({ contract, id: tokenId }));
      dispatch(fetchItem2({ contract, id: tokenId }));
    })();
  }, [dispatch, tokenId, contract]);

  useEffect(() => {
    init();
  }, [init]);

  const saleTime = false;
  const onChangeTime = () => {};

  const wrapperTitle = (name: string, address: string) => {
    return name || truncateWalletAddr(address);
  };
  const getSenderName = (sender: {
    username: string;
    owneraddress: string;
  }) => {
    return sender.username || truncateWalletAddr(sender.owneraddress);
  };

  return (
    <Queries<ResponseData<typeof fetchItem>, ResponseData<typeof fetchItem2>>
      requestActions={[fetchItem, fetchItem2]}
    >
      {({ data: item }, { data: poolDetails }) => {
        const renderedCreator = (
          <ProfileInfo
            subTitle={t('details-nft.role.minter')}
            title={wrapperTitle(
              poolDetails?.minter?.username,
              poolDetails?.minter?.address,
            )}
            users={[
              {
                name: wrapperTitle(
                  poolDetails?.minter?.username,
                  poolDetails?.minter?.address,
                ),
                href: ProfileRoutesConfig.OtherProfile.generatePath(
                  poolDetails?.minter?.address,
                ),
                avatar: poolDetails?.minter?.avatar,
                verified: item?.identity === UserRoleEnum.Verified,
              },
            ]}
          />
        );

        const renderedOwner = poolDetails.collection?.name ? (
          <>
            {poolDetails?.owners?.slice(0, 1)?.map(item => (
              <ProfileInfo
                subTitle={t('details-nft.role.collection')}
                title={wrapperTitle(
                  poolDetails.collection.name,
                  poolDetails.collection.address,
                )}
                users={[
                  {
                    name: poolDetails.collection.name,
                    avatar: poolDetails.collection.avatar,
                  },
                ]}
              />
            ))}
          </>
        ) : (
          <></>
        );
        const renderedOnwersList = (
          <InfoTabsList>
            {poolDetails?.owners?.map(item => {
              return (
                <ProfileInfo
                  key={item.owneraddress}
                  isTitleFirst
                  avatarSize="big"
                  title={getSenderName(item)}
                  subTitle={t('details-nft.owner.balance', {
                    balance: item.balance,
                  })}
                  users={[
                    {
                      name: getSenderName(item),
                      href: ProfileRoutesConfig.OtherProfile.generatePath(
                        item.owneraddress,
                      ),
                      avatar: item.avatar,
                    },
                  ]}
                />
              );
            })}
          </InfoTabsList>
        );

        const renderedTokenInfoList = (
          <InfoTabsList>
            <TokenInfo
              name={item.itemName}
              itemSymbol={item.itemSymbol}
              standard={item.standard}
              contractAddress={item.contractAddress}
              supply={item.supply}
              tokenId={item.id}
            />
          </InfoTabsList>
        );
        return (
          <div className={classes.root}>
            <MediaContainer
              className={classes.imgContainer}
              src={item.fileUrl}
              title={item.itemName}
              description={item.description}
              category={item.category}
              isOpenSaleTime={saleTime}
              onchange={onChangeTime}
            />
            <Info className={classes.info}>
              <InfoDescr
                title={item.itemName}
                description={item.description}
                // copiesCurrent={item.balance}
                currentPage="itemDetail"
                copiesTotal={item.supply}
                creator={renderedCreator}
                owner={renderedOwner}
                LikeBtn={
                  <Grid item xs="auto">
                    <NftLikeBtn
                      isItemType
                      id={item.id}
                      count={item.likeCount}
                      isLike={item.isLike}
                    />
                  </Grid>
                }
              />
              <InfoTabs
                tabs={[NftInfoOwnersOption, NftInfoDetailOption]}
                tokenInfo={renderedTokenInfoList}
                owners={renderedOnwersList}
              />
            </Info>
          </div>
        );
      }}
    </Queries>
  );
};
