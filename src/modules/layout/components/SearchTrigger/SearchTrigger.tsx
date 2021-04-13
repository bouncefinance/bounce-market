import { ButtonProps, SvgIcon } from '@material-ui/core';
import classNames from 'classnames';
import { Button } from 'modules/uiKit/Button';
import { ReactComponent as SearchIcon } from './assets/search.svg';
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
      <SvgIcon
        component={SearchIcon}
        className={classes.icon}
        viewBox="0 0 24 24"
      />
    </Button>
  );
};
