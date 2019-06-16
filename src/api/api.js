import { get, post } from './request.js';

const ip="http://127.0.0.1:8080";

// 增加权限
const addPower = (value) => {
  return post(`${ip}/addPower`, {
    data: value,
  });
};

// 获得权限
const getPower = () => {
  return get(`${ip}/getPower`)
    .then((resp) => {
      return resp.data;
    });
};
/**
 * 修改已有权限属性
 * @param value
 */
const fixPower = (value) => {
  return post(`${ip}/fixPower`, {
    data: value,
  });
};
/**
 * 禁用权限
 * @param id
 * @returns {Promise<T | never>}
 */
const deletePower = (id) => {
  return get(`${ip}/deletePower/${id}`)
    .then((resp) => {
      return resp.data;
    });
};
/**
 * 获得全部权限ID
 * @returns {Promise<T | never>}
 */
const getAllPowerId = () => {
  return get(`${ip}/getAllPowerId`)
    .then((resp) => {
      return resp.data;
    });
};

/**
 * 增加角色
 * @param value
 */
const addRole = (value) => {
  return post(`${ip}/addRole`, {
    data: value,
  });
};
/**
 * 获得全部角色
 * @returns {Promise<T | never>}
 */
const getAllRole = () => {
  return get(`${ip}/getAllRole`)
    .then((resp) => {
      return resp.data;
    });
};

const changeRolePowerAndFName = (value) => {
  return post(`${ip}/changeRolePowerAndFName`, {
    data: value,
  });
};

/**
 * 获得系统内的全部用户
 */
const getAllUser=()=>{
  return get(`${ip}/getAllUser`).then((resp)=>{
    return resp.data;
  });
}


/**
 * 用户提交审核
 */
const register = (value) => {
  return post(`${ip}/register`, {
    data: value,
  });
};
/**
 * 提交用户注册申请
 * @param {} value 
 */
const eroll =(value)=>{
  return post(`${ip}/eroll`,{
    data:value,
  })
}
/**
 * 禁用用户
 * @param {*} address 
 */
const banUser =(address)=>{
  return get(`${ip}/banUser/${address}`)
}

/**
 * 登录
 *
 */
const login = (value) => {
  // cookie.save('account', value.account);
  return post(`${ip}/login`, {
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
