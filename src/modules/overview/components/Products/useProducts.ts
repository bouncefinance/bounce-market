import { ChangeEvent, useCallback, useState } from 'react';

const categories = [
  {
    value: 'all',
    label: 'All',
  },
  {
    value: 'art',
    label: 'Art',
  },
  {
    value: 'sport',
    label: 'Sport',
  },
  {
    value: 'music',
    label: 'Music',
  },
  {
    value: 'comics',
    label: 'Comics',
  },
];

const sortVariants = [
  {
    value: '1',
    label: 'On auction',
  },
  {
    value: '2',
    label: 'Recently added',
  },
  {
    value: '3',
    label: 'Cheapest',
  },
  {
    value: '4',
    label: 'Highest price',
  },
  {
    value: '5',
    label: 'Most liked',
  },
];

export const useProducts = () => {
  const [sortBy, setSortBy] = useState<string>(sortVariants[0].value);
  const [catergory, setCategory] = useState<string>(categories[0].value);

  const onSortChange = useCallback((event: ChangeEvent<{ value: unknown }>) => {
    setSortBy(event.target.value as string);
  }, []);

  const onCategorySelectChange = useCallback(
    (event: ChangeEvent<{ value: unknown }>) => {
      setCategory(event.target.value as string);
    },
    [],
  );

  const onCategoryTabChange = useCallback(
    (_e: ChangeEvent<{}>, newValue: string) => {
      setCategory(newValue);
    },
    [],
  );

  return {
    onSortChange,
    onCategoryTabChange,
    onCategorySelectChange,
    sortBy,
    catergory,
    categories,
    sortVariants,
  };
};
