import { fade, makeStyles, Theme } from '@material-ui/core';
import { QueryLoadingCentered } from 'modules/common/components/QueryLoading/QueryLoading';
import { ISearchAccount, ISearchBrand, ISearchItem, ISearchResult } from './getByLikeStr';

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
    }
  },
  item: {

  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 12,
    color: fade(theme.palette.common.black, 0.4),
  }
}))

const SearchItems = ({
  data,
}: {
  data: ISearchItem[];
}) => {
  const classes = useStyles();
  return <div className={classes.root}>
    <div className={classes.title}>
      {"Items"}
    </div>
    {data.map((item: ISearchItem) => <div className={classes.content} key={item.id}>
      <div className={classes.img}>
        <img alt={item.name} src={item.imgUrl} />
      </div>
      <div className={classes.item}>
        <div className={classes.name}>{item.name}</div>
      </div>
    </div>)}
  </div>
}

const SearchBrand = ({
  data,
}: {
  data: ISearchBrand[];
}) => {
  const classes = useStyles();

  return <div className={classes.root}>
    <div className={classes.title}>
      {"Brands"}
    </div>
    {data.map((item: ISearchBrand) => <div className={classes.content} key={item.id}>
      <div className={classes.img}>
        <img alt={item.name} src={item.imgUrl} />
      </div>
      <div className={classes.item}>
        <div className={classes.name}>{item.name}</div>
        <div className={classes.address}>{item.address}</div>
      </div>
    </div>)}
  </div>
}

const SearchAccount = ({
  data
}: {
  data: ISearchAccount[];
}) => {
  const classes = useStyles();

  return <div className={classes.root}>
    <div className={classes.title}>
      {"Account"}
    </div>
    {data.map((item: ISearchAccount) => <div className={classes.content} key={item.id}>
      <div className={classes.img}>
        <img alt={item.name} src={item.imgUrl} />
      </div>
      <div className={classes.item}>
        <div className={classes.name}>{item.name}</div>
        <div className={classes.address}>{item.address}</div>
      </div>
    </div>)}
  </div>
}

const SearchResult = ({
  loading,
  error,
  data,
}: {
  loading?: boolean;
  error?: any;
  data: ISearchResult;
}) => {

  return <div>
    {loading
      ? <QueryLoadingCentered />
      : <SearchItems data={data.items} />}
    {loading
      ? <QueryLoadingCentered />
      : <SearchBrand data={data.brands} />}
    {loading
      ? <QueryLoadingCentered />
      : <SearchAccount data={data.accounts} />}
  </div>
}

export { SearchResult }