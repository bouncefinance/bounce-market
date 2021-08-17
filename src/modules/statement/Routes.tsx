import loadable, { LoadableComponent } from '@loadable/component';
import { QueryLoadingAbsolute } from 'modules/common/components/QueryLoading/QueryLoading';
import { RouteConfiguration } from 'modules/common/types/RouteConfiguration';
import { Route } from 'react-router-dom';

const PATH_OUR_STORY = '/OurStory';
const PATH_TERMS_OF_SERVICE = '/TermsOfService';

export const StatementRoutesConfig: { [key: string]: RouteConfiguration } = {
  OurStory: {
    path: PATH_OUR_STORY,
    generatePath: () => PATH_OUR_STORY,
  },

  TermsOfService: {
    path: PATH_TERMS_OF_SERVICE,
    generatePath: () => PATH_TERMS_OF_SERVICE,
  },
};

const LoadableOurStoryContainer: LoadableComponent<any> = loadable(
  async () => import('./screens/OurStory').then(module => module.OurStory),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

const LoadableTermsOfServiceContainer: LoadableComponent<any> = loadable(
  async () =>
    import('./screens/TermsOfService').then(module => module.TermsOfService),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

export function StatementRoutes() {
  return (
    <>
      <Route
        path={StatementRoutesConfig.OurStory.path}
        exact={true}
        component={LoadableOurStoryContainer}
      />

      <Route
        path={StatementRoutesConfig.TermsOfService.path}
        exact={true}
        component={LoadableTermsOfServiceContainer}
      />
    </>
  );
}
