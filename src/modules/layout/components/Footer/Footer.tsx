import { Container, Grid } from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';
import { Logo } from '../Logo';
import { Social } from '../Social';
import { useFooterStyles } from './FooterStyles';

export const Footer = () => {
  const classes = useFooterStyles();

  return (
    <footer className={classes.root}>
      <Container>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md className={classes.col}>
            <Logo />
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
