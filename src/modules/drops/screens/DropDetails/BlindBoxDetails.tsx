import { Box, Container, ThemeProvider, Typography } from '@material-ui/core';
import { resetRequests } from '@redux-requests/core';
import { useQuery } from '@redux-requests/react';
import { useAccount } from 'modules/account/hooks/useAccount';
import { IDropDetails } from 'modules/api/getOneDropsDetail';
import { ProductCard } from 'modules/common/components/ProductCard';
import { getDropDetails } from 'modules/drops/actions/getDropDetails';
import { DropsContainer } from 'modules/drops/components/DropsContainer';
import { DropsRoutesConfig } from 'modules/drops/Routes';
import { t } from 'modules/i18n/utils/intl';
import { GoBack } from 'modules/layout/components/GoBack';
import { darkTheme } from 'modules/themes/darkTheme';
import { Section } from 'modules/uiKit/Section';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Description } from './components/Description';
import BigNumber from 'bignumber.js';
import { AuctionType } from 'modules/api/common/auctionType';
import { CardProfileInfo } from 'modules/common/components/ProfileInfo';

export const BlindBoxDetails = () => {
  const dispatch = useDispatch();
  const { chainId } = useAccount();
  const { blindboxId } = DropsRoutesConfig.BlindBoxDetails.useParams();

  useEffect(() => {
    dispatch(getDropDetails({ id: + blindboxId }));

    return function reset() {
      dispatch(resetRequests([getDropDetails.toString()]));
    };
  }, [dispatch, blindboxId, chainId]);

  const { data, loading, pristine } = useQuery<IDropDetails | null>({
    type: getDropDetails.toString(),
  });

  const status = 'Live'

  return (
    <ThemeProvider theme={darkTheme}>
      <Section>
        <Container maxWidth={false}>
          <Box mb={{ xs: 8, md: 12 }}>
            <GoBack />
          </Box>
        </Container>
        <DropsContainer>
          <Description loading={loading} pristine={pristine} data={data} />
          <Box mb={5}>
            {
              status === 'Live' ?
                <Typography variant="h2">⚡ {t('drop-details.live') + 'BlindBox'}</Typography> :
                <Typography variant="h2">{t('drop-details.sold') + 'BlindBox'}</Typography>
            }

            <Box style={{
              width: 306,
              marginTop: 20
            }}>
              <ProductCard
                isOnSale
                soldData={{
                  sold: 20,
                  quantity: 100,
                }}
                id={0}
                poolId={0}
                title={''}
                MediaProps={{
                  category: 'image',
                  src: 'https://ap1-cfs3-media-bounce.bounce.finance/6bca64a62b5990dc3e582c9684477b75-1634573265.png',
                  objectFit: 'contain',
                  loading: 'lazy',
                }}
                auctionType={AuctionType.FixedSwap}
                price={new BigNumber(0.2)}
                priceType={'ETH'}
                openAt={new Date()}
                profileInfo={
                  <CardProfileInfo
                    subTitle={t('product-card.owner')}
                    title={'NM0979 The Truth is Often Somewhere in Between'} users={[]}
                  // users={item.avatars}
                  />
                }
              />

            </Box>
          </Box>



        </DropsContainer>
      </Section>
    </ThemeProvider>
  );
};
