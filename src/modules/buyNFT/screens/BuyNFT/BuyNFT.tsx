import { Box } from '@material-ui/core';
import {
  Mutation,
  useDispatchRequest,
  useMutation,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { BidDialog } from 'modules/buyNFT/components/BidDialog';
import { Info } from 'modules/buyNFT/components/Info';
import { InfoDescr } from 'modules/buyNFT/components/InfoDescr';
import { InfoPrices } from 'modules/buyNFT/components/InfoPrices';
import { InfoTabs } from 'modules/buyNFT/components/InfoTabs';
import {
  InfoTabsItem,
  InfoTabsIsTokenInfo,
} from 'modules/buyNFT/components/InfoTabsItem';
import { InfoTabsList } from 'modules/buyNFT/components/InfoTabsList';
import { MediaContainer } from 'modules/buyNFT/components/MediaContainer';
import { ProfileInfo } from 'modules/common/components/ProfileInfo';
import { featuresConfig } from 'modules/common/conts';
import { truncateWalletAddr } from 'modules/common/utils/truncateWalletAddr';
import { t } from 'modules/i18n/utils/intl';
import { useCallback, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Queries } from '../../../common/components/Queries/Queries';
import { AuctionState } from '../../../common/const/AuctionState';
import { FixedSwapState } from '../../../common/const/FixedSwapState';
import { ResponseData } from '../../../common/types/ResponseData';
import { Address } from '../../../common/types/unit';
import { throwIfDataIsEmptyOrError } from '../../../common/utils/throwIfDataIsEmptyOrError';
import { NftType } from '../../../createNFT/actions/createNft';
import { bidderClaim } from '../../../overview/actions/bidderClaim';
import { creatorClaim } from '../../../overview/actions/creatorClaim';
import { fetchCurrency } from '../../../overview/actions/fetchCurrency';
import { isEnglishAuction } from '../../../overview/actions/fetchPoolDetails';
import { fetchWeb3PoolDetails } from '../../../overview/actions/fetchWeb3PoolDetails';
import { fetchRoleInfo } from '../../../overview/actions/fetchRoleInfo';
import { fixedSwapCancel } from '../../../overview/actions/fixedSwapCancel';
import { AuctionType } from '../../../overview/api/auctionType';
import { ProfileRoutesConfig } from '../../../profile/ProfileRoutes';
import { bidEnglishAuction } from '../../actions/bidEnglishAuction';
import { buyFixed } from '../../actions/buyFixed';
import { fetchItem } from '../../actions/fetchItem';
import { BuyDialog } from '../../components/BuyDialog';
import { useBuyNFTStyles } from './useBuyNFTStyles';
import { useDialog } from './useDialog';
import { INFTDetails } from 'modules/buyNFT/api/NFTDetails';
import { fetchPoolHistory } from 'modules/overview/actions/fetchPoolHistory';

export const BuyNFT = () => {
  const classes = useBuyNFTStyles();
  const { poolId: poolIdParam, poolType } = useParams<{
    poolId: string;
    poolType: AuctionType;
  }>();
  const poolId = parseInt(poolIdParam, 10);
  const dispatch = useDispatchRequest();
  const {
    opened: openedBid,
    open: openBidDialog,
    close: closeBidDialog,
  } = useDialog();
  const {
    opened: openedFixedBuy,
    open: openFixedBuyDialog,
    close: closeFixedBuyDialog,
  } = useDialog();
  const {
    opened: openedEnglishBuy,
    open: openEnglishBuyDialog,
    close: closeEnglishBuyDialog,
  } = useDialog();
  const { push } = useHistory();

  const init = useCallback(() => {
    dispatch(fetchWeb3PoolDetails({ poolId, poolType })).then(response => {
      const { data } = throwIfDataIsEmptyOrError(response);
      dispatch(fetchRoleInfo({ poolId, poolType }));
      dispatch(fetchItem({ contract: data.tokenContract, id: data.tokenId }));
      // TODO: Dispatched twice. Here and in fetchWeb3PoolDetails
      dispatch(fetchCurrency({ unitContract: data.unitContract }));
      dispatch(fetchPoolHistory({ poolId, poolType }));
    });
  }, [dispatch, poolType, poolId]);

  useEffect(() => {
    init();
  }, [init]);

  const handleBidderClaim = useCallback(() => {
    dispatch(bidderClaim({ poolId })).then(({ error }) => {
      if (!error) {
        push(ProfileRoutesConfig.UserProfile.generatePath());
      }
    });
  }, [dispatch, poolId, push]);

  const handleCreatorClaim = useCallback(() => {
    dispatch(creatorClaim({ poolId })).then(({ error }) => {
      if (!error) {
        push(ProfileRoutesConfig.UserProfile.generatePath());
      }
    });
  }, [dispatch, poolId, push]);

  const handleFixedSwapCancel = useCallback(() => {
    dispatch(fixedSwapCancel({ poolId })).then(({ error }) => {
      if (!error) {
        init();
      }
    });
  }, [dispatch, init, poolId]);

  const handleBuyFixed = useCallback(
    (values: {
      nftType: NftType;
      unitContract: Address;
      amountTotal0: number;
      amountTotal1: BigNumber;
      poolId: number;
      quantity: number;
    }) => {
      dispatch(
        buyFixed({
          nftType: values.nftType,
          unitContract: values.unitContract,
          amountTotal1: values.amountTotal1,
          poolId: poolId,
          amountTotal0: values.amountTotal0,
          quantity: values.quantity,
        }),
      ).then(({ error }) => {
        if (!error) {
          push(ProfileRoutesConfig.UserProfile.generatePath());
        }
      });
    },
    [dispatch, poolId, push],
  );

  const { loading: fixedSwapCancelLoading } = useMutation({
    type: fixedSwapCancel.toString(),
  });

  const { loading: creatorClaimLoading } = useMutation({
    type: creatorClaim.toString(),
  });

  const { loading: bidderClaimLoading } = useMutation({
    type: bidderClaim.toString(),
  });

  const handleBuyEnglish = useCallback(
    (
      value:
        | {
            amountMax1?: BigNumber;
            unitContract: string;
            poolId: number;
          }
        | {
            bidPrice?: BigNumber;
            unitContract: string;
            poolId: number;
          },
    ) => {
      const { unitContract, poolId } = value;
      dispatch(
        bidEnglishAuction({
          amount: (value as any).amountMax1 || (value as any).bidPrice,
          unitContract,
          poolId,
        }),
      ).then(({ error }) => {
        if (!error) {
          closeBidDialog();
          closeFixedBuyDialog();
          closeEnglishBuyDialog();
          init();
        }
      });
    },
    [
      closeBidDialog,
      closeEnglishBuyDialog,
      closeFixedBuyDialog,
      dispatch,
      init,
    ],
  );

  return (
    <Queries<
      ResponseData<typeof fetchItem>,
      ResponseData<typeof fetchWeb3PoolDetails>,
      ResponseData<typeof fetchRoleInfo>
    >
      requestActions={[fetchItem, fetchWeb3PoolDetails, fetchRoleInfo]}
    >
      {({ data: item }, { data: poolDetails }, { data: RoleInfos }) => (
        <Queries<
          ResponseData<typeof fetchCurrency>,
          ResponseData<typeof fetchPoolHistory>
        >
          requestActions={[fetchCurrency, fetchPoolHistory]}
          requestKeys={[poolDetails.unitContract]}
        >
          {({ data: currency }, { data: poolHistory }) => {
            const wrapperTitle = (name: string, address: string) => {
              return name || truncateWalletAddr(address);
            };

            const ownerTitle =
              item.ownername || truncateWalletAddr(item.owneraddress);

            const renderedCreator = (
              <ProfileInfo
                subTitle="Minter"
                title={wrapperTitle(
                  RoleInfos.minter.username,
                  RoleInfos.minter.address,
                )}
                users={[
                  {
                    name: wrapperTitle(
                      RoleInfos.minter.username,
                      RoleInfos.minter.address,
                    ),
                    avatar: RoleInfos.minter.avatar,
                    verified: false,
                  },
                ]}
              />
            );

            const renderedOwner = (
              <ProfileInfo
                subTitle="Seller"
                title={wrapperTitle(
                  RoleInfos.creator.username,
                  RoleInfos.creator.address,
                )}
                users={[
                  {
                    name: wrapperTitle(
                      RoleInfos.creator.username,
                      RoleInfos.creator.address,
                    ),
                    avatar: RoleInfos.creator.avatar,
                  },
                ]}
              />
            );

            const renderedHistoryList = (
              <InfoTabsList>
                {poolHistory.map(item => {
                  let titleStr = '';
                  switch (item.event) {
                    case 'FixedSwapCreated':
                    case 'EnglishCreated':
                      titleStr = t('details-nft.history.create-str', {
                        quantity: item.quantity,
                        price: item.price,
                        symbol: item.symbol,
                      });
                      break;

                    case 'FixedSwapSwapped':
                      titleStr = t('details-nft.history.offer-str', {
                        quantity: item.quantity,
                        price: item.price,
                        symbol: item.symbol,
                      });
                      break;

                    case 'FixedSwapCanceled':
                      titleStr = t('details-nft.history.cancel-str');
                      break;

                    case 'EnglishClaimed':
                      titleStr = t('details-nft.history.claim-str');
                      break;

                    default:
                      break;
                  }

                  return (
                    <InfoTabsItem
                      key={item.time}
                      title={titleStr}
                      author={
                        item.sender.username ||
                        truncateWalletAddr(item.sender.address)
                      }
                      date={new Date(item.time)}
                    />
                  );
                })}
              </InfoTabsList>
            );

            const renderedBidsList = (
              <InfoTabsList>
                <InfoTabsItem
                  title="Bid placed"
                  author="Scarlett_vfx"
                  date={new Date()}
                  price={new BigNumber('10')}
                  cryptoCurrency="ETH"
                  cryptoPrice={new BigNumber(10.55413)}
                  href="//google.com"
                />
              </InfoTabsList>
            );

            const renderedOnwersList = (
              <InfoTabsList>
                <ProfileInfo
                  isTitleFirst
                  avatarSize="big"
                  title="Bombist"
                  subTitle="4 copies"
                  users={[
                    {
                      name: 'Bombist',
                      avatar: 'https://picsum.photos/44?random=1',
                    },
                  ]}
                />
              </InfoTabsList>
            );

            const renderTokenInfo = ({
              itemName,
              itemsymbol,
              standard,
              contractAddress,
              supply,
              id,
            }: INFTDetails) => {
              return (
                <div>
                  {contractAddress && (
                    <p>
                      <span>{t('details-nft.token-info.contract')}: </span>
                      {`${contractAddress}`}
                    </p>
                  )}
                  {id && (
                    <p>
                      <span>{t('details-nft.token-info.token-id')}: </span>
                      {`${id}`}
                    </p>
                  )}
                  {itemName && (
                    <p>
                      <span>{t('details-nft.token-info.name-tags')}:</span>
                      {` ${itemName} ${itemsymbol && `(${itemsymbol})`}`}
                    </p>
                  )}
                  {
                    <p>
                      <span>{t('details-nft.token-info.standard')}:</span>
                      {` ${
                        standard === NftType.ERC1155 ? 'ERC-1155' : 'ERC-721'
                      }`}
                    </p>
                  }
                  {(supply || supply === 0) && (
                    <p>
                      <span>{t('details-nft.token-info.total-supply')}:</span>
                      {` ${supply}`}
                    </p>
                  )}
                </div>
              );
            };

            const renderedTokenInfoList = (
              <InfoTabsList>
                <InfoTabsIsTokenInfo
                  contract={item.contractAddress}
                  isScan={true}
                />

                <InfoTabsIsTokenInfo desc={renderTokenInfo(item)} />
              </InfoTabsList>
            );

            const renderedComingSoon = (
              <Box mt={2}>{t('common.coming-soon')}</Box>
            );

            return (
              <div className={classes.root}>
                <MediaContainer
                  className={classes.imgContainer}
                  src={item.fileurl}
                  title={item.itemname}
                  description={item.description}
                  category={item.category}
                />

                <Info className={classes.info}>
                  <InfoDescr
                    title={item.itemname}
                    description={item.description}
                    copiesCurrent={
                      isEnglishAuction(poolDetails)
                        ? undefined
                        : poolDetails.quantity
                    }
                    copiesTotal={
                      isEnglishAuction(poolDetails)
                        ? poolDetails.tokenAmount0
                        : poolDetails.totalQuantity
                    }
                    creator={renderedCreator}
                    owner={renderedOwner}
                  />

                  {isEnglishAuction(poolDetails) ? (
                    <InfoPrices
                      endDate={poolDetails.closeAt}
                      price={
                        new BigNumber(
                          poolDetails.lastestBidAmount.multipliedBy(
                            currency.priceUsd,
                          ),
                        )
                      }
                      cryptoPrice={
                        poolDetails.lastestBidAmount.isEqualTo(0)
                          ? poolDetails.amountMin1
                          : poolDetails.lastestBidAmount
                      }
                      cryptoCurrency="BNB"
                      onBidClick={openBidDialog}
                      onBuyClick={openEnglishBuyDialog}
                      disabled={poolDetails.state !== AuctionState.Live}
                      loading={
                        fixedSwapCancelLoading ||
                        creatorClaimLoading ||
                        bidderClaimLoading
                      }
                      state={poolDetails.state}
                      role={poolDetails.role}
                      onBidderClaim={handleBidderClaim}
                      onCreatorClaim={handleCreatorClaim}
                    />
                  ) : (
                    <InfoPrices
                      price={poolDetails.price.multipliedBy(currency.priceUsd)}
                      cryptoPrice={poolDetails.price}
                      cryptoCurrency="BNB"
                      onBuyClick={openFixedBuyDialog}
                      disabled={poolDetails.state !== FixedSwapState.Live}
                      loading={
                        fixedSwapCancelLoading ||
                        creatorClaimLoading ||
                        bidderClaimLoading
                      }
                      onBidderClaim={handleBidderClaim}
                      onCreatorClaim={handleCreatorClaim}
                      state={poolDetails.state}
                      role={poolDetails.role}
                      onCancel={handleFixedSwapCancel}
                    />
                  )}

                  {featuresConfig.infoTabs && (
                    <InfoTabs
                      history={
                        featuresConfig.nftDetailsHistory
                          ? renderedHistoryList
                          : renderedComingSoon
                      }
                      bids={
                        featuresConfig.nftDetailsBids
                          ? renderedBidsList
                          : renderedComingSoon
                      }
                      owners={
                        featuresConfig.nftDetailsOwners
                          ? renderedOnwersList
                          : renderedComingSoon
                      }
                      tokenInfo={
                        featuresConfig.nftDetailsTokenInfo
                          ? renderedTokenInfoList
                          : renderedComingSoon
                      }
                    />
                  )}
                </Info>

                {isEnglishAuction(poolDetails) && (
                  <Mutation
                    type={bidEnglishAuction.toString()}
                    action={bidEnglishAuction}
                  >
                    {({ loading }) => (
                      <BidDialog
                        name={item.itemname}
                        filepath={item.fileurl}
                        onSubmit={({ bid }) => {
                          handleBuyEnglish({
                            bidPrice: new BigNumber(bid),
                            unitContract: poolDetails.unitContract,
                            poolId: poolDetails.poolId,
                          });
                        }}
                        isOpen={openedBid}
                        onClose={closeBidDialog}
                        currency="BNB"
                        owner={ownerTitle}
                        ownerAvatar={undefined}
                        isOwnerVerified={false}
                        category={item.category}
                        disabled={loading}
                        maxQuantity={poolDetails.tokenAmount0}
                        minIncrease={poolDetails.amountMinIncr1}
                        lastestBidAmount={poolDetails.lastestBidAmount}
                      />
                    )}
                  </Mutation>
                )}

                {isEnglishAuction(poolDetails) && (
                  <Mutation
                    type={bidEnglishAuction.toString()}
                    action={bidEnglishAuction}
                  >
                    {({ loading }) => (
                      <BuyDialog
                        name={item.itemname}
                        filepath={item.fileurl}
                        onSubmit={() => {
                          handleBuyEnglish({
                            amountMax1: poolDetails.amountMax1,
                            unitContract: poolDetails.unitContract,
                            poolId: poolDetails.poolId,
                          });
                        }}
                        isOpen={openedEnglishBuy}
                        onClose={closeEnglishBuyDialog}
                        owner={ownerTitle}
                        ownerAvatar={undefined}
                        isOwnerVerified={false}
                        readonly={true}
                        category={item.category}
                        disabled={loading}
                        maxQuantity={poolDetails.tokenAmount0}
                      />
                    )}
                  </Mutation>
                )}

                {!isEnglishAuction(poolDetails) && (
                  <Mutation type={buyFixed.toString()} action={buyFixed}>
                    {({ loading }) => (
                      <BuyDialog
                        name={item.itemname}
                        filepath={item.fileurl}
                        onSubmit={data => {
                          handleBuyFixed({
                            nftType: poolDetails.nftType,
                            unitContract: poolDetails.unitContract,
                            amountTotal0: parseInt(
                              poolDetails.totalQuantity?.toString() ?? '0',
                            ),
                            amountTotal1: poolDetails.totalPrice,
                            poolId: poolDetails.poolId,
                            quantity: parseInt(data.quantity),
                          });
                        }}
                        isOpen={openedFixedBuy}
                        onClose={closeFixedBuyDialog}
                        owner={ownerTitle}
                        ownerAvatar={undefined}
                        isOwnerVerified={false}
                        readonly={item.standard === NftType.ERC721}
                        category={item.category}
                        disabled={loading}
                        maxQuantity={poolDetails.quantity}
                      />
                    )}
                  </Mutation>
                )}
              </div>
            );
          }}
        </Queries>
      )}
    </Queries>
  );
};
