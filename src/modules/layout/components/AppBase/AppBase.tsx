import React, { ReactNode, useEffect, useState } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import intl from 'react-intl-universal';
import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { locales } from '../../../i18n';
import { QueryLoadingAbsolute } from '../QueryLoading/QueryLoading';
import { ReactReduxContext } from 'react-redux';
import { mainTheme } from '../../../themes/mainTheme';
import { historyInstance } from '../../../common/utils/historyInstance';
import { useLocale } from '../../../i18n/utils/useLocale';

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
