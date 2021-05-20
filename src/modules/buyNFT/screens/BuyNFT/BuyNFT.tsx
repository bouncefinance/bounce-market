import { Mutation, useDispatchRequest } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { ProfileInfo } from 'modules/common/components/ProfileInfo';
import { BidDialog } from 'modules/buyNFT/components/BidDialog';
import { MediaContainer } from 'modules/buyNFT/components/MediaContainer';
import { Info } from 'modules/buyNFT/components/Info';
import { InfoDescr } from 'modules/buyNFT/components/InfoDescr';
import { InfoPrices } from 'modules/buyNFT/components/InfoPrices';
import { InfoTabs } from 'modules/buyNFT/components/InfoTabs';
import { InfoTabsItem } from 'modules/buyNFT/components/InfoTabsItem';
import { InfoTabsList } from 'modules/buyNFT/components/InfoTabsList';
import { useCallback, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Queries } from '../../../common/components/Queries/Queries';
import { useDialog } from './useDialog';
import { useBuyNFTStyles } from './useBuyNFTStyles';
import { fetchItem } from '../../actions/fetchItem';
import { isEnglishAuction } from '../../../overview/actions/fetchPoolDetails';
import { ResponseData } from '../../../common/types/ResponseData';
import { AuctionType } from '../../../overview/api/auctionType';
import { BuyDialog } from '../../components/BuyDialog';
import { NftType } from '../../../createNFT/actions/createNft';
import { buyFixed } from '../../actions/buyFixed';
import { bidEnglishAuction } from '../../actions/bidEnglishAuction';
import { fetchWeb3PoolDetails } from '../../../overview/actions/fetchWeb3PoolDetails';
import { throwIfDataIsEmptyOrError } from '../../../common/utils/throwIfDataIsEmptyOrError';
import { AuctionState } from '../../../common/const/AuctionState';
import { fetchCurrency } from '../../../overview/actions/fetchCurrency';
import { Address } from '../../../common/types/unit';
import { ProfileRoutesConfig } from '../../../profile/ProfileRoutes';

export const BuyNFT = () => {
  const classes = useBuyNFTStyles();
  const { poolId: poolIdParam, poolType } = useParams<{
    poolId: string;
    poolType: AuctionType;
  }>();
  const poolId = parseInt(poolIdParam, 10);
  const dispatch = useDispatchRequest();
  const { opened: openedBid, toggleDialog: toggleBidDialog } = useDialog();
  const {
    opened: openedFixedBuy,
    toggleDialog: toggleFixedBuyDialog,
  } = useDialog();
  const {
    opened: openedEnglishBuy,
    toggleDialog: toggleEnglishBuyDialog,
  } = useDialog();
  const { push } = useHistory();

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

  const handleBuyEnglish = useCallback(
    (
      value:
        | {
            amountMax1?: BigNumber;
            unitContract: string;
            amountTotal1?: BigNumber;
            poolId: number;
          }
        | {
            bidPrice?: BigNumber;
            unitContract: string;
            amountTotal1?: BigNumber;
            poolId: number;
          },
    ) => {
      const { unitContract, amountTotal1, poolId } = value;
      dispatch(
        bidEnglishAuction({
          amount: (value as any).amountMax1 || (value as any).bidPrice,
          unitContract,
          amountTotal1,
          poolId,
        }),
      ).then(({ error }) => {
        if (!error) {
          push(ProfileRoutesConfig.UserProfile.generatePath());
        }
      });
    },
    [dispatch, push],
  );

  useEffect(() => {
    dispatch(fetchWeb3PoolDetails({ poolId, poolType })).then(response => {
      const { data } = throwIfDataIsEmptyOrError(response);
      dispatch(fetchItem({ contract: data.tokenContract, id: data.tokenId }));
      // TODO: Dispatched twice. Here and in fetchWeb3PoolDetails
      dispatch(fetchCurrency({ unitContract: data.unitContract }));
    });
  }, [dispatch, poolType, poolId]);

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

            const renderedOwner = (
              <ProfileInfo
                subTitle="Owner"
                title="Bombist"
                users={[
                  {
                    name: 'Bombist',
                    avatar: 'https://picsum.photos/32?random=2',
                  },
                ]}
              />
            );

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
                    copiesCurrent={2}
                    copiesTotal={10}
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
                      onBidClick={toggleBidDialog(true)}
                      onBuyClick={toggleEnglishBuyDialog(true)}
                      disabled={poolDetails.state !== AuctionState.Live}
                    />
                  ) : (
                    <InfoPrices
                      price={poolDetails.price.multipliedBy(currency.priceUsd)}
                      cryptoPrice={poolDetails.price}
                      cryptoCurrency="BNB"
                      onBuyClick={toggleFixedBuyDialog(true)}
                      disabled={poolDetails.state !== AuctionState.Live}
                    />
                  )}

                  <InfoTabs
                    history={renderedHistoryList}
                    bids={renderedBidsList}
                    owners={renderedOnwersList}
                    tokenInfo={renderedTokenInfoList}
                  />
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
                        onSubmit={({ bid, quantity }) => {
                          handleBuyEnglish({
                            bidPrice: new BigNumber(bid),
                            unitContract: poolDetails.unitContract,
                            amountTotal1: new BigNumber(bid).multipliedBy(
                              quantity,
                            ),
                            poolId: poolDetails.poolId,
                          });
                        }}
                        isOpen={openedBid}
                        onClose={toggleBidDialog(false)}
                        currency="BNB"
                        owner="Bombist"
                        ownerAvatar="https://picsum.photos/44?random=1"
                        isOwnerVerified={false}
                        category={item.category}
                        disabled={loading}
                        readonlyQuantity={item.standard === NftType.ERC721}
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
                            amountTotal1: undefined,
                            poolId: poolDetails.poolId,
                          });
                        }}
                        isOpen={openedEnglishBuy}
                        onClose={toggleEnglishBuyDialog(false)}
                        owner="Bombist"
                        ownerAvatar="https://picsum.photos/44?random=1"
                        isOwnerVerified={false}
                        readonly={item.standard === NftType.ERC721}
                        category={item.category}
                        disabled={loading}
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
                            amountTotal0: poolDetails.quantity,
                            amountTotal1: poolDetails.totalPrice,
                            poolId: poolDetails.poolId,
                            quantity: parseInt(data.quantity),
                          });
                        }}
                        isOpen={openedFixedBuy}
                        onClose={toggleFixedBuyDialog(false)}
                        owner="Bombist"
                        ownerAvatar="https://picsum.photos/44?random=1"
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
