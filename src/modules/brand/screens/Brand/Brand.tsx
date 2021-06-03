import { Box, Container, Typography } from '@material-ui/core';
import { featuresConfig } from 'modules/common/conts';
import { Avatar } from 'modules/profile/components/Avatar';
import { Header } from 'modules/profile/components/Header';
import { InfoPanel } from 'modules/profile/components/InfoPanel';
import { Subscribers } from 'modules/profile/components/Subscribers';
import { Section } from 'modules/uiKit/Section';
import React from 'react';
import { Products } from './components/Products';
import { useBrand } from './useBrand';
import { useBrandStyles } from './useBrandStyles';

export const Brand = () => {
  const classes = useBrandStyles();
  const { brandInfoLoading, brandInfo } = useBrand();
  debugger;
  return (
    <Section className={classes.root}>
      <Header img={brandInfoLoading ? '' : brandInfo?.bandimgurl} />

      <Container>
        <Avatar
          src={brandInfoLoading ? '' : brandInfo?.imgurl}
          className={classes.avatar}
        />

        <InfoPanel
          isBrand
          withSharing
          mb={4}
          name={brandInfo?.brandname || 'Unnamed'}
          subscribers={featuresConfig.subscribers && <Subscribers count={0} />}
        />

        {brandInfo && brandInfo.description && (
          <Box mb={4}>
            <Typography>{brandInfo.description}</Typography>
          </Box>
        )}

        <Products />
      </Container>
    </Section>
  );
};
