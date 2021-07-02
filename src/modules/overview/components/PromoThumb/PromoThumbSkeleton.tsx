import classNames from 'classnames';
import React from 'react';
import { usePromoThumbStyles } from './PromoThumbStyles';
import {Skeleton} from "@material-ui/lab";

export const PromoThumbSkeleton = ({className}: {className: string}) => {
  const classes = usePromoThumbStyles();

  return (
    <div className={classNames(classes.root, className)}>
      <Skeleton className={classes.imgWrap} width={"64px"} height={"64px"} variant="rect" />
      <Skeleton className={classes.title} width={"50%"} variant="text" />
    </div>
  );
};
