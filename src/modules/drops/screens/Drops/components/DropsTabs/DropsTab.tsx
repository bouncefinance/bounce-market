import { Box, TabProps } from '@material-ui/core';
import { useDropsTabsStyles } from './useDropsTabsStyles';

export const DropsTab = ({ classes, ...restProps }: TabProps) => {
  const styles = useDropsTabsStyles();

  return (
    <Box className={styles.root}>
      <h1 className={styles.tab}>
        {restProps.label} dr<span>🔥</span>ps
      </h1>
    </Box>
  );
};
