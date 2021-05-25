import { useDispatchRequest, useQuery } from '@redux-requests/react';
import classNames from 'classnames';
import { queryLikedItems } from 'modules/profile/actions/queryLikedItems';
import React, { useEffect } from 'react';
import { useTabLikedStyles } from './useTabLikedStyles';

interface ITabLikedProps {
  className?: string;
}

export const TabLiked = ({ className }: ITabLikedProps) => {
  const classes = useTabLikedStyles();
  const dispatch = useDispatchRequest();

  const { data: likedItems } = useQuery<any[] | null>({
    type: queryLikedItems.toString(),
  });

  console.log({ likedItems });

  useEffect(() => {
    dispatch(queryLikedItems());
  }, [dispatch]);

  return (
    <div className={classNames(classes.root, className)}>
      <span>TabLiked</span>
    </div>
  );
};
