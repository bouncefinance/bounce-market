import { createStyles, makeStyles } from '@material-ui/core';

export const HEADER_HEIGHT_XS = 107;
export const HEADER_HEIGHT_XL = 115;

interface Props {
  isXSDown: boolean;
}

export const useGiftHeaderStyles = makeStyles(theme =>
  createStyles({
    root: (props: Props) => ({
      position: 'relative',
      display: 'flex',
      // alignItems: 'center',
      justifyContent: 'center',
      padding: props.isXSDown
        ? theme.spacing(5, 0)
        : theme.spacing(3, 0, 7.5, 0),
      background: theme.palette.background.default,
      // color: theme.palette.text.primary,
      color: '#fff',
      height: props.isXSDown ? HEADER_HEIGHT_XS : HEADER_HEIGHT_XL,
    }),
  }),
);
