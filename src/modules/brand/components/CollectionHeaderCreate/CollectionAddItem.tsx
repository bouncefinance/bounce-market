import { Card, CardContent } from '@material-ui/core';
import classNames from 'classnames';
import { Button } from 'modules/uiKit/Button';
import React from 'react';
import { useBrandCardStyles } from '../BrandCard/useBrandCardStyles';
import { t } from 'modules/i18n/utils/intl';
import { PlusIcon } from 'modules/common/components/Icons/PlusIcon';
import { Link as RouterLink } from 'react-router-dom';
import { BrandRoutesConfig } from '../../BrandRoutes';

export interface IBrandEmptyCardProps {
  className?: string;
  id: number;
}

export const CollectionAddItem = ({ className, id }: IBrandEmptyCardProps) => {
  const classes = useBrandCardStyles();

  return (
    <Card className={classNames(classes.root, className)} variant="outlined">
      <CardContent className={classes.contentEmpty}>
        <Button
          component={RouterLink}
          to={BrandRoutesConfig.CreateBrandItem.generatePath(id)}
          className={classNames(classes.addNewBtn, classes.addNewBtnBig)}
          variant="outlined"
          fullWidth={false}
          rounded
          startIcon={
            <PlusIcon
              className={classNames(classes.icon, classes.iconInheritFontSize)}
            />
          }
        >
          {t('collection.card.createNewItem')}
        </Button>
      </CardContent>
    </Card>
  );
};
