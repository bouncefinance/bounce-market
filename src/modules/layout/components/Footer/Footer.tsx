import { Box, Container, Grid, makeStyles, Theme } from '@material-ui/core';
import { LocaleSwitcher } from 'modules/common/components/LocaleSwitcher';
import React from 'react';
import { LogoByBounce } from '../LogoByBounce';
import { Social } from '../Social';
import { useFooterStyles } from './FooterStyles';

import { uid } from 'react-uid';

interface LinkListProps {
  listTitle: string;
  links: {
    title: string;
    url: string;
  }[];
}

const LinkList: React.FC<LinkListProps> = ({ listTitle, links }) => {
  const X_SPACING = 1.25;

  const useLinkListStyles = makeStyles<Theme>(theme => ({
    root: {},

    title: {
      display: 'inline-block',
      padding: theme.spacing(0, X_SPACING, 2 * X_SPACING, X_SPACING),
      fontSize: 16,
      fontWeight: 'bold',
    },

    list: {
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'center',
      margin: theme.spacing(0, -X_SPACING),
      padding: 0,
      listStyle: 'none',
    },

    listItem: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, X_SPACING),
    },

    a: {
      padding: theme.spacing(X_SPACING),
      fontWeight: 'normal',
      fontSize: 16,
      whiteSpace: 'nowrap',
    },
  }));
  const classes = useLinkListStyles();

  return (
    <Box>
      <span className={classes.title}>{listTitle}</span>
      <ul className={classes.list}>
        {links.map(({ title, url }) => (
          <li className={classes.listItem} key={uid(title)}>
            <a
              className={classes.a}
              target="_blank"
              rel="noreferrer"
              href={url}
            >
              {title}
            </a>
          </li>
        ))}
      </ul>
    </Box>
  );
};

const companyLinkObj = {
  listTitle: 'Company',
  links: [
    {
      title: 'About',
      url: 'http://www.baidu.com',
    },
    {
      title: 'Our Mission',
      url: 'http://www.baidu.com',
    },
    {
      title: 'Terms of servise',
      url: 'http://www.baidu.com',
    },
  ],
};

const helpLinkObj = {
  listTitle: 'Help',
  links: [
    {
      title: 'Get Verified',
      url: 'http://www.baidu.com',
    },
    {
      title: 'FAQ',
      url: 'http://www.baidu.com',
    },
    {
      title: 'Support',
      url: 'http://www.baidu.com',
    },
  ],
};

export const Footer = () => {
  const classes = useFooterStyles();

  return (
    <footer className={classes.root}>
      <Container maxWidth={false} className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={4}>
            <LogoByBounce />
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={2}>
            <LinkList {...companyLinkObj} />
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={2}>
            <LinkList {...helpLinkObj} />
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={2}>
            <Social />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={2}>
            <LocaleSwitcher />
          </Grid>
        </Grid>
        <p className={classes.description}>
          Non-fungible tokens + Fans = Fangible
        </p>
      </Container>
    </footer>
  );
};
