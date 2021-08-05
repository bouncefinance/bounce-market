import { t } from 'modules/i18n/utils/intl';
import { Button } from 'modules/uiKit/Button';
import { useCallback, useState } from 'react';
import { useProductCardStyles } from './useProductCardStyles';
import { AuctionType } from 'modules/api/common/auctionType';

import { useDispatchRequest } from '@redux-requests/react';
import { BidsType } from './BidsState';
import { bidderClaim } from 'modules/overview/actions/bidderClaim';
import { ProfileRoutesConfig } from 'modules/profile/ProfileRoutes';
import { useHistory } from 'react-router-dom';

export const ClaimFunds: React.FC<{
  id?: number;
  auctionType?: AuctionType;
  type: BidsType;
  isBidder: boolean;
}> = ({ id, auctionType, type, isBidder }) => {
  const classes = useProductCardStyles();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatchRequest();
  const { push } = useHistory();

  const isOpenSaleTime =
    auctionType === AuctionType.EnglishAuction_Timing ||
    auctionType === AuctionType.FixedSwap_Timing;

  const handleBidderClaim = useCallback(
    (cb?: () => void) => {
      dispatch(bidderClaim({ poolId: id, isOpenSaleTime })).then(
        ({ error }) => {
          if (!error) {
            push(ProfileRoutesConfig.UserProfile.generatePath());
            return;
          }
          cb?.();
        },
      );
    },
    [dispatch, id, push, isOpenSaleTime],
  );

  const onClick = () => {
    setLoading(true);
    if (isBidder) {
      handleBidderClaim(() => {
        setLoading(false);
      });
    }
  };
  const state: {
    [key in string]: { text: string };
  } = {
    [BidsType.WON]: {
      text: t('product-card.claim-token'),
    },
    [BidsType.LOST]: {
      text: t('product-card.claim-funds'),
    },
  };
  return (
    <Button
      className={classes.saleBtn}
      variant="outlined"
      rounded
      onClick={onClick}
      disabled={loading}
      loading={loading}
    >
      {state[type].text ?? '--'}
    </Button>
  );
};
