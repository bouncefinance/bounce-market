import { Tabs, TabsProps } from '@material-ui/core';
import { useIsMDUp } from 'modules/themes/useTheme';
import { useDropsTabsStyles } from './useDropsTabsStyles';

export const DropsTabs = ({ classes, ...restProps }: TabsProps) => {
  const styles = useDropsTabsStyles();
  const isMDUp = useIsMDUp();

  return (
    <Tabs
      {...restProps}
      centered={isMDUp}
      variant={isMDUp ? undefined : 'scrollable'}
      scrollButtons="off"
      classes={{
        ...classes,
        root: styles.root,
        indicator: styles.indicator,
      }}
    />
  );
};
