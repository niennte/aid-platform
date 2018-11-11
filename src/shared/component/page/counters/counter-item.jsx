// @flow

import React from 'react';

type Props = {
  counterValue: number,
  className: string,
  children: ?any,
}

class Counter extends React.Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      counterValue: props.counterValue,
      counterClass: 'flash1',
    };
  }

  componentWillReceiveProps(nextProps) {
    const { counterValue: currentValue } = this.state;
    const { counterValue: nextValue } = nextProps;
    if (nextValue !== currentValue) {
      this.toggleClass();
    }
    this.setState({
      counterValue: nextValue,
    });
  }

  toggleClass = () => {
    this.setState((prevState) => {
      let { counterClass } = prevState;
      counterClass = counterClass === 'flash1' ? 'flash2' : 'flash1';
      return { counterClass };
    });
  };

  render() {
    const { className, children } = this.props;
    const { counterValue, counterClass } = this.state;
    return (
      <li className={`nav-item mx-1 ${className} ${counterClass}`}>
        <span className="nav-link">
          <span className="value">{counterValue}</span>
          { children }
        </span>
      </li>
    );
  }
}

export default Counter;
