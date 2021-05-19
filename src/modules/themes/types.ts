export enum Themes {
  light = 'light',
  dark = 'dark',
}

declare module '@material-ui/core/styles/createBreakpoints' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    HD: true;
    WXGAPlus: true;
    HDPlus: true;
  }
}
