import { Typography } from '@material-ui/core';
import classNames from 'classnames';
import { IImgProps, Img } from 'modules/uiKit/Img';
import { ReactNode } from 'react';
import { useClubsStyles } from './useClubsStyles';

export interface IClubsItemProps {
  className?: string;
  href?: string;
  name: string;
  ImgProps: IImgProps;
  imgPreloader?: ReactNode;
}

export const ClubsItem = ({
  className,
  href,
  name,
  ImgProps,
  imgPreloader,
}: IClubsItemProps) => {
  const classes = useClubsStyles();

  return (
    <div className={classNames(classes.clubsItem, className)}>
      <div className={classes.imgLink}>
        <Img {...ImgProps} className={classes.imgWrap} ratio="1x1" />

        {imgPreloader}
      </div>

      <Typography className={classes.name} variant="h5" title={name}>
        {name}
      </Typography>
    </div>
  );
};
