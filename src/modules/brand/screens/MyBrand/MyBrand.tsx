import { Container, Grid } from '@material-ui/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useAccount } from 'modules/account/hooks/useAccount';
import { getAccountBrand } from 'modules/brand/actions/getAccountBrand';
import { listBrandItems } from 'modules/brand/actions/listBrandItems';
import { IBrandInfo } from 'modules/brand/api/queryBrand';
import { BrandAddItem } from 'modules/brand/components/BrandEmptyCard/BrandAddItem';
import { BuyNFTRoutesConfig } from 'modules/buyNFT/BuyNFTRoutes';
import { UploadFileType } from 'modules/common/actions/uploadFile';
import { ProductCard } from 'modules/common/components/ProductCard';
import { RoutesConfiguration } from 'modules/createNFT/Routes';
import { fetchProfileInfo } from 'modules/profile/actions/fetchProfileInfo';
import { IProfileInfo } from 'modules/profile/api/profileInfo';
import { Avatar } from 'modules/profile/components/Avatar';
import { Header } from 'modules/profile/components/Header';
import { InfoPanel } from 'modules/profile/components/InfoPanel';
import { SetBgImgModal } from 'modules/profile/components/SetBgImgModal';
import { useProfileStyles } from 'modules/profile/screens/useProfileStyles';
import { Section } from 'modules/uiKit/Section';
import React, { useCallback, useEffect, useState } from 'react';

export const MyBrand = () => {
  const classes = useProfileStyles();
  const dispatch = useDispatchRequest();
  const { address } = useAccount();
  const [brandInfo, setBrandInfo] = useState<IBrandInfo>();
  const [items, setItems] = useState([])

  const { data: profileInfo } = useQuery<IProfileInfo | null>({
    type: fetchProfileInfo.toString(),
  });

  useEffect(() => {
    if (address) {
      dispatch(getAccountBrand(address))
        .then(res => {
          const brandInfo = res.data;
          if (brandInfo) {
            setBrandInfo(brandInfo[0]);
          }
        })
    }
  }, [address, dispatch]);

  useEffect(() => {
    if (address && brandInfo) {
      dispatch(listBrandItems({
        userAddress: address,
        contractAddress: brandInfo?.contractaddress
      }))
        .then(res => {
          setItems(res.data)
        })
    }
  }, [address, brandInfo, dispatch]);

  const [isBgImgModalOpened, setBgImgModalOpened] = useState(false);

  const toggleBgImgModal = useCallback(
    (isOpen: boolean) => () => {
      setBgImgModalOpened(isOpen);
    },
    [],
  );

  return <Section className={classes.root}>
    <Header
      img={brandInfo?.bandimgurl}
      onEditClick={toggleBgImgModal(true)}
    />

    {brandInfo && <SetBgImgModal
      isOpen={isBgImgModalOpened}
      onClose={toggleBgImgModal(false)}
      fileType={UploadFileType.BrandImg}
      brandId={brandInfo.id}
    />}

    <Container>
      <Avatar
        className={classes.avatar}
        src={brandInfo?.imgurl}
      />

      <InfoPanel
        name={brandInfo?.brandname}
        isBrand={true}
      />

      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} lg={4} xl={3}>{brandInfo?.id && <BrandAddItem id={brandInfo.id} />}</Grid>
        {items?.map((item: any) => <Grid item xs={12} sm={6} lg={4} xl={3} key={item.id}>
          <ProductCard
            key={item.id}
            title={item.itemname}
            href={
              item.poolId && item.poolType
                ? BuyNFTRoutesConfig.DetailsNFT.generatePath(
                  item.poolId,
                  item.poolType,
                )
                : ''
            }
            price={item.poolId ? item.price : undefined}
            copies={item.supply}
            MediaProps={{
              category: item.category,
              src: item.fileurl,
              objectFit: 'scale-down',
              loading: 'lazy',
            }}
            ProfileInfoProps={{
              subTitle: 'Owner',
              title: `${profileInfo?.username}`,
              users: [
                {
                  name: 'name',
                  avatar: `${profileInfo?.imgUrl ?? 'https://via.placeholder.com/32'}`,
                  verified: true,
                },
              ],
            }}
            toSale={RoutesConfiguration.PublishNft.generatePath(
              item.contractaddress,
              item.id,
            )}
          />
        </Grid>)}
      </Grid>
    </Container>
  </Section>
}