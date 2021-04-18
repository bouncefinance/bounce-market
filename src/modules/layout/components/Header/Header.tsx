import {
  Box,
  Button,
  ClickAwayListener,
  Container,
  Drawer,
  Fade,
  ThemeProvider,
} from '@material-ui/core';
import { getTheme } from 'modules/common/utils/getTheme';
import { Themes } from 'modules/themes/types';
import { useIsXLUp } from 'modules/themes/useTheme';
import { HeaderLinks, HeaderLinksSecondary } from '../HeaderLinks';
import { Logo } from '../Logo';
import { Search } from '../Search';
import { SearchTrigger } from '../SearchTrigger';
import { Social } from '../Social';
import { Toggle } from '../Toggle';
import { useHeaderStyles } from './HeaderStyles';
import { useHeader } from './useHeader';
import { useCallback } from 'react';
import { AccountActions } from '../../../account/store/accountActions';
import { useAppDispatch } from '../../../../store/useAppDispatch';
import { useQuery } from '@redux-requests/react';
import { Link as RouterLink } from 'react-router-dom';
import { RoutesConfiguration } from '../../../createNFT/Routes';

interface IHeaderProps {
  isConnected?: boolean;
}

export const Header = ({ isConnected = false }: IHeaderProps) => {
  const dispatch = useAppDispatch();
  const {
    mobileNavShowed,
    toggleNav,
    searchShowed,
    toggleSearch,
  } = useHeader();

  const handleConnect = useCallback(() => {
    dispatch(AccountActions.connect());
  }, [dispatch]);

  const { loading } = useQuery({
    type: AccountActions.setAccount.toString(),
  });

  const classes = useHeaderStyles();

  const isXLUp = useIsXLUp();

  const renderedWallet = (
    <Button className={classes.wallet}>
      0x63c6...b350
      <span className={classes.walletLogo} />
    </Button>
  );

  const renderedDesktop = (
    <>
      <Search className={classes.search} />
      <HeaderLinks />
      <HeaderLinksSecondary />
      <Button
        component={RouterLink}
        to={RoutesConfiguration.CreateNft.generatePath()}
        className={classes.btnCreate}
        variant="outlined"
        color="default"
      >
        Create
      </Button>

      {!isConnected && (
        <Button onClick={handleConnect} disabled={loading}>
          Connect Wallet
        </Button>
      )}
      {isConnected && renderedWallet}
    </>
  );

  const renderedMobile = (
    <>
      <div className={classes.buttons}>
        <ClickAwayListener onClickAway={toggleSearch(false)}>
          <div>
            <SearchTrigger
              isActive={searchShowed}
              onClick={searchShowed ? toggleSearch(false) : toggleSearch(true)}
            />

            <Fade in={searchShowed}>
              <div className={classes.searchBox}>
                <Container className={classes.searchBoxContainer}>
                  <Search
                    className={classes.searchMobile}
                    focus={searchShowed}
                  />
                  <Toggle
                    onClick={toggleSearch(false)}
                    isActive={searchShowed}
                  />
                </Container>
              </div>
            </Fade>
          </div>
        </ClickAwayListener>

        <ClickAwayListener onClickAway={toggleNav(false)}>
          <div>
            <Toggle
              onClick={mobileNavShowed ? toggleNav(false) : toggleNav(true)}
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
                anchor="right"
                open={mobileNavShowed}
                onClose={toggleNav(false)}
              >
                <Container className={classes.navInner}>
                  <Box mb={5}>
                    <HeaderLinks />

                    <HeaderLinksSecondary />
                  </Box>

                  <Box mb={3}>
                    <Button
                      className={classes.btnCreate}
                      size="large"
                      variant="outlined"
                      fullWidth
                    >
                      Create
                    </Button>
                  </Box>

                  {!isConnected && (
                    <Button size="large" fullWidth>
                      Connect Wallet
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
      <Container className={classes.container}>
        <Logo />

        {!isXLUp && renderedMobile}
        {isXLUp && renderedDesktop}
      </Container>
    </header>
  );
};
