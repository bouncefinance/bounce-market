import { Avatar, TableCell, TableRow, Tooltip } from '@material-ui/core';
import { Link } from 'react-router-dom';
// import { formatDistance } from 'date-fns';
import { truncateWalletAddr } from 'modules/common/utils/truncateWalletAddr';
import { ProfileRoutesConfig } from 'modules/profile/ProfileRoutes';
// import { getTokenSymbol } from 'modules/common/conts';
// import { t } from '../../../i18n/utils/intl';
import { ActivityKeys, IActivityItem, NFTType } from '../../api/getActivity';
import { Img } from 'modules/uiKit/Img';
import { useTabActivityStyles } from './useTabActivityStyles';
// import { CloseIcon } from '../../../common/components/Icons/CloseIcon';
// import { DoneIcon } from '../../../common/components/Icons/DoneIcon';
import { PlusIcon } from '../../../common/components/Icons/PlusIcon';
import { TransferIcon } from '../../../common/components/Icons/TransferIcon';
import { BidIcon } from '../../../common/components/Icons/BidIcon';
import { ListedIcon } from '../../../common/components/Icons/ListedIcon';
import { format, formatDistanceToNowStrict, subDays, getTime } from 'date-fns';
import { zhCN, ru, enUS } from 'date-fns/locale';
import { t } from 'modules/i18n/utils/intl';
import { VideoPlayer } from '../../../common/components/VideoPlayer';
import { useCallback } from 'react';

const dateLocale: { [key: string]: Locale } = {
  zhCN: zhCN,
  ru: ru,
  enUS: enUS,
};

interface IActivitiesTableProps {
  item: IActivityItem;
  tabKey: ActivityKeys;
  symbol: string;
}

const ItemIcon: React.FC<{ url: string; label: string }> = ({ url, label }) => {
  const styles = useTabActivityStyles();
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
  const styles = useTabActivityStyles();
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

const UserIcon: React.FC<{ url: string; name: string; address: string }> = ({
  url,
  name,
  address,
}) => {
  const styles = useTabActivityStyles();
  return (
    <div className={styles.tableUserIcon}>
      <Avatar src={url} className="avator" />
      {name ? (
        (name.slice(0, 2) === '0x' || name.slice(0, 2) === '0X') &&
        name.length === 42 ? (
          <Tooltip title={name}>
            <span>{truncateWalletAddr(name)}</span>
          </Tooltip>
        ) : (
          <span>{name}</span>
        )
      ) : (
        <Tooltip title={address}>
          <span>{truncateWalletAddr(address)}</span>
        </Tooltip>
      )}
    </div>
  );
};

const EventIconMaps = {
  [ActivityKeys.Create]: <PlusIcon />,
  [ActivityKeys.Bids]: <BidIcon />,
  [ActivityKeys.Listings]: <ListedIcon />,
  [ActivityKeys.Sales]: <TransferIcon />,
  [ActivityKeys.Purchases]: <TransferIcon />,
  [ActivityKeys.Transfers]: <TransferIcon />,
};
const EventIcon: React.FC<{ tabKey: ActivityKeys; label: string }> = ({
  tabKey,
  label,
}) => {
  const styles = useTabActivityStyles();
  return (
    <div className={styles.eventIcon}>
      <div>{EventIconMaps[tabKey] || ''}</div>
      <span>{label === 'Listings' ? 'Listing' : label}</span>
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

export const ActivitiesTableRow = ({
  item,
  symbol,
  tabKey,
}: IActivitiesTableProps) => {
  const styles = useTabActivityStyles();

  const renderItemPreview = useCallback(
    (category: NFTType) => {
      return category === 'video' ? (
        <ItemVideo url={item.fileUrl} label={item.itemName} />
      ) : (
        <ItemIcon url={item.fileUrl} label={item.itemName} />
      );
    },
    [styles],
  );

  return (
    <TableRow>
      <TableCell>
        <EventIcon tabKey={tabKey} label={item.event} />
      </TableCell>
      {/* <TableCell>
        <ItemIcon url={item.fileUrl} label={item.itemName} />
      </TableCell> */}
      <TableCell>{renderItemPreview(item.category)}</TableCell>
      <TableCell>
        {item.amount.toString()}&nbsp;{symbol}
      </TableCell>
      <TableCell>{item.quantity}</TableCell>
      <TableCell>
        {tabKey === ActivityKeys.Sales
          ? item.to && (
              <Link
                target="_blank"
                to={ProfileRoutesConfig.OtherProfile.generatePath(item.to)}
              >
                <UserIcon
                  url={item.toUrl}
                  name={item.toName}
                  address={item.to}
                />
              </Link>
            )
          : item.from && (
              <Link
                target="_blank"
                to={ProfileRoutesConfig.OtherProfile.generatePath(item.from)}
              >
                <UserIcon
                  url={item.fromUrl}
                  name={item.fromName}
                  address={item.from}
                />
              </Link>
            )}
      </TableCell>
      <TableCell>{formatDate(item.ctime)}</TableCell>
    </TableRow>
  );
};
