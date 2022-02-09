import { DropsRoutes, DropsRoutesConfig } from 'modules/drops/Routes';
import {
  StatementRoutes,
  StatementRoutesConfig,
} from 'modules/statement/Routes';
import { MarketRoutes, MarketRoutesConfig } from 'modules/market/Routes';
import {
  ProfileRoutes,
  ProfileRoutesConfig,
} from 'modules/profile/ProfileRoutes';
import { Route, Switch, Redirect } from 'react-router-dom';
import { BrandRoutes, BrandRoutesConfig } from './modules/brand/BrandRoutes';
import {
  BuyItemNFTRoutes,
  BuyNFTRoutes,
  BuyNFTRoutesConfig,
} from './modules/buyNFT/BuyNFTRoutes';
import {
  Routes as CreateNFTRoutes,
  RoutesConfiguration as CreateNFTRoutesConfig,
} from './modules/createNFT/Routes';
import { DefaultLayout } from './modules/layout/components/DefautLayout';
import {
  Routes as OverviewRoutes,
  RoutesConfiguration as OverviewRoutesConfig,
} from './modules/overview/Routes';
import { PageNotFound } from './modules/router/components/PageNotFound';
import { Themes } from './modules/themes/types';
import { GiftRoutes, GiftRoutesConfig } from 'modules/gift/Routes';
import { GiftLayout } from 'modules/layout/components/GiftLayout';

export function Routes() {
  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/index" />} />

      <Route
        exact
        path={OverviewRoutesConfig.Overview.path}
        render={() => (
          <DefaultLayout headerTheme={Themes.dark}>
            <OverviewRoutes />
          </DefaultLayout>
        )}
      />

      <Route
        exact
        path={MarketRoutesConfig.Market.path}
        render={() => (
          <DefaultLayout>
            <MarketRoutes />
          </DefaultLayout>
        )}
      />

      <Route
        exact
        path={[
          CreateNFTRoutesConfig.CreateNft.path,
          CreateNFTRoutesConfig.DepositToken.path,
          CreateNFTRoutesConfig.PublishNft.path,
          CreateNFTRoutesConfig.PublishErc20.path,
        ]}
        render={() => (
          <DefaultLayout>
            <CreateNFTRoutes />
          </DefaultLayout>
        )}
      />

      <Route
        exact
        path={BuyNFTRoutesConfig.DetailsNFT.path}
        render={() => (
          <DefaultLayout isFooter={false}>
            <BuyNFTRoutes />
          </DefaultLayout>
        )}
      />

      <Route
        exact
        path={BuyNFTRoutesConfig.Details_ITEM_NFT.path}
        render={() => (
          <DefaultLayout isFooter={false}>
            <BuyItemNFTRoutes />
          </DefaultLayout>
        )}
      />

      <Route
        exact
        path={[
          ProfileRoutesConfig.EditProfile.path,
          ProfileRoutesConfig.UserProfile.path,
          ProfileRoutesConfig.OtherProfile.path,
          ProfileRoutesConfig.Collection.path,
        ]}
        render={() => (
          <DefaultLayout>
            <ProfileRoutes />
          </DefaultLayout>
        )}
      />

      <Route
        exact
        path={[
          BrandRoutesConfig.ListBrand.path,
          BrandRoutesConfig.CreateBrand.path,
          BrandRoutesConfig.CreateCollectionItem.path,
          BrandRoutesConfig.MyBrand.path,
          BrandRoutesConfig.Brand.path,
        ]}
        render={() => (
          <DefaultLayout>
            <BrandRoutes />
          </DefaultLayout>
        )}
      />

      <Route
        exact
        path={[
          DropsRoutesConfig.Drops.path,
          DropsRoutesConfig.DropDetails.path,
          DropsRoutesConfig.BlindBoxDetails.path,
        ]}
        render={() => (
          <DefaultLayout headerTheme={Themes.dark} footerTheme={Themes.dark}>
            <DropsRoutes />
          </DefaultLayout>
        )}
      />

      <Route
        exact
        path={[
          StatementRoutesConfig.OurStory.path,
          StatementRoutesConfig.TermsOfService.path,
        ]}
        render={() => (
          <DefaultLayout>
            <StatementRoutes />
          </DefaultLayout>
        )}
      />

      <Route
        exact
        path={[
          GiftRoutesConfig.LandingPage.path,
          GiftRoutesConfig.EnterPwd.path,
          GiftRoutesConfig.ConfirmProfile.path,
          GiftRoutesConfig.ClaimNft.path,
          GiftRoutesConfig.Instruction.path,
        ]}
        render={() => (
          <GiftLayout>
            <GiftRoutes />
          </GiftLayout>
        )}
      />

      <Route
        render={() => (
          <DefaultLayout>
            <PageNotFound />
          </DefaultLayout>
        )}
      />
    </Switch>
  );
}
