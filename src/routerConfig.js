// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import BasicLayout from './layouts/BasicLayout';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import powerManager from './pages/PowerManager';
import roleManager from './pages/RoleManager';
import Register1 from './pages/Register1';
import userManager from './pages/UserManager';

const routerConfig = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: 'manager/power',
    layout: BasicLayout,
    component: powerManager,
  },
  {
    path: 'manager/role',
    layout: BasicLayout,
    component: roleManager,
  },
  {
    path: 'manager/user',
    layout: BasicLayout,
    component: userManager,
  },
  {
    path: '/register',
    component: Register1,
  },
  {
    path: '*',
    layout: BasicLayout,
    component: NotFound,
  },
];

export default routerConfig;
