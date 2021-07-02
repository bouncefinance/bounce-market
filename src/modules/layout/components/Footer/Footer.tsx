import { Container, Grid } from '@material-ui/core';
import classNames from 'classnames';
import { LocaleSwitcher } from 'modules/common/components/LocaleSwitcher';
import React from 'react';
import { LogoByBounce } from '../LogoByBounce';
import { Social } from '../Social';
import { useFooterStyles } from './FooterStyles';

export const Footer = () => {
  const classes = useFooterStyles();

  return (
    <footer className={classes.root}>
      <Container maxWidth={false} className={classes.container}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md className={classes.col}>
            <LogoByBounce />
          </Grid>

          <Grid
            item
            xs={12}
            md
            className={classNames(classes.col, classes.localeCol)}
          >
            <LocaleSwitcher />
          </Grid>

          <Grid
            item
            xs={12}
            md
            className={classNames(classes.col, classes.socialCol)}
          >
            <Social />
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};
