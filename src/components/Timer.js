import React, { Component } from 'react';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      timer: 30,
    };
  }

  render() {
    const { timer } = this.state;
    return (
      <p>
        { timer }
      </p>
    );
  }
}

export default Timer;
