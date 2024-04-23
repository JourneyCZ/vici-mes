<template>
  <div :class="['theme-base', themeClass]">
    <el-config-provider :locale="zhCn">
      <div class="page-container">
        <Header class="page-header" @themeChange="themeChange" />
        <div class="page-body">
          <Left class="page-left" />
          <div class="page-main">
            <NavTab class="page-nav" />
            <div class="page-view">
              <router-view />
            </div>
          </div>
        </div>
      </div>
    </el-config-provider>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import Header from './Header.vue'
import Left from './Left.vue'
import NavTab from './NavTab.vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

// 获取状态管理仓库
const store = useStore()

// 切换主题
const theme = computed(() => store.state.base.theme)
const themeClass = computed(() => `theme-${theme.value}`)
function themeChange (value) {
  store.commit('setTheme', value)
}
</script>

<style lang="scss" scoped>
.theme-base {
  width: 100%;
  height: 100%;
}

@include themeMixin {
  .page-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    color: theme('colorTextBase');
    background-color: theme('colorBgBase');
    transition-property: background-color;
    transition: background-color 0.6s;

    .page-header {
      box-sizing: border-box;
      width: 100%;
      height: 50px;
      background-color: theme('colorBgElevated');
    }

    .page-body {
      flex: auto;
      display: flex;
      overflow: hidden;

      .page-left {
        flex: none;
        width: 250px;
        background-color: theme('colorBgElevated');
        overflow: hidden;
      }

      .page-main {
        flex: auto;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;

        .page-nav {
          box-sizing: border-box;
          width: 100%;
          padding: 20px 20px 0;
        }

        .page-view {
          flex: auto;
        }
      }
    }
  }
}
</style>
