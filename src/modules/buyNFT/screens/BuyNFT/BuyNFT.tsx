import { useDispatchRequest } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { ProfileInfo } from 'modules/common/components/ProfileInfo';
import { BidDialog } from 'modules/buyNFT/components/BidDialog';
import { ImgContainer } from 'modules/buyNFT/components/ImgContainer';
import { Info } from 'modules/buyNFT/components/Info';
import { InfoDescr } from 'modules/buyNFT/components/InfoDescr';
import { InfoPrices } from 'modules/buyNFT/components/InfoPrices';
import { InfoTabs } from 'modules/buyNFT/components/InfoTabs';
import { InfoTabsItem } from 'modules/buyNFT/components/InfoTabsItem';
import { InfoTabsList } from 'modules/buyNFT/components/InfoTabsList';
import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router';
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

export const BuyNFT = () => {
  const classes = useBuyNFTStyles();
  const { poolId: poolIdParam, poolType } = useParams<{
    poolId: string;
    poolType: AuctionType;
  }>();
  const poolId = parseInt(poolIdParam, 10);
  const dispatch = useDispatchRequest();
  const { opened: openedBid, toggleDialog: toggleBidDialog } = useDialog();
  const { opened: openedBuy, toggleDialog: toggleBuyDialog } = useDialog();

  const handleBid = useCallback(
    values => {
      dispatch(
        bidEnglishAuction({
          amountMax1: new BigNumber(0),
          bidPrice: new BigNumber(0),
          unitContract: '',
          amountTotal1: new BigNumber(0),
          poolId: 0,
        }),
      );
    },
    [dispatch],
  );

  const handleBuy = useCallback(
    values => {
      dispatch(
        buyFixed({
          nftType: NftType.ERC1155,
          unitContract: '',
          amountTotal1: new BigNumber(0),
          poolId: 0,
          amountTotal0: new BigNumber(1),
          amount: new BigNumber(0),
        }),
      );
    },
    [dispatch],
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
                <ImgContainer
                  className={classes.imgContainer}
                  src={item.fileurl}
                  title={item.itemname}
                  description={item.description}
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
                      cryptoPrice={poolDetails.lastestBidAmount}
                      cryptoCurrency="BNB"
                      onBidClick={toggleBidDialog(true)}
                      onBuyClick={toggleBuyDialog(true)}
                      disabled={poolDetails.state !== AuctionState.Live}
                    />
                  ) : (
                    <InfoPrices
                      price={poolDetails.price.multipliedBy(currency.priceUsd)}
                      cryptoPrice={poolDetails.price}
                      cryptoCurrency="BNB"
                      onBuyClick={toggleBuyDialog(true)}
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

                <BidDialog
                  name={item.itemname}
                  img={item.fileurl}
                  onSubmit={handleBid}
                  isOpen={openedBid}
                  onClose={toggleBidDialog(false)}
                  currency="BNB"
                  owner="Bombist"
                  ownerAvatar="https://picsum.photos/44?random=1"
                  isOwnerVerified={false}
                />
                <BuyDialog
                  name={item.itemname}
                  img={item.fileurl}
                  onSubmit={handleBuy}
                  isOpen={openedBuy}
                  onClose={toggleBuyDialog(false)}
                  owner="Bombist"
                  ownerAvatar="https://picsum.photos/44?random=1"
                  isOwnerVerified={false}
                  disabled={item.standard === NftType.ERC721}
                />
              </div>
            );
          }}
        </Queries>
      )}
    </Queries>
  );
};
