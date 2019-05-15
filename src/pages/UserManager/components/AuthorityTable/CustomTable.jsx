import React, { Component } from 'react';
import { Table, Dialog, Button, Input ,Select} from '@icedesign/base';
import Operation from '../../../../api/api';
import IceContainer from  '@icedesign/container';
import {
  FormBinder as IceFormBinder,
  FormBinderWrapper as IceFormBinderWrapper,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import Row from 'react-bootstrap/es/Row';
import Col from 'react-bootstrap/es/Col';

const { getAllUser,eroll,banUser } = Operation;


export default class Home extends Component {
  static displayName = 'Home';

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      dialog: false,
      userId: '',
      address: '',
      email: '',
      userFName: '',
      roleName: '',
      status: '',
      dialog1:false,
      dialog2:false,
    };
    
    
  }

  componentWillMount = async () => {
    const result =await getAllUser();
    const athis = this;
    if (result != null) {
      athis.setState({
        dataSource: result,
      });
    }
  };

  
change = (value)=> {
    var index=value.substring(2,3);
    
    const id = this.state.dataSource[index].userId.toString();
    const email = this.state.dataSource[index].email.toString();
    const fName = this.state.dataSource[index].userFName.toString();
    const address = this.state.dataSource[index].address.toString();
    const status = this.state.dataSource[index].status.toString();
    const roleName = this.state.dataSource[index].roleName.toString();
    this.setState({
      userId: id,
      email: email,
      userFName: fName,
      address: address,
      status: status,
      roleName: roleName,
     
    })

    var num=value.substring(0,2);
    if(num==="提交"){
      this.setState({
        dialog:true
      });
    }
    if(num==="禁用"){
      this.setState({
        dialog1:true
      });
    }
    if(num==="修改"){
      this.setState({
        dialog2:true
      });
    }
    console.log(this.state)
};

  build_shenhe=(index)=>{
    var a='提交'+index;
    return a;
  }
  bulid_jinyong=(index)=>{
    var a='禁用'+index;
    return a;
  }
  build_xiugai = (index) =>{
    var a='修改'+index;
    return a;
  }
  renderOper = (record, index) => {
    // const athis = this;
    // athis.setState({
    //   select:index
    // })
    return (
      <div style={styles.oper}>
        {/* <IceIcon size="small" type="eye" style={styles.editIcon} onClick={() => {
          this.printf(index);
        }}/> */}
        <Select
          className="next-form-text-align"
          required
          
          style={{ width: '100%' }}
          onChange={this.change}
          message="请选择商品类型"
          dataSource={[
            { label:'提交审核' , value: this.build_shenhe(index)  },
            { label:'禁用用户' , value: this.bulid_jinyong(index)  },
            { label:'修改信息' , value: this.build_xiugai(index)  }
          ]}
          />
      </div>
    );
  };
  hideDialog = () => {
    this.setState({
      dialog: false,
      dialog1:false,
      dialog2:false,
    });
  };
  submit = () => {
    this.formRef.validateAll(async (error, value) => {
      if (error) {
        // 处理表单报错
      } else {
        
        value.address=this.state.address;
        console.log(value);
        const result = await eroll(value);
        console.log(result);
        if (result.message === 'success') {
          window.location.reload();
        }
      }
    });
  };

  ban = async()=>{
    console.log(this.state.addres);
    const result = await banUser(this.state.address);
    if(result.message==='success'){
      window.location.reload();
    }
  }


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
          <Table.Column width={230} title="地址" dataIndex="address"/>
          <Table.Column width={100} title="用户ID" dataIndex="userId"/>
          <Table.Column width={100} title="用户角色" dataIndex="roleName"/>
          <Table.Column width={100} title="上级用户" dataIndex="userFName"/>
          <Table.Column width={100} title="邮箱" dataIndex="email"/>
          <Table.Column width={50} title="状态" dataIndex="status"/>
          
          {/* <Table.Column width={100} title="操作" dataIndex="operation" /> */}
          <Table.Column
            width={100}
            title="修改用户信息"
            cell={this.renderOper}
            align="center"
          />
        </Table>
        <Dialog
          className="simple-form-dialog"
          style={{ width: '1000px' }}
          autoFocus
          footerAlign="center"
          title="提交审核"
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
                      用户地址：{this.state.address}
                    </Col>

                  </Row>
                  <Row style={styles.formItem}>
                    <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                      用户角色：
                      <IceFormBinder
                        name="roleName"
                        required
                        message="用户角色必须填写"
                      >
                        <Input style={{ width: '40%' }} placeholder={this.state.roleName}/>
                      </IceFormBinder>
                      <IceFormError name="roleName"/>
                    </Col>

                  </Row>
                  <Row style={styles.formItem}>
                    <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                      用户名：
                      <IceFormBinder
                        name="userId"
                        message="用户名必须填写"
                      >
                        <Input style={{ width: '40%' }} value={this.state.userId}/>
                      </IceFormBinder>
                      <IceFormError name="userId"/>
                    </Col>
                  </Row>
                  
                  <Row style={styles.formItem}>
                    <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                      上级用户：
                      <IceFormBinder
                        name="fName"
                        required
                        message="用户ID必须填写"
                      >
                        <Input style={{ width: '40%' }} placeholder={this.state.userFName}/>
                      </IceFormBinder>
                      <IceFormError name="fName"/>
                    </Col>
                  </Row>
                  <Row style={styles.formItem}>
                  <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                    邮箱：
                    <IceFormBinder
                      name="email"
                      message="上级用户必须填写"
                    >
                      <Input style={{ width: '40%' }} value={this.state.email}/>
                    </IceFormBinder>
                    <IceFormError name="email"/>
                  </Col>
                </Row>


                  <Row style={styles.btns}>
                    <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                      {' '}
                    </Col>
                    <Col s="12" l="10">
                      <Button type="primary" onClick={this.submit}>
                        提交审核
                      </Button>
                    </Col>
                  </Row>
                </div>
              </IceFormBinderWrapper>
            </IceContainer>
          </div>
        </Dialog>

        <Dialog
          className="simple-form-dialog"
          style={{ width: '1000px' }}
          autoFocus
          footerAlign="center"
          title="禁用用户"
          onClose={this.hideDialog}
          isFullScreen
          visible={this.state.dialog1}
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
                      用户地址：{this.state.address}
                    </Col>

                  </Row>
                  <Row style={styles.formItem}>
                    <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                      用户角色：
                      <IceFormBinder
                        name="roleName"
                        message="用户角色必须填写"
                      >
                        <Input style={{ width: '40%' }} value={this.state.roleName}/>
                      </IceFormBinder>
                      <IceFormError name="roleName"/>
                    </Col>

                  </Row>
                  <Row style={styles.formItem}>
                    <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                      用户名：
                      <IceFormBinder
                        name="userId"
                        message="用户名必须填写"
                      >
                        <Input style={{ width: '40%' }} value={this.state.userId}/>
                      </IceFormBinder>
                      <IceFormError name="userId"/>
                    </Col>

                  </Row>
                  <Row style={styles.formItem}>
                    <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                      上级用户：
                      <IceFormBinder
                        name="fName"
                        message="用户ID必须填写"
                      >
                        <Input style={{ width: '40%' }} value={this.state.userFName}/>
                      </IceFormBinder>
                      <IceFormError name="fName"/>
                    </Col>
                  </Row>
                  <Row style={styles.formItem}>
                  <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                    邮箱：
                    <IceFormBinder
                      name="email"
                      message="上级用户必须填写"
                    >
                      <Input style={{ width: '40%' }} value={this.state.email}/>
                    </IceFormBinder>
                    <IceFormError name="email"/>
                  </Col>
                </Row>


                  <Row style={styles.btns}>
                    <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                      {' '}
                    </Col>
                    <Col s="12" l="10">
                      <Button type="primary" onClick={this.ban}>
                        禁用用户
                      </Button>
                    </Col>
                  </Row>
                </div>
              </IceFormBinderWrapper>
            </IceContainer>
          </div>
        </Dialog>
      
        <Dialog
          className="simple-form-dialog"
          style={{ width: '1000px' }}
          autoFocus
          footerAlign="center"
          title="修改信息"
          onClose={this.hideDialog}
          isFullScreen
          visible={this.state.dialog2}
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
                      用户地址：{this.state.address}
                    </Col>

                  </Row>
                  <Row style={styles.formItem}>
                    <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                      用户角色：
                      <IceFormBinder
                        name="roleName"
                        required
                        message="用户角色必须填写"
                      >
                        <Input style={{ width: '40%' }} placeholder={this.state.roleName}/>
                      </IceFormBinder>
                      <IceFormError name="roleName"/>
                    </Col>

                  </Row>
                  <Row style={styles.formItem}>
                    <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                      用户名：
                      <IceFormBinder
                        name="userId"
                        message="用户名必须填写"
                      >
                        <Input style={{ width: '40%' }} value={this.state.userId}/>
                      </IceFormBinder>
                      <IceFormError name="userId"/>
                    </Col>

                  </Row>
                  <Row style={styles.formItem}>
                    <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                      上级用户：
                      <IceFormBinder
                        name="fName"
                        required
                        message="用户ID必须填写"
                      >
                        <Input style={{ width: '40%' }} placeholder={this.state.userFName}/>
                      </IceFormBinder>
                      <IceFormError name="fName"/>
                    </Col>
                  </Row>
                  <Row style={styles.formItem}>
                  <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                    邮箱：
                    <IceFormBinder
                      name="email"
                      required
                      message="上级用户必须填写"
                    >
                      <Input style={{ width: '40%' }} placeholder={this.state.email}/>
                    </IceFormBinder>
                    <IceFormError name="email"/>
                  </Col>
                </Row>


                  <Row style={styles.btns}>
                    <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                      {' '}
                    </Col>
                    <Col s="12" l="10">
                      <Button type="primary" onClick={this.submit}>
                        修改信息
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
  container: {
    paddingBottom: 0,
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
