import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import {
  Input,
  Grid,
  Button, Dialog, Select,
} from '@icedesign/base';
import Operation from '../../../../api/api';


const { getAllPowerId,addRole } = Operation;
const { Row, Col } = Grid;
export default class CreateActivityForm extends Component {
  static displayName = 'CreateActivityForm';
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        roleId: '',
        roleName: '',
        roleFName: '',
      },
      roleId:[]
    };
  }
  componentWillMount = async () => {
    const result = await getAllPowerId();
    this.setState({
      roleId: result,
    });
  }
  onFormChange = (value) => {
    this.setState({
      value,
    });
  };

  reset = () => {
    this.setState({
      value: {
        roleId: '',
        roleName: '',
        roleFName: '',
      },
    });
  };

  submit = () => {
    const athis = this;
    this.formRef.validateAll(async (error, value) => {
      if (error) {
        // 处理表单报错
      } else {

        console.log(value);
        const result = await addRole(value);
        if (result.message === 'success') {
          window.location.reload();
        }
      }
    });
  };


  operation =  () => {
    const operation = [];
    const athis = this;
    for (let i = 0; i < this.state.roleId.length; i++) {
      operation.push({ label:athis.state.roleId[i] , value: athis.state.roleId[i]  });
    }
    return operation;
  };


  
  render() {
    return (
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
                  权限号：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder
                    name="roleId"
                  >
                    <Select
                      className="next-form-text-align"
                      required
                      style={{ width: '100%' }}
                      message="请选择商品类型"
                      dataSource={this.operation()}
                    />
                  </IceFormBinder>
                  <IceFormError name="roleId"/>
                </Col>

              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                  角色名称：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder
                    name="roleName"
                    required
                    message="角色名称必须填写"
                  >
                    <Input style={{ width: '100%' }}/>
                  </IceFormBinder>
                  <IceFormError name="roleName"/>
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                  上级角色：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder
                    name="roleFName"
                    required
                    message="上级角色必须填写"
                  >
                    <Input style={{ width: '100%' }}/>
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
                    确定
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
    );
  }
}

const styles = {
  container: {
    paddingBottom: 0,
  },
  formItem: {
    height: '28px',
    lineHeight: '28px',
    marginBottom: '25px',
  },
  formLabel: {
    textAlign: 'right',
  },
  btns: {
    margin: '25px 0',
  },
  resetBtn: {
    marginLeft: '20px',
  },
};
