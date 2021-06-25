import React from 'react';

interface IConditionalWrapper {
  condition: boolean;
  wrapper: JSX.Element;
  children: React.ReactNode;
}

export const ConditionalWrapper = ({
  condition,
  wrapper,
  children,
}: IConditionalWrapper) => {
  return condition ? (
    <wrapper.type {...wrapper.props}>{children}</wrapper.type>
  ) : (
    (children as JSX.Element)
  );
};
