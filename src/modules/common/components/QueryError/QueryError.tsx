import * as React from 'react';
import { ErrorProps } from '@redux-requests/react';
import { extractMessage } from '../../utils/extractError';

interface ILoadingProps extends ErrorProps {}

export const QueryError = (props: ILoadingProps) => {
  const message = extractMessage(props);

  return (
    <div
      style={{
        fontSize: 30,
        textAlign: 'center',
        paddingTop: 40,
      }}
    >
      {message}
    </div>
  );
};
