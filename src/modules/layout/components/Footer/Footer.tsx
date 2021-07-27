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
        <Grid container spacing={2} justify="flex-start">
          <Grid item xs={4}>
            <LogoByBounce />
            <Social />
          </Grid>
          <Grid item xs={5}>
            2
          </Grid>
          <Grid item xs={2}>
            <LocaleSwitcher />
          </Grid>
        </Grid>
        {/* <Grid container spacing={3} alignItems="center">
          <Grid xs={5}> 
            <Grid item xs={12} md className={classes.col}>
              <LogoByBounce />
            </Grid>
            <Grid item xs={12} md className={classNames(classes.col, classes.socialCol)}>
              <Social />
            </Grid>
          </Grid>

          <Grid
            item
            xs={5}
            md
            className={classNames(classes.col, classes.menusCol)}
          >
            1
          </Grid>

          <Grid
            xs={2}
            md
            className={classNames(classes.col, classes.localeCol)}
          >
            <LocaleSwitcher />
          </Grid>
        </Grid> */}
      </Container>
    </footer>
  );
};
