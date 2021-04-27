import { Box, Container } from '@material-ui/core';
import classNames from 'classnames';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'modules/uiKit/Button';
import { Img } from 'modules/uiKit/Img';
import React from 'react';
import { PencilIcon } from '../../assets/PencilIcon';
import { useHeaderStyles } from './useHeaderStyles';

interface IHeaderProps {
  className?: string;
  img?: string;
  onEditClick?: () => void;
}

export const Header = ({ className, onEditClick, img }: IHeaderProps) => {
  const classes = useHeaderStyles();

  return (
    <div className={classNames(classes.root, className)}>
      <Img
        className={classes.imgWrap}
        src={img}
        objectFit="cover"
        loading="lazy"
      />

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
    </div>
  );
};
