import { ThemeProvider } from '@material-ui/core';
import { darkTheme } from 'modules/themes/darkTheme';
import React from 'react';
import { DropsSection } from './components/DropsSection';
import { StoriesSlider } from './components/StoriesSlider';
import { TopCreators } from './components/TopCreators';

export const Drops = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <StoriesSlider />
      <TopCreators />
      <DropsSection />
    </ThemeProvider>
  );
};
