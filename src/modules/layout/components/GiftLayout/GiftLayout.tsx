import { Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import classNames from 'classnames';
import React from 'react';
import { getTheme } from '../../../common/utils/getTheme';
import { Themes } from '../../../themes/types';
import { GiftHeader } from '../GiftHeader';
import { useGiftLayoutStyles } from './GiftLayoutStyles';

export interface ILayoutProps {
  children?: React.ReactNode;
  headerTheme?: Themes;
  title?: string;
  description?: string;
}

export const GiftLayout = ({
  children,
  headerTheme = Themes.dark,
}: ILayoutProps) => {
  const classes = useGiftLayoutStyles();

  return (
    <div className={classNames(classes.root, classes.darkBg)}>
      <ThemeProvider theme={getTheme(headerTheme)}>
        <GiftHeader />
      </ThemeProvider>

      <main className={classNames(classes.main)}>{children}</main>
    </div>
  );
};
