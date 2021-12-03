import { Box } from '@material-ui/core';
import { resetRequests } from '@redux-requests/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useAccount } from 'modules/account/hooks/useAccount';
import {
  DROPTYPE,
  ISearchDropsItem,
  SearchDropsParamState,
} from 'modules/api/searchDrops';
import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/common/types/ResponseData';
import { truncateWalletAddr } from 'modules/common/utils/truncateWalletAddr';
import { getDrops, IGetDrops } from 'modules/drops/actions/getDrops';
import { updateDrops } from 'modules/drops/actions/updateDrops';
import { DropsContainer } from 'modules/drops/components/DropsContainer';
import { DropsOwner } from 'modules/drops/components/DropsOwner';
import { NothingFound } from 'modules/drops/components/NothingFound';
import { DropsRoutesConfig } from 'modules/drops/Routes';
import { GiftRoutesConfig } from 'modules/gift/Routes';
import { t } from 'modules/i18n/utils/intl';
import { ProfileRoutesConfig } from 'modules/profile/ProfileRoutes';
import { Button } from 'modules/uiKit/Button';
import { Section } from 'modules/uiKit/Section';
import { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { uid } from 'react-uid';
import { DROPS_COMING_KEY, DROPS_LIVE_KEY } from '../../const';
import { Drop } from '../Drop';
import { DropSkeleton } from '../Drop/DropSkeleton';
import { DropList } from '../DropList';
import { DropsTab } from '../DropsTabs';
import { DropTimer } from '../DropTimer';

const DROPS_INITIAL_PORTION_COUNT = 4;
const DROPS_MORE_PORTION_COUNT = 4;

export const DropsSection = (props: { scene: 'Active' | 'Upcoming' }) => {
  const { isConnected } = useAccount();
  const dispatchRequest = useDispatchRequest();
  const dispatch = useDispatch();
  const loadMoreRef = useRef<HTMLButtonElement>(null);
  const tab =
    props.scene === 'Active'
      ? {
          id: SearchDropsParamState.Live,
          label: 'drops.active',
        }
      : {
          id: SearchDropsParamState.Coming,
          label: 'drops.upcoming',
        };
  const DROPS_KEY =
    props.scene === 'Active' ? DROPS_LIVE_KEY : DROPS_COMING_KEY;
  console.log('DROPS_KEY', DROPS_KEY);

  const { data: dropsData, loading: dropsLoading } = useQuery<IGetDrops | null>(
    {
      type: getDrops.toString(),
      requestKey: DROPS_KEY,
    },
  );

  const dispatchDropList = useCallback(
    () => {
      dispatchRequest(
        getDrops(
          { state: tab.id, limit: DROPS_INITIAL_PORTION_COUNT },
          { requestKey: DROPS_KEY },
        ),
      );
    },
    // eslint-disable-next-line
    [dispatchRequest, DROPS_KEY],
  );

  useEffect(() => {
    dispatchDropList();

    return function reset() {
      dispatch(
        resetRequests([
          {
            requestType: getDrops.toString(),
            requestKey: DROPS_KEY,
          },
        ]),
      );
    };
  }, [dispatchRequest, isConnected, dispatch, dispatchDropList, DROPS_KEY]);

  const onLoadMoreClick = () => {
    const tempPosition = loadMoreRef.current?.offsetTop;
    const tempDiffTop = loadMoreRef.current?.getBoundingClientRect().top;

    if (!dropsData) {
      return false;
    }

    dispatchRequest(
      updateDrops(
        {
          state: tab.id,
          limit: DROPS_MORE_PORTION_COUNT,
          offset: dropsData.offset + DROPS_MORE_PORTION_COUNT,
        },
        { requestKey: DROPS_KEY },
      ),
    ).finally(() => {
      if (tempPosition && tempDiffTop)
        window.scrollTo({ top: tempPosition - tempDiffTop });
    });
  };

  const renderDrops = (items: ISearchDropsItem[]) => {
    return items.map((item, i) => {
      const timer = <DropTimer endDate={item.dropDate} />;
      const creator = (
        <DropsOwner
          title={item.username || truncateWalletAddr(item.accountAddress)}
          isVerified={true}
          avatar={item.avatar}
          href={ProfileRoutesConfig.OtherProfile.generatePath(
            item.accountAddress,
          )}
        />
      );
      return (
        <Drop
          key={uid(item)}
          href={
            item.dropType === DROPTYPE.BLINDBOX
              ? DropsRoutesConfig.BlindBoxDetails.generatePath(item.id)
              : item.dropType === DROPTYPE.AIRDROP
              ? GiftRoutesConfig.LandingPage.generatePath(item.id)
              : DropsRoutesConfig.DropDetails.generatePath(item.id)
          }
          // href={DropsRoutesConfig.DropDetails.generatePath(item.id)}
          bgImg={item.coverImgUrl}
          bgColor={item.bgColor}
          title={item.title}
          text={item.description}
          timer={timer}
          creator={creator}
          dropId={item.id}
          dropType={item.dropType}
          itemImage={item.blindcoverimgurl} // 盲盒需要给他设置一个单独的item图片
        />
      );
    });
  };

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
        <Box mb={{ xs: 4, md: 7 }} textAlign="center">
          <DropsTab
            disabled={dropsLoading}
            label={t(tab.label)}
            value={tab.id}
          />
        </Box>

        {
          <Queries<ResponseData<typeof getDrops>>
            requestActions={[getDrops]}
            requestKeys={[DROPS_KEY]}
            noDataMessage={renderedSkeletons}
            empty={<NothingFound />}
          >
            {({ data }) => {
              if (!data || !data.items.length) {
                return <NothingFound />;
              }

              return (
                <>
                  <DropList>{renderDrops(data.items)}</DropList>

                  {!data.allLoaded && (
                    <Box textAlign="center" mt={{ xs: 5, md: 8 }}>
                      <Button
                        rounded
                        variant="outlined"
                        loading={dropsLoading}
                        onClick={onLoadMoreClick}
                        ref={loadMoreRef}
                      >
                        {t('common.load-more')}
                      </Button>
                    </Box>
                  )}
                </>
              );
            }}
          </Queries>
        }
      </DropsContainer>
    </Section>
  );
};
