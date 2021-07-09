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
import { InfoTabsItem } from 'modules/buyNFT/components/InfoTabsItem';
import { InfoTabsList } from 'modules/buyNFT/components/InfoTabsList';
import { MediaContainer } from 'modules/buyNFT/components/MediaContainer';
import { EmptyPageData } from 'modules/common/components/EmptyPageData';
import { ProfileInfo } from 'modules/common/components/ProfileInfo';
import {
  featuresConfig,
  getBlockChainExplorerAddress,
} from 'modules/common/conts';
import { truncateWalletAddr } from 'modules/common/utils/truncateWalletAddr';
import { t } from 'modules/i18n/utils/intl';
import { fetchPoolBids } from 'modules/overview/actions/fetchPoolBids';
import {
  fetchPoolHistory,
  IWrapperPoolHistory,
} from 'modules/overview/actions/fetchPoolHistory';
import { fetchPoolNftOwner } from 'modules/overview/actions/fetchPoolNftOwner';
import { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { AuctionState } from '../../../api/common/AuctionState';
import { AuctionType } from '../../../api/common/auctionType';
import { FixedSwapState } from '../../../api/common/FixedSwapState';
import { Queries } from '../../../common/components/Queries/Queries';
import { ResponseData } from '../../../common/types/ResponseData';
import { Address } from '../../../common/types/unit';
import { NftType } from '../../../createNFT/actions/createNft';
import { bidderClaim } from '../../../overview/actions/bidderClaim';
import { creatorClaim } from '../../../overview/actions/creatorClaim';
import { fetchCurrency } from '../../../overview/actions/fetchCurrency';
import { isEnglishAuction } from '../../../overview/actions/fetchPoolDetails';
import {
  fetchRoleInfo,
  IRoleInfo,
} from '../../../overview/actions/fetchRoleInfo';
import { fetchWeb3PoolDetails } from '../../../overview/actions/fetchWeb3PoolDetails';
import { fixedSwapCancel } from '../../../overview/actions/fixedSwapCancel';
import { ProfileRoutesConfig } from '../../../profile/ProfileRoutes';
import { bidEnglishAuction } from '../../actions/bidEnglishAuction';
import { buyFixed } from '../../actions/buyFixed';
import { fetchItem } from '../../actions/fetchItem';
import { ScanBtn } from '../../components/ScanBtn';
import { BuyDialog } from '../../components/BuyDialog';
import { TokenInfo } from '../../components/TokenInfo';
import { BuyNFTSkeleton } from './BuyNFTSkeleton';
import { useBuyNFTStyles } from './useBuyNFTStyles';
import { useDialog } from './useDialog';
import { useAccount } from 'modules/account/hooks/useAccount';

export const BuyNFT = () => {
  const { chainId } = useAccount();
  const blockChainScan = getBlockChainExplorerAddress(chainId);
  const [isEmptyData, setIsEmptyData] = useState(false);
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
    dispatch(fetchWeb3PoolDetails({ poolId, poolType }))
      .then(response => {
        const { data } = response;

        if (!data) {
          setIsEmptyData(true);
          return;
        }

        dispatch(fetchItem({ contract: data.tokenContract, id: data.tokenId }));
        // TODO: Dispatched twice. Here and in fetchWeb3PoolDetails
        dispatch(fetchCurrency({ unitContract: data.unitContract }));
      })
      .then(() => {
        dispatch(fetchRoleInfo({ poolId, poolType }));
        dispatch(fetchPoolHistory({ poolId, poolType }));
        dispatch(fetchPoolBids({ poolId, poolType }));
        dispatch(fetchPoolNftOwner({ poolId, poolType }));
      });
  }, [dispatch, poolType, poolId]);

  useEffect(() => {
    init();
  }, [init]);

  const getHistoryTitle = useCallback((item: IWrapperPoolHistory) => {
    let titleStr = '';
    switch (item.event) {
      case 'FixedSwapCreated':
      case 'EnglishCreated':
        titleStr = t('details-nft.history.create-str', {
          quantity: item.quantity,
          price: item.price,
          symbol: 'BNB',
        });
        break;

      case 'FixedSwapSwapped':
        titleStr = t('details-nft.history.offer-str', {
          quantity: item.quantity,
          price: item.price,
          symbol: 'BNB',
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
    return titleStr;
  }, []);

  const getSenderName = (sender: IRoleInfo) => {
    return sender.username || truncateWalletAddr(sender.address);
  };

  const wrapperTitle = (name: string, address: string) => {
    return name || truncateWalletAddr(address);
  };

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

  if (isEmptyData) {
    return <EmptyPageData />;
  }

  return (
    <Queries<
      ResponseData<typeof fetchItem>,
      ResponseData<typeof fetchWeb3PoolDetails>,
      ResponseData<typeof fetchRoleInfo>
    >
      requestActions={[fetchItem, fetchWeb3PoolDetails, fetchRoleInfo]}
      noDataMessage={<BuyNFTSkeleton />}
    >
      {({ data: item }, { data: poolDetails }, { data: roleInfos }) => (
        <Queries<
          ResponseData<typeof fetchCurrency>,
          ResponseData<typeof fetchPoolHistory>,
          ResponseData<typeof fetchPoolBids>,
          ResponseData<typeof fetchPoolNftOwner>
        >
          requestActions={[
            fetchCurrency,
            fetchPoolHistory,
            fetchPoolBids,
            fetchPoolNftOwner,
          ]}
          requestKeys={[poolDetails.unitContract]}
          noDataMessage={<BuyNFTSkeleton />}
        >
          {(
            { data: currency },
            { data: poolHistory },
            { data: poolBids },
            { data: poolNftOwner },
          ) => {
            const ownerTitle =
              roleInfos.creator.username ||
              truncateWalletAddr(item.ownerAddress);

            const renderedCreator = (
              <ProfileInfo
                subTitle="Minter"
                title={wrapperTitle(
                  roleInfos.minter.username,
                  roleInfos.minter.address,
                )}
                users={[
                  {
                    name: wrapperTitle(
                      roleInfos.minter.username,
                      roleInfos.minter.address,
                    ),
                    href: ProfileRoutesConfig.OtherProfile.generatePath(
                      roleInfos.minter.address,
                    ),
                    avatar: roleInfos.minter.avatar,
                    verified: false,
                  },
                ]}
              />
            );

            const renderedOwner = (
              <ProfileInfo
                subTitle="Seller"
                title={wrapperTitle(
                  roleInfos.creator.username,
                  roleInfos.creator.address,
                )}
                users={[
                  {
                    name: wrapperTitle(
                      roleInfos.creator.username,
                      roleInfos.creator.address,
                    ),
                    href: ProfileRoutesConfig.OtherProfile.generatePath(
                      roleInfos.creator.address,
                    ),
                    avatar: roleInfos.creator.avatar,
                  },
                ]}
              />
            );

            const renderedHistoryList = (
              <InfoTabsList>
                {poolHistory.map(item => {
                  return (
                    <InfoTabsItem
                      key={item.time.getTime()}
                      title={getHistoryTitle(item)}
                      author={getSenderName(item.sender)}
                      date={item.time}
                    />
                  );
                })}
              </InfoTabsList>
            );

            const renderedBidsList = (
              <InfoTabsList>
                {poolBids.map(item => {
                  return (
                    <InfoTabsItem
                      key={item.time.getTime()}
                      title={t('details-nft.bid.bid-placed')}
                      author={getSenderName(item.sender)}
                      date={item.time}
                      price={item.price.multipliedBy(currency.priceUsd)}
                      cryptoCurrency={'BNB'}
                      cryptoPrice={item.price}
                      href={`${blockChainScan}tx/${item.txId}`}
                    />
                  );
                })}
              </InfoTabsList>
            );

            const renderedOnwersList = (
              <InfoTabsList>
                {poolNftOwner.map(item => {
                  return (
                    <ProfileInfo
                      key={item.owner.address}
                      isTitleFirst
                      avatarSize="big"
                      title={getSenderName(item.owner)}
                      subTitle={t('details-nft.owner.balance', {
                        balance: item.balance,
                      })}
                      users={[
                        {
                          name: getSenderName(item.owner),
                          href: ProfileRoutesConfig.OtherProfile.generatePath(
                            item.owner.address,
                          ),
                          avatar: item.owner.avatar,
                        },
                      ]}
                    />
                  );
                })}
              </InfoTabsList>
            );

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

            const renderedComingSoon = (
              <Box mt={2}>{t('common.coming-soon')}</Box>
            );

            return (
              <div className={classes.root}>
                <MediaContainer
                  className={classes.imgContainer}
                  src={item.fileUrl}
                  title={item.itemName}
                  description={item.description}
                  category={item.category}
                />

                <Info className={classes.info}>
                  <InfoDescr
                    title={item.itemName}
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
                      price={poolDetails.lastestBidAmount.multipliedBy(
                        currency.priceUsd,
                      )}
                      cryptoPrice={
                        poolDetails.lastestBidAmount.isEqualTo(0)
                          ? poolDetails.amountMin1
                          : poolDetails.lastestBidAmount
                      }
                      cryptoCurrency={item.tokenSymbol}
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
                      cryptoCurrency={item.tokenSymbol}
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
                        name={item.itemName}
                        filepath={item.fileUrl}
                        onSubmit={({ bid }) => {
                          handleBuyEnglish({
                            bidPrice: new BigNumber(bid),
                            unitContract: poolDetails.unitContract,
                            poolId: poolDetails.poolId,
                          });
                        }}
                        isOpen={openedBid}
                        onClose={closeBidDialog}
                        currency={item.tokenSymbol}
                        owner={ownerTitle}
                        ownerAvatar={undefined}
                        isOwnerVerified={false}
                        category={item.category}
                        loading={loading}
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
                        name={item.itemName}
                        filepath={item.fileUrl}
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
                        loading={loading}
                        maxQuantity={poolDetails.tokenAmount0}
                      />
                    )}
                  </Mutation>
                )}

                {!isEnglishAuction(poolDetails) && (
                  <Mutation type={buyFixed.toString()} action={buyFixed}>
                    {({ loading }) => (
                      <BuyDialog
                        name={item.itemName}
                        filepath={item.fileUrl}
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
                        loading={loading}
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
