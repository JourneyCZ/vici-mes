<template>
  <div class="header-container">
    <!-- 标题栏 -->
    <div class="header-logo-title">
      <div class="header-logo"></div>
      <div class="header-title">轻云制造执行系统</div>
    </div>
    <!-- 菜单栏 -->
    <el-menu
      class="header-menu"
      mode="horizontal"
      :default-active="current"
    >
      <template
        v-for="menu in menus"
        :key="menu.path"
      >
        <el-menu-item
          v-if="menu.name"
          :index="menu.path"
          @click="menuClick(menu)"
        >
          <el-icon v-if="menu.icon">
            <component v-bind:is="menu.icon"></component>
          </el-icon>{{ menu.name }}
        </el-menu-item>
      </template>
    </el-menu>
    <!-- 信息栏 -->
    <div class="header-info">
      <el-switch
        class="header-theme-check"
        v-model="themeChecked"
        inline-prompt
        :active-icon="MoonNight"
        :inactive-icon="Sunny"
        @change="themeChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect, computed } from 'vue'
import { useStore } from 'vuex'
import routes from '@/router/routes.js'
import { useRoute, useRouter } from 'vue-router'
import { Sunny, MoonNight } from '@element-plus/icons-vue'

// 定义事件
const emit = defineEmits(['themeChange'])

// 获取状态管理仓库
const store = useStore()

// 主题
const Theme = computed(() => store.state.base.theme)
const themeChecked = ref(Theme.value === 'dark')
function themeChange (checked) {
  emit('themeChange', checked ? 'dark' : 'light')
}

// 菜单数据
const menus = ref(routes)

// 菜单点击事件
const router = useRouter()
function menuClick (menu) {
  const children = menu?.children
  store.commit('setSubmenu', children || [])
  const path = children ? children[0].path : menu.path
  router.push(path)
}

// 默认激活菜单
const current = ref()
const route = useRoute()
watchEffect(() => {
  const currentArr = route.path.match(/^\/\w+/)
  current.value = currentArr ? currentArr[0] : ''
  const menu = menus.value.filter(item => item.path === current.value)
  if (menu && menu.length > 0) {
    menuClick(menu[0])
  }
})
</script>

<style lang="scss" scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  background: url('@/assets/images/header-bg.png') no-repeat center/100% 100%;

  .header-logo-title {
    flex: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;

    .header-logo {
      width: 60px;
      height: 30px;
      background: url('@/assets/images/logo.png') no-repeat center/100% 100%;
      margin-right: 8px;
    }

    .header-title {
      font-size: 20px;
      line-height: 30px;
      color: #fff;
    }
  }

  .header-menu {
    flex: auto;
    display: flex;
    justify-content: center;
    height: 50px;
    background: rgba($color: #000000, $alpha: 0);
    border: none;

    .el-menu-item {
      height: 100%;
      font-size: 16px;
      line-height: 16px;
      color: #fff;
      border: none;
      border-radius: 5px 5px 0 0;

      &:hover {
        color: #1677ff;
      }

      &.is-active {
        color: #1677ff;
        background-color: #fff;
      }

      .el-icon {
        width: 16px;
        font-size: 16px;
        margin-top: -2px;
      }
    }
  }

  .header-info {
    display: flex;
    justify-content: space-between;

    .header-theme-check {
      display: none;
    }
  }
}
</style>
