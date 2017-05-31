import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Counter extends Component {

  static propTypes = {
    increment: PropTypes.func.isRequired,
    incrementAsync: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    decrementAsync: PropTypes.func.isRequired,
    counter: PropTypes.object.isRequired
  };

  render() {
    const { increment, incrementAsync, decrement, decrementAsync, counter } = this.props;
    console.log(counter);
    return (
      <div>
        <p>Count: {counter.get('count')}</p>

        <p>
          <button className="btn btn-default" onClick={increment} disabled={counter.get('isIncrementing')}>Increment</button>
          <button className="btn btn-default" onClick={incrementAsync} disabled={counter.get('isIncrementing')}>Increment Async</button>
        </p>

        <p>
          <button className="btn btn-default" onClick={decrement} disabled={counter.get('isDecrementing')}>Decrementing</button>
          <button className="btn btn-default" onClick={decrementAsync} disabled={counter.get('isDecrementing')}>Decrement Async</button>
        </p>
      </div>
    );
  }
}