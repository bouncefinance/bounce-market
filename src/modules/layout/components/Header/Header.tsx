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
import {
  SelectChainDialog,
  useDialogState,
} from './components/SelectChainDialog';
import { useCallback } from 'react';
import { setChainId } from 'modules/common/utils/localStorage';

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

  const { isConnected, handleConnect, loading, chainId } = useAccount();
  const classes = useHeaderStyles();
  const isXLUp = useIsXLUp();

  const {
    opened: openedSelectChainDialog,
    open: openSelectChainDialog,
    close: closeSelectChainDialog,
  } = useDialogState();

  const mapChainIdName = useCallback(() => {
    setChainId(chainId);
    switch (chainId) {
      case 1:
        return t('header.network.etherreum');
      case 4:
        return t('header.network.rinkby');
      case 56:
        return t('header.network.binance');
      case 128:
        return t('header.network.heco');
      case 137:
        return t('header.network.polygon');
      default:
        return t('header.network.unknow');
    }
  }, [chainId]);

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
        <Button onClick={handleConnect} loading={loading} rounded>
          {t('header.connect')}
        </Button>
      )}
      {isConnected && (
        <div>
          <Button
            onClick={openSelectChainDialog}
            loading={loading}
            rounded
            className={classes.btnChangeNet}
          >
            {mapChainIdName()}
          </Button>
          <SelectChainDialog
            isOpen={openedSelectChainDialog}
            onClose={closeSelectChainDialog}
            currentChain={chainId}
          />
          {renderedWallet}
        </div>
      )}
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

                  <Box mt="auto" mb={3}>
                    <Button
                      onClick={openSelectChainDialog}
                      loading={loading}
                      rounded
                      className={classes.btnChangeNet}
                      fullWidth
                    >
                      {mapChainIdName()}
                    </Button>
                  </Box>

                  {!isConnected && (
                    <Button
                      onClick={handleConnect}
                      loading={loading}
                      fullWidth
                      rounded
                    >
                      {t('header.connect')}
                    </Button>
                  )}

                  {isConnected && renderedWallet}

                  <Social mt={5} />

                  <SelectChainDialog
                    currentChain={chainId}
                    isOpen={openedSelectChainDialog}
                    onClose={closeSelectChainDialog}
                  />
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
