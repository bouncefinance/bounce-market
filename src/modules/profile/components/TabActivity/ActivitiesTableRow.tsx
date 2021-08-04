import { TableCell, TableRow, Tooltip } from '@material-ui/core';
import { Link } from 'react-router-dom';
// import { formatDistance } from 'date-fns';
import { truncateWalletAddr } from 'modules/common/utils/truncateWalletAddr';
import { ProfileRoutesConfig } from 'modules/profile/ProfileRoutes';
// import { getTokenSymbol } from 'modules/common/conts';
// import { t } from '../../../i18n/utils/intl';
import { ActivityKeys, IActivityItem } from '../../api/getActivity';
import { Img } from 'modules/uiKit/Img';
import { useTabActivityStyles } from './useTabActivityStyles';
// import { CloseIcon } from '../../../common/components/Icons/CloseIcon';
// import { DoneIcon } from '../../../common/components/Icons/DoneIcon';
import { PlusIcon } from '../../../common/components/Icons/PlusIcon';
import { TransferIcon } from '../../../common/components/Icons/TransferIcon';
import { BidIcon } from '../../../common/components/Icons/BidIcon';
import { ListedIcon } from '../../../common/components/Icons/ListedIcon';

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
      <span>{label}</span>
    </div>
  );
};
export const ActivitiesTableRow = ({
  item,
  symbol,
  tabKey,
}: IActivitiesTableProps) => {
  return (
    <TableRow>
      <TableCell>
        <EventIcon tabKey={tabKey} label={item.event} />
      </TableCell>
      <TableCell>
        <ItemIcon url={item.fileUrl} label={item.itemName} />
      </TableCell>
      <TableCell>
        {item.amount.toString()}&nbsp;{symbol}
      </TableCell>
      <TableCell>{item.quantity}</TableCell>
      <TableCell>
        {tabKey === ActivityKeys.Sales ? (
          item.to && (
            <Link to={ProfileRoutesConfig.OtherProfile.generatePath(item.to)}>
              <Tooltip title={item.from}>
                <span>{truncateWalletAddr(item.to)}</span>
              </Tooltip>
            </Link>
          )
        ) : (
          <Tooltip title={item.from}>
            <span>{truncateWalletAddr(item.from)}</span>
          </Tooltip>
        )}
      </TableCell>
      <TableCell>{item.ctime}</TableCell>
    </TableRow>
  );
};
