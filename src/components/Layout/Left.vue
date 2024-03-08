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
      @select="menuSelect"
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
          >{{ child.label }}</el-menu-item>
        </el-sub-menu>
        <el-menu-item
          v-else
          :index="menu.value"
        >{{ menu.label }}</el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

// 获取状态管理仓库
const store = useStore()

// 菜单折叠
const Collapsed = computed(() => store.state.base.collapsed)

// 菜单
const current = ref('/home')
const menus = ref([
  {
    value: '/home',
    label: '首页',
  },
  {
    value: '/sale',
    label: '销售管理',
    title: '销售管理',
    children: [
      {
        value: '/sale/order',
        label: '销售订单',
        title: '销售订单'
      },
      {
        value: '/sale/customer',
        label: '客户管理',
        title: '客户管理'
      }
    ]
  }
])

// 监听路由变化，改变当前选中菜单
const route = useRoute()
watch(() => route.path, newPath => {
  current.value = newPath
})

// 菜单选择，触发路由跳转
const router = useRouter()
function menuSelect (menu) {
  router.push(menu.value)
}
</script>

<style lang="scss" scoped>
@include themeMixin {
  .left-container {
    background: url('@/assets/images/left-bg.png') no-repeat center/100% 100%;

    .left-logo-title {
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
      color: #fff;
      background-color: rgba(0, 0, 0, 0);

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
