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
      v-model="activeTab"
      class="header-tabs"
      type="card"
      @tab-change="tabChange"
      @tab-remove="tabRemove"
    >
      <el-tab-pane
        v-for="item in tabs"
        :key="item.path"
        :name="item.path"
        :label="item.name"
        :closable="item.path !== '/home'"
      >
        {{ item.content }}
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
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
const route = useRoute()
const router = useRouter()
const activeTab = ref(route.path)
watch(() => route.path, newPath => {
  activeTab.value = newPath
})
const tabs = computed(() => store.state.navTab.tabs)
// 标签页-切换
function tabChange (path) {
  router.push(path)
}
// 标签页-移除
function tabRemove (path) {
  const newTabs = tabs.value.filter(item => item.path !== path)
  store.commit('setTabs', newTabs)
  if (path === route.path) {
    // 移除当前标签页，则跳转到最后一个标签页
    router.push(newTabs?.slice(-1)[0]?.path)
  }
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
    }
  }
}
</style>
