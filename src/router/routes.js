export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: '首页',
    icon: 'HomeFilled',
    component: () => import('@/views/home/index.vue')
  },
  // {
  //   path: '/dashboard',
  //   name: '智能驾驶舱',
  // },
  {
    path: '/sale',
    name: '销售管理',
    icon: 'CreditCard',
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
    path: '/production',
    name: '生产管理',
    icon: 'Cpu',
    children: [
      {
        path: '/production/plan',
        name: '生产计划',
        component: () => import('@/views/production/plan/index.vue'),
      },
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
    icon: 'Coin',
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
    icon: 'WarnTriangleFilled',
    children: [
      {
        path: '/quality/scheme',
        name: '质检方案',
        component: () => import('@/views/quality/scheme/index.vue'),
      },
      {
        path: '/quality/task',
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
    icon: 'InfoFilled',
    children: [
      {
        path: '/base/supplier',
        name: '供应商管理',
        component: () => import('@/views/base/supplier/index.vue'),
      },
      {
        path: '/base/category',
        name: '产品分类',
        component: () => import('@/views/base/category/index.vue'),
      },
      {
        path: '/base/product',
        name: '产品',
        component: () => import('@/views/base/product/index.vue'),
      },
      {
        path: '/base/process',
        name: '工序',
        component: () => import('@/views/base/process/index.vue'),
      },
      {
        path: '/base/craft',
        name: '工艺路线',
        component: () => import('@/views/base/craft/index.vue'),
      },
      {
        path: '/base/bom',
        name: 'BOM物料清单',
        component: () => import('@/views/base/bom/index.vue'),
      },
      {
        path: '/base/performance',
        name: '绩效工资配置',
        component: () => import('@/views/base/performance/index.vue'),
      },
    ]
  },
  // {
  //   path: '/report',
  //   name: '报表管理',
  //   children: [
  //     {
  //       path: '/report/yield',
  //       name: '产量统计',
  //     },
  //     {
  //       path: '/report/performance',
  //       name: '员工绩效',
  //     },
  //     {
  //       path: '/report/wages',
  //       name: '工资报表',
  //     },
  //     {
  //       path: '/report/rejectDistribution',
  //       name: '不良品分布',
  //     },
  //     {
  //       path: '/report/rejectSummary',
  //       name: '不良品汇总',
  //     },
  //     {
  //       path: '/report/produce',
  //       name: '生产报表',
  //     },
  //   ]
  // },
]
