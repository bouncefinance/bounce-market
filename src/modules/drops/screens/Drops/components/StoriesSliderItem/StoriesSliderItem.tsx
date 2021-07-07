import { Typography } from '@material-ui/core';
import classNames from 'classnames';
import { Img } from 'modules/uiKit/Img';
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';
import { useStoriesSliderItemStyles } from './useStoriesSliderItemStyles';

interface IStoriesSliderItemProps {
  title: string;
  text: string;
  profileInfo: ReactNode;
  chips?: ReactNode;
  img?: string;
  gradientColor?: string;
  href: string;
}

export const StoriesSliderItem = ({
  title,
  text,
  profileInfo,
  chips,
  img,
  href,
  gradientColor,
}: IStoriesSliderItemProps) => {
  const classes = useStoriesSliderItemStyles({ gradientColor });

  return (
    <div className={classes.root}>
      <Link className={classes.imgLink} to={href}>
        {img ? (
          <Img className={classes.imgWrap} src={img} loading="lazy" />
        ) : (
          <div className={classNames(classes.imgWrap, classes.imgWrapThumb)} />
        )}
      </Link>

      <div className={classes.content}>
        <div className={classes.contentWrap}>
          <Typography
            component={Link}
            to={href}
            variant="h1"
            className={classes.title}
          >
            {title}
          </Typography>

          <Typography className={classes.text}>
            <Truncate lines={3}>{text}</Truncate>
          </Typography>

          <div className={classes.profileInfo}>{profileInfo}</div>
        </div>
      </div>

      {chips && <div className={classes.chips}>{chips}</div>}
    </div>
  );
};
