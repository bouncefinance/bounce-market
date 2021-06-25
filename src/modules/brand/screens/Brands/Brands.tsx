import { Box, Container, Typography } from '@material-ui/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { listBrands } from 'modules/brand/actions/listBrands';
import { IBrandInfo } from 'modules/brand/api/queryBrand';
import { BrandRoutesConfig } from 'modules/brand/BrandRoutes';
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

  const { data } = useQuery({ type: listBrands.toString() });

  useEffect(() => {
    if (!data) {
      dispatch(listBrands());
    }
  }, [dispatch, data]);

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
                    href={BrandRoutesConfig.Brand.generatePath(id)}
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
