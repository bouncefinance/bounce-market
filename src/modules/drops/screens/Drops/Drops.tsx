import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { darkTheme } from 'modules/themes/darkTheme';
import { Img } from 'modules/uiKit/Img';
import { DropsSection } from './components/DropsSection';
import { StoriesSlider } from './components/StoriesSlider';
import { TopCreators } from './components/TopCreators';
import TempBg from './tempBg.png';

export const Drops = () => {
  const isDev = process.env.REACT_APP_BASE_ENV === 'TEST';
  return (
    <ThemeProvider theme={darkTheme}>
      {isDev ? (
        <>
          <StoriesSlider />
          <TopCreators />
          <DropsSection />
        </>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <Img
            src={TempBg}
            alt=""
            style={{ maxWidth: '1180px', margin: '20px auto' }}
          />
        </div>
      )}
    </ThemeProvider>
  );
};
