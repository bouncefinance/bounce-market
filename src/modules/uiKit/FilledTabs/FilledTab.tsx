import { Tab, TabProps } from '@material-ui/core';
import { useFilledTabsStyles } from './useFilledTabsStyles';

export const FilledTab = ({ classes, ...restProps }: TabProps) => {
  const styles = useFilledTabsStyles();

  return (
    <Tab
      {...restProps}
      classes={{
        ...classes,
        root: styles.tab,
        textColorSecondary: styles.textColorSecondary,
      }}
    />
  );
};
