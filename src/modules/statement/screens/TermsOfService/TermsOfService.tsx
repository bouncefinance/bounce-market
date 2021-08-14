import { ThemeProvider } from '@material-ui/core';
import { darkTheme } from 'modules/themes/darkTheme';
import { useTermsOfServiceStyles } from './useTermsOfServiceStyles';

export const TermsOfService = () => {
  const classes = useTermsOfServiceStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <>
        <div className={classes.iframeWrapper}>
          <iframe
            title="TermsofService"
            className={classes.iframe}
            src="/docs/TermsofService.enUS.html"
          />
        </div>
      </>
    </ThemeProvider>
  );
};
