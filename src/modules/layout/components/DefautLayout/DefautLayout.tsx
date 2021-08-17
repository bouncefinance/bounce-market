import { ThemeProvider } from '@material-ui/styles';
import classNames from 'classnames';
import React from 'react';
import { getTheme } from '../../../common/utils/getTheme';
import { Themes } from '../../../themes/types';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { useDefaultLayoutStyles } from './DefaultLayoutStyles';

export interface ILayoutProps {
  children?: React.ReactNode;
  headerTheme?: Themes;
  footerTheme?: Themes;
  isFooter?: boolean;
}

export const DefaultLayout = ({
  children,
  headerTheme = Themes.light,
  footerTheme = Themes.light,
  isFooter = true,
}: ILayoutProps) => {
  const classes = useDefaultLayoutStyles();

  const isDarkBg = headerTheme === Themes.dark && footerTheme === Themes.dark;

  return (
    <div className={classNames(classes.root, isDarkBg && classes.darkBg)}>
      <ThemeProvider theme={getTheme(headerTheme)}>
        <Header />
      </ThemeProvider>

      <main className={classNames(classes.main)}>{children}</main>

      {isFooter && (
        <ThemeProvider theme={getTheme(footerTheme)}>
          <Footer />
        </ThemeProvider>
      )}
    </div>
  );
};
