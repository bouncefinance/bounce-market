import { Box, Typography } from '@material-ui/core';
import { StoriesContainer } from 'modules/drops/components/StoriesContainer';
import { StoriesOwner } from 'modules/drops/components/StoriesOwner';
import { StoriesRoutesConfig } from 'modules/drops/Routes';
import { Section } from 'modules/uiKit/Section';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { uid } from 'react-uid';
import { Drop } from '../Drop';
import { DropSkeleton } from '../Drop/DropSkeleton';
import { DropList } from '../DropList';
import { DropsTab, DropsTabs } from '../DropsTabs';
import { DropTimer } from '../DropTimer';

const getDemoItems = (index: number, count: number) => {
  return new Array(count)
    .fill(0)
    .map((_, i) => `https://picsum.photos/180/130?random=${index + 1}${i}`);
};

const demoDrops = [
  {
    bgImg: 'https://picsum.photos/1200/500?random=2',
    bgColor: '#907047',
    title: 'Cycle of the Shroom — Heavy lies the crown relevant',
    text:
      'Since then, Space Yacht has used the Twerk Skeleton design on both apparel and live visuals at their events. Once Space Yacht started producing NFTs, the legend of the Twerk Skeleton took on a whole new life of its own.',
    creatorName: 'grossehalbuer',
    endDate: new Date(2021, 7, 2),
    items: getDemoItems(0, 0),
  },
  {
    title: 'Cycle of the Shroom — Heavy lies the crown relevant',
    text:
      'Since then, Space Yacht has used the Twerk Skeleton design on both apparel and live visuals at their events. Once Space Yacht started producing NFTs, the legend of the Twerk Skeleton took on a whole new life of its own.',
    creatorName: 'grossehalbuer',
    endDate: new Date(2021, 7, 2),
    items: getDemoItems(1, 6),
  },
  {
    title: 'Cycle of the Shroom — Heavy lies the crown relevant',
    text:
      'Since then, Space Yacht has used the Twerk Skeleton design on both apparel and live visuals at their events. Once Space Yacht started producing NFTs, the legend of the Twerk Skeleton took on a whole new life of its own.',
    creatorName: 'grossehalbuer',
    endDate: new Date(2021, 7, 2),
    items: getDemoItems(1, 3),
  },
  {
    title: 'Cycle of the Shroom — Heavy lies the crown relevant',
    text:
      'Since then, Space Yacht has used the Twerk Skeleton design on both apparel and live visuals at their events. Once Space Yacht started producing NFTs, the legend of the Twerk Skeleton took on a whole new life of its own.',
    creatorName: 'grossehalbuer',
    endDate: new Date(2021, 7, 2),
    items: getDemoItems(1, 4),
  },
];

enum DropsSortBy {
  Upcoming,
  Previous,
}

const tabs = [
  {
    id: DropsSortBy.Upcoming,
    label: 'Upcoming  dr🔥ps',
  },
  {
    id: DropsSortBy.Previous,
    label: 'Previous drops',
  },
];

export const DropsSection = () => {
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<DropsSortBy>(DropsSortBy.Upcoming);

  const onSortChange = useCallback((_e: ChangeEvent<{}>, newValue: any) => {
    setSortBy(newValue as DropsSortBy);

    // for demo purpose
    setLoading(true);
  }, []);

  useEffect(() => {
    // for demo purpose
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [sortBy]);

  const renderedUpcomingDrops = demoDrops.map(
    ({ title, text, creatorName, endDate, items, bgImg, bgColor }, i) => {
      const timer = <DropTimer endDate={endDate} />;
      const creator = <StoriesOwner title={creatorName} />;

      return (
        <Drop
          key={uid(i)}
          href={StoriesRoutesConfig.DropDetails.generatePath('12342')}
          bgImg={bgImg}
          bgColor={bgColor}
          title={title}
          text={text}
          timer={timer}
          creator={creator}
          items={items}
        />
      );
    },
  );

  const renderedSkeletons = [1, 2].map((_, i) => <DropSkeleton key={uid(i)} />);

  return (
    <Section>
      <StoriesContainer>
        <Box mb={{ xs: 4, md: 7 }}>
          <DropsTabs value={sortBy} onChange={onSortChange as any}>
            {tabs.map(({ label, id }) => (
              <DropsTab disabled={loading} key={id} label={label} />
            ))}
          </DropsTabs>
        </Box>

        {sortBy === DropsSortBy.Upcoming && (
          <DropList>
            {loading ? renderedSkeletons : renderedUpcomingDrops}
          </DropList>
        )}

        {sortBy === DropsSortBy.Previous && (
          <>
            {loading ? (
              <DropList>{renderedSkeletons}</DropList>
            ) : (
              <Typography variant="h3" align="center" color="textSecondary">
                Nothing found
              </Typography>
            )}
          </>
        )}
      </StoriesContainer>
    </Section>
  );
};
