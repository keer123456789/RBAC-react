import React, { Component } from 'react';
import Register from './components/Register';

export default class Register1 extends Component {
  static displayName = 'Register1';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="register1-page">
        <Register />
      </div>
    );
  }
}
