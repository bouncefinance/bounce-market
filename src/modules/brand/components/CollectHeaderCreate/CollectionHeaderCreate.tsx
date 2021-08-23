import { Box } from '@material-ui/core';
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
}

export const CollectionHeaderCreate = ({ className }: IBrandEmptyCardProps) => {
  const classes = useBrandCardStyles();

  return (
    <Box className={classes.createCollection}>
      <Button
        component={RouterLink}
        to={BrandRoutesConfig.CreateBrand.generatePath()}
        className={classNames(classes.addNewBtn)}
        variant="outlined"
        fullWidth={false}
        rounded
        startIcon={
          <PlusIcon
            className={classNames(classes.icon, classes.iconInheritFontSize)}
          />
        }
      >
        {t('collection.card.createNewcollection')}
      </Button>
    </Box>
  );
};
