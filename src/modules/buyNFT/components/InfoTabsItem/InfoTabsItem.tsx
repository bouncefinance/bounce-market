import { Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { t } from 'modules/i18n/utils/intl';
import { ExternalIcon } from './assets/ExternalIcon';
import { useInfoTabsItemStyles } from './useInfoTabsItemStyles';

interface IInfoTabsItemProps {
  author: string;
  title: string;
  date: Date;
  price?: BigNumber;
  cryptoPrice?: BigNumber;
  cryptoCurrency?: string;
  className?: string;
  href?: string;
}

export const InfoTabsItem = ({
  author,
  title,
  date,
  price,
  cryptoPrice,
  cryptoCurrency,
  className,
  href,
}: IInfoTabsItemProps) => {
  const classes = useInfoTabsItemStyles();
  const withPrices = !!price;

  const formattedDate = t('details-nft.info.date', {
    value: date,
  });

  const formattedTime = t('details-nft.info.time', {
    value: date,
  });

  return (
    <div
      className={classNames(
        className,
        classes.root,
        withPrices && classes.withPrice,
      )}
    >
      <div className={classes.title}>
        {`${title} by `}

        <span className={classes.author}>{author}</span>
      </div>

      <Typography
        className={classes.date}
        variant="body2"
        color="textSecondary"
      >
        {`${formattedDate} ${formattedTime}`}
      </Typography>

      {cryptoPrice && (
        <div className={classes.cryptoPrice}>
          {`${cryptoPrice.toFormat()} ${cryptoCurrency}`}

          {href && (
            <a
              href={href}
              className={classes.link}
              target="_blank"
              rel="noreferrer"
            >
              <ExternalIcon className={classes.linkIcon} />
            </a>
          )}
        </div>
      )}

      {price && (
        <Typography
          className={classes.price}
          variant="body2"
          color="textSecondary"
        >
          {t('unit.$-value', { value: price.toNumber() })}
        </Typography>
      )}
    </div>
  );
};
