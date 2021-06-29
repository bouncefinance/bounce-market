import { ThemeProvider } from '@material-ui/core';
import { darkTheme } from 'modules/themes/darkTheme';
import React from 'react';
import { StoriesSlider } from './components/StoriesSlider';
import { TopCreators } from './components/TopCreators';

export const Stories = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <StoriesSlider />
      <TopCreators />
    </ThemeProvider>
  );
};
