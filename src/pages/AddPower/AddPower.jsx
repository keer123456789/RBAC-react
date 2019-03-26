import React, { Component } from 'react';
import CreateActivityForm from './components/CreateActivityForm';

export default class AddPower extends Component {
  static displayName = 'AddPower';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="add-power-page">
        <CreateActivityForm hideDialog={this.props.hideDialog} />
      </div>
    );
  }
}
