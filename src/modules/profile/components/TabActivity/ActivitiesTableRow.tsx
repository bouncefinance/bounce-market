import { TableCell, TableRow, Tooltip } from '@material-ui/core';
// import { Link } from 'react-router-dom';
// import { formatDistance } from 'date-fns';
import { truncateWalletAddr } from 'modules/common/utils/truncateWalletAddr';
// import { ProfileRoutesConfig } from 'modules/profile/ProfileRoutes';
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
import { SaleIcon } from '../../../common/components/Icons/SaleIcon';
import { PurchaseIcon } from '../../../common/components/Icons/PurchaseIcon';
import { format, formatDistanceToNowStrict, subDays, getTime } from 'date-fns';
import { zhCN, ru, enUS } from 'date-fns/locale';
import { t } from 'modules/i18n/utils/intl';
import { VideoPlayer } from '../../../common/components/VideoPlayer';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { BuyNFTRoutesConfig } from 'modules/buyNFT/BuyNFTRoutes';
import useCdnUrl from '../../../common/hooks/useCdnUrl';
import { DefaultRandomAvatar } from 'modules/common/components/DefaultRandomAvatar';

const dateLocale: { [key: string]: Locale } = {
  zhCN: zhCN,
  ru: ru,
  enUS: enUS,
};

interface IActivitiesTableProps {
  item: IActivityItem;
  tabKey: ActivityKeys;
  symbol: string;
  target?: string;
}

interface IItemProps {
  tokenid: number;
  contractaddress: string;
  url: string;
  label: string;
  target?: string;
}

const ItemIcon: React.FC<IItemProps> = ({
  tokenid,
  contractaddress,
  url,
  label,
  target = '_blank',
}) => {
  const styles = useTabActivityStyles();

  return (
    <Link
      className={styles.tableItemIcon}
      target={target}
      to={BuyNFTRoutesConfig.Details_ITEM_NFT.generatePath(
        tokenid,
        contractaddress,
      )}
    >
      <Img src={url} size="small" ratio="1x1" className="icon" />
      <span>{label}</span>
    </Link>
  );
};

const ItemVideo: React.FC<IItemProps> = ({
  tokenid,
  contractaddress,
  url,
  label,
  target = '_blank',
}) => {
  const styles = useTabActivityStyles();
  return (
    <Link
      className={styles.tableItemVideo}
      target={target}
      to={BuyNFTRoutesConfig.Details_ITEM_NFT.generatePath(
        tokenid,
        contractaddress,
      )}
    >
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
    </Link>
  );
};

const UserIcon: React.FC<{ url: string; name: string; address: string }> = ({
  url,
  name,
  address,
}) => {
  const styles = useTabActivityStyles();

  const { imgSrc } = useCdnUrl(url, 160);

  return (
    <div className={styles.tableUserIcon}>
      <DefaultRandomAvatar className="avator" src={imgSrc} address={address} />
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
  [ActivityKeys.Listings]: <ListedIcon />,
  [ActivityKeys.Bids]: <BidIcon />,
  [ActivityKeys.Purchases]: <PurchaseIcon />,
  [ActivityKeys.Sales]: <SaleIcon />,
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
  target,
}: IActivitiesTableProps) => {
  const renderItemPreview = useCallback(
    (category: NFTType) => {
      return category === 'video' ? (
        <ItemVideo
          tokenid={item.tokenid}
          contractaddress={item.contractaddress}
          url={item.fileUrl}
          label={item.itemName}
          target={target}
        />
      ) : (
        <ItemIcon
          tokenid={item.tokenid}
          contractaddress={item.contractaddress}
          url={item.fileUrl}
          label={item.itemName}
          target={target}
        />
      );
    },
    [item.contractaddress, item.fileUrl, item.itemName, item.tokenid, target],
  );

  return (
    <TableRow>
      <TableCell>
        <EventIcon tabKey={tabKey} label={item.event} />
      </TableCell>
      <TableCell>{renderItemPreview(item.category)}</TableCell>
      <TableCell>
        {item.amount.toString()}&nbsp;{symbol}
      </TableCell>
      <TableCell>{item.quantity}</TableCell>
      <TableCell>
        {tabKey === ActivityKeys.Sales
          ? item.to && (
              <UserIcon url={item.toUrl} name={item.toName} address={item.to} />
            )
          : item.from && (
              <UserIcon
                url={item.fromUrl}
                name={item.fromName}
                address={item.from}
              />
            )}
      </TableCell>
      <TableCell>{formatDate(item.ctime)}</TableCell>
    </TableRow>
  );
};
