<template>
  <div class="header-container">
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
    <!-- 标签页 -->
    <el-tabs
      class="header-tabs"
      type="card"
      editable
      @tab-remove="tabRemove"
    >
      <el-tab-pane
        v-for="item in tabs"
        :key="item.value"
        :name="item.value"
        :label="item.label"
        :closable="item.value !== '/index'"
      >
        {{ item.content }}
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { Sunny, MoonNight } from '@element-plus/icons-vue'

const emit = defineEmits(['themeChange'])

// 获取状态管理仓库
const store = useStore()

// 主题
const Theme = computed(() => store.state.base.theme)
const themeChecked = ref(Theme.value === 'dark')
function themeChange (checked) {
  emit('themeChange', checked ? 'dark' : 'light')
}

// 标签页
const tabs = computed(() => store.state.navTab.tabs)
function tabRemove (name) {
  const newTabs = tabs.value.filter(item => item.value !== name)
  store.commit('setTabs', newTabs)
}
</script>

<style lang="scss" scoped>
.header-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: rgba($color: #000000, $alpha: 0);

  .header-info {
    display: flex;
    justify-content: space-between;

    .header-theme-check {
      display: none;
    }
  }

  :deep(.header-tabs) {
    width: 100%;

    .el-tabs__header {
      border: none;
      margin: 0;

      .el-tabs__new-tab {
        display: none;
      }
    }
  }
}
</style>
