<template>
  <div :class="['left-container', { 'left-collapsed': Collapsed }]">
    <div class="left-logo-title">
      <div class="left-logo"></div>
      <div class="left-title">MES-制造执行系统</div>
    </div>
    <el-menu
      class="left-menu"
      :default-active="current"
      :router="true"
      :collapse="Collapsed"
    >
      <template
        v-for="menu in menus"
        :key="menu.value"
      >
        <el-sub-menu
          v-if="menu.children"
          :index="menu.value"
        >
          <template #title>
            <span>{{ menu.label }}</span>
          </template>
          <el-menu-item
            v-for="child in menu.children"
            :key="child.value"
            :index="child.value"
            @click="menuClick(child)"
          >{{ child.label }}</el-menu-item>
        </el-sub-menu>
        <el-menu-item
          v-else
          :index="menu.value"
          @click="menuClick(menu)"
        >{{ menu.label }}</el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

// 获取状态管理仓库
const store = useStore()

// 菜单折叠
const Collapsed = computed(() => store.state.base.collapsed)

// 菜单
const current = ref()
const route = useRoute()
console.log('route', route.fullPath)
watchEffect(() => {
  current.value = route.path
})
const menus = ref([
  {
    value: '/home',
    label: '首页',
  },
  {
    value: '/dashboard',
    label: '智能驾驶舱',
  },
  {
    value: '/report',
    label: '报表管理',
    children: [
      {
        value: '/report/yield',
        label: '产量统计',
      },
      {
        value: '/report/performance',
        label: '员工绩效',
      },
      {
        value: '/report/wages',
        label: '工资报表',
      },
      {
        value: '/report/rejectDistribution',
        label: '不良品分布',
      },
      {
        value: '/report/rejectSummary',
        label: '不良品汇总',
      },
      {
        value: '/report/produce',
        label: '生产报表',
      },
    ]
  },
  {
    value: '/sale',
    label: '销售管理',
    children: [
      {
        value: '/sale/order',
        label: '销售订单',
      },
      {
        value: '/sale/customer',
        label: '客户管理',
      },
    ]
  },
  {
    value: '/plan',
    label: '计划管理',
    children: [
      {
        value: '/plan/order',
        label: '计划订单',
      },
    ]
  },
  {
    value: '/production',
    label: '生产管理',
    children: [
      {
        value: '/production/order',
        label: '生产工单',
      },
      {
        value: '/production/task',
        label: '生产任务',
      },
      {
        value: '/production/report',
        label: '生产报工',
      },
    ]
  },
  {
    value: '/repertory',
    label: '库存管理',
    children: [
      {
        value: '/repertory/stockroom',
        label: '仓库管理',
      },
      {
        value: '/repertory/stockIn',
        label: '入库单',
      },
      {
        value: '/repertory/stockOut',
        label: '出库单',
      },
      {
        value: '/repertory/sendReceive',
        label: '收发明细',
      },
      {
        value: '/repertory/balance',
        label: '仓库余额明细',
      },
      {
        value: '/repertory/purchase',
        label: '采购订单',
      },
    ]
  },
  {
    value: '/quality',
    label: '质检管理',
    children: [
      {
        value: '/repertory/scheme',
        label: '质检方案',
      },
      {
        value: '/repertory/task',
        label: '质检任务',
      },
      {
        value: '/repertory/report',
        label: '质检报告',
      },
    ]
  },
  {
    value: '/factory',
    label: '工厂管理',
    children: [
      {
        value: '/factory/info',
        label: '工厂信息',
      },
    ]
  },
  {
    value: '/base',
    label: '基础数据',
    children: [
      {
        value: '/base/supplier',
        label: '供应商管理',
      },
      {
        value: '/base/category',
        label: '产品分类',
      },
      {
        value: '/base/product',
        label: '产品',
      },
      {
        value: '/base/procedure',
        label: '工序',
      },
      {
        value: '/base/craft',
        label: '工艺路线',
      },
      {
        value: '/base/bom',
        label: 'BOM清单',
      },
      {
        value: '/base/performance',
        label: '绩效工资配置',
      },
    ]
  },
])

// 菜单点击
function menuClick (menu) {
  current.value = menu.value
  store.commit('addTab', menu)
}
</script>

<style lang="scss" scoped>
@include themeMixin {
  .left-container {
    display: flex;
    flex-direction: column;
    background: url('@/assets/images/left-bg.png') no-repeat center/100% 100%;

    .left-logo-title {
      flex: none;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px 20px;

      .left-logo {
        width: 26px;
        height: 26px;
        background: url('@/assets/images/logo.svg') no-repeat center/100% 100%;
        margin-right: 8px;
      }

      .left-title {
        font-size: 20px;
        line-height: 26px;
        color: #fff;
      }
    }

    :deep(.left-menu) {
      flex: auto;
      box-sizing: border-box;
      width: 100%;
      color: #fff;
      background-color: rgba(0, 0, 0, 0);
      overflow-x: hidden;
      overflow-y: auto;
      &::-webkit-scrollbar {
        display: none;
      }

      .el-menu {
        background-color: rgba(0, 0, 0, 0);
      }

      .el-menu-item,
      .el-sub-menu__title {
        font-size: 16px;
        color: #fff !important;
      }

      .el-menu-item.is-active,
      .el-menu-item:hover,
      .el-sub-menu__title:hover {
        color: #fff !important;
        background-color: #1890ff !important;
      }
    }
  }
  .left-collapsed {
    .left-title {
      display: none;
    }
  }
}
</style>
