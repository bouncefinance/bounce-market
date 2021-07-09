import { Box, Container, ThemeProvider } from '@material-ui/core';
import { DropsContainer } from 'modules/drops/components/DropsContainer';
import { GoBack } from 'modules/layout/components/GoBack';
import { darkTheme } from 'modules/themes/darkTheme';
import { Section } from 'modules/uiKit/Section';
import React from 'react';
import { Description } from './components/Description';
import { LiveCards } from './components/LiveCards';
import { SoldCards } from './components/SoldCards';
import { Video } from './components/Video';

export const DropDetails = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Section>
        <Container maxWidth={false}>
          <Box mb={{ xs: 8, md: 12 }}>
            <GoBack />
          </Box>
        </Container>

        <DropsContainer>
          <Description />
          <Video />
          <LiveCards />
          <SoldCards />
        </DropsContainer>
      </Section>
    </ThemeProvider>
  );
};
