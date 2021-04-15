import { Avatar, Box, Hidden, Typography } from '@material-ui/core';
import classNames from 'classnames';
import { t } from 'modules/i18n/utils/intl';
import { IImgProps, Img } from 'modules/uiKit/Img';
import { Link } from 'react-router-dom';
import { usePromoCardStyles } from './PromoCardStyles';

export interface IPromoCardProps {
  className?: string;
  title: string;
  text: string;
  createdBy: string;
  avatar: any;
  price: string | number;
  img?: string;
  srcset?: IImgProps['srcset'];
  href: string;
  authorHref: string;
}

export const PromoCard = ({
  className,
  title,
  text,
  createdBy,
  avatar,
  price,
  img,
  srcset,
  href,
  authorHref,
}: IPromoCardProps) => {
  const classes = usePromoCardStyles();

  return (
    <div className={classNames(classes.root, className)}>
      <div className={classes.content}>
        <Typography
          className={classes.title}
          variant="h1"
          component={Link}
          to={href}
        >
          {title}
        </Typography>

        <Hidden smDown>
          <Typography color="textSecondary" className={classes.text}>
            {text}
          </Typography>
        </Hidden>

        <div className={classes.info}>
          <Link to={authorHref} className={classes.author}>
            <Avatar className={classes.avatar} alt={createdBy} src={avatar} />

            <Typography
              color="textSecondary"
              variant="body2"
              className={classes.authorText}
            >
              {t('promo.created-by')}
            </Typography>

            <Typography className={classes.authorName} variant="body2">
              {createdBy}
            </Typography>
          </Link>

          <Typography className={classes.price}>{price}</Typography>
        </div>
      </div>

      <Box position="relative">
        <Link to={href}>
          <Img
            className={classes.imgWrap}
            ratio="1x1"
            objectFit="contain"
            src={img}
            srcset={srcset}
            imgClassName="swiper-lazy"
            isNativeLazyLoading={false}
          />
        </Link>

        <div className="swiper-lazy-preloader" />
      </Box>

      <Hidden mdUp>
        <Typography color="textSecondary" className={classes.text}>
          {text}
        </Typography>
      </Hidden>
    </div>
  );
};
