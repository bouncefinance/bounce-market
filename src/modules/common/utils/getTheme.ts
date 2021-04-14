import { darkTheme } from '../../themes/darkTheme';
import { mainTheme } from '../../themes/mainTheme';
import { Themes } from '../../themes/types';

export const getTheme = (type: Themes) => {
  switch (type) {
    case Themes.dark:
      return darkTheme;

    default:
      return mainTheme;
  }
};
