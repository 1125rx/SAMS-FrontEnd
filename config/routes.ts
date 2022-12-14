export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './User/Login' },
      { name: '注册', path: '/user/register', component: './User/Register'}
    ],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/sub-page' },
      { path: '/admin/sub-page', name: '二级管理页', component: './Admin' },
    ],
  },
  {
    path: '/team',
    name: '队伍',
    icon: 'TeamOutlined',
    routes: [
      {path: '/team/list',name: '队伍列表',component: './Team/TeamList'},
      {path: '/team/myCreate',name: '我的创建',component: './Team/MyCreateTeam'},
      {path: '/team/myJoin',name: '我的加入',component: './Team/MyJoinTeam'},
      {path: '/team/create', name: '创建队伍', component: './Team/CreateTeam'}
    ],
  },
  {
    path: '/person',
    name: '伙伴',
    icon: 'UserOutlined',
    routes: [
      {path: '/person/list', name: '伙伴列表', component: './Person/PersonList'},
    ],
  },
  {
    name: '申请列表',
    icon: 'table',
    path: '/list',
    routes: [
      {path: '/list/apply/team', name: '队伍申请', component: './TableList'},
      {path: '/list/welcome/team', name: '队伍邀请', component: './WelcomeList'},
      {path: '/list/history', name: '历史记录', component: './MyApplyHistory'},
    ],
  },
  {
    name: '个人设置',
    // hideInMenu: true,
    icon: 'SettingOutlined',
    path: '/accountsettings',
    component: './AccountSettings',
  },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
