import { ClickAwayListener, Container, Drawer } from '@material-ui/core';
import React from 'react';
import { useIsXLUp } from '../../../common/hooks/useTheme';
import { Button } from '../../../uiKit/Button';
import { HeaderLinks, HeaderLinksSecondary } from '../HeaderLinks';
import { Logo } from '../Logo';
import { Search } from '../Search';
import { SearchTrigger } from '../SearchTrigger';
import { Toggle } from '../Toggle';
import { useHeaderStyles } from './HeaderStyles';
import { useHeader } from './useHeader';

export const Header = () => {
  const { mobileNavShowed, toggleNav } = useHeader();
  const classes = useHeaderStyles();

  const isXLUp = useIsXLUp();

  const renderedDesktop = (
    <>
      <Search className={classes.search} />

      <HeaderLinks />

      <HeaderLinksSecondary />

      <Button className={classes.btnCreate} color="default">
        Create
      </Button>

      <Button className={classes.wallet}>
        0x63c6...b350
        <span className={classes.walletLogo} />
      </Button>
    </>
  );

  const renderedMobile = (
    <>
      <div className={classes.buttons}>
        <SearchTrigger />
        <ClickAwayListener onClickAway={toggleNav(false)}>
          <div>
            <Toggle
              onClick={mobileNavShowed ? toggleNav(false) : toggleNav(true)}
              isActive={mobileNavShowed}
            />

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
                <Button className={classes.wallet}>
                  0x63c6...b350
                  <span className={classes.walletLogo} />
                </Button>

                <Button className={classes.btnCreate} color="default">
                  Create
                </Button>

                <HeaderLinks />

                <HeaderLinksSecondary />
              </Container>
            </Drawer>
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
