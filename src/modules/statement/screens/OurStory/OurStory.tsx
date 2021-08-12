import { ThemeProvider } from '@material-ui/core';
import { mainTheme } from 'modules/themes/mainTheme';
import { useOurStoryStyles } from './useOurStoryStyles';
import HeaderImg from './assets/headerImg.png';

export const OurStory = () => {
  const classes = useOurStoryStyles();

  return (
    <ThemeProvider theme={mainTheme}>
      <>
        <div className={classes.headerImgWrapper}>
          <img src={HeaderImg} alt="" />
        </div>
        <div className={classes.iframeWrapper}>
          <iframe
            title="OurStory"
            className={classes.iframe}
            src="/docs/OurStory/OurStory.enUS.html"
          />
        </div>
      </>
    </ThemeProvider>
  );
};
