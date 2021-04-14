import { Box, BoxProps } from '@material-ui/core';

interface ISectionProps extends BoxProps {}

/**
 * You can use the same props as [Box](https://material-ui.com/components/Box/)
 */
export const Section = ({ children, ...restProps }: ISectionProps) => {
  return (
    <Box py={{ xs: 5, md: 8 }} {...restProps} component="section">
      {children}
    </Box>
  );
};
