import { Container, Grid } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';
import { useAccount } from 'modules/account/hooks/useAccount';
import { queryBrandById } from 'modules/brand/actions/getBrandById';
import { listBrandItems } from 'modules/brand/actions/listBrandItems';
import { IBrandInfo } from 'modules/brand/api/queryBrand';
import { BrandAddItem } from 'modules/brand/components/BrandEmptyCard/BrandAddItem';
import { BuyNFTRoutesConfig } from 'modules/buyNFT/BuyNFTRoutes';
import { IAccountInfo, queryAccountInfo } from 'modules/common/actions/queryAccountInfo';
import { UploadFileType } from 'modules/common/actions/uploadFile';
import { ProductCard } from 'modules/common/components/ProductCard';
import { featuresConfig } from 'modules/common/conts';
import { RoutesConfiguration } from 'modules/createNFT/Routes';
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

  const [accountInfo, setAccountInfo] = useState<IAccountInfo>();

  useEffect(() => {
    dispatch(queryAccountInfo(address))
      .then(res => {
        setAccountInfo(res.data);
      })
  }, [address, dispatch])

  const toggleBgImgModal = useCallback(
    (isOpen: boolean) => () => {
      setBgImgModalOpened(isOpen);
    },
    [],
  );

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
          {items?.map((item: any) => (
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
                ProfileInfoProps={{
                  subTitle: 'Owner',
                  title: `${accountInfo?.username}`,
                  isOwner: true,
                  users: [
                    {
                      name: 'name',
                      avatar: `${accountInfo?.imgurl}`,
                    },
                  ],
                }}
                toSale={RoutesConfiguration.PublishNft.generatePath(
                  item.contractaddress,
                  item.id,
                )}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};
