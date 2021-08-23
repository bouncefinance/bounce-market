import {
  Box,
  ButtonBase,
  Card,
  CardContent,
  ClickAwayListener,
  MenuItem,
  Popover,
  Typography,
} from '@material-ui/core';
import classNames from 'classnames';
import { NftType } from 'modules/api/common/NftType';
import { PlusIcon } from 'modules/common/components/Icons/PlusIcon';
import { VerticalDotsIcon } from 'modules/common/components/Icons/VerticalDotsIcon';
import { t } from 'modules/i18n/utils/intl';
import { Button } from 'modules/uiKit/Button';
import { Img } from 'modules/uiKit/Img';
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useBrandCardStyles } from './useBrandCardStyles';

export interface IBrandCardProps {
  title: string;
  itemsCount: number;
  nftType: NftType;
  imgSrc: string;
  id: number;
  withAddBtn?: boolean;
  addItemHref?: string;
  href: string;
  handelOpenRoyalty?: (collection: string) => void;
  collection: string;
  isOther?: boolean;
}

export const BrandCard = ({
  title,
  nftType,
  imgSrc,
  withAddBtn,
  addItemHref,
  href,
  handelOpenRoyalty,
  collection = '',
  isOther = false,
}: IBrandCardProps) => {
  const classes = useBrandCardStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const isPopoverOpened = Boolean(anchorEl);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [],
  );

  const renderExtension = () => {
    return (
      <>
        <ClickAwayListener onClickAway={handleClose}>
          <ButtonBase className={classes.menuBtn} onClick={handleClick}>
            <VerticalDotsIcon className={classes.menuIcon} />
          </ButtonBase>
        </ClickAwayListener>
        <Popover
          open={isPopoverOpened}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          PaperProps={{
            variant: 'outlined',
          }}
        >
          <MenuItem
            className={classes.menuItem}
            onClick={() => {
              handelOpenRoyalty && handelOpenRoyalty(collection);
            }}
          >
            {t('royalty.royalty')}
          </MenuItem>
        </Popover>
      </>
    );
  };
  return (
    <Card className={classes.root} variant="outlined">
      {!isOther && <div className={classes.extension}>{renderExtension()}</div>}

      <Link to={href} className={classes.wrapLink}>
        <Box className={classes.imgBox}>
          <Img
            src={imgSrc}
            size="small"
            className={classes.imgWrap}
            ratio="1x1"
          />
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
            {nftType === NftType.ERC1155
              ? 'ERC-1155'
              : nftType === NftType.ERC721
              ? 'ERC-721'
              : ''}
          </Typography>
        </CardContent>
      </Link>

      {withAddBtn && addItemHref && (
        <Button
          className={classNames(classes.addNewBtn, classes.addNewBtnInCard)}
          variant="outlined"
          fullWidth={false}
          component={Link}
          to={addItemHref}
          rounded
          startIcon={
            <PlusIcon
              className={classNames(classes.icon, classes.iconInheritFontSize)}
            />
          }
        >
          {t('collection.card.addNewItem')}
        </Button>
      )}
    </Card>
  );
};
