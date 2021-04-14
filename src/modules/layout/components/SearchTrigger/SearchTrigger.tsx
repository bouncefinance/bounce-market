import { ButtonProps } from '@material-ui/core';
import classNames from 'classnames';
import { SearchIcon } from 'modules/components/Icons/SearchIcon';
import { Button } from 'modules/uiKit/Button';
import { useSearchTriggerStyles } from './SearchTriggerStyles';

interface ISearchTriggerProps extends ButtonProps {
  className?: string;
  isActive?: boolean;
}

export const SearchTrigger = ({
  className,
  isActive,
  ...restProps
}: ISearchTriggerProps) => {
  const classes = useSearchTriggerStyles();
  return (
    <Button
      {...restProps}
      className={classNames(
        classes.root,
        isActive && classes.active,
        className,
      )}
      variant="text"
    >
      <SearchIcon className={classes.icon} />
    </Button>
  );
};
