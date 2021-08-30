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
import { ScanBtn } from 'modules/buyNFT/components/ScanBtn';
import { TokenInfo } from 'modules/buyNFT/components/TokenInfo';
import { UserRoleEnum } from 'modules/common/actions/queryAccountInfo';
import { ProfileInfo } from 'modules/common/components/ProfileInfo';
import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/common/types/ResponseData';
import { truncateWalletAddr } from 'modules/common/utils/truncateWalletAddr';
import { t } from 'modules/i18n/utils/intl';
import { fetchPoolNftOwner } from 'modules/overview/actions/fetchPoolNftOwner';
import { ProfileRoutesConfig } from 'modules/profile/ProfileRoutes';
import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { uid } from 'react-uid';
import { RenderedDetailOwnersList } from './DetailOwner';
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
      dispatch(fetchPoolNftOwner({ tokenId, contract }));
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

  return (
    <Queries<
      ResponseData<typeof fetchItem>,
      ResponseData<typeof fetchItem2>,
      ResponseData<typeof fetchPoolNftOwner>
    >
      requestActions={[fetchItem, fetchItem2, fetchPoolNftOwner]}
    >
      {({ data: item }, { data: poolDetails }, { data: poolNftOwner }) => {
        const renderedCreator = (
          <ProfileInfo
            key={uid(item)}
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
        const shieldNameList = ['', 'BOUNCE'];
        const renderedCollection = () => {
          return !shieldNameList.includes(
            poolDetails?.collection.name || '',
          ) ? (
            <>
              {poolDetails?.collection?.address && (
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
                      href: ProfileRoutesConfig.Collection.generatePath(
                        poolDetails.collection.address,
                      ),
                      verified: item?.identity === UserRoleEnum.Verified,
                    },
                  ]}
                />
              )}
            </>
          ) : (
            <></>
          );
        };

        const renderedTokenInfoList = (
          <InfoTabsList>
            <ScanBtn contractAddress={item.contractAddress} />
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
              LikeBtn={
                <NftLikeBtn
                  id={item.id}
                  count={item.likeCount}
                  isLike={item.isLike}
                  contractAddress={item.contractAddress}
                />
              }
            />
            <Info className={classes.info}>
              <InfoDescr
                title={item.itemName}
                description={item.description}
                // copiesCurrent={item.balance}
                currentPage="itemDetail"
                copiesTotal={item.supply}
                creator={renderedCreator}
                owner={renderedCollection()}
                LikeBtn={<></>}
              />
              <InfoTabs
                tabs={[NftInfoOwnersOption, NftInfoDetailOption]}
                tokenInfo={renderedTokenInfoList}
                owners={<RenderedDetailOwnersList list={poolNftOwner} />}
              />
            </Info>
          </div>
        );
      }}
    </Queries>
  );
};
