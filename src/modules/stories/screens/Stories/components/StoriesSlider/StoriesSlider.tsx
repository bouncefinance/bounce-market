import {
  StoriesOwner,
  StoriesOwnerSkeleton,
} from 'modules/stories/components/StoriesOwner';
import { StoriesRoutesConfig } from 'modules/stories/Routes';
import React, { useEffect, useState } from 'react';
import { uid } from 'react-uid';
import { StoriesChip } from '../StoriesChip';
import {
  StoriesSliderItem,
  StoriesSliderItemSkeleton,
} from '../StoriesSliderItem';
import { StoriesSliderComponent } from './StoriesSliderComponent';

const demoItems: {
  title: string;
  text: string;
  img: string;
  chips: string[];
  owner: string;
}[] = [
  {
    title: 'Masters of relevance',
    text:
      'The Wave 3/20 "SMART" is dedicated to some projects building on blockchain and developed with great smartness.',
    img: 'https://picsum.photos/584/500?image=6',
    chips: ['live', 'Auction'],
    owner: 'grossehalbuer',
  },
  {
    title: 'Masters of relevance',
    text: 'The Wave 3/20 "SMART" is dedicated',
    img: 'https://picsum.photos/584/500?image=7',
    chips: ['live', 'Auction'],
    owner: 'grossehalbuer',
  },
  {
    title: 'There are many variations of passages',
    text:
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years',
    img: 'https://picsum.photos/584/500?image=8',
    chips: ['live'],
    owner: 'Lorem Ipsum',
  },
  {
    title: 'There are many variations of passages',
    text:
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years',
    img: 'https://picsum.photos/584/500?image=9',
    chips: ['live'],
    owner: 'Lorem Ipsum',
  },
];

export const StoriesSlider = () => {
  const [loading, setLoading] = useState(true);
  const renderedItems = demoItems.map(item => {
    const chips = item.chips.map((label, i) => (
      <StoriesChip key={label} label={label} isLive={!i} />
    ));
    const profileInfo = <StoriesOwner title={item.owner} isVerified />;

    return (
      <StoriesSliderItem
        href={StoriesRoutesConfig.Stories.generatePath()}
        key={uid(item)}
        title={item.title}
        text={item.text}
        img={item.img}
        chips={chips}
        profileInfo={profileInfo}
      />
    );
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const renderedSkeletons = new Array(3)
    .fill(0)
    .map((_, i) => (
      <StoriesSliderItemSkeleton
        key={i}
        profileInfo={<StoriesOwnerSkeleton />}
      />
    ));

  return (
    <StoriesSliderComponent itemCount={demoItems.length}>
      {loading ? renderedSkeletons : renderedItems}
    </StoriesSliderComponent>
  );
};
