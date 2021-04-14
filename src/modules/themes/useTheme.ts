import { useMediaQuery, useTheme } from '@material-ui/core';
import { Themes } from 'modules/themes/types';

export const useIsXSDown = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('xs'));
};

export const useIsSMDown = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('sm'));
};

export const useIsMDDown = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('md'));
};

export const useIsLGDown = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('lg'));
};

export const useIsSMUp = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up('sm'));
};

export const useIsMDUp = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up('md'));
};

export const useIsLGUp = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up('lg'));
};

export const useIsXLUp = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up('xl'));
};

export const useIsLightTheme = () => {
  const theme = useTheme();
  return theme.palette.type === Themes.light;
};

export const useIsDarkTheme = () => {
  const theme = useTheme();
  return theme.palette.type === Themes.dark;
};
