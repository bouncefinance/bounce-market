import { QueryState } from '@redux-requests/core';
import { useDispatchRequest } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { ProfileInfo } from 'modules/common/components/ProfileInfo';
import { BidDialog } from 'modules/detailsNFT/components/BidDialog';
import { ImgContainer } from 'modules/detailsNFT/components/ImgContainer';
import { Info } from 'modules/detailsNFT/components/Info';
import { InfoDescr } from 'modules/detailsNFT/components/InfoDescr';
import { InfoPrices } from 'modules/detailsNFT/components/InfoPrices';
import { InfoTabs } from 'modules/detailsNFT/components/InfoTabs';
import { InfoTabsItem } from 'modules/detailsNFT/components/InfoTabsItem';
import { InfoTabsList } from 'modules/detailsNFT/components/InfoTabsList';
import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router';
import { Queries } from '../../../common/components/Queries/Queries';
import { INFTDetails } from '../../api/NFTDetails';
import { useBidDialog } from './useBidDialog';
import { useDetailsNFTStyles } from './useDetailsNFTStyles';
import { fetchItem } from '../../actions/fetchItem';
import { NftType } from '../../../createNFT/actions/createNft';
import { fetchPoolDetails } from '../../../overview/actions/fetchPoolDetails';

export const DetailsNFT = () => {
  const classes = useDetailsNFTStyles();
  const { poolId: poolIdParam, nftType: nftTypeParam } = useParams<{
    poolId: string;
    nftType: string;
  }>();
  const poolId = parseInt(poolIdParam, 10);
  const nftType: NftType = parseInt(nftTypeParam, 10);
  const dispatch = useDispatchRequest();
  const { opened, toggleDialog } = useBidDialog();

  const onSubmit = useCallback(values => {
    console.log({ values });
  }, []);

  useEffect(() => {
    dispatch(fetchPoolDetails({ poolId, standard: nftType })).then(
      ({ data, error }) => {
        if (error) {
          throw error;
        }

        if (!data) {
          throw new Error('Empty response');
        }

        dispatch(
          fetchItem({ contract: data?.tokenContract, id: data?.tokenId }),
        );
      },
    );
  }, [dispatch, nftType, poolId]);

  const renderContent = ({ data }: QueryState<INFTDetails>) => {
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
          currency="$"
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

        <InfoTabsItem title="Minted" author="HumanFactory" date={new Date()} />

        <InfoTabsItem
          title="Put on sale 9 editions for 0.5 ETH "
          author="0xc2...f6e5"
          date={new Date()}
        />
      </InfoTabsList>
    );

    return (
      <div className={classes.root}>
        <ImgContainer className={classes.imgContainer} src={data.fileurl} />

        <Info className={classes.info}>
          <InfoDescr
            title={data.itemname}
            description={data.description}
            copiesCurrent={2}
            copiesTotal={10}
            creator={renderedCreator}
            owner={renderedOwner}
          />

          <InfoPrices
            endDate={new Date(2021, 3, 30)}
            price={new BigNumber('1909.98')}
            currency="$"
            cryptoPrice={new BigNumber('1000.50')}
            cryptoCurrency="BNB"
            onBidClick={toggleDialog(true)}
          />

          <InfoTabs
            history={renderedHistoryList}
            bids={renderedBidsList}
            owners={renderedOnwersList}
            tokenInfo={renderedTokenInfoList}
          />
        </Info>

        <BidDialog
          name={data.itemname}
          img={data.fileurl}
          onSubmit={onSubmit}
          isOpen={opened}
          onClose={toggleDialog(false)}
          currency="BNB"
          owner="Bombist"
          ownerAvatar="https://picsum.photos/44?random=1"
          isOwnerVerified={false}
        />
      </div>
    );
  };

  return <Queries requestActions={[fetchItem]}>{renderContent}</Queries>;
};
