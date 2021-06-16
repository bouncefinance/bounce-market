import { Container, Grid } from '@material-ui/core';
import { t } from 'modules/i18n/utils/intl';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useAccount } from 'modules/account/hooks/useAccount';
import { queryBrandById } from 'modules/brand/actions/getBrandById';
import { listBrandItems } from 'modules/brand/actions/listBrandItems';
import { IBrandInfo } from 'modules/brand/api/queryBrand';
import { BrandAddItem } from 'modules/brand/components/BrandEmptyCard/BrandAddItem';
import { BuyNFTRoutesConfig } from 'modules/buyNFT/BuyNFTRoutes';
import { UploadFileType } from 'modules/common/actions/uploadFile';
import { ProductCard } from 'modules/common/components/ProductCard';
import { ProfileInfo } from 'modules/common/components/ProfileInfo';
import { featuresConfig } from 'modules/common/conts';
import { truncateWalletAddr } from 'modules/common/utils/truncateWalletAddr';
import { RoutesConfiguration } from 'modules/createNFT/Routes';
import { fetchProfileInfo } from 'modules/profile/actions/fetchProfileInfo';
import { IProfileInfo } from 'modules/profile/api/profileInfo';
import { Avatar } from 'modules/profile/components/Avatar';
import { Header } from 'modules/profile/components/Header';
import { InfoPanel } from 'modules/profile/components/InfoPanel';
import { SetBgImgModal } from 'modules/profile/components/SetBgImgModal';
import { useProfileStyles } from 'modules/profile/screens/Profile/useProfileStyles';
import { Section } from 'modules/uiKit/Section';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { uid } from 'react-uid';

export const MyBrand = () => {
  const classes = useProfileStyles();
  const dispatch = useDispatchRequest();
  const { address } = useAccount();
  const [brandInfo, setBrandInfo] = useState<IBrandInfo>();
  const [items, setItems] = useState([]);
  const { id } = useParams<any>();

  const { data: profileInfo } = useQuery<IProfileInfo | null>({
    type: fetchProfileInfo.toString(),
  });

  useEffect(() => {
    if (address && id) {
      dispatch(
        queryBrandById(
          {
            id: parseInt(id),
            accountaddress: address,
          },
          {
            asMutation: true,
          },
        ),
      ).then(res => {
        const brandInfo = res.data;
        if (brandInfo) {
          setBrandInfo(brandInfo);
        }
      });
    }
  }, [id, address, dispatch]);

  useEffect(() => {
    if (address && brandInfo) {
      dispatch(
        listBrandItems({
          userAddress: address,
          contractAddress: brandInfo?.contractaddress,
        }),
      ).then(res => {
        setItems(res.data);
      });
    }
  }, [address, brandInfo, dispatch]);

  const [isBgImgModalOpened, setBgImgModalOpened] = useState(false);

  const toggleBgImgModal = useCallback(
    (isOpen: boolean) => () => {
      setBgImgModalOpened(isOpen);
    }, []);
    
  return (
    <Section className={classes.root}>
      <Header
        img={brandInfo?.bandimgurl}
        onEditClick={toggleBgImgModal(true)}
      />

      {brandInfo && (
        <SetBgImgModal
          isOpen={isBgImgModalOpened}
          onClose={toggleBgImgModal(false)}
          fileType={UploadFileType.BrandImg}
          contractaddress={brandInfo.contractaddress}
        />
      )}

      <Container>
        <Avatar className={classes.avatar} src={brandInfo?.imgurl} />

        <InfoPanel
          name={brandInfo?.brandname}
          isBrand={true}
          withSharing={featuresConfig.ownBrandSharing}
        />

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} lg={4} xl={3}>
            {brandInfo?.id && <BrandAddItem id={brandInfo.id} />}
          </Grid>
          {items?.map((item: any) => {
            const shortAddr = address
              ? truncateWalletAddr(address)
              : t('common.unknown');
            const username = profileInfo?.username ?? shortAddr;

            return (
              <Grid item xs={12} sm={6} lg={4} xl={3} key={uid(item)}>
                <ProductCard
                  id={item.id}
                  poolId={item.poolId}
                  auctionType={item.poolType}
                  key={item.id}
                  isOnSale={!!item.poolId}
                  title={item.itemname}
                  href={
                    item.poolId && item.poolType
                      ? BuyNFTRoutesConfig.DetailsNFT.generatePath(
                          item.poolId,
                          item.poolType,
                        )
                      : ''
                  }
                  price={item.poolId && item.price ? item.price : undefined}
                  copies={item.supply}
                  MediaProps={{
                    category: item.category,
                    src: item.fileurl,
                    objectFit: 'scale-down',
                    loading: 'lazy',
                  }}
                  profileInfo={
                    <ProfileInfo
                      subTitle={t('product-card.owner')}
                      title={username}
                      users={[
                        {
                          name: username,
                          avatar: `${profileInfo?.imgUrl}`,
                        },
                      ]}
                    />
                  }
                  toSale={RoutesConfiguration.PublishNft.generatePath(
                    item.contractaddress,
                    item.id,
                  )}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Section>
  );
};
