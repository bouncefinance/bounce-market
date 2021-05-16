import { fade, makeStyles, Theme } from '@material-ui/core';
import { QueryLoadingCentered } from 'modules/common/components/QueryLoading/QueryLoading';
import {
  ISearchAccount,
  ISearchBrand,
  ISearchItem,
  ISearchResult,
} from './getByLikeStr';
import { Link as RouterLink } from 'react-router-dom';
import { BuyNFTRoutesConfig } from '../../../buyNFT/BuyNFTRoutes';
import { AuctionType } from '../../../overview/api/auctionType';
import { IPool } from '../../../profile/api/getPoolsByFilter';
import { isEnglishAuction } from '../../../overview/actions/fetchPoolDetails';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    borderRadius: 4,
    color: theme.palette.common.black,
  },
  title: {
    fontSize: 16,
    marginBottom: 12,
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 18,
  },
  img: {
    width: 40,
    height: 40,
    marginRight: 12,
    '& img': {
      width: '100%',
      height: '100%',
    },
  },
  item: {},
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 12,
    color: fade(theme.palette.common.black, 0.4),
  },
}));

const SearchItems = ({
  data,
  pools,
}: {
  data: ISearchItem[];
  pools: IPool[];
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.title}>{'Items'}</div>
      {data.map((item: ISearchItem) => {
        const pool = pools.find(poolItem => poolItem.tokenId === item.id);

        if (!pool) {
          return undefined;
        }

        return (
          <RouterLink
            to={BuyNFTRoutesConfig.DetailsNFT.generatePath(
              pool.poolId,
              isEnglishAuction(pool)
                ? AuctionType.EnglishAuction
                : AuctionType.FixedSwap,
            )}
            className={classes.content}
            key={item.id}
          >
            <div className={classes.img}>
              <img alt={item.name} src={item.imgUrl} />
            </div>
            <div className={classes.item}>
              <div className={classes.name}>{item.name}</div>
            </div>
          </RouterLink>
        );
      })}
    </div>
  );
};

const SearchBrand = ({ data }: { data: ISearchBrand[] }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.title}>{'Brands'}</div>
      {data.map((item: ISearchBrand) => (
        <div className={classes.content} key={item.id}>
          <div className={classes.img}>
            <img alt={item.name} src={item.imgUrl} />
          </div>
          <div className={classes.item}>
            <div className={classes.name}>{item.name}</div>
            <div className={classes.address}>{item.address}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

const SearchAccount = ({ data }: { data: ISearchAccount[] }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.title}>{'Account'}</div>
      {data.map((item: ISearchAccount) => (
        <div className={classes.content} key={item.id}>
          <div className={classes.img}>
            <img alt={item.name} src={item.imgUrl} />
          </div>
          <div className={classes.item}>
            <div className={classes.name}>{item.name}</div>
            <div className={classes.address}>{item.address}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

const SearchResult = ({
  loading,
  data,
  pools,
}: {
  loading?: boolean;
  data: ISearchResult;
  pools: IPool[];
}) => {
  return (
    <div>
      {loading ? (
        <QueryLoadingCentered />
      ) : (
        <SearchItems data={data.items} pools={pools} />
      )}
      {loading ? <QueryLoadingCentered /> : <SearchBrand data={data.brands} />}
      {loading ? (
        <QueryLoadingCentered />
      ) : (
        <SearchAccount data={data.accounts} />
      )}
    </div>
  );
};

export { SearchResult };
