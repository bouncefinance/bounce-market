import { Link } from 'react-router-dom';
import { INDEX_PATH } from '../../../router/const';
import { ReactComponent as LogoImg } from './assets/logo.svg';
import { useLogoStyles } from './LogoStyles';

export const Logo = () => {
  const classes = useLogoStyles();
  return (
    <Link to={INDEX_PATH} className={classes.root}>
      <LogoImg className={classes.img} />
      <span className={classes.text}>by Bounce</span>
    </Link>
  );
};
