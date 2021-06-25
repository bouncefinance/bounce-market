import { ThemeProvider } from '@material-ui/core';
import { DropsRoutesConfig } from 'modules/drops/Routes';
import { darkTheme } from 'modules/themes/darkTheme';
import React from 'react';
import { uid } from 'react-uid';
import { DropsChip } from './components/DropsChip';
import { DropsOwner } from './components/DropsOwner';
import { DropsSlider } from './components/DropsSlider';
import { DropsSliderItem } from './components/DropsSliderItem';

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

export const Drops = () => {
  const renderedItems = items.map(item => {
    const chips = item.chips.map((label, i) => (
      <DropsChip key={label} label={label} isLive={!i} />
    ));
    const profileInfo = <DropsOwner title={item.owner} isVerified />;

    return (
      <DropsSliderItem
        href={DropsRoutesConfig.Drops.generatePath()}
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
      <DropsSlider itemCount={items.length}>{renderedItems}</DropsSlider>
    </ThemeProvider>
  );
};
