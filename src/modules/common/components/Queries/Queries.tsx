import { Box } from '@material-ui/core';
import { getQuery, QueryState, RequestAction } from '@redux-requests/core';
import React, { ReactElement, ReactNode } from 'react';
import { useAppSelector } from 'store/useAppSelector';
import { QueryEmpty } from '../QueryEmpty/QueryEmpty';
import { QueryError } from '../QueryError/QueryError';
import { QueryLoading } from '../QueryLoading/QueryLoading';

interface ILoadingProps<T1, T2, T3, T4, T5> {
  requestActions: ((...args: any[]) => RequestAction)[];
  requestKeys?: string[];
  children: (
    ...a: [
      T1 extends void ? void : QueryState<T1>,
      T2 extends void ? void : QueryState<T2>,
      T3 extends void ? void : QueryState<T3>,
      T4 extends void ? void : QueryState<T4>,
      T5 extends void ? void : QueryState<T5>,
    ]
  ) => ReactNode;
  noDataMessage?: ReactElement;
  empty?: JSX.Element;
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

export function Queries<T1 = void, T2 = void, T3 = void, T4 = void, T5 = void>({
  requestActions,
  children,
  requestKeys,
  noDataMessage,
  empty,
}: ILoadingProps<T1, T2, T3, T4, T5>) {
  const queries = useAppSelector(state =>
    requestActions.map((item, index) =>
      getQuery(state, {
        type: item.toString(),
        action: item,
        requestKey: requestKeys?.[index],
      }),
    ),
  );

  if (isLoading(queries)) {
    return (
      noDataMessage || (
        <Box
          py={5}
          position="relative"
          width="100%"
          display="flex"
          justifyContent="center"
        >
          <QueryLoading />
        </Box>
      )
    );
  }

  const error = hasError(queries);

  if (error) {
    return <QueryError error={error} />;
  }

  if (isEmpty(queries)) {
    return empty || <QueryEmpty />;
  }

  return <>{(children as any)(...queries)}</>;
}
