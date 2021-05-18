import { IItem } from 'modules/pools/actions/queryItemByFilter';
import React from 'react';
import { useNFTItemStyles } from './useNFTItemStyles';

interface INFTItemProps {
  className?: string;
  data: IItem;
}

export const NFTItem = ({ className, data }: INFTItemProps) => {
  const classes = useNFTItemStyles();

  return (
    <div className={classes.root}>
      <div className={classes.holder}>
        <img className={classes.img} src={data.fileurl} alt={data.itemname} />
      </div>
      <div className={classes.info}>{data.itemname}</div>
    </div>
  );
};
