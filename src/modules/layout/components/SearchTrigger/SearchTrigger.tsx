import { Button } from '@material-ui/core';
import classNames from 'classnames';
import { useSearchTriggerStyles } from './SearchTriggerStyles';

interface ISearchTriggerProps {
  className?: string;
  isActive?: boolean;
}

export const SearchTrigger = ({ className, isActive }: ISearchTriggerProps) => {
  const classes = useSearchTriggerStyles();
  return (
    <Button
      className={classNames(
        classes.root,
        isActive && classes.active,
        className,
      )}
      variant="text"
    >
      s
    </Button>
  );
};
