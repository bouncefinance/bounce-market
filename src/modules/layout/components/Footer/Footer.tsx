import { Box, Container, Grid, makeStyles, Theme } from '@material-ui/core';
import { LocaleSwitcher } from 'modules/common/components/LocaleSwitcher';
import React from 'react';
import { LogoByBounce } from '../LogoByBounce';
import { Social } from '../Social';
import { useFooterStyles } from './FooterStyles';
import { t } from 'modules/i18n/utils/intl';

import { uid } from 'react-uid';
import {
  defaultProfileTab,
  ProfileRoutesConfig,
} from 'modules/profile/ProfileRoutes';
import { StatementRoutesConfig } from 'modules/statement/Routes';

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
      '&:hover': {
        opacity: 0.7,
      },
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

export const Footer = () => {
  const classes = useFooterStyles();

  const companyLinkObj = {
    listTitle: t('footer.company.company'),
    links: [
      {
        title: t('footer.company.ourStory'),
        url: StatementRoutesConfig.OurStory.generatePath('OurStory'),
      },
      {
        title: t('footer.company.myProfile'),
        url: ProfileRoutesConfig.UserProfile.generatePath(defaultProfileTab),
      },
      {
        title: t('footer.company.termsOfServices'),
        url: StatementRoutesConfig.TermsOfService.generatePath(
          'TermsOfService',
        ),
      },
    ],
  };

  const helpLinkObj = {
    listTitle: t('footer.help.help'),
    links: [
      {
        title: t('footer.help.getVerified'),
        url: 'https://ankrnetwork.typeform.com/to/UBxvAPWr',
      },
      {
        title: t('footer.help.FAQ'),
        url: 'https://docs.fangible.com/',
      },
      {
        title: t('footer.help.support'),
        url: 'https://docs.fangible.com/fangible-support',
      },
    ],
  };

  return (
    <footer className={classes.root}>
      <Container maxWidth={false} className={classes.container}>
        <Grid container spacing={1} justify="center">
          <Grid item xs={12} sm={12} md={12} lg={5}>
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
          <Grid item xs={12} sm={12} md={12} lg={1}>
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
