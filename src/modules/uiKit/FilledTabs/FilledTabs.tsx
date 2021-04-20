import { Tabs, TabsProps } from '@material-ui/core';
import { useFilledTabsStyles } from './useFilledTabsStyles';

export const FilledTabs = ({ classes, ...restProps }: TabsProps) => {
  const styles = useFilledTabsStyles();

  return (
    <Tabs
      {...restProps}
      classes={{
        ...classes,
        root: styles.root,
        scroller: styles.scroller,
        indicator: styles.indicator,
      }}
    />
  );
};
