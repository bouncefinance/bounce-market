import { createStyles, makeStyles } from '@material-ui/core';

export const HEADER_HEIGHT_XS = 67;
export const HEADER_HEIGHT_XL = 55;

interface Props {
  isSMDown: boolean;
}

export const useIconHeaderStyles = makeStyles(theme =>
  createStyles({
    root: (props: Props) => ({
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      paddingTop: props.isSMDown ? theme.spacing(5) : theme.spacing(3),
      background: theme.palette.background.default,
      color: '#fff',
      height: props.isSMDown ? HEADER_HEIGHT_XS : HEADER_HEIGHT_XL,

      '& svg': {
        height: props.isSMDown ? 27 : 31,
      },
    }),
  }),
);
