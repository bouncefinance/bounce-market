import { Typography } from '@material-ui/core';
import { useDropTimerStyles } from './useDropTimerStyles';

interface IDropTimerProps {
  time: string;
}

export const DropTimer = ({ time }: IDropTimerProps) => {
  const classes = useDropTimerStyles();

  return (
    <div className={classes.root}>
      <Typography component="span">{time}</Typography>
    </div>
  );
};
