import { Tab, TabProps } from '@material-ui/core';
import { useDropsTabsStyles } from './useDropsTabsStyles';

export const DropsTab = ({ classes, ...restProps }: TabProps) => {
  const styles = useDropsTabsStyles();

  return (
    <Tab
      {...restProps}
      classes={{
        ...classes,
        root: styles.tab,
        selected: styles.tabSelected,
        textColorSecondary: styles.textColorSecondary,
      }}
    />
  );
};
