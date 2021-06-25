import { ThemeProvider } from '@material-ui/core';
import { StoriesRoutesConfig } from 'modules/stories/Routes';
import { darkTheme } from 'modules/themes/darkTheme';
import React from 'react';
import { uid } from 'react-uid';
import { StoriesChip } from './components/StoriesChip';
import { StoriesOwner } from './components/StoriesOwner';
import { StoriesSlider } from './components/StoriesSlider';
import { StoriesSliderItem } from './components/StoriesSliderItem';

const items = [
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

export const Stories = () => {
  const renderedItems = items.map(item => {
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

  return (
    <ThemeProvider theme={darkTheme}>
      <StoriesSlider itemCount={items.length}>{renderedItems}</StoriesSlider>
    </ThemeProvider>
  );
};
