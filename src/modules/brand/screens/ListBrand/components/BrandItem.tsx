import { makeStyles, Theme } from "@material-ui/core";
import { useDispatchRequest } from "@redux-requests/react";
import { queryBrandPools } from "modules/brand/actions/queryBrandPools";
import { IBrandInfo } from "modules/brand/api/queryBrand";
import { IItem } from "modules/pools/actions/queryItemByFilter";
import { useEffect, useState } from "react";
import { Item } from "./Item";


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    border: '1px solid #ccc',
    borderRadius: 10,
    backgroundColor: theme.palette.common.white,
    height: 300,
    marginBottom: 36,
    overflow: 'hidden',
    padding: 20,
  },
  info: {
    width: '50%',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    fontSize: 24,
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: '50%',
    marginRight: 24,
  },
  desc: {
    marginTop: 24,
  },
  content: {

  }
}));

export const BrandItem = ({
  data,
}: {
  data: IBrandInfo;
}) => {
  const classes = useStyles();
  const dispatch = useDispatchRequest();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (data.owneraddress === '0x2d3fff58da3346dce601f6db8eec57906cdb17be') {
      dispatch(queryBrandPools({
        owneraddress: data.owneraddress,
        contractaddress: data.contractaddress,
      }))
        .then(res => {
          setItems(res.data);
        })
      }
  }, [dispatch, data]);

  return <div className={classes.root}>
    <div className={classes.info}>
      <div className={classes.title}>
        <img className={classes.logo} src={data.imgurl} alt={data.brandname} />
        <span>{data.brandname}</span>
      </div>
      <div className={classes.desc}>{data.description}</div>
    </div>
    <div className={classes.content}>
      {items && items.length === 0
        ? 'no data'
        : items.map((item:IItem) => <Item data={item} key={item.id} />)}
    </div>
  </div>
}