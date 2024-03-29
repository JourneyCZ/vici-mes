export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: '首页',
    component: () => import('@/views/home/index.vue')
  },
  // {
  //   path: '/dashboard',
  //   name: '智能驾驶舱',
  // },
  {
    path: '/sale',
    name: '销售管理',
    children: [
      {
        path: '/sale/order',
        name: '销售订单',
        component: () => import('@/views/sale/order/index.vue'),
      },
      {
        path: '/sale/customer',
        name: '客户管理',
        component: () => import('@/views/sale/customer/index.vue'),
      },
    ]
  },
  {
    path: '/plan',
    name: '计划管理',
    children: [
      {
        path: '/plan/order',
        name: '计划订单',
        component: () => import('@/views/plan/order/index.vue'),
      },
    ]
  },
  {
    path: '/production',
    name: '生产管理',
    children: [
      {
        path: '/production/order',
        name: '生产工单',
        component: () => import('@/views/production/order/index.vue'),
      },
      {
        path: '/production/task',
        name: '生产任务',
        component: () => import('@/views/production/task/index.vue'),
      },
      {
        path: '/production/report',
        name: '生产报工',
        component: () => import('@/views/production/report/index.vue'),
      },
    ]
  },
  {
    path: '/repertory',
    name: '库存管理',
    children: [
      {
        path: '/repertory/stockroom',
        name: '仓库管理',
        component: () => import('@/views/repertory/stockroom/index.vue'),
      },
      {
        path: '/repertory/stockIn',
        name: '入库单',
        component: () => import('@/views/repertory/stockIn/index.vue'),
      },
      {
        path: '/repertory/stockOut',
        name: '出库单',
        component: () => import('@/views/repertory/stockOut/index.vue'),
      },
      {
        path: '/repertory/sendReceive',
        name: '收发明细',
        component: () => import('@/views/repertory/sendReceive/index.vue'),
      },
      {
        path: '/repertory/balance',
        name: '库存余额明细',
        component: () => import('@/views/repertory/balance/index.vue'),
      },
      {
        path: '/repertory/purchase',
        name: '采购订单',
        component: () => import('@/views/repertory/purchase/index.vue'),
      },
    ]
  },
  {
    path: '/quality',
    name: '质检管理',
    children: [
      {
        path: '/quality/scheme',
        name: '质检方案',
        component: () => import('@/views/quality/scheme/index.vue'),
      },
      {
        path: '/repertory/task',
        name: '质检任务',
        component: () => import('@/views/quality/task/index.vue'),
      },
      // {
      //   path: '/repertory/report',
      //   name: '质检报告',
      // },
    ]
  },
  {
    path: '/base',
    name: '基础数据',
    children: [
      {
        path: '/base/supplier',
        name: '供应商管理',
        component: () => import('@/views/base/supplier/index.vue'),
      },
      {
        path: '/base/category',
        name: '产品分类',
      },
      {
        path: '/base/product',
        name: '产品',
      },
      {
        path: '/base/process',
        name: '工序',
      },
      {
        path: '/base/craft',
        name: '工艺路线',
      },
      {
        path: '/base/bom',
        name: 'BOM清单',
      },
      {
        path: '/base/performance',
        name: '绩效工资配置',
      },
    ]
  },
  {
    path: '/report',
    name: '报表管理',
    children: [
      {
        path: '/report/yield',
        name: '产量统计',
      },
      {
        path: '/report/performance',
        name: '员工绩效',
      },
      {
        path: '/report/wages',
        name: '工资报表',
      },
      {
        path: '/report/rejectDistribution',
        name: '不良品分布',
      },
      {
        path: '/report/rejectSummary',
        name: '不良品汇总',
      },
      {
        path: '/report/produce',
        name: '生产报表',
      },
    ]
  },
]
