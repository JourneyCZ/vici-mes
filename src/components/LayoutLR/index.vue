<template>
  <div :class="['theme-base', themeClass]">
    <el-config-provider :locale="zhCn">
      <div class="page-container">
        <Left class="page-left" />
        <div class="page-main">
          <Header class="page-header" @themeChange="themeChange" />
          <div class="page-body">
            <router-view />
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
    width: 100%;
    height: 100%;
    color: theme('colorTextBase');
    background-color: theme('colorBgBase');
    transition-property: background-color;
    transition: background-color 0.6s;

    .page-left {
      flex: none;
      width: 250px;
      overflow: hidden;
    }

    .page-main {
      flex: auto;
      display: flex;
      flex-direction: column;
      background-color: theme('colorBgLayout');
      overflow: hidden;

      .page-header {
        box-sizing: border-box;
        width: 100%;
        height: 46px;
        background-color: theme('colorBgElevated');
        padding: 0 20px;
      }

      .page-body {
        flex: auto;
        box-sizing: border-box;
        width: 100%;
        height: 10%;
        overflow-x: hidden;
        overflow-y: auto;
        padding: 20px;
      }
    }
  }
}
</style>
