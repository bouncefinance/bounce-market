import { Box } from '@material-ui/core';
import {
  Mutation,
  useDispatchRequest,
  useMutation,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useAccount } from 'modules/account/hooks/useAccount';
import { compare } from 'modules/brand/api/queryBrand';
import { fetchItemRoyalty } from 'modules/brand/components/RoyaltyDialog/action/fetchItemRoyalty';
import { BidDialog } from 'modules/buyNFT/components/BidDialog';
import { Info } from 'modules/buyNFT/components/Info';
import { InfoDescr } from 'modules/buyNFT/components/InfoDescr';
import { InfoPrices } from 'modules/buyNFT/components/InfoPrices';
import { InfoTabs } from 'modules/buyNFT/components/InfoTabs';
import { InfoTabsItem } from 'modules/buyNFT/components/InfoTabsItem';
import { InfoTabsList } from 'modules/buyNFT/components/InfoTabsList';
import { NftLikeBtn } from 'modules/buyNFT/components/LikeBtn';
import { MediaContainer } from 'modules/buyNFT/components/MediaContainer';
import { EmptyPageData } from 'modules/common/components/EmptyPageData';
import { ProfileInfo } from 'modules/common/components/ProfileInfo';
import {
  featuresConfig,
  getBlockChainExplorerAddress,
  getTokenSymbol,
  ZERO_ADDRESS,
} from 'modules/common/conts';
import { truncateWalletAddr } from 'modules/common/utils/truncateWalletAddr';
import { t } from 'modules/i18n/utils/intl';
import { fetchPoolBids } from 'modules/overview/actions/fetchPoolBids';
import {
  fetchPoolHistory,
  IWrapperPoolHistory,
} from 'modules/overview/actions/fetchPoolHistory';
import { fetchPoolNftOwner } from 'modules/overview/actions/fetchPoolNftOwner';
import { UserNftRoleEnum } from 'modules/overview/actions/fetchWeb3PoolDetails';
import { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { AuctionState } from '../../../api/common/AuctionState';
import { AuctionType } from '../../../api/common/auctionType';
import { NftType } from '../../../api/common/NftType';
import { Queries } from '../../../common/components/Queries/Queries';
import { ResponseData } from '../../../common/types/ResponseData';
import { Address } from '../../../common/types/unit';
import { bidderClaim } from '../../../overview/actions/bidderClaim';
import { creatorClaim } from '../../../overview/actions/creatorClaim';
import { fetchCurrency } from '../../../overview/actions/fetchCurrency';
import {
  fetchPoolDetails,
  isEnglishAuction,
} from '../../../overview/actions/fetchPoolDetails';
import { fetchRoleInfo } from '../../../overview/actions/fetchRoleInfo';
import { fixedSwapCancel } from '../../../overview/actions/fixedSwapCancel';
import { ProfileRoutesConfig } from '../../../profile/ProfileRoutes';
import { bidEnglishAuction } from '../../actions/bidEnglishAuction';
import { buyFixed } from '../../actions/buyFixed';
import { fetchItem } from '../../actions/fetchItem';
import { BuyDialog } from '../../components/BuyDialog';
import { ScanBtn } from '../../components/ScanBtn';
import { TokenInfo } from '../../components/TokenInfo';
import { BuyNFTSkeleton } from './BuyNFTSkeleton';
import { getSenderName, RenderedDetailOwnersList } from './DetailOwner';
import { useBuyNFTStyles } from './useBuyNFTStyles';
import { useDialog } from './useDialog';

export const BuyNFT = () => {
  const { chainId } = useAccount();
  const blockChainScan = getBlockChainExplorerAddress(chainId);
  const [isEmptyData, setIsEmptyData] = useState(false);
  const [now, setNow] = useState(Date.now());
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
  const { address } = useAccount();
  const { push } = useHistory();

  const init = useCallback(() => {
    dispatch(fetchPoolDetails({ poolId, poolType }))
      .then(response => {
        const { data } = response;

        if (!data) {
          setIsEmptyData(true);
          return;
        }
        setIsEmptyData(false);

        dispatch(fetchItem({ contract: data.tokenContract, id: data.tokenId }));
        // TODO: Dispatched twice. Here and in fetchWeb3PoolDetails
        dispatch(fetchCurrency({ unitContract: data.unitContract }));
        // 请求版税
        dispatch(
          fetchItemRoyalty({
            collection: data.tokenContract,
            tokenId: data.tokenId,
          }),
        );
      })
      .then(() => {
        dispatch(fetchRoleInfo({ poolId, poolType, address }));
        dispatch(fetchPoolHistory({ poolId, poolType }));
        dispatch(fetchPoolBids({ poolId, poolType }));
        dispatch(fetchPoolNftOwner({ poolId, poolType }));
      });
  }, [dispatch, poolType, poolId, address]);

  useEffect(() => {
    init();
  }, [init, chainId]);

  const getHistoryTitle = useCallback(
    (item: IWrapperPoolHistory) => {
      let titleStr = '';
      switch (item.event) {
        case 'FixedSwapCreated':
        case 'EnglishCreated':
          titleStr = t('details-nft.history.create-str', {
            quantity: item.quantity,
            price: item.price,
            symbol: getTokenSymbol(chainId),
          });
          break;

        case 'FixedSwapSwapped':
          titleStr = t('details-nft.history.offer-str', {
            quantity: item.quantity,
            price: item.price,
            symbol: getTokenSymbol(chainId),
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
    },
    [chainId],
  );

  const wrapperTitle = (name: string, address: string) => {
    return name || truncateWalletAddr(address);
  };

  const isOpenSaleTime =
    poolType === AuctionType.EnglishAuction_Timing ||
    poolType === AuctionType.FixedSwap_Timing;

  const handleBidderClaim = useCallback(() => {
    dispatch(bidderClaim({ poolId, isOpenSaleTime })).then(({ error }) => {
      if (!error) {
        push(ProfileRoutesConfig.UserProfile.generatePath());
      }
    });
  }, [dispatch, poolId, push, isOpenSaleTime]);

  const handleCreatorClaim = useCallback(() => {
    dispatch(creatorClaim({ poolId, isOpenSaleTime })).then(({ error }) => {
      if (!error) {
        push(ProfileRoutesConfig.UserProfile.generatePath());
      }
    });
  }, [dispatch, poolId, push, isOpenSaleTime]);

  const handleFixedSwapCancel = useCallback(() => {
    dispatch(fixedSwapCancel({ poolId, poolType })).then(({ error }) => {
      if (!error) {
        init();
      }
    });
  }, [dispatch, init, poolId, poolType]);

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
          isOpenSaleTime: poolType === AuctionType.FixedSwap_Timing,
        }),
      ).then(({ error }) => {
        if (!error) {
          push(ProfileRoutesConfig.UserProfile.generatePath());
        }
      });
    },
    [dispatch, poolId, push, poolType],
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
          isOpenSaleTime: poolType === AuctionType.EnglishAuction_Timing,
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
      poolType,
    ],
  );

  if (isEmptyData) {
    return <EmptyPageData />;
  }

  return (
    <Queries<
      ResponseData<typeof fetchItem>,
      ResponseData<typeof fetchPoolDetails>,
      ResponseData<typeof fetchRoleInfo>,
      ResponseData<typeof fetchItemRoyalty>
    >
      requestActions={[
        fetchItem,
        fetchPoolDetails,
        fetchRoleInfo,
        fetchItemRoyalty,
      ]}
      noDataMessage={<BuyNFTSkeleton />}
    >
      {(
        { data: item },
        { data: poolDetails },
        { data: roleInfos },
        { data: royalty },
      ) => {
        return (
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
              if (!item) {
                return <EmptyPageData />;
              }
              const ownerTitle =
                roleInfos.creator.username ||
                truncateWalletAddr(item.ownerAddress);

              const renderedCreator = (
                <ProfileInfo
                  subTitle={t('details-nft.role.minter')}
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
                      verified: roleInfos.minter.isVerify,
                    },
                  ]}
                />
              );

              const shieldNameList = ['', 'BOUNCE'];
              const renderedCollection = () => {
                return !shieldNameList.includes(
                  roleInfos?.collection.name || '',
                ) ? (
                  <ProfileInfo
                    subTitle={t('details-nft.role.collection')}
                    title={wrapperTitle(
                      roleInfos?.collection.name || '',
                      roleInfos.collection.address,
                    )}
                    users={[
                      {
                        name: wrapperTitle(
                          roleInfos?.collection.name || '',
                          roleInfos.collection.address,
                        ),
                        avatar: roleInfos.collection.avatar,
                        href: ProfileRoutesConfig.Collection.generatePath(
                          roleInfos.collection.address,
                        ),
                        verified: roleInfos.collection.isVerify,
                      },
                    ]}
                  />
                ) : (
                  <></>
                );
              };

              const renderedHistoryList = (
                <InfoTabsList>
                  {poolHistory?.map(item => {
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
                  {poolBids?.map(item => {
                    return (
                      <InfoTabsItem
                        key={item.time.getTime()}
                        title={t('details-nft.bid.bid-placed')}
                        author={getSenderName(item.sender)}
                        date={item.time}
                        price={item.price.multipliedBy(currency.priceUsd)}
                        cryptoCurrency={getTokenSymbol(chainId) as string}
                        cryptoPrice={item.price}
                        href={`${blockChainScan}tx/${item.txId}`}
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

              const saleTime = isOpenSaleTime && +poolDetails.openAt >= now;
              const onChangeTime = () => {
                setNow(Date.now());
              };

              const role =
                roleInfos?.creator?.address === address
                  ? UserNftRoleEnum.CREATOR
                  : compare(poolDetails.last_bidder, address ?? ZERO_ADDRESS)
                  ? UserNftRoleEnum.BUYER
                  : UserNftRoleEnum.OTHERS;

              return (
                <div className={classes.root}>
                  <MediaContainer
                    className={classes.imgContainer}
                    src={item.fileUrl}
                    title={item.itemName}
                    description={item.description}
                    category={item.category}
                    isOpenSaleTime={saleTime}
                    openAt={poolDetails.openAt}
                    onchange={onChangeTime}
                    LikeBtn={
                      <NftLikeBtn
                        id={item.id}
                        contractAddress={item.contractAddress}
                        count={roleInfos.likeCount}
                        isLike={roleInfos.isLike}
                      />
                    }
                  />

                  <Info className={classes.info}>
                    <InfoDescr
                      title={item.itemName}
                      description={item.description}
                      currentPage="poolDetail"
                      copiesCurrent={
                        isEnglishAuction(poolDetails)
                          ? poolDetails.tokenAmount0
                          : poolDetails.quantity - poolDetails.swappedAmount0
                      }
                      copiesTotal={item.supply}
                      creator={renderedCreator}
                      owner={renderedCollection()}
                      LikeBtn={<></>}
                    />
                    {isEnglishAuction(poolDetails) ? (
                      <InfoPrices
                        endDate={poolDetails.closeAt}
                        hasSetDirectPrice={poolDetails.amountMax1.isGreaterThan(
                          0,
                        )}
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
                        // disabled={poolDetails.state !== AuctionState.Live}
                        disabled={Boolean(
                          poolDetails?.closeAt && +poolDetails.closeAt <= now,
                        )}
                        saleTime={saleTime}
                        loading={
                          fixedSwapCancelLoading ||
                          creatorClaimLoading ||
                          bidderClaimLoading
                        }
                        state={poolDetails.state}
                        notClaim={Boolean(
                          poolDetails.lastestBidAmount &&
                            poolDetails.lastestBidAmount.isGreaterThanOrEqualTo(
                              poolDetails.amountMax1,
                            ),
                        )}
                        // role={poolDetails.role}
                        role={role}
                        onBidderClaim={handleBidderClaim}
                        onCreatorClaim={handleCreatorClaim}
                        royalty={royalty}
                      />
                    ) : (
                      <InfoPrices
                        price={poolDetails.price.multipliedBy(
                          currency.priceUsd,
                        )}
                        hasSetDirectPrice={true}
                        cryptoPrice={poolDetails.price}
                        cryptoCurrency={item.tokenSymbol}
                        onBuyClick={openFixedBuyDialog}
                        disabled={
                          (poolDetails.state as number) !== AuctionState.Live
                        }
                        saleTime={saleTime}
                        loading={
                          fixedSwapCancelLoading ||
                          creatorClaimLoading ||
                          bidderClaimLoading
                        }
                        isOpenSaleTime={saleTime}
                        onBidderClaim={handleBidderClaim}
                        onCreatorClaim={handleCreatorClaim}
                        state={poolDetails.state}
                        role={role}
                        onCancel={handleFixedSwapCancel}
                        poolType={poolType}
                        poolId={poolId}
                        royalty={royalty}
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
                          featuresConfig.nftDetailsOwners ? (
                            <RenderedDetailOwnersList
                              list={poolNftOwner}
                              poolId={poolId}
                            />
                          ) : (
                            renderedComingSoon
                          )
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
                        <>
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
                            ownerAvatar={roleInfos.creator.avatar}
                            isOwnerVerified={roleInfos.creator.isVerify}
                            category={item.category}
                            loading={loading}
                            maxQuantity={poolDetails.tokenAmount0}
                            minIncrease={
                              poolBids?.length === 0
                                ? new BigNumber(0)
                                : poolDetails.amountMinIncr1
                            }
                            lastestBidAmount={poolDetails.lastestBidAmount}
                            minAmount1={poolDetails.amountMin1}
                          />
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
                            ownerAvatar={roleInfos.creator.avatar}
                            isOwnerVerified={roleInfos.creator.isVerify}
                            readonly={true}
                            category={item.category}
                            loading={loading}
                            maxQuantity={poolDetails.tokenAmount0}
                            currentPrice={poolDetails.amountMax1}
                            isPack={true}
                          />
                        </>
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
                                poolDetails.quantity?.toString() ?? '0',
                              ),
                              amountTotal1: poolDetails.totalPrice,
                              poolId: poolDetails.poolId,
                              quantity: parseInt(data.quantity),
                            });
                          }}
                          isOpen={openedFixedBuy}
                          onClose={closeFixedBuyDialog}
                          owner={ownerTitle}
                          ownerAvatar={roleInfos.creator.avatar}
                          isOwnerVerified={roleInfos.creator.isVerify}
                          readonly={item.standard === NftType.ERC721}
                          category={item.category}
                          loading={loading}
                          maxQuantity={
                            poolDetails.quantity - poolDetails.swappedAmount0
                          }
                          currentPrice={poolDetails.price}
                          isPack={false}
                        />
                      )}
                    </Mutation>
                  )}
                </div>
              );
            }}
          </Queries>
        );
      }}
    </Queries>
  );
};
