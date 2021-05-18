import { Box, Container, Typography } from '@material-ui/core';
import { useDispatchRequest, useMutation } from '@redux-requests/react';
import { useAccount } from 'modules/account/hooks/useAccount';
import { listBrands } from 'modules/brand/actions/listBrands';
import { IBrandInfo } from 'modules/brand/api/queryBrand';
import { QueryLoading } from 'modules/common/components/QueryLoading/QueryLoading';
import { t } from 'modules/i18n/utils/intl';
import { Subscribers } from 'modules/profile/components/Subscribers';
import { Section } from 'modules/uiKit/Section';
import React, { useEffect, useState } from 'react';
import { BrandNFTItems } from './components/BrandNFTItems';
import { BrandsItem } from './components/BrandsItem';
import { BrandsList } from './components/BrandsList';

export const Brands = () => {
  const dispatch = useDispatchRequest();
  const { isConnected } = useAccount();
  const [brandList, setBrandList] = useState<IBrandInfo[]>([]);

  const { loading } = useMutation({ type: listBrands.toString() });

  const hasBrands = !!brandList.length;

  useEffect(() => {
    if (isConnected) {
      dispatch(listBrands()).then(res => {
        setBrandList(res.data);
      });
    }
  }, [isConnected, dispatch]);

  return (
    <Section>
      <Container maxWidth="xl">
        <Box mb={4}>
          <Typography variant="h1">{t('brands.title')}</Typography>
        </Box>

        {loading && (
          <Box display="flex" justifyContent="center">
            <QueryLoading />
          </Box>
        )}

        {!loading && hasBrands && (
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
                  followers={<Subscribers withFollow />}
                />
              ),
            )}
          </BrandsList>
        )}
      </Container>
    </Section>
  );
};
