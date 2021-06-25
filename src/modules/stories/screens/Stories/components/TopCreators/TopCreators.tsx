import React, { useEffect, useState } from 'react';
import { uid } from 'react-uid';
import { TopCreatorsItem, TopCreatorsItemSkeleton } from '../TopCreatorsItem';
import { TopCreatorsComponent } from './TopCreatorsComponent';

const demoItems = new Array(10).fill(0).map((_, i) => ({
  img: `https://picsum.photos/128?random=${i}`,
  title: `Some Title ${i}`,
}));

interface ITopCreatorsProps {
  className?: string;
}

export const TopCreators = ({ className }: ITopCreatorsProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const renderedSkeletons = new Array(7)
    .fill(0)
    .map((_, i) => <TopCreatorsItemSkeleton key={i} />);

  const renderedItems = demoItems.map(({ img, title }, i) => (
    <TopCreatorsItem href="#" key={uid(title, i)} img={img} title={title} />
  ));

  return (
    <TopCreatorsComponent itemsCount={demoItems.length} loading={loading}>
      {loading ? renderedSkeletons : renderedItems}
    </TopCreatorsComponent>
  );
};
