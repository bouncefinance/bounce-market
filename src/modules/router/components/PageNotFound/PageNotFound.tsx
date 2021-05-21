import { Box, Container, Typography } from '@material-ui/core';
import { Button } from 'modules/uiKit/Button';
import { Section } from 'modules/uiKit/Section';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { usePageNotFoundStyles } from './usePageNotFoundStyles';

export const PageNotFound = () => {
  const classes = usePageNotFoundStyles();
  const { goBack } = useHistory();
  const goToPrevPage = useCallback(() => goBack(), [goBack]);

  return (
    <Section component="section" className={classes.root}>
      <Container>
        <Box textAlign="center">
          <Typography variant="h1" className={classes.title}>
            404
          </Typography>

          <Typography variant="h4">Page not found</Typography>

          <Box
            display="flex"
            flexWrap="wrap"
            mx={-2}
            mt={5}
            justifyContent="center"
          >
            <Box px={2} mt={2}>
              <Button
                component={Link}
                className={classes.button}
                variant="contained"
                to="/"
              >
                Go home
              </Button>
            </Box>

            <Box px={2} mt={2}>
              <Button
                className={classes.button}
                variant="outlined"
                onClick={goToPrevPage}
              >
                Previous page
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Section>
  );
};
