import { Box, Container } from '@material-ui/core';
import classNames from 'classnames';
import { PencilIcon } from 'modules/common/components/Icons/PencilIcon';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'modules/uiKit/Button';
import { Img } from 'modules/uiKit/Img';
import React from 'react';
import { useHeaderStyles } from './useHeaderStyles';

interface IHeaderProps {
  className?: string;
  img?: string;
  onEditClick?: () => void;
}

export const Header = ({ className, onEditClick, img }: IHeaderProps) => {
  const classes = useHeaderStyles();

  const isEditable = typeof onEditClick === 'function';

  return (
    <div className={classNames(classes.root, className)}>
      <Img
        className={classes.imgWrap}
        src={img}
        objectFit="cover"
        loading="lazy"
      />

      {isEditable && (
        <Container className={classes.container}>
          <Box
            className={classes.visibleOnHover}
            display="flex"
            justifyContent="flex-end"
          >
            <Button startIcon={<PencilIcon />} onClick={onEditClick} rounded>
              {t('profile.customize-btn')}
            </Button>
          </Box>
        </Container>
      )}
    </div>
  );
};
