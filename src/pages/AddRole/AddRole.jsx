import React, { Component } from 'react';
import CreateActivityForm from './components/CreateActivityForm';

export default class AddRole extends Component {
  static displayName = 'AddRole';

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
