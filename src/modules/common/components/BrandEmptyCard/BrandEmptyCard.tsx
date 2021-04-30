import { Card, CardContent } from '@material-ui/core';
import classNames from 'classnames';
import { Button } from 'modules/uiKit/Button';
import React from 'react';
import { useBrandCardStyles } from '../BrandCard/useBrandCardStyles';
import { t } from 'modules/i18n/utils/intl';
import { PlusIcon } from '../Icons/PlusIcon';

export interface IBrandEmptyCardProps {
  className?: string;
}

export const BrandEmptyCard = ({ className }: IBrandEmptyCardProps) => {
  const classes = useBrandCardStyles();

  return (
    <Card className={classNames(classes.root, className)} variant="outlined">
      <CardContent className={classes.contentEmpty}>
        <Button
          href="#"
          className={classNames(classes.addNewBtn, classes.btnMarginVNone)}
          variant="outlined"
          fullWidth={false}
          rounded
          startIcon={<PlusIcon className={classNames(classes.icon, classes.iconInheritFontSize)}/>}
        >
          {t('profile.brands.createNewItem')}
        </Button>
      </CardContent>
    </Card>
  );
};
