import { Box, Card, CardContent, Tooltip, Typography } from '@material-ui/core';
import classNames from 'classnames';
import { Button } from 'modules/uiKit/Button';
import { IImgProps, Img } from 'modules/uiKit/Img';
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useBrandCardStyles } from './useBrandCardStyles';
import { t } from 'modules/i18n/utils/intl';
import { PlusIcon } from '../Icons/PlusIcon';

export interface IBrandCardProps {
  className?: string;
  title: string;
  itemsCount: number;
  ImgProps: IImgProps;
  href: string;
  imgPreloader?: ReactNode;
}

export const BrandCard = ({
                            className,
                            href,
                            title,
                            itemsCount,
                            ImgProps,
                            imgPreloader,
                          }: IBrandCardProps) => {
  const classes = useBrandCardStyles();

  return (
    <Card className={classNames(classes.root, className)} variant="outlined">

      {itemsCount ?
        <div className={classes.createNewMiniBtnWrap}>
          <Tooltip title={t('profile.brands.createNewItem')} arrow>
            <Button
              className={classes.createNewMiniBtn}
              variant="outlined"
              fullWidth={false}
              rounded
            >
              <PlusIcon className={classNames(classes.icon, classes.iconInheritFontSize)}/>
            </Button>
          </Tooltip>
        </div>
        : null
      }

      <Link to={href} className={classes.wrapLink}>
        <Box className={classes.imgBox}>
          <Img
            {...ImgProps}
            className={classNames(ImgProps.className, classes.imgWrap)}
            ratio="1x1"
          />
          {imgPreloader}
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
            {t('profile.brands.itemsCount', {
              value: itemsCount
            })}
          </Typography>
        </CardContent>
      </Link>
      {!itemsCount ?
        <Button
          className={classes.addNewBtn}
          variant="outlined"
          fullWidth={false}
          rounded
          startIcon={<PlusIcon className={classNames(classes.icon, classes.iconInheritFontSize)}/>}
        >
          {t('profile.brands.addNewItem')}
        </Button>
        : null
      }
    </Card>
  );
};
