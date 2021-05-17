import { makeStyles } from "@material-ui/core"
import { IItem } from "modules/pools/actions/queryItemByFilter";

const useStyles = makeStyles(() => ({
  root: {
    
  },
  holder: {
    width: 120,
    height: 120,
    borderRadius: 10,
    overflow: 'hidden',
  },
  img: {
    width: 120,
    height: 120,
  },
  info: {
    fontSize: 20,
    wordBreak: 'break-all',
  }
}))

export const Item = ({
  data,
}: {
  data: IItem;
}) => {
  const classes = useStyles();

  return <div className={classes.root}>
    <div className={classes.holder}>
      <img className={classes.img} src={data.fileurl} alt={data.itemname} />
    </div>
    <div className={classes.info}>
      {data.itemname}
    </div>
  </div>
}