import { ChangeEvent, useCallback, useState } from 'react';

const categories = [
  {
    value: 'sale',
    label: 'On sale',
  },
  {
    value: 'created',
    label: 'Created',
  },
  {
    value: 'all',
    label: 'All',
  },
];

const sortVariants = [
  {
    value: '1',
    label: 'Ascending',
  },
  {
    value: '2',
    label: 'Descending',
  },
];

export const useTabItems = () => {
  const [catergory, setCategory] = useState<string>(categories[0].value);
  const [sortBy, setSortBy] = useState<string>(sortVariants[0].value);

  const onCategoryTabChange = useCallback(
    (_e: ChangeEvent<{}>, newValue: string) => {
      setCategory(newValue);
    },
    [],
  );

  const onCategorySelectChange = useCallback(
    (event: ChangeEvent<{ value: unknown }>) => {
      setCategory(event.target.value as string);
    },
    [],
  );

  const onSortChange = useCallback((event: ChangeEvent<{ value: unknown }>) => {
    setSortBy(event.target.value as string);
  }, []);

  return {
    sortVariants,
    categories,
    catergory,
    sortBy,
    onCategoryTabChange,
    onCategorySelectChange,
    onSortChange,
  };
};
