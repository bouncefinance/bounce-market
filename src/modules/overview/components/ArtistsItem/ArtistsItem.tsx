import { Typography } from '@material-ui/core';
import classNames from 'classnames';
import { IImgProps, Img } from 'modules/uiKit/Img';
import { ReactNode } from 'react';
import { useArtistsItemStyles } from './ArtistsItemStyles';
import { UserIcon } from './assets/UserIcon';

export interface IArtistsItemProps {
  className?: string;
  href?: string;
  name: string;
  subscribers: number;
  ImgProps: IImgProps;
  imgPreloader?: ReactNode;
}

export const ArtistsItem = ({
  className,
  href,
  name,
  subscribers,
  ImgProps,
  imgPreloader,
}: IArtistsItemProps) => {
  const classes = useArtistsItemStyles();

  return (
    <div className={classNames(classes.root, className)}>
      <div className={classes.imgLink}>
        <Img {...ImgProps} className={classes.imgWrap} ratio="1x1" />

        {imgPreloader}
      </div>

      <Typography className={classes.name} variant="h5" title={name}>
        {name}
      </Typography>

      <Typography
        className={classes.subs}
        variant="body2"
        color="textSecondary"
        title="Subscribers"
      >
        <UserIcon className={classes.subsIcon} />
        {subscribers}
      </Typography>
    </div>
  );
};
