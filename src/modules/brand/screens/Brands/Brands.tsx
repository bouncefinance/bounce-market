import { Box, Container, Typography } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';
import { useAccount } from 'modules/account/hooks/useAccount';
import { listBrands } from 'modules/brand/actions/listBrands';
import { IBrandInfo } from 'modules/brand/api/queryBrand';
import { featuresConfig } from 'modules/common/conts';
import { t } from 'modules/i18n/utils/intl';
import { Subscribers } from 'modules/profile/components/Subscribers';
import { Section } from 'modules/uiKit/Section';
import React, { useEffect } from 'react';
import { Queries } from '../../../common/components/Queries/Queries';
import { ResponseData } from '../../../common/types/ResponseData';
import { BrandNFTItems } from './components/BrandNFTItems';
import { BrandsItem } from './components/BrandsItem';
import { BrandsList } from './components/BrandsList';

export const Brands = () => {
  const dispatch = useDispatchRequest();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (isConnected) {
      dispatch(listBrands());
    }
  }, [isConnected, dispatch]);

  return (
    <Section>
      <Container maxWidth="xl">
        <Box mb={4}>
          <Typography variant="h1">{t('brands.title')}</Typography>
        </Box>
        <Queries<ResponseData<typeof listBrands>> requestActions={[listBrands]}>
          {({ data: brandList }) => (
            <BrandsList>
              {brandList.map(
                ({
                  id,
                  brandname,
                  description,
                  imgurl,
                  owneraddress,
                  contractaddress,
                }: IBrandInfo) => (
                  <BrandsItem
                    key={id}
                    name={brandname}
                    descr={description}
                    img={imgurl}
                    nftItems={
                      <BrandNFTItems
                        ownerAddress={owneraddress}
                        contractAddress={contractaddress}
                      />
                    }
                    followers={
                      featuresConfig.subscribers ? (
                        <Subscribers withFollow />
                      ) : undefined
                    }
                  />
                ),
              )}
            </BrandsList>
          )}
        </Queries>
      </Container>
    </Section>
  );
};
