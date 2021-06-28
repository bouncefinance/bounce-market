import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import { getTheme } from '../../../common/utils/getTheme';
import { Themes } from '../../../themes/types';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { useDefaultLayoutStyles } from './DefaultLayoutStyles';

export interface ILayoutProps {
  children?: React.ReactNode;
  headerTheme?: Themes;
  footerTheme?: Themes;
}

export const DefaultLayout = ({
  children,
  headerTheme = Themes.light,
  footerTheme = Themes.light,
}: ILayoutProps) => {
  const classes = useDefaultLayoutStyles();

  return (
    <div className={classes.root}>
      <ThemeProvider theme={getTheme(headerTheme)}>
        <Header />
      </ThemeProvider>
      <main className={classes.main}>{children}</main>
      <ThemeProvider theme={getTheme(footerTheme)}>
        <Footer />
      </ThemeProvider>
    </div>
  );
};
