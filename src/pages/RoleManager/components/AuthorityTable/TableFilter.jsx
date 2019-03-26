import React, { Component } from 'react';
import { Dialog, Button } from '@icedesign/base';
import AddRole from '../../../AddRole';
import './main.css';

export default class TableFilter extends Component {
  static displayName = 'TableFilter';

  constructor(props) {
    super(props);
    this.state = {
      dialog: false,
    };
  }

  addrole = () => {
    this.setState({
      dialog: true,
    });
  }
  hideDialog = () => {
    this.setState({
      dialog: false,
    });
  };
  render() {
    return (
      <div style={styles.tableFilter}>
        <div style={styles.title}>角色管理</div>
        <Button type="primary" style={styles.submitButton} onClick={() => { this.addrole(); }}>
          新增角色
        </Button>
        <Dialog
          className="simple-form-dialog"
          style={{ width: '1000px' }}
          autoFocus
          footerAlign="center"
          title="新增角色"
          onClose={this.hideDialog}
          isFullScreen
          visible={this.state.dialog}
        >
          <AddRole hideDialog={this.hideDialog} value="12345" />
        </Dialog>
      </div>
    );
  }
}

const styles = {
  tableFilter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px',
    marginBottom: '20px',
    background: '#fff',
  },
  title: {
    height: '20px',
    lineHeight: '20px',
    color: '#333',
    fontSize: '18px',
    fontWeight: 'bold',
    paddingLeft: '12px',
    borderLeft: '4px solid #666',
  },
  filter: {
    display: 'flex',
  },
  filterItem: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '20px',
  },
  filterLabel: {
    fontWeight: '500',
    color: '#999',
  },
  submitButton: {
    marginLeft: '20px',
  },
};
