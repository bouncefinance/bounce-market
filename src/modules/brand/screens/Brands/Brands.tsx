import { Box, Container, Typography } from '@material-ui/core';
import { resetRequests } from '@redux-requests/core';
import { useDispatchRequest } from '@redux-requests/react';
import { useAccount } from 'modules/account/hooks/useAccount';
import { listBrands } from 'modules/brand/actions/listBrands';
import { IBrandInfo } from 'modules/brand/api/queryBrand';
import { CollectionNFTItems } from 'modules/brand/components/CollectionNFTItems';
import { featuresConfig } from 'modules/common/conts';
import { t } from 'modules/i18n/utils/intl';
import { Subscribers } from 'modules/profile/components/Subscribers';
import { ProfileRoutesConfig } from 'modules/profile/ProfileRoutes';
import { Section } from 'modules/uiKit/Section';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Queries } from '../../../common/components/Queries/Queries';
import { ResponseData } from '../../../common/types/ResponseData';
import { BrandsItem } from './components/BrandsItem';
import { BrandsList } from './components/BrandsList';

export const Brands = () => {
  const dispatchRequest = useDispatchRequest();
  const dispatch = useDispatch();
  const { isConnected } = useAccount();

  useEffect(() => {
    dispatchRequest(listBrands());

    return function reset() {
      dispatch(resetRequests([listBrands.toString()]));
    };
  }, [dispatch, dispatchRequest, isConnected]);

  return (
    <Section>
      <Container maxWidth="xl">
        <Box mb={4}>
          <Typography variant="h1">{t('collections.title')}</Typography>
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
                  <>
                    <BrandsItem
                      href={
                        owneraddress &&
                        ProfileRoutesConfig.Collection.generatePath(
                          contractaddress,
                        )
                      }
                      key={id}
                      name={brandname}
                      descr={description}
                      img={imgurl}
                      nftItems={
                        <CollectionNFTItems
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
                  </>
                ),
              )}
            </BrandsList>
          )}
        </Queries>
      </Container>
    </Section>
  );
};
