import { makeStyles, Theme } from "@material-ui/core"
import { IBrandInfo } from "modules/brand/api/queryBrand";
import { BrandItem } from "./BrandItem";

const useStyles = makeStyles((theme: Theme) => ({
  root: {

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  }
}));

export const Brands = ({
  data
}: {
  data?: IBrandInfo[];
}) => {
  const classes = useStyles();

  return <div className={classes.root}>
    <div className={classes.title}>
      {'Brands'}
    </div>
    {data && data.map((item: IBrandInfo, index: number) => <BrandItem key={item.id} data={item} />)}
  </div>
}