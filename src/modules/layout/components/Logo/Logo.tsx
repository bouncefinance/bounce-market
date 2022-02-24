import classNames from 'classnames';
import { Link } from 'react-router-dom';
// import { ReactComponent as LogoImg } from './assets/logo.svg';
import logo01 from './assets/logo02.png';
import logo02 from './assets/logo03.png';
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
      <img
        alt=""
        className={classNames(classes.img, classes.ableDark)}
        src={logo01}
      />
      <img
        alt=""
        className={classNames(classes.img, classes.ableLight)}
        src={logo02}
      />
    </Link>
  );
};
