import { Link } from 'react-router-dom';
import { ReactComponent as LogoImg } from './assets/logo.svg';
import { useLogoStyles } from './LogoStyles';
import { RoutesConfiguration } from '../../../overview/Routes';

export const Logo = () => {
  const classes = useLogoStyles();
  return (
    <Link
      to={RoutesConfiguration.Overview.generatePath()}
      className={classes.root}
    >
      <LogoImg className={classes.img} />
      <span className={classes.text}>by Bounce</span>
    </Link>
  );
};
