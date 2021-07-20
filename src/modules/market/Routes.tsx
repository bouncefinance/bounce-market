import loadable, { LoadableComponent } from '@loadable/component';
import { QueryLoadingAbsolute } from 'modules/common/components/QueryLoading/QueryLoading';
import { useQueryParams } from 'modules/common/hooks/useQueryParams';
import { ItemsChannel } from 'modules/overview/actions/fetchItemsByFilter';
import { generatePath, Route } from 'react-router-dom';
import { RouteConfiguration } from '../common/types/RouteConfiguration';

const PATH_MARKET_BASE = '/market';
const PATH_MARKET = `${PATH_MARKET_BASE}?page=:page?&category=:category?`;

const DEFAULT_PAGE = 1;
const DEFAULT_CATEGORY = ItemsChannel.fineArts;

const LoadableContainer: LoadableComponent<any> = loadable(
  async () => import('./screens/Market').then(module => module.Market),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

export const MarketRoutesConfig: { [key: string]: RouteConfiguration } = {
  Market: {
    path: PATH_MARKET_BASE,
    generatePath: (page?: number, category?: ItemsChannel) => {
      if (!page && !category) {
        return generatePath(PATH_MARKET_BASE);
      } else {
        return generatePath(PATH_MARKET, {
          page: page ?? DEFAULT_PAGE,
          category: category ?? DEFAULT_CATEGORY,
        });
      }
    },
    useParams: () => {
      const query = useQueryParams();
      const page = query.get('page');

      return {
        page: page ? +page : DEFAULT_PAGE,
        category: query.get('category') || DEFAULT_CATEGORY,
      };
    },
  },
};

export function MarketRoutes() {
  return (
    <Route
      path={MarketRoutesConfig.Market.path}
      exact={true}
      component={LoadableContainer}
    />
  );
}
