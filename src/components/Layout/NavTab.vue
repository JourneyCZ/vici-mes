<template>
  <div class="nav-container">
    <!-- 标签页 -->
    <el-tabs
      v-model="activeTab"
      class="nav-tabs"
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
import { ref, watchEffect, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

// 获取状态管理仓库
const store = useStore()

// 标签页
const route = useRoute()
const activeTab = ref()
watchEffect(() => {
  activeTab.value = route.path
})
// 标签页-切换
const router = useRouter()
function tabChange (path) {
  router.push(path)
}
// 标签页-移除
const tabs = computed(() => store.state.navTab.tabs)
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
.nav-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: rgba($color: #000000, $alpha: 0);

  :deep(.nav-tabs) {
    width: 100%;
    border-bottom: 1px solid #E4E7ED;

    .el-tabs__header {
      border: none;
      margin: 0;
    }

    .el-tabs__content {
      padding: 0;
    }
  }
}
</style>
