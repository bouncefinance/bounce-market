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
import { ProfileInfo } from 'modules/common/components/ProfileInfo';
import { featuresConfig } from 'modules/common/conts';
import { truncateWalletAddr } from 'modules/common/utils/truncateWalletAddr';
import { t } from 'modules/i18n/utils/intl';
import { useCallback, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { AccountInfo } from '../../../common/components/AccountInfo';
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
import { fixedSwapCancel } from '../../../overview/actions/fixedSwapCancel';
import { AuctionType } from '../../../overview/api/auctionType';
import { ProfileRoutesConfig } from '../../../profile/ProfileRoutes';
import { bidEnglishAuction } from '../../actions/bidEnglishAuction';
import { buyFixed } from '../../actions/buyFixed';
import { fetchItem } from '../../actions/fetchItem';
import { BuyDialog } from '../../components/BuyDialog';
import { useBuyNFTStyles } from './useBuyNFTStyles';
import { useDialog } from './useDialog';

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
      dispatch(fetchItem({ contract: data.tokenContract, id: data.tokenId }));
      // TODO: Dispatched twice. Here and in fetchWeb3PoolDetails
      dispatch(fetchCurrency({ unitContract: data.unitContract }));
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
      ResponseData<typeof fetchWeb3PoolDetails>
    >
      requestActions={[fetchItem, fetchWeb3PoolDetails]}
    >
      {({ data: item }, { data: poolDetails }) => (
        <Queries<ResponseData<typeof fetchCurrency>>
          requestActions={[fetchCurrency]}
          requestKeys={[poolDetails.unitContract]}
        >
          {({ data: currency }) => {
            const renderedCreator = (
              <ProfileInfo
                subTitle="Creator"
                title="VanHuiFirst"
                users={[
                  {
                    name: 'VanHuiFirst',
                    avatar: 'https://picsum.photos/32?random=1',
                    verified: true,
                  },
                ]}
              />
            );

            const ownerTitle =
              item.ownername || truncateWalletAddr(item.owneraddress);

            const renderedHistoryList = (
              <InfoTabsList>
                <InfoTabsItem
                  title="Offered 3 BNB for 1 edition"
                  author="yeah66"
                  date={new Date()}
                />
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

            const renderedTokenInfoList = (
              <InfoTabsList>
                <InfoTabsItem
                  title="Offered 3 BNB for 1 edition"
                  author="yeah66"
                  date={new Date()}
                />

                <InfoTabsItem
                  title="Minted"
                  author="HumanFactory"
                  date={new Date()}
                />

                <InfoTabsItem
                  title="Put on sale 9 editions for 0.5 ETH "
                  author="0xc2...f6e5"
                  date={new Date()}
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
                    owner={<AccountInfo address={item.owneraddress} />}
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
                        currency={item.tokenSymbol}
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
