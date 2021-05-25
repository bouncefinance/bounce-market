import React, { useCallback } from 'react';
import { Box, TableCell, TableRow } from '@material-ui/core';
import { t } from '../../../i18n/utils/intl';
import { IActivityTableItem } from '../../api/getActivity';
import { TransferIcon } from '../../../common/components/Icons/TransferIcon';
import { PlusIcon } from '../../../common/components/Icons/PlusIcon';
import classNames from 'classnames';
import { CloseIcon } from '../../../common/components/Icons/CloseIcon';
import { DoneIcon } from '../../../common/components/Icons/DoneIcon';
import { formatDistance } from 'date-fns';
import { Img } from '../../../uiKit/Img';
import { VideoPlayer } from '../../../common/components/VideoPlayer';
import { convertWallet } from '../../../common/utils/convertWallet';

interface IActivitiesTableProps {
  item: IActivityTableItem;
  classes: any;
}

export const ActivitiesTableRow = ({
  item,
  classes,
}: IActivitiesTableProps) => {
  const renderItemPreview = useCallback(
    (category: string, fileUrl: string) => {
      return category === 'video' ? (
        <VideoPlayer
          className={classes.itemPreview}
          src={fileUrl}
          width={100}
          height={100}
          controls={false}
          autoPlay={false}
          objectFit="cover"
        />
      ) : (
        <Img className={classes.itemPreview} src={fileUrl} ratio="1x1" />
      );
    },
    [classes],
  );

  // TODO: task FAN-84
  // const renderProfileInfo = useCallback(
  //   (img: string, name: string) => {
  //     return (
  //       <Box display="flex" alignItems="center">
  //         <Avatar className={classes.avatar} src={img} />
  //         <div className={classes.name}>{name}</div>
  //       </Box>
  //     );
  //   },
  //   [classes],
  // );

  return (
    <TableRow>
      <TableCell>
        <Box display="flex" alignItems="center">
          {item.event === 'Swapped' && (
            <>
              <TransferIcon className={classes.eventIcon} />
              {t('profile.activity.transfer')}
            </>
          )}
          {item.event === 'Created' && (
            <>
              <PlusIcon
                className={classNames(classes.eventIcon, classes.eventIconPlus)}
              />
              {t('profile.activity.created')}
            </>
          )}
          {item.event === 'Canceled' && (
            <>
              <CloseIcon className={classes.eventIcon} />
              {t('profile.activity.canceled')}
            </>
          )}
          {item.event === 'Claimed' && (
            <>
              <DoneIcon className={classes.eventIcon} />
              {t('profile.activity.claimed')}
            </>
          )}
        </Box>
      </TableCell>

      <TableCell>
        <Box display="flex" alignItems="center">
          {renderItemPreview(item.category, item.fileUrl)}
          <div className={classes.itemTitle} title={item.itemName}>
            {item.itemName}
          </div>
        </Box>
      </TableCell>

      <TableCell>
        {item.price.toFormat()} BNB
        {/*{item.currency} TODO: need provide currency from contract, task FAN-85 */}
      </TableCell>

      <TableCell>{item.quantity}</TableCell>

      <TableCell>{convertWallet(item.from)}</TableCell>

      <TableCell>{convertWallet(item.to)}</TableCell>

      <TableCell>
        {formatDistance(item.timestamp, new Date(), {
          addSuffix: true,
        })}
      </TableCell>
    </TableRow>
  );
};
