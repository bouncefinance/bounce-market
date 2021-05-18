import { Box, Card, CardContent, Tooltip, Typography } from '@material-ui/core';
import classNames from 'classnames';
import { Button } from 'modules/uiKit/Button';
import { Img } from 'modules/uiKit/Img';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useBrandCardStyles } from './useBrandCardStyles';
import { t } from 'modules/i18n/utils/intl';
import { PlusIcon } from 'modules/common/components/Icons/PlusIcon';
import { BrandRoutesConfig, PATH_MY_BRAND } from 'modules/brand/BrandRoutes';

export interface IBrandCardProps {
  title: string;
  itemsCount: number;
  imgSrc: string;
  id: number;
}

export const BrandCard = ({
  id,
  title,
  itemsCount,
  imgSrc,
}: IBrandCardProps) => {
  const classes = useBrandCardStyles();
  const history = useHistory();

  const handleAddItem = () => {
    history.push(BrandRoutesConfig.CreateBrandItem.generatePath(id));
  }

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
              onClick={handleAddItem}
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

      <Link to={PATH_MY_BRAND} className={classes.wrapLink}>
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
          onClick={handleAddItem}
        >
          {t('brand.card.addNewItem')}
        </Button>
      ) : null}
    </Card>
  );
};
