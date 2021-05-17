import { makeStyles, Theme } from "@material-ui/core";
import { IBrandInfo } from "modules/brand/api/queryBrand";
import { useEffect } from "react";


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
  logo:{
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
  index,
  data,
}: {
  index: number;
  data: IBrandInfo;
}) => {
  const classes = useStyles();

  useEffect(() => {
    if (index === 0) {
      
    }
  }, [index])

  return <div className={classes.root}>
    <div className={classes.info}>
      <div className={classes.title}>
        <img className={classes.logo} src={data.imgurl} alt={data.brandname} />
        <span>{data.brandname}</span>
      </div>
      <div className={classes.desc}>{data.description}</div>
    </div>
    <div className={classes.content}>
      {index === 0
      && <></>}
    </div>
  </div>
}