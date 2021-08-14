import { TableCell, TableRow } from '@material-ui/core';
import { Img } from 'modules/uiKit/Img';
import { useRoyaltyTable } from './useRoyaltyDialogStyles';
import { format, formatDistanceToNowStrict, subDays, getTime } from 'date-fns';
import { zhCN, ru, enUS } from 'date-fns/locale';
import { t } from 'modules/i18n/utils/intl';
import { VideoPlayer } from '../../../common/components/VideoPlayer';
import { useCallback } from 'react';
import BigNumber from 'bignumber.js';
import { ReactComponent as ViewScanIcon } from './assets/viewScan.svg';

const dateLocale: { [key: string]: Locale } = {
  zhCN: zhCN,
  ru: ru,
  enUS: enUS,
};

export interface IRoyaltyRowProps {
  itemName: string;
  fileUrl: string;
  quantity: number;
  ctime: Date;
  category: string;
  price: BigNumber;
  fee: BigNumber;
  symbol: string;
  viewScan: string;
}

const ItemIcon: React.FC<{ url: string; label: string }> = ({ url, label }) => {
  const styles = useRoyaltyTable();
  return (
    <div className={styles.tableItemIcon}>
      <Img src={url} ratio="1x1" className="icon" />
      <span>{label}</span>
    </div>
  );
};

const ItemVideo: React.FC<{ url: string; label: string }> = ({
  url,
  label,
}) => {
  const styles = useRoyaltyTable();
  return (
    <div className={styles.tableItemVideo}>
      <VideoPlayer
        className={styles.itemPreview}
        src={url}
        width={100}
        height={100}
        controls={false}
        autoPlay={false}
        objectFit="cover"
      />
      <span>{label}</span>
    </div>
  );
};

const formatDate = (ctime: number) => {
  if (getTime(subDays(Date.now(), 1)) < ctime)
    return `${formatDistanceToNowStrict(ctime, {
      locale: dateLocale[t('profile.date.language')],
    })}${t('profile.date.ago')}`;
  return format(ctime, 'MM.dd.yyyy, HH:mm');
};

export const RoyaltyTableRow = ({
  itemName,
  fileUrl,
  quantity,
  ctime,
  category,
  price,
  fee,
  symbol,
  viewScan,
}: IRoyaltyRowProps) => {
  const classes = useRoyaltyTable();

  const renderItemPreview = useCallback(
    category => {
      return category === 'video' ? (
        <ItemVideo url={fileUrl} label={itemName} />
      ) : (
        <ItemIcon url={fileUrl} label={itemName} />
      );
    },
    [fileUrl, itemName],
  );

  return (
    <TableRow>
      <TableCell>{renderItemPreview(category)}</TableCell>
      <TableCell>
        {' '}
        {price.dp(4, 1).toString()} {symbol}
      </TableCell>
      <TableCell>{quantity}</TableCell>
      <TableCell>
        {fee.dp(4, 1).toString()} {symbol}
      </TableCell>
      <TableCell>
        <div className={classes.ctime}>
          {formatDate(ctime.getTime())}
          <a href={viewScan} target="noreferrer">
            <ViewScanIcon />
          </a>
        </div>
      </TableCell>
    </TableRow>
  );
};
