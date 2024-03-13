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
        :key="menu.path"
      >
        <el-sub-menu
          v-if="menu.children"
          :index="menu.path"
        >
          <template #title>
            <span>{{ menu.name }}</span>
          </template>
          <el-menu-item
            v-for="child in menu.children"
            :key="child.path"
            :index="child.path"
          >{{ child.name }}</el-menu-item>
        </el-sub-menu>
        <el-menu-item
          v-else-if="menu.name"
          :index="menu.path"
        >{{ menu.name }}</el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import routes from '@/router/routes.js'

// 获取状态管理仓库
const store = useStore()

// 菜单折叠
const Collapsed = computed(() => store.state.base.collapsed)

// 菜单
const current = ref()
const route = useRoute()
watchEffect(() => {
  const { path, name } = route
  if (path !== '/') {
    current.value = path
    store.commit('addTab', { path, name })
  }
})

// 从路由中获取菜单
const menus = routes
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
