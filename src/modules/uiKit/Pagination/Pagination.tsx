import {
  Pagination as MUIPagination,
  PaginationItem,
  PaginationItemProps,
  PaginationProps,
} from '@material-ui/lab';
import { usePaginationStyles } from './usePaginationStyles';

export const Pagination = (props: PaginationProps) => {
  const classes = usePaginationStyles();

  const itemCreator = (itemProps: PaginationItemProps) => (
    <PaginationItem
      classes={{
        root: classes.itemRoot,
        ellipsis: classes.ellipsis,
        icon: classes.itemIcon,
      }}
      {...itemProps}
    />
  );

  return (
    <MUIPagination
      {...props}
      className={classes.root}
      variant="outlined"
      shape="rounded"
      renderItem={itemCreator}
    />
  );
};
