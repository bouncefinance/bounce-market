import { Avatar, Grid, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { useCollectionCardStyles } from './useCollectionCardStyles';
import { ReactComponent as ShareIcon } from '../assets/share.svg';
import { ReactComponent as DollerIcon } from '../assets/doller.svg';

interface IBrandsItemProps {
  img?: string;
  name: string;
  descr?: string;
  followers?: JSX.Element;
  nftItems?: JSX.Element;
  href?: string;
  handelOpenRoyalty: (collection: string) => void;
}

export const CollectionCard = ({
  name,
  img,
  descr,
  followers,
  nftItems,
  href = '#',
  handelOpenRoyalty,
}: IBrandsItemProps) => {
  const classes = useCollectionCardStyles();

  const { ref, inView } = useInView({
    rootMargin: '-10% 0% -10% 0%',
    triggerOnce: true,
  });

  return (
    <Paper className={classes.root} variant="outlined" ref={ref}>
      <Grid className={classes.row} container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Link to={href} className={classes.header}>
            <Avatar className={classes.logo} src={img} alt={name} />

            <Typography className={classes.title} variant="h2">
              {name}
            </Typography>
          </Link>

          {descr && <Typography className={classes.descr}>{descr}</Typography>}

          <div className={classes.optionBtn}>
            <ShareIcon />
            <div className={classes.optionRoyalty}>
              <div className={classes.showRoyalty}>
                <DollerIcon />
                <span>10 %</span>
              </div>
              <div className={classes.changeBtn}>change</div>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} md={6}>
          {inView && nftItems}
        </Grid>
      </Grid>
    </Paper>
  );
};
