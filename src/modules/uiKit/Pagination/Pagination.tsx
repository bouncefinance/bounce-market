import {ChangeEvent} from 'react';
import {usePaginationStyles} from './usePaginationStyles';
import {t} from "../../i18n/utils/intl";
import * as MUI from "@material-ui/lab";

interface IPaginationProps {
  count: number
  onChange: (e: ChangeEvent<unknown>, page: number) => void;
  page?: number
}

export const Pagination = ({page, count, onChange}: IPaginationProps) => {
  const styleProps = {
    firstTitle: t('market.pagination.first-title'),
    lastTitle: t('market.pagination.last-title')
  };
  const classes = usePaginationStyles(styleProps);

  const itemCreator = (item: MUI.PaginationItemProps) =>
    <MUI.PaginationItem
      classes={{
        root: classes.itemRoot,
        ellipsis: classes.ellipsis,
      }}
      {...item}
    />;

  return (
    <MUI.Pagination
      className={classes.root}
      count={count}
      showFirstButton
      showLastButton
      onChange={onChange}
      variant="outlined"
      shape="rounded"
      renderItem={itemCreator}
      page={page}
    />
  );
};
