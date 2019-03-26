import React, { Component } from 'react';
import { Table, Dialog, Input, Button, Grid } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import IceIcon from '@icedesign/icon';
import Operation from '../../../../api/api';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import Row from 'react-bootstrap/es/Row';
import Col from 'react-bootstrap/es/Col';


const { getPower, addPower,deletePower,fixPower } = Operation;


export default class Home extends Component {
  static displayName = 'Home';

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      dialog: false,
      powerId: '',
      powerName: '',
      powerInfo: '',
    };
  }

  componentWillMount = async () => {
    const result = await getPower();
    const athis = this;
    if (result != null) {
      athis.setState({
        dataSource: result,
      });
    }
  };

  printf = (index) => {
    const id = this.state.dataSource[index].powerId.toString();
    const name = this.state.dataSource[index].powerName.toString();
    const info = this.state.dataSource[index].powerInfo.toString();
    this.setState({
      dialog: true,
      powerId: id,
      powerName: name,
      powerInfo: info,
    });
  };
  renderOper = (record, index) => {
    return (
      <div style={styles.oper}>
        <IceIcon size="small" type="eye" style={styles.editIcon} onClick={() => {
          this.printf(index);
        }}/>
      </div>
    );
  };
  hideDialog = () => {
    this.setState({
      dialog: false,
    });
  };


  submit = () => {
    this.formRef.validateAll(async (error, value) => {
      if (error) {
        // 处理表单报错
      } else {
        console.log(value);
        value.powerId=this.state.powerId;
        const result = await fixPower(value);
        console.log(result);
        if (result.message === 'success') {
          window.location.reload();
        }
      }
    });
  };

  delete = () => {
    this.formRef.validateAll(async (error, value) => {
      if (error) {
        // 处理表单报错
      } else {
        const result = await deletePower(value.powerId);
        console.log(result);
        if (result.message === 'success') {
          window.location.reload();
        }
      }
    });
  };

  render() {
    const { dataSource } = this.state;
    return (
      <div style={styles.tableContainer}>
        <Table
          dataSource={dataSource}
          onSort={this.handleSort}
          hasBorder={false}
          className="custom-table"
        >
          <Table.Column width={200} title="权利号" dataIndex="powerId"/>
          <Table.Column width={200} title="权利名称" dataIndex="powerName"/>
          <Table.Column width={200} title="权利状态" dataIndex="powerStatus"/>
          <Table.Column width={400} title="权利说明" dataIndex="powerInfo"/>
          {/* <Table.Column width={100} title="操作" dataIndex="operation" /> */}
          <Table.Column
            width={100}
            title="权利修改"
            cell={this.renderOper}
            align="center"
          />
        </Table>
        <Dialog
          className="simple-form-dialog"
          style={{ width: '1000px' }}
          autoFocus
          footerAlign="center"
          title="权利修改"
          onClose={this.hideDialog}
          isFullScreen
          visible={this.state.dialog}
        >
          <div className="create-activity-form">
            <IceContainer style={styles.container}>
              <IceFormBinderWrapper
                ref={(formRef) => {
                  this.formRef = formRef;
                }}
                value={this.state.value}
                onChange={this.onFormChange}
              >
                <div>
                  <Row style={styles.formItem}>
                    <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                      权限号:

                    <IceFormBinder name="powerId" >
                      <Input style={{ width: '40%' }} value={this.state.powerId} />
                    </IceFormBinder>
                    </Col>
                  </Row>
                  <Row style={styles.formItem}>
                    <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                      权限名称：
                      <IceFormBinder
                        name="powerName"
                        required
                        message="权限名称必须填写"
                      >
                        <Input style={{ width: '40%' }} placeholder={this.state.powerName} />
                      </IceFormBinder>
                      <IceFormError name="powerName"/>
                    </Col>

                  </Row>
                  <Row style={styles.formItem}>
                    <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                      权限说明：
                      <IceFormBinder
                        name="powerInfo"
                        required
                        message="说明必须填写"
                      >
                        <Input style={{ width: '40%' }} placeholder={this.state.powerInfo}/>
                      </IceFormBinder>
                      <IceFormError name="powerInfo"/>
                    </Col>

                  </Row>
                  <Row style={styles.btns}>
                    <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                      {' '}
                    </Col>
                    <Col s="12" l="10">
                      <Button type="primary" onClick={this.submit}>
                        保存
                      </Button>
                      <Button style={styles.deleteBtn} type="primary" onClick={this.delete}>
                        删除
                      </Button>
                      <Button style={styles.resetBtn} onClick={this.reset}>
                        重置
                      </Button>
                    </Col>
                  </Row>
                </div>
              </IceFormBinderWrapper>
            </IceContainer>
          </div>


        </Dialog>
      </div>
    );
  }
}

const styles = {
  container: {
    paddingBottom: 0,
  },
  tableContainer: {
    background: '#fff',
    paddingBottom: '10px',
  },
  pagination: {
    margin: '20px 0',
    textAlign: 'center',
  },
  editIcon: {
    color: '#999',
    cursor: 'pointer',
  },
  circle: {
    display: 'inline-block',
    background: '#28a745',
    width: '8px',
    height: '8px',
    borderRadius: '50px',
    marginRight: '4px',
  },
  stateText: {
    color: '#28a745',
  },
  formItem: {
    height: '28px',
    lineHeight: '28px',
    marginBottom: '25px',
  },
  formLabel: {
    textAlign: 'left',
  },
  btns: {
    margin: '25px 0',
  },
  resetBtn: {
    marginLeft: '20px',
  },
  deleteBtn: {
    marginLeft: '20px',
  },

};
