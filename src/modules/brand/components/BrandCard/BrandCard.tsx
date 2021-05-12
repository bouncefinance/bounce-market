import { Box, Card, CardContent, Tooltip, Typography } from '@material-ui/core';
import classNames from 'classnames';
import { Button } from 'modules/uiKit/Button';
import { Img } from 'modules/uiKit/Img';
import React from 'react';
import { Link } from 'react-router-dom';
import { useBrandCardStyles } from './useBrandCardStyles';
import { t } from 'modules/i18n/utils/intl';
import { PlusIcon } from 'modules/common/components/Icons/PlusIcon';

export interface IBrandCardProps {
  title: string;
  itemsCount: number;
  imgSrc: string;
  href: string;
}

export const BrandCard = ({
  href,
  title,
  itemsCount,
  imgSrc,
}: IBrandCardProps) => {
  const classes = useBrandCardStyles();

  return (
    <Card className={classes.root} variant="outlined">
      {itemsCount ? (
        <div className={classes.createNewMiniBtnWrap}>
          <Tooltip title={t('brand.card.createNewItem')} arrow>
            <Button
              className={classes.createNewMiniBtn}
              variant="outlined"
              fullWidth={false}
              rounded
            >
              <PlusIcon
                className={classNames(
                  classes.icon,
                  classes.iconInheritFontSize,
                )}
              />
            </Button>
          </Tooltip>
        </div>
      ) : null}

      <Link to={href} className={classes.wrapLink}>
        <Box className={classes.imgBox}>
          <Img src={imgSrc} className={classes.imgWrap} ratio="1x1" />
        </Box>

        <CardContent className={classes.content}>
          <Typography variant="h5" className={classes.title} title={title}>
            {title}
          </Typography>

          <Typography
            color="textSecondary"
            variant="body2"
            className={classes.subTitle}
          >
            {t('brand.card.itemsCount', {
              value: itemsCount,
            })}
          </Typography>
        </CardContent>
      </Link>
      {!itemsCount ? (
        <Button
          className={classNames(classes.addNewBtn, classes.addNewBtnInCard)}
          variant="outlined"
          fullWidth={false}
          rounded
          startIcon={
            <PlusIcon
              className={classNames(classes.icon, classes.iconInheritFontSize)}
            />
          }
        >
          {t('brand.card.addNewItem')}
        </Button>
      ) : null}
    </Card>
  );
};
