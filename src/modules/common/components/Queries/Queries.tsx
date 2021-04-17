import React, { ReactNode } from 'react';
import { QueryError } from '../QueryError/QueryError';
import { QueryLoadingCentered } from '../../../components/QueryLoading/QueryLoading';
import { QueryEmpty } from '../QueryEmpty/QueryEmpty';
import { getQuery, QueryState, RequestAction } from '@redux-requests/core';
import { useAppSelector } from '../../../../store/useAppSelector';

interface ILoadingProps<T> {
  requestActions: (() => RequestAction)[];
  // Make T more strict
  children: (...query: QueryState<T>[]) => ReactNode;
}

function isLoading(queries: QueryState<any>[]) {
  return queries.find(item => item.loading || item.pristine);
}

function hasError(queries: QueryState<any>[]) {
  return queries.find(item => item.error);
}

function isDataEmpty(data: any) {
  if (!data) {
    return true;
  }

  return data instanceof Array && data.length === 0;
}

function isEmpty(queries: QueryState<any>[]) {
  return queries.every(item => isDataEmpty(item.data));
}

export function Queries<T>({ requestActions, children }: ILoadingProps<T>) {
  const queries = useAppSelector(state =>
    requestActions.map(item =>
      getQuery(state, { type: item.toString(), action: item }),
    ),
  );

  if (isLoading(queries)) {
    return <QueryLoadingCentered />;
  }

  const error = hasError(queries);

  if (error) {
    return <QueryError error={error} />;
  }

  if (isEmpty(queries)) {
    return <QueryEmpty />;
  }

  return <>{children(...queries)}</>;
}
