import { Typography } from '@material-ui/core';
import classNames from 'classnames';
import { getRandomHexColor } from 'modules/common/utils/getRandomHexColor';
import { Img } from 'modules/uiKit/Img';
import React, { ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';
import useBgColor from '../Drop/useBgColor';
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
  const { getBackgroudColor } = useBgColor();

  const [bgImgColor, setBgImgColor] = useState<string | undefined>();
  useEffect(() => {
    getBackgroudColor(img, gradientColor, setBgImgColor);
  }, [getBackgroudColor, img, gradientColor]);

  const classes = useStoriesSliderItemStyles({
    gradientColor: gradientColor || (img ? bgImgColor : getRandomHexColor()),
  });

  return (
    <div className={classes.root}>
      <Link className={classes.imgLink} to={href}>
        {img ? (
          <Img className={classes.imgWrap} src={img} loading="lazy" />
        ) : (
          <div
            className={classNames(
              classes.imgWrap,
              classes.imgWrapThumb,
              classes.imgWrapBg,
            )}
          />
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
