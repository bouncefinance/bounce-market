import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { useMutation } from '@redux-requests/react';
import { ConnectedRouter } from 'connected-react-router';
import { Web3ModalStyles } from 'modules/account/components/Web3ModalStyles';
import { updateAccount } from 'modules/account/store/actions/updateAccount';
import React, { ReactNode, useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { ReactReduxContext } from 'react-redux';
import 'swiper/swiper-bundle.min.css';
import '../../../../assets/fonts/style.css';
import { QueryLoadingAbsolute } from '../../../common/components/QueryLoading/QueryLoading';
import { historyInstance } from '../../../common/utils/historyInstance';
import { locales } from '../../../i18n';
import { useLocale } from '../../../i18n/utils/useLocale';
import { mainTheme } from '../../../themes/mainTheme';

interface IAppBaseProps {
  children: ReactNode;
}

export const AppBase = ({ children }: IAppBaseProps) => {
  const [initDone, setInitDone] = useState(false);
  const { locale } = useLocale();

  const { loading } = useMutation({
    type: updateAccount.toString(),
  });

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
      <Web3ModalStyles />

      {!initDone || loading ? (
        <QueryLoadingAbsolute />
      ) : (
        <ConnectedRouter history={historyInstance} context={ReactReduxContext}>
          {children}
        </ConnectedRouter>
      )}
    </MuiThemeProvider>
  );
};
