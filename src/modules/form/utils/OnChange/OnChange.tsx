// https://github.com/final-form/react-final-form-listeners/blob/master/src/OnChange.js

import * as React from 'react';
import { Field } from 'react-final-form';

export type OnChangeProps = {
  name: string;
  children: (value: any, previous: any) => void;
};

type Props = {
  children: (value: any, previous: any) => void;
  input: {
    value: any;
  };
};

type State = {
  previous: any;
};

class OnChangeState extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    props.children(props.input.value, undefined);
    this.state = {
      previous: props.input.value,
    };
  }

  componentDidUpdate() {
    const {
      children,
      input: { value },
    } = this.props;
    const { previous } = this.state;
    if (value !== previous) {
      this.setState({ previous: value });
      children(value, previous);
    }
  }

  render() {
    return null;
  }
}

export const OnChange = ({ name, children }: OnChangeProps) =>
  React.createElement(Field, {
    name,
    subscription: { value: true },
    allowNull: true,
    render: props => React.createElement(OnChangeState, { ...props, children }),
  });
