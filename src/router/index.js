import Vue from 'vue'
import Router from 'vue-router'
//登录界面
import Login from '@/pages/management/Login'
//后台容器界面
import ManagementHome from '@/pages/management/Home'
//后台主页
import Index from '@/pages/management/index/Index'
//后台配置界面
import Configuration from '@/pages/management/Configuration'
//账户列表
import AccountList from '@/pages/management/account/AccountList'
//角色列表
import RoleList from '@/pages/management/role/RoleList'
//权限列表
import PermissionList from '@/pages/management/permission/PermissionList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'ManagementHome',
      component: ManagementHome,
      children: [
        {
          path: '/management/index',
          name: 'Index',
          component: Index
        },
        {
          path: '/management/configuration',
          name: 'Configuration',
          component: Configuration
        },
        {
          path: '/management/account/accountlist',
          name: 'AccountList',
          component: AccountList
        },
        {
          path: '/management/role/rolelist',
          name: 'RoleList',
          component: RoleList
        },
        {
          path: '/management/permission/permissionlist',
          name: 'PermissionList',
          component: PermissionList
        },
      ]
    }
  ]
})
