import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ConnectedRouter } from 'connected-react-router';
import React, { ReactNode, useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { ReactReduxContext } from 'react-redux';
import 'swiper/swiper-bundle.min.css';
import '../../../../assets/fonts/style.css';
import { historyInstance } from '../../../common/utils/historyInstance';
import { QueryLoadingAbsolute } from '../../../components/QueryLoading/QueryLoading';
import { locales } from '../../../i18n';
import { useLocale } from '../../../i18n/utils/useLocale';
import { mainTheme } from '../../../themes/mainTheme';

interface IAppBaseProps {
  children: ReactNode;
}

export const AppBase = ({ children }: IAppBaseProps) => {
  const [initDone, setInitDone] = useState(false);
  const { locale } = useLocale();

  useEffect(() => {
    setInitDone(false);
    intl
      .init({
        currentLocale: locale,
        locales,
        fallbackLocale: 'en-US',
      })
      .then(() => {
        setInitDone(true);
      });
  }, [locale]);

  return (
    <MuiThemeProvider theme={mainTheme}>
      <CssBaseline />

      {!initDone ? (
        <QueryLoadingAbsolute />
      ) : (
        <ConnectedRouter history={historyInstance} context={ReactReduxContext}>
          {children}
        </ConnectedRouter>
      )}
    </MuiThemeProvider>
  );
};
