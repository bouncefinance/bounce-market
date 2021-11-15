import { Box, Container, ThemeProvider, Typography } from '@material-ui/core';
import { resetRequests } from '@redux-requests/core';
import { Mutation, useDispatchRequest, useQuery } from '@redux-requests/react';
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
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Description } from './components/Description';
import BigNumber from 'bignumber.js';
import { AuctionType } from 'modules/api/common/auctionType';
import { CardProfileInfo } from 'modules/common/components/ProfileInfo';
import { BuyDialog } from 'modules/buyNFT/components/BuyDialog';
import { useDialog } from 'modules/buyNFT/screens/BuyNFT/useDialog';
import { buyBlindBox } from 'modules/buyNFT/actions/buyBlindBox';
import { ProfileRoutesConfig } from 'modules/profile/ProfileRoutes';
import { useHistory } from 'react-router';
import { NFTCategoryType } from 'modules/overview/actions/fetchItemsByFilter';

export const BlindBoxDetails = () => {
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const dispatch = useDispatch();
  const dispatchRequest = useDispatchRequest();
  const { chainId, handleConnect } = useAccount();
  const { blindboxId } = DropsRoutesConfig.BlindBoxDetails.useParams();
  const {
    opened: openedFixedBuy,
    open: openFixedBuyDialog,
    close: closeFixedBuyDialog,
  } = useDialog();
  const { push } = useHistory();

  useEffect(() => {
    dispatch(getDropDetails({ id: +blindboxId }));

    return function reset() {
      dispatch(resetRequests([getDropDetails.toString()]));
    };
  }, [dispatch, blindboxId, chainId]);

  const { data, loading, pristine } = useQuery<IDropDetails | null>({
    type: getDropDetails.toString(),
  });

  const status =
    (data?.blindboxinfo?.notsaled || 0) === 0
      ? 'Sold'
      : new Date().getTime() < (data?.dropDate.getTime() || 0)
      ? 'Upcoming'
      : 'Live';

  const handleBuyBlindBox = useCallback(
    (values: { price: BigNumber; count: number }) => {
      dispatchRequest(
        buyBlindBox({
          price: values.price,
          count: values.count,
          contract: data?.blindboxinfo?.collection || '',
        }),
      ).then(({ error }) => {
        if (!error) {
          setIsFinished(true);
        }
      });
      // .then(({ error }) => {

      //   if (!error) {
      //     push(ProfileRoutesConfig.UserProfile.generatePath());
      //   }
      // });
    },
    [dispatchRequest, data?.blindboxinfo?.collection],
  );

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
            {status === 'Sold' ? (
              <Typography variant="h2">
                {t('drop-details.sold') + 'BlindBox'}
              </Typography>
            ) : (
              <Typography variant="h2">
                ⚡ {t('drop-details.live') + 'BlindBox'}
              </Typography>
            )}

            <Box
              style={{
                width: 306,
                marginTop: 20,
              }}
              onClick={() => {
                if (status === 'Live') {
                  openFixedBuyDialog();
                }
              }}
            >
              <ProductCard
                isOnSale
                soldData={{
                  sold:
                    (data?.blindboxinfo?.totalsupply || 0) -
                      (data?.blindboxinfo?.notsaled || 0) || 0,
                  quantity: data?.blindboxinfo?.totalsupply || 0,
                  color: '#000',
                }}
                id={0}
                poolId={0}
                title={''}
                MediaProps={{
                  category: NFTCategoryType.image,
                  src: data?.blindboxinfo?.blindcoverimgurl,
                  objectFit: 'contain',
                  loading: 'lazy',
                }}
                auctionType={AuctionType.FixedSwap}
                price={new BigNumber(data?.blindboxinfo?.price || 0)}
                priceType={chainId === 56 ? 'BNB' : 'ETH'}
                openAt={new Date(data?.dropDate || 0)}
                profileInfo={
                  <CardProfileInfo
                    subTitle={t('product-card.owner')}
                    title={data?.title || ''}
                    users={[]}
                    // users={item.avatars}
                  />
                }
              />
            </Box>

            {
              <Mutation type={buyBlindBox.toString()} action={buyBlindBox}>
                {({ loading }) => (
                  <BuyDialog
                    name={data?.title || 'Unname'}
                    filepath={
                      data?.blindboxinfo?.blindcoverimgurl ||
                      'https://ap1-cfs3-media-bounce.bounce.finance/6bca64a62b5990dc3e582c9684477b75-1634573265.png'
                    }
                    onSubmit={data => {
                      if (!chainId) {
                        closeFixedBuyDialog();
                        setTimeout(() => {
                          handleConnect();
                        });
                        return false;
                      }
                      const { price, quantity } = data;
                      handleBuyBlindBox({
                        price: new BigNumber(price as string),
                        count: parseInt(quantity),
                      });
                    }}
                    isOpen={openedFixedBuy}
                    onClose={closeFixedBuyDialog}
                    owner={'ownerTitle'}
                    // ownerAvatar={roleInfos.creator.avatar}
                    // isOwnerVerified={roleInfos.creator.isVerify}
                    category={NFTCategoryType.image}
                    loading={loading}
                    maxQuantity={data?.blindboxinfo?.maxbuycount}
                    currentPrice={new BigNumber(data?.blindboxinfo?.price || 0)}
                    readonly={false}
                    isPack={false}
                    isBlindBox={true}
                    soldData={{
                      notsaled: data?.blindboxinfo?.notsaled || 0,
                      quantity: data?.blindboxinfo?.totalsupply || 0,
                    }}
                    isFinished={isFinished}
                    onOk={() => {
                      setIsFinished(false);
                    }}
                    onView={() => {
                      push(
                        ProfileRoutesConfig.UserProfile.generatePath('owned'),
                      );
                    }}
                  />
                )}
              </Mutation>
            }
          </Box>
        </DropsContainer>
      </Section>
    </ThemeProvider>
  );
};
