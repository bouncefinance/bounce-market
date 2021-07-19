import { DropsRoutes, DropsRoutesConfig } from 'modules/drops/Routes';
import { MarketRoutes, MarketRoutesConfig } from 'modules/market/Routes';
import {
  ProfileRoutes,
  ProfileRoutesConfig,
} from 'modules/profile/ProfileRoutes';
import { Route, Switch, Redirect } from 'react-router-dom';
import { BrandRoutes, BrandRoutesConfig } from './modules/brand/BrandRoutes';
import {
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

export function Routes() {
  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to={'/drops'} />} />

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
          CreateNFTRoutesConfig.PublishNft.path,
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
          <DefaultLayout>
            <BuyNFTRoutes />
          </DefaultLayout>
        )}
      />

      <Route
        exact
        path={[
          ProfileRoutesConfig.EditProfile.path,
          ProfileRoutesConfig.UserProfile.path,
          ProfileRoutesConfig.OtherProfile.path,
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
          BrandRoutesConfig.CreateBrandItem.path,
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
        ]}
        render={() => (
          <DefaultLayout headerTheme={Themes.dark} footerTheme={Themes.dark}>
            <DropsRoutes />
          </DefaultLayout>
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
