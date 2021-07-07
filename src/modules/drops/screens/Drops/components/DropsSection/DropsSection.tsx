import { Box, Typography } from '@material-ui/core';
import { resetRequests } from '@redux-requests/core';
import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import { useAccount } from 'modules/account/hooks/useAccount';
import {
  ISearchDropsItem,
  SearchDropsParamState,
} from 'modules/api/searchDrops';
import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/common/types/ResponseData';
import { getDrops, IGetDrops } from 'modules/drops/actions/getDrops';
import { updateDrops } from 'modules/drops/actions/updateDrops';
import { DropsContainer } from 'modules/drops/components/DropsContainer';
import { DropsOwner } from 'modules/drops/components/DropsOwner';
import { DropsRoutesConfig } from 'modules/drops/Routes';
import { t } from 'modules/i18n/utils/intl';
import { ProfileRoutesConfig } from 'modules/profile/ProfileRoutes';
import { Button } from 'modules/uiKit/Button';
import { Section } from 'modules/uiKit/Section';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { uid } from 'react-uid';
import { DROPS_COMING_KEY, DROPS_PREV_KEY } from '../../const';
import { Drop } from '../Drop';
import { DropSkeleton } from '../Drop/DropSkeleton';
import { DropList } from '../DropList';
import { DropsTab, DropsTabs } from '../DropsTabs';
import { DropTimer } from '../DropTimer';

const DROPS_INITIAL_PORTION_COUNT = 4;
const DROPS_MORE_PORTION_COUNT = 8;

enum DropsSortBy {
  Coming = SearchDropsParamState.Coming,
  Previous = SearchDropsParamState.Previous,
}

const tabs = [
  {
    id: DropsSortBy.Coming,
    label: t('drops.upcoming'),
  },
  {
    id: DropsSortBy.Previous,
    label: t('drops.previous'),
  },
];

export const DropsSection = () => {
  const { isConnected } = useAccount();
  const dispatchRequest = useDispatchRequest();
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState<DropsSortBy>(DropsSortBy.Coming);

  const {
    data: dataComing,
    loading: loadingComing,
  } = useQuery<IGetDrops | null>({
    type: getDrops.toString(),
    requestKey: DROPS_COMING_KEY,
  });

  const { data: dataPrev, loading: loadingPrev } = useQuery<IGetDrops | null>({
    type: getDrops.toString(),
    requestKey: DROPS_PREV_KEY,
  });

  const { loading: loadingUpdatePrev } = useMutation({
    type: updateDrops.toString(),
    requestKey: DROPS_PREV_KEY,
  });

  const loading = loadingComing || loadingPrev;

  const dispatchComingDrops = useCallback(
    () =>
      dispatchRequest(
        getDrops(
          { state: SearchDropsParamState.Coming },
          { requestKey: DROPS_COMING_KEY },
        ),
      ),
    [dispatchRequest],
  );

  useEffect(() => {
    dispatchComingDrops();

    return function reset() {
      dispatch(
        resetRequests([
          {
            requestType: getDrops.toString(),
            requestKey: DROPS_COMING_KEY,
          },
          {
            requestType: getDrops.toString(),
            requestKey: DROPS_PREV_KEY,
          },
        ]),
      );
    };
  }, [dispatchRequest, isConnected, dispatch, dispatchComingDrops]);

  const onSortChange = useCallback(
    (_e: ChangeEvent<{}>, newValue: DropsSortBy) => {
      setSortBy(newValue);

      if (newValue === DropsSortBy.Coming && !dataComing) {
        dispatchComingDrops();
      } else if (newValue === DropsSortBy.Previous && !dataPrev) {
        dispatchRequest(
          getDrops(
            {
              state: SearchDropsParamState.Previous,
              limit: DROPS_INITIAL_PORTION_COUNT,
              offset: 0,
            },
            { requestKey: DROPS_PREV_KEY },
          ),
        );
      }
    },
    [dataComing, dataPrev, dispatchComingDrops, dispatchRequest],
  );

  const onLoadMoreClick = () => {
    if (!dataPrev) {
      return false;
    }

    dispatchRequest(
      updateDrops(
        {
          state: SearchDropsParamState.Previous,
          limit: DROPS_MORE_PORTION_COUNT,
          offset: dataPrev.offset + DROPS_MORE_PORTION_COUNT,
        },
        { requestKey: DROPS_PREV_KEY },
      ),
    );
  };

  const renderDrops = (items: ISearchDropsItem[]) => {
    return items.map((item, i) => {
      const timer = <DropTimer endDate={item.dropDate} />;
      const creator = (
        <DropsOwner
          title={item.username}
          href={ProfileRoutesConfig.OtherProfile.generatePath(
            item.accountAddress,
          )}
        />
      );

      return (
        <Drop
          key={uid(i)}
          href={DropsRoutesConfig.DropDetails.generatePath('12342')}
          bgImg={item.coverImgUrl}
          bgColor={item.bgColor}
          title={item.title}
          text={item.description}
          timer={timer}
          creator={creator}
          items={undefined}
        />
      );
    });
  };

  const renderedNothingFound = (
    <Typography variant="h3" align="center" color="textSecondary">
      Nothing found
    </Typography>
  );

  const renderedSkeletons = (
    <DropList>
      {[1, 2].map((_, i) => (
        <DropSkeleton key={uid(i)} />
      ))}
    </DropList>
  );

  return (
    <Section>
      <DropsContainer>
        <Box mb={{ xs: 4, md: 7 }}>
          <DropsTabs value={sortBy} onChange={onSortChange as any}>
            {tabs.map(({ label, id }) => (
              <DropsTab disabled={loading} key={id} label={label} value={id} />
            ))}
          </DropsTabs>
        </Box>

        {sortBy === DropsSortBy.Coming && (
          <Queries<ResponseData<typeof getDrops>>
            requestActions={[getDrops]}
            requestKeys={[DROPS_COMING_KEY]}
            noDataMessage={renderedSkeletons}
            empty={renderedNothingFound}
          >
            {({ data }) => <DropList>{renderDrops(data.items)}</DropList>}
          </Queries>
        )}

        {sortBy === DropsSortBy.Previous && (
          <Queries<ResponseData<typeof getDrops>>
            requestActions={[getDrops]}
            requestKeys={[DROPS_PREV_KEY]}
            noDataMessage={renderedSkeletons}
            empty={renderedNothingFound}
          >
            {({ data }) => (
              <>
                <DropList>{renderDrops(data.items)}</DropList>

                {!data.allLoaded && (
                  <Box textAlign="center" mt={{ xs: 5, md: 8 }}>
                    <Button
                      rounded
                      variant="outlined"
                      loading={loadingUpdatePrev}
                      onClick={onLoadMoreClick}
                    >
                      {t('common.load-more')}
                    </Button>
                  </Box>
                )}
              </>
            )}
          </Queries>
        )}
      </DropsContainer>
    </Section>
  );
};
