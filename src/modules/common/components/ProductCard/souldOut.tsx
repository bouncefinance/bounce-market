import { Box, makeStyles, Theme } from '@material-ui/core';

const useMaskStyles = makeStyles<Theme>(theme => ({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
    background: 'rgba(0,0,0,0.5)',
    color: '#fff',
    zIndex: 2,
    pointerEvents: 'none',
  },
  tips: {
    fontSize: 14,
    opacity: 0.4,
    marginBottom: 7,
  },
  time: {
    fontSize: 18,
  },
}));

export const SoldOutMask = () => {
  const maskClasses = useMaskStyles();
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      className={maskClasses.container}
    >
      <div>
        {/* <div className={maskClasses.tips}>xx</div> */}
        <div className={maskClasses.time}>Sold Out</div>
      </div>
    </Box>
  );
};
