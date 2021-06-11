import {
  Box,
  ClickAwayListener,
  Container,
  Drawer,
  Fade,
  ThemeProvider,
} from '@material-ui/core';
import { useAccount } from 'modules/account/hooks/useAccount';
import { featuresConfig } from 'modules/common/conts';
import { getTheme } from 'modules/common/utils/getTheme';
import { t } from 'modules/i18n/utils/intl';
import { Themes } from 'modules/themes/types';
import { useIsXLUp } from 'modules/themes/useTheme';
import { Button } from 'modules/uiKit/Button';
import { Link as RouterLink } from 'react-router-dom';
import { RoutesConfiguration } from '../../../createNFT/Routes';
import { HeaderLinks, HeaderLinksSecondary } from '../HeaderLinks';
import { Logo } from '../Logo';
import { Search } from '../Search';
import { SearchTrigger } from '../SearchTrigger';
import { Social } from '../Social';
import { Toggle } from '../Toggle';
import { Wallet } from '../Wallet';
import { useHeaderStyles } from './HeaderStyles';
import { useHeader } from './useHeader';

export const Header = () => {
  const {
    onNavClose,
    onNavOpen,
    onSearchClose,
    onSearchOpen,
    onClickAwaySearch,
    onClickAwayNav,
    mobileNavShowed,
    searchShowed,
  } = useHeader();

  const { isConnected, handleConnect, loading } = useAccount();
  const classes = useHeaderStyles();
  const isXLUp = useIsXLUp();

  const renderedWallet = <Wallet />;

  const renderedDesktop = (
    <>
      <Search className={classes.search} />
      <HeaderLinks />
      {featuresConfig.howItWorkPage && <HeaderLinksSecondary />}
      <Button
        rounded
        component={RouterLink}
        to={RoutesConfiguration.CreateNft.generatePath()}
        className={classes.btnCreate}
        variant="outlined"
        color="primary"
      >
        {t('header.create')}
      </Button>

      {!isConnected && (
        <Button onClick={handleConnect} disabled={loading} rounded>
          {t('header.connect')}
        </Button>
      )}
      {isConnected && renderedWallet}
    </>
  );

  const renderedMobile = (
    <>
      <div className={classes.buttons}>
        <ClickAwayListener onClickAway={onClickAwaySearch}>
          <div>
            <SearchTrigger
              isActive={searchShowed}
              onClick={searchShowed ? onSearchClose : onSearchOpen}
            />

            <Fade in={searchShowed}>
              <div className={classes.searchBox}>
                <Container className={classes.searchBoxContainer}>
                  <Search
                    className={classes.searchMobile}
                    focus={searchShowed}
                  />
                  <Toggle onClick={onSearchClose} isActive={searchShowed} />
                </Container>
              </div>
            </Fade>
          </div>
        </ClickAwayListener>

        <ClickAwayListener onClickAway={onClickAwayNav}>
          <div>
            <Toggle
              onClick={mobileNavShowed ? onNavClose : onNavOpen}
              isActive={mobileNavShowed}
            />

            <ThemeProvider theme={getTheme(Themes.light)}>
              <Drawer
                className={classes.drawer}
                ModalProps={{
                  BackdropProps: {
                    classes: {
                      root: classes.drawerBackdrop,
                    },
                  },
                }}
                classes={{
                  paperAnchorRight: classes.drawerPaper,
                }}
                elevation={0}
                anchor="right"
                open={mobileNavShowed}
                onClose={onNavClose}
              >
                <Container className={classes.navInner}>
                  <Box mb={5}>
                    <HeaderLinks />

                    {featuresConfig.howItWorkPage && <HeaderLinksSecondary />}
                  </Box>

                  <Box mt="auto" mb={3}>
                    <Button
                      component={RouterLink}
                      className={classes.btnCreate}
                      variant="outlined"
                      to={RoutesConfiguration.CreateNft.generatePath()}
                      fullWidth
                      rounded
                      onClick={onNavClose}
                    >
                      {t('header.create')}
                    </Button>
                  </Box>

                  {!isConnected && (
                    <Button
                      onClick={handleConnect}
                      disabled={loading}
                      fullWidth
                      rounded
                    >
                      {t('header.connect')}
                    </Button>
                  )}

                  {isConnected && renderedWallet}

                  <Social mt={5} />
                </Container>
              </Drawer>
            </ThemeProvider>
          </div>
        </ClickAwayListener>
      </div>
    </>
  );

  return (
    <header className={classes.root}>
      <Container className={classes.container} maxWidth={false}>
        <Logo />

        {!isXLUp && renderedMobile}
        {isXLUp && renderedDesktop}
      </Container>
    </header>
  );
};
