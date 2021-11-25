import { ThemeProvider } from '@material-ui/styles';
import classNames from 'classnames';
import React from 'react';
import { useHistory } from 'react-router';
import { getTheme } from '../../../common/utils/getTheme';
import { Themes } from '../../../themes/types';
import { IconHeader } from '../IconHeader';
import { useGiftLayoutStyles } from './GiftLayoutStyles';

export interface ILayoutProps {
  children?: React.ReactNode;
  headerTheme?: Themes;
}

export const GiftLayout = ({
  children,
  headerTheme = Themes.dark,
}: ILayoutProps) => {
  const classes = useGiftLayoutStyles();
  const history = useHistory();

  return (
    <div className={classNames(classes.root, classes.darkBg)}>
      {!history.location.pathname.includes('instruction') && (
        <ThemeProvider theme={getTheme(headerTheme)}>
          <IconHeader />
        </ThemeProvider>
      )}

      <main className={classNames(classes.main)}>{children}</main>
    </div>
  );
};
