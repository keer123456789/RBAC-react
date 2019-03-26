import { get, post } from './request.js';


// 增加权限
const addPower = (value) => {
  return post('http://127.0.0.1:8080/addPower', {
    data: value,
  });
};

// 获得权限
const getPower = () => {
  return get('http://127.0.0.1:8080/getPower')
    .then((resp) => {
      return resp.data;
    });
};
/**
 * 修改已有权限属性
 * @param value
 */
const fixPower = (value) => {
  return post('http://127.0.0.1:8080/fixPower', {
    data: value,
  });
};
/**
 * 禁用权限
 * @param id
 * @returns {Promise<T | never>}
 */
const deletePower = (id) => {
  return get(`http://127.0.0.1:8080/deletePower/${id}`)
    .then((resp) => {
      return resp.data;
    });
};
/**
 * 获得全部权限ID
 * @returns {Promise<T | never>}
 */
const getAllPowerId = () => {
  return get('http://127.0.0.1:8080/getAllPowerId')
    .then((resp) => {
      return resp.data;
    });
};

/**
 * 增加角色
 * @param value
 */
const addRole = (value) => {
  return post('http://127.0.0.1:8080/addRole', {
    data: value,
  });
};
/**
 * 获得全部角色
 * @returns {Promise<T | never>}
 */
const getAllRole = () => {
  return get('http://127.0.0.1:8080/getAllRole')
    .then((resp) => {
      return resp.data;
    });
};

const changeRolePowerAndFName = (value) => {
  return post('http://127.0.0.1:8080/changeRolePowerAndFName', {
    data: value,
  });
};

/**
 * 获得系统内的全部用户
 */
const getAllUser=()=>{
  return get('http://127.0.0.1:8080/getAllUser').then((resp)=>{
    return resp.data;
  });
}


/**
 * 用户提交审核
 */
const register = (value) => {
  return post('http://127.0.0.1:8080/register', {
    data: value,
  });
};
/**
 * 提交用户注册申请
 * @param {} value 
 */
const eroll =(value)=>{
  return post('http://127.0.0.1:8080/eroll',{
    data:value,
  })
}
/**
 * 禁用用户
 * @param {*} address 
 */
const banUser =(address)=>{
  return get(`http://127.0.0.1:8080/banUser/${address}`)
}

/**
 * 登录
 *
 */
const login = (value) => {
  // cookie.save('account', value.account);
  return post('http://127.0.0.1:8080/login', {
    data: value,
  });
};


export default {
  login,
  addPower,
  getPower,
  fixPower,
  deletePower,
  getAllPowerId,
  addRole,
  getAllRole,
  changeRolePowerAndFName,
  register,
  getAllUser,
  eroll,
  banUser,
};
