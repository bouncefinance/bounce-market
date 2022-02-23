import { Link } from 'react-router-dom';
// import { ReactComponent as LogoImg } from './assets/logo.svg';
import logo01 from './assets/logo02.png';
import { useLogoStyles } from './LogoStyles';
// import { RoutesConfiguration } from '../../../overview/Routes';

export const Logo = () => {
  const classes = useLogoStyles();
  return (
    <Link
      // to={RoutesConfiguration.Overview.generatePath()}
      to={'/index'}
      className={classes.root}
    >
      {/* <LogoImg className={classes.img} /> */}
      <img alt="" className={classes.img} src={logo01} />
    </Link>
  );
};
