import { Container, Grid } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';
import { useAccount } from 'modules/account/hooks/useAccount';
import { getAccountBrand } from 'modules/brand/actions/getAccountBrand';
import { IBrandInfo } from 'modules/brand/api/queryBrand';
import { BrandAddItem } from 'modules/brand/components/BrandEmptyCard/BrandAddItem';
import { Avatar } from 'modules/profile/components/Avatar';
import { Header } from 'modules/profile/components/Header';
import { InfoPanel } from 'modules/profile/components/InfoPanel';
import { useProfileStyles } from 'modules/profile/screens/useProfileStyles';
import { Section } from 'modules/uiKit/Section';
import React, { useEffect, useState } from 'react';

export const MyBrand = () => {
  const classes = useProfileStyles();
  const dispatch = useDispatchRequest();
  const { address } = useAccount();
  const [brandInfo, setBrandInfo] = useState<IBrandInfo>();

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

  const handleEditImg = () => {
  }

  return <Section>
    <Header
      img={brandInfo?.bandimgurl}
      onEditClick={handleEditImg}
    />

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
        {brandInfo?.id && <BrandAddItem id={brandInfo.id} />}
      </Grid>
    </Container>
  </Section>
}